/**
 * Visitor Pass Email — responsive HTML string.
 * Wraps the visitor pass info in a beautifully branded email.
 */
export function visitorPassEmail(data: {
  id: string;
  fullName: string;
  email: string;
  passDataUrl?: string; // base64 image of the pass (optional attachment ref)
}) {
  const { id, fullName } = data;
  const eventName = "Bengaluru Auto Expo 2026";
  const eventDates = "8–11 October 2026";
  const eventVenue = "Bangalore International Exhibition Centre (BIEC), Bengaluru";
  const contactEmail = "visitors@bengaluruautoexpo.in";
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Your Visitor Pass — ${eventName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f3fb;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3fb;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(39,5,133,0.10);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#270585 0%,#850527 100%);padding:40px 40px 32px;text-align:center;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);">8th Edition · Your Visitor Pass</p>
          <h1 style="margin:0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">${eventName}</h1>
          <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">${eventDates} &nbsp;·&nbsp; BIEC, Bengaluru</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px;">
          <h2 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#1e1b4b;">You're all set, ${fullName}! 🚗</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#64748b;">Your visitor pass is ready. Please find it attached to this email as both an image and a PDF.</p>

          <!-- Pass ID -->
          <div style="background:#f2f1fb;border:1px dashed #8067cf;border-radius:12px;padding:24px;margin-bottom:28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#270585;">Visitor Pass ID</p>
            <p style="margin:0;font-size:32px;font-weight:900;color:#270585;letter-spacing:0.1em;">${id}</p>
            <p style="margin:8px 0 0;font-size:11px;color:#64748b;">Present this ID or the QR code at entry. Your pass is attached as a PDF.</p>
          </div>

          <!-- Event info -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;">
            ${[
              ["📅 Dates", eventDates],
              ["📍 Venue", eventVenue],
              ["🕐 Timings", "10:00 AM – 7:00 PM daily"],
              ["🅿️ Parking", "On-site parking available, 6,000+ bays"],
            ]
              .map(
                ([k, v], i) => `
            <tr style="background:${i % 2 === 0 ? "#f8fafc" : "#ffffff"};">
              <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;width:40%;border-bottom:1px solid #e2e8f0;">${k}</td>
              <td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${v}</td>
            </tr>`
              )
              .join("")}
          </table>

          <!-- Important notes -->
          <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#270585;">Important Notes</h3>
          <ul style="margin:0 0 28px;padding:0 0 0 20px;color:#475569;font-size:13px;line-height:1.8;">
            <li>Carry a printed or digital copy of this pass.</li>
            <li>This pass is valid for all four days of the expo.</li>
            <li>One pass per person — not transferable.</li>
            <li>Present your pass at the entrance gate for scanning.</li>
            <li>Children under 8 enter free (accompanied by a registered adult).</li>
          </ul>

          <!-- CTA -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="https://bengaluruautoexpo.in" style="display:inline-block;background:linear-gradient(135deg,#850527,#270585);color:#fff;font-size:14px;font-weight:700;padding:14px 36px;border-radius:100px;text-decoration:none;">Explore the Expo →</a>
          </div>

          <!-- Support -->
          <div style="background:#f2f1fb;border:1px solid #cbc5ee;border-radius:12px;padding:20px;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#270585;">Questions?</p>
            <p style="margin:0;font-size:12px;color:#64748b;">
              📧 <a href="mailto:${contactEmail}" style="color:#270585;font-weight:600;">${contactEmail}</a>
            </p>
          </div>
        </td>
      </tr>

      <!-- T&C -->
      <tr>
        <td style="padding:0 40px 24px;">
          <p style="margin:0;font-size:10px;color:#94a3b8;line-height:1.6;border-top:1px solid #f1f5f9;padding-top:20px;">
            <strong>Terms & Conditions:</strong> This pass is issued by Bengaluru Auto Expo and is valid only for the registered holder. Resale or transfer is strictly prohibited. The organiser reserves the right to refuse entry. By attending, you consent to photography and video recording at the event. The organiser is not responsible for any loss or damage to personal property.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1e1b4b;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#fff;">${eventName}</p>
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">© ${year} ${eventName}. All rights reserved.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
