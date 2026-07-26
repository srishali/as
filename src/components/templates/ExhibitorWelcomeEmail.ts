/**
 * Exhibitor Welcome Email — responsive HTML string.
 * Rendered server-side or injected into mailto / EmailJS body.
 * All styles are inlined for maximum email-client compatibility.
 */
export function exhibitorWelcomeEmail(data: {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  category: string;
  city: string;
  state: string;
}) {
  const { id, fullName, companyName, category, city, state } = data;
  const eventName = "Bengaluru Auto Expo 2026";
  const eventDates = "8–11 October 2026";
  const eventVenue = "Bangalore International Exhibition Centre (BIEC), Bengaluru";
  const contactEmail = "sales@bengaluruautoexpo.in";
  const contactPhone = "+91 80 4500 8800";
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Welcome to ${eventName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f3fb;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3fb;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(39,5,133,0.10);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#270585 0%,#850527 100%);padding:40px 40px 32px;text-align:center;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);">8th Edition</p>
          <h1 style="margin:0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">Bengaluru Auto Expo 2026</h1>
          <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">${eventDates} &nbsp;·&nbsp; ${eventVenue}</p>
          <div style="margin:20px auto 0;display:inline-block;background:rgba(255,255,255,0.15);border-radius:100px;padding:6px 20px;">
            <span style="font-size:12px;font-weight:700;color:#fff;letter-spacing:0.15em;text-transform:uppercase;">Exhibitor Registration Confirmed</span>
          </div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px;">
          <h2 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#1e1b4b;">Welcome aboard, ${fullName}! 🎉</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#64748b;">Your exhibitor registration has been successfully received.</p>

          <!-- Ref ID card -->
          <div style="background:#f2f1fb;border:1px solid #cbc5ee;border-radius:12px;padding:20px;margin-bottom:28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#270585;">Your Exhibitor Reference ID</p>
            <p style="margin:0;font-size:28px;font-weight:900;color:#270585;letter-spacing:0.08em;">${id}</p>
            <p style="margin:6px 0 0;font-size:11px;color:#64748b;">Please quote this ID in all correspondence.</p>
          </div>

          <!-- Registration details -->
          <h3 style="margin:0 0 16px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#270585;">Registration Details</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;">
            ${[
              ["Company", companyName],
              ["Industry Category", category],
              ["Location", `${city}, ${state}`],
              ["Contact Person", fullName],
            ]
              .map(
                ([k, v], i) => `
            <tr style="background:${i % 2 === 0 ? "#f8fafc" : "#ffffff"};">
              <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#94a3b8;width:45%;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.08em;">${k}</td>
              <td style="padding:12px 16px;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${v}</td>
            </tr>`
              )
              .join("")}
          </table>

          <!-- Next steps -->
          <h3 style="margin:0 0 16px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#270585;">What Happens Next</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            ${[
              ["01", "Floor Plan & Stall Selection", "Our sales team will share available locations within 1 business day."],
              ["02", "Agreement & Payment", "Review and sign the exhibitor agreement; secure your stall with payment."],
              ["03", "Exhibitor Manual", "Receive the complete build guide, logistics info and badge allocation."],
              ["04", "Show Day", `Arrive at BIEC from 7 AM on ${eventDates.split("–")[0]} October 2026 for setup.`],
            ]
              .map(
                ([num, title, desc]) => `
            <tr>
              <td valign="top" style="padding:0 12px 16px 0;width:40px;">
                <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#270585,#850527);color:#fff;font-size:12px;font-weight:900;text-align:center;line-height:32px;">${num}</div>
              </td>
              <td valign="top" style="padding:0 0 16px;">
                <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#1e293b;">${title}</p>
                <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">${desc}</p>
              </td>
            </tr>`
              )
              .join("")}
          </table>

          <!-- CTA button -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="https://bengaluruautoexpo.in/exhibitors" style="display:inline-block;background:linear-gradient(135deg,#850527,#270585);color:#fff;font-size:14px;font-weight:700;padding:14px 36px;border-radius:100px;text-decoration:none;letter-spacing:0.05em;">Visit Exhibitor Portal →</a>
          </div>

          <!-- Contact -->
          <div style="background:#fdf2f3;border:1px solid #f8ccd5;border-radius:12px;padding:20px;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#850527;">Need help? We're here.</p>
            <p style="margin:0;font-size:12px;color:#64748b;line-height:1.6;">
              📧 <a href="mailto:${contactEmail}" style="color:#270585;font-weight:600;">${contactEmail}</a><br/>
              📞 ${contactPhone}
            </p>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1e1b4b;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#fff;">Bengaluru Auto Expo 2026</p>
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">© ${year} ${eventName}. All rights reserved.</p>
          <p style="margin:8px 0 0;font-size:10px;color:rgba(255,255,255,0.35);">
            This email was sent to confirm your exhibitor registration. Please do not reply to this email.<br/>
            Contact us at <a href="mailto:${contactEmail}" style="color:rgba(255,255,255,0.5);">${contactEmail}</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
