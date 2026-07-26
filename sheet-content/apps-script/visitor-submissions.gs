/**
 * =================================================================
 *  VISITOR SUBMISSIONS — Standalone Google Apps Script Web App
 * =================================================================
 *  PURPOSE:
 *    Handles Visitor Registration form submissions:
 *    - Records visitor details in the "Visitor Submissions" Google Sheet tab
 *    - Uses the exact Unique Visitor ID (VT-YYDDD-00000) generated for the pass
 *    - Embeds the pass image inline in the email body
 *    - Attaches the PNG pass image and print-ready PDF (3in × 4in) as files
 *    - Sets the Email Sender Display Name to the Event Name
 *
 *  DEPLOYMENT INSTRUCTIONS:
 *  ------------------------
 *  1. Open your Google Sheet for Visitor Submissions.
 *  2. Go to Extensions ▸ Apps Script.
 *  3. Replace all code with this file and Save (Cmd/Ctrl + S).
 *  4. Click "Deploy ▸ Manage Deployments".
 *  5. Click the Edit (pencil) icon ▸ Version: "New Version" ▸ Deploy.
 *  6. Ensure "Who has access" is set to "Anyone".
 * =================================================================
 */

const TAB_NAME = "Visitor Submissions";

const HEADERS = [
  "Submitted At",    // A
  "Unique ID",       // B
  "Full Name",       // C
  "Email",           // D
  "Phone",           // E
  "Gender",          // F
  "Date of Birth",   // G
  "City",            // H
  "Pin Code",        // I
  "District",        // J
  "State",           // K
  "Pass ID",         // L
  "Status",          // M
];

const THEME = {
  headerBg: "#270585",
  headerFg: "#ffffff",
  altRow:   "#f2f1fb",
};

/* ── EVENT CONFIGURATION ───────────────────────────────────────── */
const EVENT_NAME    = "Bengaluru Auto Expo 2026";
const EVENT_DATES   = "8–11 October 2026";
const EVENT_VENUE   = "Bangalore International Exhibition Centre (BIEC), Bengaluru";
const EVENT_TIMINGS = "10:00 AM – 7:00 PM Daily";
const EVENT_EMAIL   = "info@bengaluruautoexpo.in";
const EVENT_PHONE   = "+91 80 4500 8800";
const EVENT_WEBSITE = "bengaluruautoexpo.in";

/** Optional Google Drive folder ID to store copies of passes (leave "" if not needed) */
const DRIVE_FOLDER_ID = "";

/* ── EMAIL SYSTEM CONFIGURATION ────────────────────────────────── */
const EMAIL_CONFIG = {
  /** Send Visitor Pass email with attachments to the visitor */
  sendCustomerEmail: true,
  /** Send notification to internal organiser team */
  sendInternalEmail: true,
  /** Internal organiser recipients */
  internalRecipients: [
    "info@bengaluruautoexpo.in"
  ],
};

/* ── INSTALL & UPDATE PROCEDURES ──────────────────────────────── */

function freshInstallVisitorSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const response = ui.alert(
    "WARNING: Fresh Install",
    "This will completely delete ALL existing visitor data in the '" + TAB_NAME + "' tab.\n\nAre you sure you want to proceed?",
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    ui.alert("Install Cancelled", "No data was removed.", ui.ButtonSet.OK);
    return;
  }

  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);
  sheet.clear();

  applyVisitorHeadersAndFormatting(sheet);

  ss.setActiveSheet(sheet);
  if (/^Untitled|^Copy of/i.test(ss.getName())) {
    ss.renameSpreadsheet("Visitor Submissions — Auto Expo 2026");
  }

  ui.alert("Fresh Install Completed", "All data was cleared. Sheet headers and styles have been rebuilt fresh.", ui.ButtonSet.OK);
}

function updateVisitorSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  let sheet = ss.getSheetByName(TAB_NAME);
  const exists = !!sheet;
  if (!sheet) {
    sheet = ss.insertSheet(TAB_NAME);
  }

  applyVisitorHeadersAndFormatting(sheet);
  ss.setActiveSheet(sheet);

  const msg = exists
    ? "Sheet updated successfully! Existing visitor rows were preserved entirely."
    : "Sheet was missing, so a new one was created successfully.";

  ui.alert("Update Completed", msg, ui.ButtonSet.OK);
}

function installVisitorSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);
  applyVisitorHeadersAndFormatting(sheet);
}

function applyVisitorHeadersAndFormatting(sheet) {
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
  sheet.setColumnWidth(4, 220); // Email column

  try {
    const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
    protections.forEach((p) => {
      if (p.getRange().getRow() === 1) p.remove();
    });
    const protection = headerRange.protect().setDescription("Header row — do not rename");
    protection.setWarningOnly(true);
  } catch (e) {}
}

/* ── UNIQUE ID GENERATOR (FALLBACK) ───────────────────────────── */

function generateVisitorId(sheet) {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = String(Math.floor((now - startOfYear) / 86400000)).padStart(3, "0");
  const lastRow = sheet.getLastRow();
  const dataRows = Math.max(lastRow - 1, 0);
  const seq = String(dataRows + 1).padStart(5, "0");
  return "VT-" + yy + dayOfYear + "-" + seq;
}

/* ── BASE64 HELPERS ───────────────────────────────────────────── */

function extractBase64(str) {
  if (!str) return "";
  const idx = str.indexOf(",");
  return idx > -1 ? str.substring(idx + 1) : str;
}

