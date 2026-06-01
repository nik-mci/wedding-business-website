# ═══════════════════════════════════════════════════════════════════════════════
# REUSABLE FOR: Vows & Vedas wedding chatbot   |   SAFE COPY
# SOURCE: MCI-GeTS-Chatbot/rag_api/services/email_service.py
#
# WHAT IT DOES: builds + sends the lead-notification email (and a daily summary) to
#   the sales team via Azure Communication Services (ACS). HTML templates are inline.
#
# HOW TO REUSE (notes for the next Claude agent):
#   - Keep the ACS integration + HTML builder pattern. The connection string is read
#     from settings (env) — never hardcoded.
#   - SAFE EDIT APPLIED: two hardcoded internal CC addresses were replaced with
#     internal-cc-1@example.com / internal-cc-2@example.com. TODO(wedding): set the
#     wedding team's recipients here AND in config.py SALES_CC_EMAILS, or remove.
#   - TODO(wedding): the transcript builder labels the bot "Nik" — rename it.
#   - TODO(wedding): re-skin the HTML + re-field the lead fields (destination->city,
#     group_size->guest_count, …  see schemas.py mapping table from batch 1).
#   - DEPENDS: config.py (settings); psycopg2 (daily summary reads the leads table).
# ═══════════════════════════════════════════════════════════════════════════════
import logging
from azure.communication.email import EmailClient
import psycopg2
from config import settings
from datetime import datetime
import pytz
from typing import List, Dict, Any
import html as html_module

logger = logging.getLogger(__name__)

def get_email_client():
    if not settings.AZURE_COMMUNICATION_CONNECTION_STRING:
        return None
    try:
        return EmailClient.from_connection_string(settings.AZURE_COMMUNICATION_CONNECTION_STRING)
    except Exception as e:
        logger.error(f"[EMAIL] Failed to initialize Azure Email Client: {e}")
        return None


# ── Helpers ──────────────────────────────────────────────────────────────────

def _esc(text: str) -> str:
    return html_module.escape(str(text)) if text else ""

def _field(label: str, value: str) -> str:
    if not value or value.strip() in ("", "None"):
        return ""
    return (
        f'<tr>'
        f'<td style="padding:6px 16px 6px 0;font-size:13px;color:#6b7280;white-space:nowrap;vertical-align:top;width:110px;">{label}</td>'
        f'<td style="padding:6px 0;font-size:13px;color:#111827;">{_esc(value)}</td>'
        f'</tr>'
    )

def _divider() -> str:
    return '<div style="border-top:1px solid #e5e7eb;margin:20px 0;"></div>'

def _label(text: str) -> str:
    return f'<p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:#9ca3af;">{text}</p>'

def _build_chat_transcript(history: List[Dict[str, Any]]) -> str:
    import re
    if not history:
        return ""
    rows = []
    for msg in history:
        role = msg.get("role", msg.get("sender", "user"))
        text = msg.get("text", msg.get("content", ""))
        text = re.sub(r'<<<[^>]+>>>[\s\S]*?<<<END_[^>]+>>>', '', str(text)).strip()
        if not text:
            continue
        is_user = role == "user"
        speaker = "Visitor" if is_user else "Nik"
        color   = "#111827" if is_user else "#374151"
        weight  = "600"     if is_user else "400"
        safe    = _esc(text).replace("\n", "<br>")
        rows.append(
            f'<tr>'
            f'<td style="padding:8px 0;vertical-align:top;width:56px;font-size:12px;font-weight:{weight};color:#6b7280;white-space:nowrap;">{speaker}</td>'
            f'<td style="padding:8px 0;font-size:13px;color:{color};line-height:1.6;">{safe}</td>'
            f'</tr>'
        )
    if not rows:
        return ""
    return (
        '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">'
        + "".join(rows)
        + "</table>"
    )


# ── Main email builder ────────────────────────────────────────────────────────

