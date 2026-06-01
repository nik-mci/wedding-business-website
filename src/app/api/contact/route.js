import { EmailClient } from "@azure/communication-email";

const RECIPIENTS = [
  { address: "samir.kalia@wearemci.com",        displayName: "Samir Kalia" },
  { address: "ruchi.mohotra@wearemci.com",       displayName: "Ruchi Mohotra" },
  { address: "Arunima.sethi@getsholidays.com",   displayName: "Arunima Sethi" },
  { address: "rakesh.bijewar@wearemci.com",      displayName: "Rakesh Bijewar" },
  { address: "nikhil.arora@wearemci.com",        displayName: "Nikhil Arora" },
  { address: "anamta.ali@getsholidays.com",      displayName: "Anamta Ali" },
];

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, destination, weddingDate, message } = body;

    const client = new EmailClient(process.env.AZURE_COMMUNICATION_CONNECTION_STRING);

    const emailMessage = {
      senderAddress: process.env.AZURE_SENDER_ADDRESS,
      replyTo: [{ address: email, displayName: `${firstName} ${lastName}` }],
      content: {
        subject: `New Wedding Enquiry — ${firstName} ${lastName}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1A1408;">
            <div style="background: #1A1408; padding: 24px 32px; text-align: center;">
              <h2 style="color: #C9A234; margin: 0; font-weight: 300; letter-spacing: 4px; font-size: 13px; text-transform: uppercase;">
                New Enquiry — Vows &amp; Vedas
              </h2>
            </div>
            <div style="padding: 32px; background: #FDFAF5; border: 1px solid #EDE8DC;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;color:#9A8F7E;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:38%;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;font-size:15px;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;color:#9A8F7E;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;font-size:15px;"><a href="mailto:${email}" style="color:#C9A234;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;color:#9A8F7E;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;font-size:15px;">${phone || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;color:#9A8F7E;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Destination</td>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;font-size:15px;">${destination || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;color:#9A8F7E;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Wedding Date</td>
                  <td style="padding:10px 0;border-bottom:1px solid #EDE8DC;font-size:15px;">${weddingDate || "—"}</td>
                </tr>
                ${message ? `
                <tr>
                  <td style="padding:10px 0;color:#9A8F7E;font-size:11px;text-transform:uppercase;letter-spacing:2px;vertical-align:top;">Vision</td>
                  <td style="padding:10px 0;font-size:15px;line-height:1.7;">${message}</td>
                </tr>` : ""}
              </table>
            </div>
            <div style="padding:16px 32px;background:#1A1408;text-align:center;">
              <p style="color:#C9A234;margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                Vows &amp; Vedas · Curating Rare Moments
              </p>
            </div>
          </div>
        `,
      },
      recipients: {
        to: RECIPIENTS,
      },
    };

    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();

    if (result.status === "Succeeded") {
      return Response.json({ success: true });
    } else {
      throw new Error(`Email send failed with status: ${result.status}`);
    }
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
