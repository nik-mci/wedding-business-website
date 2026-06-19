import { google } from "googleapis";

let _auth = null;

function getAuth() {
  if (!_auth) {
    const keyJson = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, "base64").toString("utf8");
    _auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(keyJson),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }
  return _auth;
}

// Column order must match the sheet header row exactly:
// Timestamp | Source | First Name | Last Name | Email | Phone |
// Destination | Wedding Date | Budget Tier | Intent Level | Venues Viewed | Message | Session ID
export async function appendLead(row) {
  const sheetId   = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME ?? "Leads";

  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.warn("[sheets] GOOGLE_SHEET_ID or GOOGLE_SERVICE_ACCOUNT_KEY not set — skipping");
    return;
  }

  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${sheetName}!A:M`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}