def _build_lead_email_html(lead: dict) -> str:
    ist     = pytz.timezone("Asia/Kolkata")
    now_ist = datetime.now(ist)

    name         = lead.get("name")         or "Unknown"
    contact      = lead.get("contact")      or "Unknown"
    intent_level = (lead.get("intent_level") or "low").upper()
    destinations = lead.get("destination")  or []
    duration     = lead.get("duration")     or ""
    group_size   = lead.get("group_size")   or ""
    theme        = lead.get("theme")        or ""
    budget       = lead.get("budget")       or ""
    pkgs         = lead.get("packages_viewed") or []
    questions    = lead.get("key_questions")   or []
    history      = lead.get("conversation_history") or []

    dest_str = ", ".join(str(d).title() for d in destinations) if destinations else ""
    received = now_ist.strftime("%d %b %Y, %I:%M %p IST")

    # Detect "no intent" — user submitted contact details but shared no travel information.
    # Condition: no destination captured AND no packages viewed AND intent level is low.
    # At least one of these being populated means this is a genuine lead.
    no_intent = (not destinations) and (not pkgs) and intent_level == "LOW"

    # Trip detail rows
    trip_rows = (
        _field("Destination", dest_str)
        + _field("Duration",    duration)
        + _field("Group",       group_size)
        + _field("Theme",       theme)
        + _field("Budget",      budget)
    )

    # Packages
    pkg_text = ", ".join(pkgs) if pkgs else ""

    # Questions
    q_items = "".join(
        f'<li style="font-size:13px;color:#374151;margin-bottom:4px;">{_esc(q)}</li>'
        for q in questions
    ) if questions else ""

    # Transcript
    transcript = _build_chat_transcript(history)

    # No-intent warning banner (only shown when no travel details were captured)
    no_intent_banner = ""
    if no_intent:
        no_intent_banner = """
          <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;padding:14px 16px;margin-bottom:20px;">
            <p style="margin:0 0 4px 0;font-size:13px;font-weight:700;color:#c2410c;">&#9888; No travel intent captured</p>
            <p style="margin:0;font-size:12px;color:#9a3412;line-height:1.6;">
              This contact submitted their details without sharing any trip information (no destination, no duration, no packages viewed).
              Treat as a cold inbound — confirm trip intent before investing sales time.
            </p>
          </div>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="padding:0 0 24px 0;">
          <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;">GeTS Holidays</p>
          <h1 style="margin:4px 0 0 0;font-size:22px;font-weight:700;color:#111827;">New lead from chatbot</h1>
          <p style="margin:4px 0 0 0;font-size:13px;color:#6b7280;">{received}</p>
        </td>
      </tr>

      <!-- Body card -->
      <tr>
        <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:28px;">

          {no_intent_banner}

          <!-- Contact -->
          <p style="margin:0 0 2px 0;font-size:18px;font-weight:700;color:#111827;">{_esc(name)}</p>
          <p style="margin:0 0 8px 0;font-size:14px;color:#374151;">{_esc(contact)}</p>
          <p style="margin:0;font-size:12px;color:#6b7280;">Intent: <strong style="color:#111827;">{intent_level}</strong></p>

          {_divider()}

          <!-- Trip details -->
          {f'''{_label("Trip Details")}
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%;">{trip_rows}</table>''' if trip_rows.strip() else ""}

          {f'''{_divider()}{_label("Packages Viewed")}
          <p style="margin:0;font-size:13px;color:#374151;">{_esc(pkg_text)}</p>''' if pkg_text else ""}

          {f'''{_divider()}{_label("Topics Discussed")}
          <ul style="margin:0;padding-left:18px;">{q_items}</ul>''' if q_items else ""}

          {f'''{_divider()}{_label("Conversation")}
          {transcript}''' if transcript else ""}

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:16px 0 0 0;text-align:center;">
          <p style="margin:0;font-size:11px;color:#9ca3af;">GeTS Holidays Chatbot · Auto-generated</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>

</body>
</html>"""


# ── Public API ────────────────────────────────────────────────────────────────

