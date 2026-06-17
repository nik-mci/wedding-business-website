import { EmailClient } from "@azure/communication-email";
import { DefaultAzureCredential } from "@azure/identity";

const _credential = new DefaultAzureCredential();
let _emailClient = null;
function getEmailClient() {
  if (!_emailClient) {
    const endpoint = process.env.AZURE_COMMUNICATION_ENDPOINT;
    _emailClient = endpoint
      ? new EmailClient(endpoint, _credential)
      : new EmailClient(process.env.AZURE_COMMUNICATION_CONNECTION_STRING);
  }
  return _emailClient;
}

const RECIPIENTS = [
  // Backend-only recipient — never rendered to visitors.
  { address: "arunima.sethi@vowsandvedas.com", displayName: "Vows & Vedas" },
];

const CC_RECIPIENTS = [
  { address: "anamta.ali@getsholidays.com", displayName: "Anamta Ali" },
  { address: "nikhil.arora@wearemci.com",   displayName: "Nikhil Arora" },
  { address: "rakesh.bijewar@wearemci.com", displayName: "Rakesh Bijewar" },
];

function escHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { message_text = "", session_id = "unknown", preceding_user_message = "" } = body ?? {};

  if (!message_text?.trim())
    return Response.json({ error: "message_text is required." }, { status: 400 });
  if (message_text.length > 5000)
    return Response.json({ error: "message_text exceeds maximum length." }, { status: 400 });

  try {

    const client = getEmailClient();

    const emailMessage = {
      senderAddress: process.env.AZURE_SENDER_ADDRESS,
      content: {
        subject: `[Chatbot Feedback] 👎 Flagged response`,
        html: `
          <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;color:#1A1408;">
            <div style="background:#1A1408;padding:22px 32px;text-align:center;">
              <h2 style="color:#C9A234;margin:0;font-weight:300;letter-spacing:4px;font-size:12px;text-transform:uppercase;">
                Flagged Bot Response — Vows &amp; Vedas
              </h2>
            </div>

            <div style="background:#FFF3CD;border-left:4px solid #FFA000;padding:12px 16px;">
              <p style="margin:0;font-size:12px;color:#7A5200;font-weight:600;">
                👎 A user marked this bot response as unhelpful.
              </p>
            </div>

            <div style="padding:28px 32px;background:#FDFAF5;border:1px solid #EDE8DC;">
              ${preceding_user_message ? `
              <p style="color:#9A8F7E;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;font-weight:600;">User Asked</p>
              <div style="background:#F9F6EF;border:1px solid #EDE8DC;border-radius:4px;padding:12px 16px;margin-bottom:20px;">
                <p style="margin:0;font-size:14px;color:#1A1408;line-height:1.6;">${escHtml(preceding_user_message)}</p>
              </div>` : ""}

              <p style="color:#9A8F7E;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;font-weight:600;">Flagged Bot Response</p>
              <div style="background:#FFF8F8;border:1px solid #FFCDD2;border-radius:4px;padding:12px 16px;margin-bottom:24px;">
                <p style="margin:0;font-size:14px;color:#1A1408;line-height:1.6;">${escHtml(message_text)}</p>
              </div>

              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;color:#9A8F7E;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:38%;">Session</td>
                  <td style="padding:8px 0;font-size:12px;color:#9A8F7E;">${escHtml(session_id)}</td>
                </tr>
              </table>
            </div>

            <div style="padding:14px 32px;background:#1A1408;text-align:center;">
              <p style="color:#C9A234;margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                Vows &amp; Vedas · Curating Rare Moments
              </p>
            </div>
          </div>
        `,
      },
      recipients: { to: RECIPIENTS, cc: CC_RECIPIENTS },
    };

    const poller = await client.beginSend(emailMessage);
    await poller.pollUntilDone();

    return Response.json({ success: true });
  } catch (err) {
    console.error("[feedback-alert] error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
