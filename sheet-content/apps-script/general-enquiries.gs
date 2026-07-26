/**
 * =================================================================
 *  GENERAL ENQUIRIES — Standalone Google Apps Script Web App
 * =================================================================
 *  PURPOSE:
 *    Receives Enquiry POSTs from Home Quick Contact & Contact Us forms.
 *    - Generates unique ID (GE-YYDDD-00000) from actual sheet row count
 *    - Appends data to "General Enquiries" tab
 *    - Sends branded acknowledgement email to customer
 *    - Sends lead notification email to designated organiser email list:
 *         • If Exhibitor or Sponsor interest: send to sales & info recipients
 *         • If other general interest: send to info recipients only
 *    - RETURNS the unique ID in JSON response
 * =================================================================
 */

const TAB_NAME = "General Enquiries";

const HEADERS = [
  "Submitted At", "Unique ID", "Full Name", "Email", "Phone", "Gender",
  "Date of Birth", "Interest", "Message", "Status",
];

const THEME = { headerBg: "#270585", headerFg: "#ffffff", altRow: "#f2f1fb" };

/* ── CONFIG ────────────────────────────────────────────────────── */
const EVENT_NAME    = "Bengaluru Auto Expo 2026";
const EVENT_DATES   = "8–11 October 2026";
const EVENT_VENUE   = "BIEC, Bengaluru";
const EVENT_EMAIL   = "info@bengaluruautoexpo.in";
const EVENT_PHONE   = "+91 80 4500 8800";
const EVENT_WEBSITE = "bengaluruautoexpo.in";

/* ── EMAIL SYSTEM CONFIGURATION ──────────────────────────────────
   Enable or disable emails, and choose recipient addresses easily.
   ────────────────────────────────────────────────────────────── */
const EMAIL_CONFIG = {
  /** Send acknowledgement email to the customer */
  sendCustomerEmail: true,
  /** Send internal lead notification to your own company / organisers */
  sendInternalEmail: true,
  /** Recipients for high-value sales leads (Exhibitor / Sponsorship) */
  salesRecipients: [
    "sales@bengaluruautoexpo.in",
    "info@bengaluruautoexpo.in"
  ],
  /** Recipients for general support and miscellaneous enquiries */
  infoRecipients: [
    "info@bengaluruautoexpo.in"
  ]
};

/* ── INSTALL & UPDATE PROCEDURES ──────────────────────────────── */

function freshInstallEnquirySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const response = ui.alert(
    "⚠️ WARNING: Fresh Install",
    "This will completely delete ALL existing enquiry data in the '" + TAB_NAME + "' tab.\n\nAre you sure you want to proceed?",
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    ui.alert("Install Cancelled", "No data was removed.", ui.ButtonSet.OK);
    return;
  }

  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);
  sheet.clear();

  applyEnquiryHeadersAndFormatting(sheet);

  ss.setActiveSheet(sheet);
  if (/^Untitled|^Copy of/i.test(ss.getName())) {
    ss.renameSpreadsheet("General Enquiries — Auto Expo 2026");
  }

  ui.alert("✅ Fresh Install Completed", "All data was cleared. Sheet headers and styles have been rebuilt fresh.", ui.ButtonSet.OK);
}

function updateEnquirySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  let sheet = ss.getSheetByName(TAB_NAME);
  const exists = !!sheet;
  if (!sheet) {
    sheet = ss.insertSheet(TAB_NAME);
  }

  applyEnquiryHeadersAndFormatting(sheet);
  ss.setActiveSheet(sheet);

  const msg = exists
    ? "Sheet updated successfully! Checked-in rows (Rows 2+) were preserved entirely."
    : "Sheet was missing, so a new one was created successfully.";

  ui.alert("✅ Update Completed", msg, ui.ButtonSet.OK);
}

function installEnquirySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);
  applyEnquiryHeadersAndFormatting(sheet);
}

