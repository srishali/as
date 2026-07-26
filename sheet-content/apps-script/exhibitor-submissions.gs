/**
 * =================================================================
 *  EXHIBITOR SUBMISSIONS — Standalone Google Apps Script Web App
 * =================================================================
 *  PURPOSE:
 *    Receives Exhibitor Registration form POST payloads.
 *    - Generates authoritative unique ID (ET-YYDDD-00000) based on sheet row count
 *    - Appends data to the "Exhibitor Submissions" tab
 *    - Sends branded welcome email to both Personal & Company email addresses
 *    - Sends internal lead notification email to designated organiser addresses
 *    - RETURNS the unique ID in the JSON response
 * =================================================================
 */

const TAB_NAME = "Exhibitor Submissions";

const HEADERS = [
  "Submitted At", "Unique ID", "Full Name", "Email", "Phone", "Gender",
  "Date of Birth", "Company Name", "Category", "Company Phone", "Company Email",
  "GSTIN", "Address", "City", "District", "State", "Pin Code", "Interested Booth",
];

const THEME = { headerBg: "#270585", headerFg: "#ffffff", altRow: "#f2f1fb" };

/* ── CONFIG ────────────────────────────────────────────────────── */
const EVENT_NAME    = "Bengaluru Auto Expo 2026";
const EVENT_DATES   = "8–11 October 2026";
const EVENT_VENUE   = "Bangalore International Exhibition Centre (BIEC), Bengaluru";
const EVENT_EMAIL   = "info@bengaluruautoexpo.in";
const EVENT_PHONE   = "+91 80 4500 8800";
const EVENT_WEBSITE = "bengaluruautoexpo.in";

/* ── EMAIL SYSTEM CONFIGURATION ──────────────────────────────────
   Enable or disable emails, and choose recipient addresses easily.
   ────────────────────────────────────────────────────────────── */
const EMAIL_CONFIG = {
  /** Send confirmation/welcome email to the registering exhibitor */
  sendCustomerEmail: true,
  /** Send lead notification email to your own company / organisers */
  sendInternalEmail: true,
  /** Recipient emails for internal lead notifications (comma-separated list) */
  internalRecipients: [
    "sales@bengaluruautoexpo.in",
    "info@bengaluruautoexpo.in",
  ],
};

/* ── INSTALL ──────────────────────────────────────────────────── */

function freshInstallExhibitorSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const response = ui.alert(
    "⚠️ WARNING: Fresh Install",
    "This will completely delete ALL existing exhibitor data in the '" + TAB_NAME + "' tab.\n\nAre you sure you want to proceed?",
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    ui.alert("Install Cancelled", "No data was removed.", ui.ButtonSet.OK);
    return;
  }

  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);
  sheet.clear();

  applyHeadersAndFormatting(sheet);

  ss.setActiveSheet(sheet);
  if (/^Untitled|^Copy of/i.test(ss.getName())) {
    ss.renameSpreadsheet("Exhibitor Submissions — Auto Expo 2026");
  }

  ui.alert("✅ Fresh Install Completed", "All data was cleared. Sheet headers and styles have been rebuilt fresh.", ui.ButtonSet.OK);
}

function updateExhibitorSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  let sheet = ss.getSheetByName(TAB_NAME);
  const exists = !!sheet;
  if (!sheet) {
    sheet = ss.insertSheet(TAB_NAME);
  }

  applyHeadersAndFormatting(sheet);
  ss.setActiveSheet(sheet);

  const msg = exists
    ? "Sheet updated successfully! Checked-in rows (Rows 2+) were preserved entirely."
    : "Sheet was missing, so a new one was created successfully.";

  ui.alert("✅ Update Completed", msg, ui.ButtonSet.OK);
}

function installExhibitorSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);
  applyHeadersAndFormatting(sheet);
}

