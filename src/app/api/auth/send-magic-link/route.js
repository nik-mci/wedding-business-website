import { randomBytes } from "crypto";
import { EmailClient } from "@azure/communication-email";
import { DefaultAzureCredential } from "@azure/identity";
import { getUsersContainer, getAuthTokensContainer } from "@/lib/cosmos";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

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

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body?.email?.trim()?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "A valid email address is required." }, { status: 400 });
  }

  // Upsert user
  const usersContainer = getUsersContainer();
  let user;
  try {
    const { resource } = await usersContainer.item(email, email).read();
    if (resource) {
      user = resource;
      await usersContainer.item(email, email).patch([
        { op: "set", path: "/lastLoginRequest", value: new Date().toISOString() },
      ]);
    } else {
      const { resource: created } = await usersContainer.items.create({
        id: email,
        email,
        createdAt: new Date().toISOString(),
        lastLoginRequest: new Date().toISOString(),
      });
      user = created;
    }
  } catch (err) {
    // 404 from Cosmos means not found — create new user
    if (err.code === 404) {
      const { resource: created } = await usersContainer.items.create({
        id: email,
        email,
        createdAt: new Date().toISOString(),
        lastLoginRequest: new Date().toISOString(),
      });
      user = created;
    } else {
      console.error("Cosmos user upsert error:", err);
      return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
  }

  // Generate token
  const token = randomBytes(32).toString("hex");
  const expiresAt = Date.now() + TOKEN_TTL_MS;

  try {
    await getAuthTokensContainer().items.create({
      id: token,
      email,
      expiresAt,
      ttl: Math.ceil(TOKEN_TTL_MS / 1000), // Cosmos TTL in seconds
    });
  } catch (err) {
    console.error("Cosmos token create error:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  // Send email
  const baseUrl = process.env.AUTH_BASE_URL || "https://vowsandvedas.com";
  const magicLink = `${baseUrl}/api/auth/verify?token=${token}`;

  try {
    const client = getEmailClient();
    const poller = await client.beginSend({
      senderAddress: process.env.AZURE_SENDER_ADDRESS,
      replyTo: [{ address: "info@vowsandvedas.com", displayName: "Vows & Vedas" }],
      content: {
        subject: "Your sign-in link — Vows & Vedas",
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A1408;">
            <div style="background: #1A1408; padding: 28px 32px; text-align: center;">
              <p style="color: #C9A234; margin: 0; font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase; font-family: 'DM Sans', sans-serif;">Vows &amp; Vedas</p>
            </div>
            <div style="padding: 40px 32px; background: #FDFAF5; border: 1px solid #EDE8DC;">
              <h2 style="font-weight: 300; font-size: 24px; color: #1A1408; margin: 0 0 16px;">Sign in to your account</h2>
              <p style="font-size: 15px; line-height: 1.8; color: #5A5348; margin: 0 0 32px;">
                Click the button below to sign in. This link expires in <strong>15 minutes</strong> and can only be used once.
              </p>
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${magicLink}" style="display: inline-block; background: #C9A234; color: #fff; text-decoration: none; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; padding: 14px 36px; border-radius: 2px;">
                  Sign In
                </a>
              </div>
              <p style="font-size: 12px; color: #9A8F7E; line-height: 1.7; margin: 0;">
                If you didn't request this, you can safely ignore this email. The link will expire on its own.<br>
                Or copy this link: <a href="${magicLink}" style="color: #C9A234; word-break: break-all;">${magicLink}</a>
              </p>
            </div>
            <div style="padding: 16px 32px; background: #1A1408; text-align: center;">
              <p style="color: #C9A234; margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;">Vows &amp; Vedas · Curating Rare Moments</p>
            </div>
          </div>
        `,
      },
      recipients: {
        to: [{ address: email }],
      },
    });
    // Don't await — return immediately; email delivery continues in background
    poller.pollUntilDone().catch(err => console.error("Magic link delivery error:", err));
  } catch (err) {
    console.error("Magic link email send error:", err);
    return Response.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  return Response.json({ sent: true });
}