function applyEnquiryHeadersAndFormatting(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange
    .setValues([HEADERS])
    .setFontWeight("bold")
    .setFontColor(THEME.headerFg)
    .setBackground(THEME.headerBg)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);

  for (let c = 1; c <= HEADERS.length; c++) {
    sheet.autoResizeColumn(c);
    if (sheet.getColumnWidth(c) < 110) sheet.setColumnWidth(c, 110);
  }
  sheet.setColumnWidth(4, 220); // Email
  sheet.setColumnWidth(9, 400); // Message

  try {
    const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
    protections.forEach((p) => {
      if (p.getRange().getRow() === 1) p.remove();
    });
    const protection = headerRange.protect().setDescription("Header row — do not rename");
    protection.setWarningOnly(true);
  } catch (e) {}
}

/* ── UNIQUE ID GENERATOR ──────────────────────────────────────── */

function generateEnquiryId(sheet) {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = String(Math.floor((now - startOfYear) / 86400000)).padStart(3, "0");
  const seq = String(Math.max(sheet.getLastRow(), 1)).padStart(5, "0");
  return "GE-" + yy + dayOfYear + "-" + seq;
}

/* ── WEB APP ENDPOINTS ────────────────────────────────────────── */

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return jsonResponse({ ok: true, service: "General Enquiries", event: EVENT_NAME });
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) { installEnquirySheet(); sheet = ss.getSheetByName(TAB_NAME); }

  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const p = payload.personal || {};
    const interest = payload.interest || "General Enquiry";
    const msgText = payload.message || "";

    // Generate authoritative ID from sheet row count
    const id = generateEnquiryId(sheet);
    const now = new Date();

    sheet.appendRow([
      now, id,
      p.fullName || "", p.email || "", p.phone || "", p.gender || "", p.dob || "",
      interest, msgText,
      "NEW",
    ]);

    const newRow = sheet.getLastRow();
    if (newRow % 2 === 0) {
      sheet.getRange(newRow, 1, 1, HEADERS.length).setBackground(THEME.altRow);
    }

    // ── SEND CUSTOMER EMAIL ──
    if (EMAIL_CONFIG.sendCustomerEmail && p.email) {
      const subject = "Thank you for contacting " + EVENT_NAME + " (" + id + ")";
      const htmlBody = buildEnquiryEmail(id, p, interest, msgText);

      try {
        GmailApp.sendEmail(p.email, subject, "", {
          name: EVENT_NAME,
          htmlBody: htmlBody,
          replyTo: EVENT_EMAIL,
        });
      } catch (mailErr) {
        MailApp.sendEmail({
          to: p.email,
          name: EVENT_NAME,
          replyTo: EVENT_EMAIL,
          subject: subject,
          htmlBody: htmlBody,
        });
      }
    }

    // ── SEND INTERNAL LEAD NOTIFICATION (With smart routing) ──
    if (EMAIL_CONFIG.sendInternalEmail) {
      // Is it a high-value sales lead?
      const isSalesLead = /exhibitor|sponsor/i.test(interest);
      const recipients = isSalesLead ? EMAIL_CONFIG.salesRecipients : EMAIL_CONFIG.infoRecipients;

      if (recipients.length > 0) {
        const internalSubject = `[NEW ENQUIRY] ${interest}: ${p.fullName} (${id})`;
        const internalHtmlBody = buildInternalEnquiryNotification(id, p, interest, msgText);

        const internalMailOptions = {
          name: EVENT_NAME,
          htmlBody: internalHtmlBody,
          replyTo: EVENT_EMAIL,
        };

        const recipientList = recipients.join(",");
        MailApp.sendEmail(recipientList, internalSubject, "", internalMailOptions);
      }
    }

    return jsonResponse({ ok: true, id: id });

  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/* ── EMAIL TEMPLATES ────────────────────────────────────────────── */