def send_single_lead_email(lead_data: dict):
    """Sends a richly formatted lead email to the sales team."""
    client = get_email_client()
    if not client or not settings.EMAIL_SENDER_ADDRESS or not settings.SALES_TEAM_EMAIL:
        logger.warning("[EMAIL] Missing ACS credentials or email addresses. Skipping lead email.")
        return

    name         = lead_data.get("name") or "Unknown"
    intent_level = (lead_data.get("intent_level") or "low").upper()
    destinations = lead_data.get("destination") or []
    dest_str     = ", ".join(str(d).title() for d in destinations) if destinations else ""
    duration     = lead_data.get("duration") or ""

    # Build a compact subject line
    parts = [p for p in [dest_str, duration] if p]
    subject_detail = " · ".join(parts) if parts else "India trip"
    subject = f"New Lead [{intent_level}]: {name} — {subject_detail}"

    html_body = _build_lead_email_html(lead_data)

    message = {
        "senderAddress": settings.EMAIL_SENDER_ADDRESS,
        "recipients":  {
            "to": [{"address": settings.SALES_TEAM_EMAIL}],
            "cc": [{"address": addr} for addr in settings.SALES_CC_EMAILS] + [{"address": "internal-cc-1@example.com"}, {"address": "internal-cc-2@example.com"}],
        },
        "content": {
            "subject": subject,
            "html": html_body,
        },
    }

    try:
        client.begin_send(message)
        logger.info(f"[EMAIL] Lead email dispatched — {name} / {intent_level}")
    except Exception as e:
        logger.error(f"[EMAIL] Failed to send lead email: {e}")


