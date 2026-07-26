# Google Sheets Master CMS & Form Responses — Setup Guide

Manage the site's dynamic content AND collect form submissions directly in
Google Sheets — **no database, no paid backend, 100% free.**

---

## 1. One-click installer (recommended) ⭐

Run `install-sheet.gs` inside Apps Script. It creates **all 18 tabs** (15 content
tabs + 3 form response tabs) with correct headers, pre-filled content, checkboxes,
table styling, freeze panes, and Web App endpoint code.

1. Open a blank Google Sheet → **Extensions ▸ Apps Script**.
2. Delete default code, paste `install-sheet.gs`.
3. Click **Run ▸ installSheet**. Authorise permissions when prompted.
4. All 18 tabs are created instantly!

## 2. Standalone Form Submission Scripts

Each form type has its **own standalone Apps Script** in the `apps-script/` folder:

| Script | Tab | Form Source |
|--------|-----|-------------|
| `exhibitor-submissions.gs` | Exhibitor Submissions | Exhibitor Registration form |
| `visitor-submissions.gs` | Visitor Submissions | Visitor Pass Registration form |
| `general-enquiries.gs` | General Enquiries | Home Quick Contact + Contact Us form |

Each script:
- Creates its own sheet with headers, styling, checkboxes
- Generates unique IDs (`ET-YYDDD-00000`, `VT-YYDDD-00000`, `GE-YYDDD-00000`)
- Sends branded HTML confirmation emails
- Visitor script attaches both PNG image and PDF (3in×4in) pass files

**See `apps-script/README.md` for full deployment instructions.**

## 3. Connect to the site

After deploying each Web App, paste the URLs into `src/config/link-config.ts`:

```ts
export const FORM_URLS = {
  exhibitor: "https://script.google.com/macros/s/.../exec",
  visitor:   "https://script.google.com/macros/s/.../exec",
  contact:   "https://script.google.com/macros/s/.../exec",
};
```

Also set the site data sheet:
```ts
export const SHEETS = {
  enabled: true,
  spreadsheetId: "YOUR_SITE_DATA_SHEET_ID",
  ...
};
```

---

## The 18 Tabs Generated

### Content Management Tabs (15):
1–15: Highlights, Sectors, Industry Stats, Facts, Sponsors, Exhibitors, Clients,
Testimonials, Timeline, Booth Plans, Why Exhibit, Opportunity Points,
Sponsorship Plans, Partners, FAQs

### Form Submission Response Tabs (3):
16. `Exhibitor Submissions`
17. `Visitor Submissions`
18. `General Enquiries`