function buildEnquiryEmail(id, p, interest, message) {
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body style="margin:0;padding:0;background:#f4f3fb;font-family:Arial,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3fb;padding:32px 0;"><tr><td align="center">' +
    '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(39,5,133,0.10);">' +
    '<tr><td style="background:linear-gradient(135deg,#270585 0%,#850527 100%);padding:40px;text-align:center;color:white;">' +
    '<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);">8th Edition</p>' +
    '<h1 style="margin:0;font-size:28px;font-weight:900;">' + EVENT_NAME + '</h1>' +
    '<p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">' + EVENT_DATES + ' · ' + EVENT_VENUE + '</p>' +
    '<div style="margin:20px auto 0;display:inline-block;background:rgba(255,255,255,0.15);border-radius:100px;padding:6px 20px;">' +
    '<span style="font-size:12px;font-weight:700;color:#fff;letter-spacing:0.15em;text-transform:uppercase;">Enquiry Acknowledged</span>' +
    '</div></td></tr>' +
    '<tr><td style="padding:40px;">' +
    '<h2 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#1e1b4b;">Thank you, ' + (p.fullName || "Friend") + '! 🙏</h2>' +
    '<p style="margin:0 0 24px;font-size:14px;color:#64748b;">We\'ve received your enquiry and our team will respond within one business day.</p>' +
    '<div style="background:#f2f1fb;border:1px solid #cbc5ee;border-radius:12px;padding:20px;margin-bottom:28px;text-align:center;">' +
    '<p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#270585;">Your Enquiry Reference ID</p>' +
    '<p style="margin:0;font-size:28px;font-weight:900;color:#270585;letter-spacing:0.08em;">' + id + '</p>' +
    '</div>' +
    '<h3 style="margin:0 0 16px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#270585;">Enquiry Summary</h3>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;">' +
    '<tr style="background:#f8fafc;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;width:35%;border-bottom:1px solid #e2e8f0;">NAME</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">' + (p.fullName || "N/A") + '</td></tr>' +
    '<tr style="background:#ffffff;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;border-bottom:1px solid #e2e8f0;">EMAIL</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">' + (p.email || "N/A") + '</td></tr>' +
    '<tr style="background:#f8fafc;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;border-bottom:1px solid #e2e8f0;">INTEREST</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">' + (interest || "General") + '</td></tr>' +
    '<tr style="background:#ffffff;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;">MESSAGE</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;">' + (message || "N/A") + '</td></tr>' +
    '</table>' +
    '<div style="background:#fdf2f3;border:1px solid #f8ccd5;border-radius:12px;padding:20px;">' +
    '<p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#850527;">Need to reach us directly?</p>' +
    '<p style="margin:0;font-size:12px;color:#64748b;">📧 <a href="mailto:' + EVENT_EMAIL + '" style="color:#270585;font-weight:600;">' + EVENT_EMAIL + '</a><br/>📞 ' + EVENT_PHONE + '</p>' +
    '</div></td></tr>' +
    '<tr><td style="background:#1e1b4b;padding:24px 40px;text-align:center;">' +
    '<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#fff;">' + EVENT_NAME + '</p>' +
    '<p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">© ' + new Date().getFullYear() + ' ' + EVENT_NAME + '. All rights reserved.</p>' +
    '</td></tr></table></td></tr></table></body></html>';
}

function buildInternalEnquiryNotification(id, p, interest, message) {
  return `
<!DOCTYPE html><html><body>
<div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; color: #334155;">
  <h2 style="color: #270585; margin: 0 0 15px;">New General Enquiry Received!</h2>
  <p>A new enquiry has been submitted through the website. Find details below.</p>
  
  <div style="background: #f2f1fb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
    <strong>Enquiry ID:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #270585;">${id}</span>
  </div>

  <h3>Contact Details</h3>
  <p><strong>Name:</strong> ${p.fullName}<br/>
     <strong>Email:</strong> ${p.email}<br/>
     <strong>Phone:</strong> ${p.phone}<br/>
     <strong>Gender:</strong> ${p.gender || "N/A"}<br/>
     <strong>DOB:</strong> ${p.dob || "N/A"}</p>

  <h3>Enquiry Details</h3>
  <p><strong>Interest Category:</strong> <span style="font-weight: bold; color: #270585;">${interest}</span><br/>
     <strong>Message:</strong><br/>
     <span style="font-style: italic; color: #475569; display: inline-block; padding: 10px; background: #f8fafc; border-left: 3px solid #cbd5e1; margin-top: 5px; width: 100%; box-sizing: border-box;">
       ${message || "No message provided."}
     </span>
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
  <p style="font-size: 11px; color: #94a3b8;">Automated System Notification · Bengaluru Auto Expo 2026</p>
</div>
</body></html>`;
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu("✉️ Enquiries CMS")
    .addItem("Update (Don't Remove user data)", "updateEnquirySheet")
    .addItem("Fresh Install (Removes all data)", "freshInstallEnquirySheet")
    .addToUi();
}