function applyHeadersAndFormatting(sheet) {
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
  sheet.setColumnWidth(8, 220); // Company Name
  sheet.setColumnWidth(11, 220); // Company Email
  sheet.setColumnWidth(13, 260); // Address

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

function generateExhibitorId(sheet) {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = String(Math.floor((now - startOfYear) / 86400000)).padStart(3, "0");
  const seq = String(Math.max(sheet.getLastRow(), 1)).padStart(5, "0");
  return "ET-" + yy + dayOfYear + "-" + seq;
}

/* ── WEB APP ENDPOINTS ────────────────────────────────────────── */

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return jsonResponse({ ok: true, service: "Exhibitor Submissions", event: EVENT_NAME });
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) { installExhibitorSheet(); sheet = ss.getSheetByName(TAB_NAME); }

  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const p = payload.personal || {};
    const c = payload.company || {};

    const id = generateExhibitorId(sheet);
    const now = new Date();

    let boothId = "";
    try {
      if (c.boothInterest) {
        var bObj = JSON.parse(c.boothInterest);
        if (bObj && bObj.boothId) boothId = bObj.boothId;
      }
    } catch (e) {
      Logger.log("Failed to parse boothInterest for sheet logging: " + e);
    }

    sheet.appendRow([
      now, id,
      p.fullName || "", p.email || "", p.phone || "", p.gender || "", p.dob || "",
      c.companyName || "", c.category || "", c.companyPhone || "",
      c.companyEmail || "", c.gstin || "", c.address || "",
      c.city || "", c.district || "", c.state || "", c.pincode || "",
      boothId,
    ]);

    const newRow = sheet.getLastRow();
    if (newRow % 2 === 0) {
      sheet.getRange(newRow, 1, 1, HEADERS.length).setBackground(THEME.altRow);
    }

    // ── ATTACHMENTS & PROCESS ──
    const shouldAttach = payload.attachBrochure !== false;
    const attachments = [];
    const attachmentNames = [];

    const requestOptions = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/pdf,application/xhtml+xml,text/html;q=0.9,image/webp,*/*;q=0.8"
      },
      muteHttpExceptions: true
    };

    if (shouldAttach && payload.brochureUrl) {
      try {
        const response = UrlFetchApp.fetch(payload.brochureUrl, requestOptions);
        if (response.getResponseCode() === 200) {
          const blob = response.getBlob().setName((payload.brochureName || "Event Brochure") + ".pdf");
          attachments.push(blob);
          attachmentNames.push(payload.brochureName || "Event Brochure");
        }
      } catch (err) {
        Logger.log("Failed to fetch brochureUrl: " + err);
      }
    }

    const brochureBtnUrl = payload.brochureUrl || "";
    let boothInterest = null;
    try {
      if (c.boothInterest) boothInterest = JSON.parse(c.boothInterest);
    } catch (err) {
      Logger.log("Booth interest JSON could not be parsed: " + err);
    }

    // ── SEND CUSTOMER EMAIL ──
    if (EMAIL_CONFIG.sendCustomerEmail) {
      const subject = "Welcome to " + EVENT_NAME + " — Exhibitor Registration Confirmed (" + id + ")";
      const htmlBody = buildExhibitorEmail(id, p, c, brochureBtnUrl, boothInterest);

      const mailOptions = {
        name: EVENT_NAME,
        htmlBody: htmlBody,
        replyTo: EVENT_EMAIL,
      };
      if (attachments.length > 0) mailOptions.attachments = attachments;

      // 1. Send to Personal Email
      if (p.email) {
        MailApp.sendEmail(p.email, subject, "", mailOptions);
      }

      // 2. Send to Company Email (if different and present)
      if (c.companyEmail && c.companyEmail.trim().toLowerCase() !== p.email.trim().toLowerCase()) {
        MailApp.sendEmail(c.companyEmail, subject, "", mailOptions);
      }
    }

    // ── SEND INTERNAL LEAD NOTIFICATION ──
    if (EMAIL_CONFIG.sendInternalEmail && EMAIL_CONFIG.internalRecipients.length > 0) {
      const internalSubject = `[NEW LEAD] Exhibitor Registration: ${c.companyName || p.fullName} (${id})`;
      const internalHtmlBody = buildInternalExhibitorNotification(id, p, c, boothInterest);

      const internalMailOptions = {
        name: EVENT_NAME,
        htmlBody: internalHtmlBody,
        replyTo: EVENT_EMAIL,
      };

      const recipientList = EMAIL_CONFIG.internalRecipients.join(",");
      MailApp.sendEmail(recipientList, internalSubject, "", internalMailOptions);
    }

    return jsonResponse({ ok: true, id: id });

  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/* ── EMAIL TEMPLATES ────────────────────────────────────────────── */

