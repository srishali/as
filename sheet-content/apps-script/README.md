# Apps Script Web Apps — Form Submission Endpoints

Each form on the website has its own standalone Google Apps Script Web App.
Deploy each one separately, then paste the URLs into the frontend config.

---

## Quick Setup (per script)

1. Open a **NEW Google Sheet** (one per form type recommended).
2. **Extensions ▸ Apps Script** → delete default code, paste the `.gs` file.
3. Click **Run ▸ install____Sheet** (creates the tab with headers, styling, checkboxes).
4. **Deploy ▸ New deployment ▸ Web App**:
   - Description: e.g. "Exhibitor Submissions API"
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the **Web App URL**.
6. Paste it into `src/config/link-config.ts` → `FORM_URLS`:
   ```ts
   export const FORM_URLS = {
     exhibitor: "https://script.google.com/macros/s/.../exec",  // from exhibitor-submissions.gs
     visitor:   "https://script.google.com/macros/s/.../exec",  // from visitor-submissions.gs
     contact:   "https://script.google.com/macros/s/.../exec",  // from general-enquiries.gs
   };
   ```

---

## The Three Scripts

| Script | Sheet Tab | Form Source | Email Sent |
|--------|-----------|-------------|------------|
| `exhibitor-submissions.gs` | Exhibitor Submissions | Exhibitor Registration page + popup | Welcome email with Reference ID + details |
| `visitor-submissions.gs` | Visitor Submissions | Visitor Registration page + popup | Visitor Pass email with inline PNG + attached PNG & PDF (3in×4in) |
| `general-enquiries.gs` | General Enquiries | Home Quick Contact + Contact Us page | Enquiry acknowledgement with Reference ID |

## Unique ID Format

All IDs follow: `AB-YYDDD-00000`

| Prefix | Meaning | Example |
|--------|---------|---------|
| `ET` | Exhibitor | `ET-26199-00001` |
| `VT` | Visitor | `VT-26199-00001` |
| `GE` | General Enquiry | `GE-26199-00001` |

- `YY` = Last 2 digits of year
- `DDD` = Day of year (001–366)
- `00000` = Sequential count from sheet rows (00001, 00002, … up to 99,999)

## Visitor Pass Attachments

The visitor script automatically:
1. Decodes the base64 PNG image from the form payload
2. Decodes the base64 PDF (3in × 4in print-ready) from the form payload
3. Attaches both files to the email as physical attachments
4. Embeds the PNG pass inline inside the email body (renders directly)
5. Optionally saves both files to a Google Drive folder for backup

### Google Drive Backup (Optional)

To store visitor passes in Google Drive:

1. Create a folder in Google Drive called **"Visitor Passes 2026"**
2. Open the folder → copy the **Folder ID** from the URL:
   `drive.google.com/drive/folders/FOLDER_ID_HERE`
3. Paste it into `visitor-submissions.gs`:
   ```js
   const DRIVE_FOLDER_ID = "FOLDER_ID_HERE";
   ```
4. Redeploy the Web App (Deploy ▸ Manage Deployments ▸ Edit → New Version)

---

## One Sheet vs Three Sheets

You can either:
- **Option A (Recommended):** One separate Google Sheet per form — clean separation, independent access control.
- **Option B:** All three tabs in a single Google Sheet — paste all three `.gs` files into the same Apps Script project. Deploy once. The single Web App URL handles all three types based on `payload.type`.

## Redeploying

After editing a script, go to **Deploy ▸ Manage Deployments ▸ Edit → New Version**.
The URL stays the same.