def send_feedback_alert(session_id: str, message_id: str, message_text: str):
    """Sends an immediate alert email when a user thumbs-down a bot response."""
    client = get_email_client()
    if not client or not settings.EMAIL_SENDER_ADDRESS or not settings.SALES_TEAM_EMAIL:
        logger.warning("[EMAIL] Missing credentials. Skipping feedback alert.")
        return

    ist = pytz.timezone("Asia/Kolkata")
    now_ist = datetime.now(ist).strftime("%d %b %Y, %I:%M %p IST")
    sess_short = (session_id or "unknown")[:10]
    safe_text = _esc(message_text[:600] or "— no message text captured —")

    html_body = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
      <tr>
        <td style="padding:0 0 20px 0;">
          <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;">GeTS Holidays</p>
          <h1 style="margin:4px 0 0 0;font-size:20px;font-weight:700;color:#b91c1c;">&#128078; Bot response flagged</h1>
          <p style="margin:4px 0 0 0;font-size:13px;color:#6b7280;">{now_ist} &nbsp;·&nbsp; Session: {sess_short} &nbsp;·&nbsp; Msg: {_esc(message_id[:12])}</p>
        </td>
      </tr>
      <tr>
        <td style="background:#fff;border:1px solid #fca5a5;border-radius:8px;padding:24px;">
          <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;color:#9ca3af;">Flagged message</p>
          <p style="margin:0;font-size:14px;color:#111827;line-height:1.7;background:#fef2f2;border-left:3px solid #ef4444;padding:12px 16px;border-radius:4px;">{safe_text}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 0 0 0;text-align:center;">
          <p style="margin:0;font-size:11px;color:#9ca3af;">GeTS Holidays Chatbot &nbsp;·&nbsp; Quality review alert</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>"""

    message = {
        "senderAddress": settings.EMAIL_SENDER_ADDRESS,
        "recipients": {
            "to": [{"address": settings.SALES_TEAM_EMAIL}],
            "cc": [{"address": addr} for addr in settings.SALES_CC_EMAILS] + [{"address": "internal-cc-1@example.com"}],
        },
        "content": {
            "subject": f"[Bot QA] Thumbs-down flagged — session {sess_short}",
            "html": html_body,
        },
    }
    try:
        client.begin_send(message)
        logger.info(f"[EMAIL] Feedback alert sent — sess={sess_short}")
    except Exception as e:
        logger.error(f"[EMAIL] Failed to send feedback alert: {e}")


def send_daily_summary_email():
    """Generates and sends an aggregated daily summary report."""
    client = get_email_client()
    if not client or not settings.EMAIL_SENDER_ADDRESS or not settings.SALES_TEAM_EMAIL:
        logger.warning("[EMAIL] Missing ACS credentials or email addresses. Skipping daily summary.")
        return

    ist = pytz.timezone('Asia/Kolkata')
    now_ist = datetime.now(ist)
    start_of_day = now_ist.replace(hour=0, minute=0, second=0, microsecond=0)

    leads = []
    try:
        conn = psycopg2.connect(settings.AZURE_POSTGRES_CONNECTION_STRING)
        with conn.cursor() as cur:
            cur.execute(
                "SELECT name, contact, conversation_summary, created_at FROM leads "
                "WHERE created_at >= %s ORDER BY created_at DESC",
                (start_of_day,)
            )
            leads = cur.fetchall()
        conn.close()
    except Exception as e:
        logger.error(f"[EMAIL] Failed to fetch leads for daily summary: {e}")
        return

    if not leads:
        logger.info("[EMAIL] No leads found today. Skipping summary email.")
        return

    rows = ""
    for lead in leads:
        lead_name = _esc(lead[0] or "")
        lead_contact = _esc(lead[1] or "")
        summary_preview = _esc((lead[2] or "")[:120])
        created_at = lead[3]
        time_str = created_at.astimezone(ist).strftime("%I:%M %p") if created_at else "—"

        rows += f"""
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:12px;color:#374151;">{time_str}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:13px;font-weight:600;color:#0a1628;">{lead_name}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:12px;color:#374151;">{lead_contact}</td>
          <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:12px;color:#6b7280;">{summary_preview}{'…' if len(lead[2] or '') > 120 else ''}</td>
        </tr>"""

    html_content = f"""<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
  <tr><td align="center">
    <table width="680" cellpadding="0" cellspacing="0" style="max-width:680px;width:100%;">
      <tr>
        <td style="background:#0a1628;border-radius:12px 12px 0 0;padding:24px 28px;">
          <div style="font-size:22px;font-weight:700;color:#fff;">GeTS Holidays</div>
          <div style="font-size:13px;color:#94a3b8;margin-top:4px;">Daily lead summary — {now_ist.strftime('%d %B %Y')}</div>
        </td>
      </tr>
      <tr>
        <td style="background:#fff;padding:28px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;">
          <p style="font-size:14px;color:#374151;margin:0 0 16px 0;">
            <strong>{len(leads)}</strong> lead{'s' if len(leads) != 1 else ''} captured today.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr style="background:#f9fafb;">
              <th style="padding:10px 12px;border:1px solid #e5e7eb;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Time (IST)</th>
              <th style="padding:10px 12px;border:1px solid #e5e7eb;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Name</th>
              <th style="padding:10px 12px;border:1px solid #e5e7eb;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Contact</th>
              <th style="padding:10px 12px;border:1px solid #e5e7eb;text-align:left;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Summary</th>
            </tr>
            {rows}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 0 0 0;text-align:center;">
          <div style="font-size:11px;color:#9ca3af;">GeTS Holidays Chatbot &nbsp;·&nbsp; Auto-generated daily report</div>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>"""

    message = {
        "senderAddress": settings.EMAIL_SENDER_ADDRESS,
        "recipients":  {
            "to": [{"address": settings.SALES_TEAM_EMAIL}],
            "cc": [{"address": addr} for addr in settings.SALES_CC_EMAILS] + [{"address": "internal-cc-1@example.com"}, {"address": "internal-cc-2@example.com"}],
        },
        "content": {
            "subject": f"Daily Chatbot Leads — {now_ist.strftime('%d %b %Y')} ({len(leads)} lead{'s' if len(leads) != 1 else ''})",
            "html": html_content,
        },
    }

    try:
        client.begin_send(message)
        logger.info(f"[EMAIL] Daily summary dispatched — {len(leads)} lead(s)")
    except Exception as e:
        logger.error(f"[EMAIL] Failed to send daily summary: {e}")