function buildExhibitorEmail(id, p, c, brochureBtnUrl, boothInterest) {
  var ctaButtons = '';

  if (brochureBtnUrl) {
    ctaButtons = ''
      + '<div style="text-align:center;margin-bottom:32px;">'
      + '  <a href="https://' + EVENT_WEBSITE + '/#/exhibitors" style="display:inline-block;background:linear-gradient(135deg,#850527,#270585);color:#fff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:100px;text-decoration:none;letter-spacing:0.05em;margin-right:12px;">Visit Us</a>'
      + '  <a href="' + brochureBtnUrl + '" style="display:inline-block;background:linear-gradient(135deg,#850527,#270585);color:#fff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:100px;text-decoration:none;letter-spacing:0.05em;">Download Brochure</a>'
      + '</div>';
  } else {
    ctaButtons = ''
      + '<div style="text-align:center;margin-bottom:32px;">'
      + '  <a href="https://' + EVENT_WEBSITE + '/#/exhibitors" style="display:inline-block;background:linear-gradient(135deg,#850527,#270585);color:#fff;font-size:14px;font-weight:700;padding:14px 36px;border-radius:100px;text-decoration:none;letter-spacing:0.05em;">Visit Us</a>'
      + '</div>';
  }

  const boothBlock = boothInterest && boothInterest.boothId
    ? '<div style="background:#fff8e7;border:1px solid #f0d27a;border-radius:12px;padding:18px;margin-bottom:28px;">'
      + '<p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#850527;">Interested Booth</p>'
      + '<p style="margin:0;font-size:13px;color:#334155;line-height:1.7;"><strong>Booth ID:</strong> ' + boothInterest.boothId + '<br/>'
      + '<strong>Category:</strong> ' + (boothInterest.category || 'N/A') + '<br/>'
      + '<strong>Dimensions:</strong> ' + (boothInterest.width || 'N/A') + ' m × ' + (boothInterest.length || 'N/A') + ' m<br/>'
      + '<strong>Total Area:</strong> ' + (boothInterest.totalArea || 'N/A') + ' m²<br/>'
      + '<strong>Rate / m²:</strong> ' + (boothInterest.rate || 'N/A') + '<br/>'
      + '<strong>Total Amount:</strong> ' + (boothInterest.totalAmount || 'N/A') + '</p>'
      + '<p style="margin:10px 0 0;font-size:10px;color:#94a3b8;border-top:1px solid #f0d27a;padding-top:8px;line-height:1.5;">'
      + 'All prices are exclusive of applicable taxes. GST at 18% will be applied at the time of invoicing as per prevailing government regulations.'
      + '</p></div>'
    : '';

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"/></head><body style="margin:0;padding:0;background:#f4f3fb;font-family:Arial,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3fb;padding:32px 0;"><tr><td align="center">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(39,5,133,0.10);">'

    + '<tr><td style="background:linear-gradient(135deg,#270585 0%,#850527 100%);padding:40px;text-align:center;color:white;">'
    + '<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);">8th Edition</p>'
    + '<h1 style="margin:0;font-size:28px;font-weight:900;">' + EVENT_NAME + '</h1>'
    + '<p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">' + EVENT_DATES + ' &nbsp;·&nbsp; ' + EVENT_VENUE + '</p>'
    + '<div style="margin:20px auto 0;display:inline-block;background:rgba(255,255,255,0.15);border-radius:100px;padding:6px 20px;">'
    + '<span style="font-size:12px;font-weight:700;color:#fff;letter-spacing:0.15em;text-transform:uppercase;">Exhibitor Registration Confirmed</span>'
    + '</div></td></tr>'

    + '<tr><td style="padding:40px;">'
    + '<h2 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#1e1b4b;">Welcome aboard, ' + (p.fullName || "Exhibitor") + '! 🎉</h2>'
    + '<p style="margin:0 0 24px;font-size:14px;color:#64748b;">Your exhibitor registration has been successfully received.</p>'

    + '<div style="background:#f2f1fb;border:1px solid #cbc5ee;border-radius:12px;padding:20px;margin-bottom:28px;text-align:center;">'
    + '<p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#270585;">Your Exhibitor Reference ID</p>'
    + '<p style="margin:0;font-size:28px;font-weight:900;color:#270585;letter-spacing:0.08em;">' + id + '</p>'
    + '<p style="margin:6px 0 0;font-size:11px;color:#64748b;">Please quote this ID in all correspondence.</p>'
    + '</div>'

    + '<h3 style="margin:0 0 16px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#270585;">Registration Details</h3>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;">'
    + '<tr style="background:#f8fafc;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;width:45%;border-bottom:1px solid #e2e8f0;">COMPANY</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">' + (c.companyName || "N/A") + '</td></tr>'
    + '<tr style="background:#ffffff;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;border-bottom:1px solid #e2e8f0;">CATEGORY</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">' + (c.category || "N/A") + '</td></tr>'
    + '<tr style="background:#f8fafc;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;border-bottom:1px solid #e2e8f0;">LOCATION</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">' + (c.city || "") + ', ' + (c.state || "") + '</td></tr>'
    + '<tr style="background:#ffffff;"><td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;">CONTACT PERSON</td><td style="padding:12px 16px;font-size:13px;color:#1e293b;">' + (p.fullName || "N/A") + '</td></tr>'
    + '</table>'

    + boothBlock

    + '<h3 style="margin:0 0 16px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#270585;">What Happens Next</h3>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">'
    + '<tr><td valign="top" style="padding:0 12px 16px 0;width:40px;"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#270585,#850527);color:#fff;font-size:12px;font-weight:900;text-align:center;line-height:32px;">1</div></td><td valign="top" style="padding:0 0 16px;"><p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#1e293b;">Floor Plan & Stall Selection</p><p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Our sales team will share available locations within 1 business day.</p></td></tr>'
    + '<tr><td valign="top" style="padding:0 12px 16px 0;width:40px;"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#270585,#850527);color:#fff;font-size:12px;font-weight:900;text-align:center;line-height:32px;">2</div></td><td valign="top" style="padding:0 0 16px;"><p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#1e293b;">Agreement & Payment</p><p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Review and sign the exhibitor agreement; secure your stall with payment.</p></td></tr>'
    + '<tr><td valign="top" style="padding:0 12px 16px 0;width:40px;"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#270585,#850527);color:#fff;font-size:12px;font-weight:900;text-align:center;line-height:32px;">3</div></td><td valign="top" style="padding:0 0 16px;"><p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#1e293b;">Exhibitor Manual</p><p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Receive the complete build guide, logistics info and badge allocation.</p></td></tr>'
    + '<tr><td valign="top" style="padding:0 12px 16px 0;width:40px;"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#270585,#850527);color:#fff;font-size:12px;font-weight:900;text-align:center;line-height:32px;">4</div></td><td valign="top" style="padding:0 0 16px;"><p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#1e293b;">Show Day</p><p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Arrive at BIEC from 7 AM on 8 October 2026 for setup.</p></td></tr>'
    + '</table>'

    + ctaButtons

    + '<div style="background:#fdf2f3;border:1px solid #f8ccd5;border-radius:12px;padding:20px;">'
    + '<p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#850527;">Need help? We\'re here.</p>'
    + '<p style="margin:0;font-size:12px;color:#64748b;">📧 <a href="mailto:' + EVENT_EMAIL + '" style="color:#270585;font-weight:600;">' + EVENT_EMAIL + '</a><br/>📞 ' + EVENT_PHONE + '</p>'
    + '</div></td></tr>'

    + '<tr><td style="background:#1e1b4b;padding:24px 40px;text-align:center;">'
    + '<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#fff;">' + EVENT_NAME + '</p>'
    + '<p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">© ' + new Date().getFullYear() + ' ' + EVENT_NAME + '. All rights reserved.</p>'
    + '</td></tr></table></td></tr></table></body></html>';
}