function saveToDrive(blob) {
  if (!DRIVE_FOLDER_ID) return null;
  try {
    return DriveApp.getFolderById(DRIVE_FOLDER_ID).createFile(blob);
  } catch (e) {
    Logger.log("Drive save skipped: " + e);
    return null;
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ── WEB APP ENDPOINTS ────────────────────────────────────────── */

function doGet(e) {
  return jsonResponse({ ok: true, service: "Visitor Submissions", event: EVENT_NAME });
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) {
    installVisitorSheet();
    sheet = ss.getSheetByName(TAB_NAME);
  }

  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const p = payload.personal || {};
    const now = new Date();

    // 1. Authoritative ID: use payload.id passed from frontend so pass image, PDF, email, and sheet all match!
    const id = payload.id || generateVisitorId(sheet);

    // 2. Append single record to Google Sheet
    sheet.appendRow([
      now,
      id,
      p.fullName || "",
      p.email    || "",
      p.phone    || "",
      p.gender   || "",
      p.dob      || "",
      p.city     || "",
      p.pincode  || "",
      p.district || "",
      p.state    || "",
      id,
      "CONFIRMED",
    ]);

    const newRow = sheet.getLastRow();

    // Add checkbox data validation to the Status column on the newly appended row
    const statusCol = HEADERS.length;
    const rule = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange(newRow, statusCol).setDataValidation(rule);

    if (newRow % 2 === 0) {
      sheet.getRange(newRow, 1, 1, HEADERS.length).setBackground(THEME.altRow);
    }

    // 3. Process Pass Attachments
    const attachments = [];
    const inlineImages = {};
    const baseFileName = EVENT_NAME + " - Visitor Pass - " + id;

    // PNG Image Attachment & Inline Display
    if (payload.passImage) {
      try {
        const rawImg = extractBase64(payload.passImage);
        const imgBlob = Utilities.newBlob(
          Utilities.base64Decode(rawImg),
          "image/png",
          baseFileName + ".png"
        );
        inlineImages["pass_image_cid"] = imgBlob;
        if (payload.attachImage !== false) {
          attachments.push(imgBlob);
        }
        saveToDrive(imgBlob);
      } catch (err) {
        Logger.log("PNG decoding error: " + err);
      }
    }

    // Print-Ready PDF Attachment (3in × 4in)
    if (payload.passPdf && payload.attachPdf !== false) {
      try {
        const rawPdf = extractBase64(payload.passPdf);
        const pdfBlob = Utilities.newBlob(
          Utilities.base64Decode(rawPdf),
          "application/pdf",
          baseFileName + ".pdf"
        );
        attachments.push(pdfBlob);
        saveToDrive(pdfBlob);
      } catch (err) {
        Logger.log("PDF decoding error: " + err);
      }
    }

    // 4. Send Confirmation Email to Visitor
    if (EMAIL_CONFIG.sendCustomerEmail && p.email) {
      const subject = "Your Official Visitor Pass — " + EVENT_NAME + " (" + id + ")";
      const htmlBody = buildVisitorEmail(id, p, !!inlineImages["pass_image_cid"]);

      const mailOptions = {
        name: EVENT_NAME,
        htmlBody: htmlBody,
        replyTo: EVENT_EMAIL,
      };
      if (attachments.length > 0) mailOptions.attachments = attachments;
      if (Object.keys(inlineImages).length > 0) mailOptions.inlineImages = inlineImages;

      try {
        GmailApp.sendEmail(p.email, subject, "", mailOptions);
      } catch (err) {
        MailApp.sendEmail({
          to: p.email,
          name: EVENT_NAME,
          replyTo: EVENT_EMAIL,
          subject: subject,
          htmlBody: htmlBody,
          attachments: attachments,
          inlineImages: inlineImages,
        });
      }
    }

    // 5. Send Notification to Internal Organiser Team
    if (EMAIL_CONFIG.sendInternalEmail && EMAIL_CONFIG.internalRecipients.length > 0) {
      const internalSubject = "[NEW VISITOR] Pass Issued: " + (p.fullName || "Visitor") + " (" + id + ")";
      const internalHtmlBody = buildInternalVisitorNotification(id, p);

      const internalMailOptions = {
        name: EVENT_NAME,
        htmlBody: internalHtmlBody,
        replyTo: EVENT_EMAIL,
      };

      const recipientList = EMAIL_CONFIG.internalRecipients.join(",");
      try {
        GmailApp.sendEmail(recipientList, internalSubject, "", internalMailOptions);
      } catch (err) {
        MailApp.sendEmail({
          to: recipientList,
          name: EVENT_NAME,
          replyTo: EVENT_EMAIL,
          subject: internalSubject,
          htmlBody: internalHtmlBody,
        });
      }
    }

    return jsonResponse({ ok: true, id: id });

  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/* ── EMAIL TEMPLATES ────────────────────────────────────────────── */

function buildVisitorEmail(id, p, hasInlineImage) {
  const passBlock = hasInlineImage
    ? '<div style="text-align:center;margin:25px 0;">'
        + '<img src="cid:pass_image_cid" width="288" height="384" style="border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.15);display:inline-block;" alt="Visitor Pass" />'
      + '</div>'
      + '<p style="font-size:13px;color:#334155;text-align:center;">Your pass is attached as a <strong>PNG Image</strong> and a <strong>print-ready PDF (3in x 4in)</strong>.</p>'
    : '<div style="background:#f8fafc;border:2px dashed #8067cf;padding:24px;border-radius:12px;text-align:center;margin:25px 0;">'
        + '<p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;letter-spacing:0.1em;">UNIQUE VISITOR ID</p>'
        + '<p style="margin:0;font-size:30px;font-weight:900;color:#270585;font-family:monospace;letter-spacing:0.1em;">' + id + '</p>'
      + '</div>';

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body style="margin:0;padding:0;background:#f4f3fb;font-family:Arial,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3fb;padding:32px 0;"><tr><td align="center">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(39,5,133,0.10);">'
    + '<tr><td style="background:linear-gradient(135deg,#270585 0%,#850527 100%);padding:40px;text-align:center;color:white;">'
    + '<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);">8th Edition · Official Visitor Pass</p>'
    + '<h1 style="margin:0;font-size:28px;font-weight:900;">' + EVENT_NAME + '</h1>'
    + '<p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">' + EVENT_DATES + ' · ' + EVENT_VENUE + '</p>'
    + '</td></tr>'
    + '<tr><td style="padding:40px;">'
    + '<h2 style="color:#1e1b4b;margin:0 0 4px;">You are all set, ' + (p.fullName || "Visitor") + '!</h2>'
    + '<p style="color:#64748b;margin:0 0 20px;">Your registration for South Asia flagship automobile showcase is confirmed.</p>'
    + passBlock
    + '<h3 style="color:#270585;margin:25px 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;">Event Details</h3>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;">'
    + '<tr style="background:#f8fafc;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;width:35%;border-bottom:1px solid #e2e8f0;">DATES</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">' + EVENT_DATES + '</td></tr>'
    + '<tr style="background:#ffffff;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;border-bottom:1px solid #e2e8f0;">TIMINGS</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">' + EVENT_TIMINGS + '</td></tr>'
    + '<tr style="background:#f8fafc;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;">VENUE</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;">' + EVENT_VENUE + '</td></tr>'
    + '</table>'
    + '<h3 style="color:#270585;margin:0 0 10px;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;">Important Notes</h3>'
    + '<ul style="margin:0 0 28px;padding:0 0 0 20px;color:#475569;font-size:13px;line-height:1.8;">'
    + '<li>Carry a printed or digital copy of this pass.</li>'
    + '<li>Valid for all four days of the expo.</li>'
    + '<li>One pass per person — non-transferable.</li>'
    + '<li>Present at the entrance gate for barcode/QR scanning.</li>'
    + '</ul>'
    + '<div style="background:#f2f1fb;border:1px solid #cbc5ee;border-radius:12px;padding:20px;">'
    + '<p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#270585;">Questions?</p>'
    + '<p style="margin:0;font-size:12px;color:#64748b;">'
    + 'Email: <a href="mailto:' + EVENT_EMAIL + '" style="color:#270585;font-weight:600;">' + EVENT_EMAIL + '</a><br/>Phone: ' + EVENT_PHONE + '</p>'
    + '</div></td></tr>'
    + '<tr><td style="background:#1e1b4b;padding:24px 40px;text-align:center;">'
    + '<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#fff;">' + EVENT_NAME + '</p>'
    + '<p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">© ' + new Date().getFullYear() + ' ' + EVENT_NAME + '. All rights reserved.</p>'
    + '</td></tr></table></td></tr></table></body></html>';
}

function buildInternalVisitorNotification(id, p) {
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body>'
    + '<div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; color: #334155;">'
    + '<h2 style="color: #270585; margin: 0 0 15px;">New Visitor Pass Issued</h2>'
    + '<p>A new visitor registration has been completed. Details below:</p>'
    + '<div style="background: #f2f1fb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">'
    + '<strong>Pass ID:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #270585;">' + id + '</span>'
    + '</div>'
    + '<h3>Visitor Information</h3>'
    + '<p><strong>Name:</strong> ' + (p.fullName || "N/A") + '<br/>'
    + '<strong>Email:</strong> ' + (p.email || "N/A") + '<br/>'
    + '<strong>Phone:</strong> ' + (p.phone || "N/A") + '<br/>'
    + '<strong>Gender:</strong> ' + (p.gender || "N/A") + '<br/>'
    + '<strong>DOB:</strong> ' + (p.dob || "N/A") + '</p>'
    + '<h3>Location Details</h3>'
    + '<p><strong>City:</strong> ' + (p.city || "N/A") + '<br/>'
    + '<strong>Pin Code:</strong> ' + (p.pincode || "N/A") + '<br/>'
    + '<strong>District:</strong> ' + (p.district || "N/A") + '<br/>'
    + '<strong>State:</strong> ' + (p.state || "N/A") + '</p>'
    + '<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />'
    + '<p style="font-size: 11px; color: #94a3b8;">Automated System Notification · ' + EVENT_NAME + '</p>'
    + '</div></body></html>';
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu("🚗 Visitor CMS")
    .addItem("Update (Don't Remove user data)", "updateVisitorSheet")
    .addItem("Fresh Install (Removes all data)", "freshInstallVisitorSheet")
    .addToUi();
}