function buildInternalExhibitorNotification(id, p, c, boothInterest) {
  const boothHtml = boothInterest && boothInterest.boothId
    ? `<h3>Selected Booth Details</h3>
       <p><strong>Booth ID:</strong> ${boothInterest.boothId}<br/>
       <strong>Category:</strong> ${boothInterest.category || 'N/A'}<br/>
       <strong>Dimensions:</strong> ${boothInterest.width} × ${boothInterest.length} m<br/>
       <strong>Total Area:</strong> ${boothInterest.totalArea} m²<br/>
       <strong>Rate:</strong> ${boothInterest.rate}<br/>
       <strong>Total Amount:</strong> ${boothInterest.totalAmount}</p>`
    : '';

  return `
<!DOCTYPE html><html><body>
<div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; color: #334155;">
  <h2 style="color: #270585; margin: 0 0 15px;">New Exhibitor Lead Received!</h2>
  <p>A new exhibitor has registered for the expo. Find details below.</p>
  
  <div style="background: #f2f1fb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
    <strong>Unique Registration ID:</strong> <span style="font-family: monospace; font-size: 16px; font-weight: bold; color: #270585;">${id}</span>
  </div>

  <h3>Personal Details</h3>
  <p><strong>Name:</strong> ${p.fullName}<br/>
     <strong>Email:</strong> ${p.email}<br/>
     <strong>Phone:</strong> ${p.phone}<br/>
     <strong>Gender:</strong> ${p.gender}<br/>
     <strong>DOB:</strong> ${p.dob}</p>

  <h3>Company Information</h3>
  <p><strong>Company Name:</strong> ${c.companyName}<br/>
     <strong>Category:</strong> ${c.category}<br/>
     <strong>Company Phone:</strong> ${c.companyPhone}<br/>
     <strong>Company Email:</strong> ${c.companyEmail}<br/>
     <strong>GSTIN:</strong> ${c.gstin || "Not filled"}<br/>
     <strong>Address:</strong> ${c.address}<br/>
     <strong>City:</strong> ${c.city}, ${c.state} - ${c.pincode}</p>

  ${boothHtml}

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
  <p style="font-size: 11px; color: #94a3b8;">Automated System Notification · Bengaluru Auto Expo 2026</p>
</div>
</body></html>`;
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu("🚗 Exhibitor CMS")
    .addItem("Update (Don't Remove user data)", "updateExhibitorSheet")
    .addItem("Fresh Install (Removes all data)", "freshInstallExhibitorSheet")
    .addToUi();
}
