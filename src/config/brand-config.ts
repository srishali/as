/**
 * ============================================================
 *  BRAND CONFIGURATION — COMPANY & EVENT IDENTITY
 *  ------------------------------------------------------------
 *  ALL brand-related identity, contact, social, and styling info
 *  lives here. Each field has an `enabled` boolean.
 *
 *  Two logical sections:
 *    1. Company / Organizer Information  (all disabled by default)
 *    2. Event Information                (enabled where needed)
 * ============================================================
 */

/* ──────────────────────────────────────────────────────────────
   1 · COMPANY / ORGANIZER INFORMATION
   ──────────────────────────────────────────────────────────────
   Set enabled: true for any field you want the site to use.
   Currently all set to false as requested.
   ────────────────────────────────────────────────────────────── */

export const COMPANY_CONFIG = {
  name:            { value: "",               enabled: false },
  tagline:         { value: "",               enabled: false },
  shortName:       { value: "",               enabled: false },
  shortDesc:       { value: "",               enabled: false },
  longDesc:        { value: "",               enabled: false },
  companyId:       { value: "",               enabled: false },
  gstin:           { value: "",               enabled: false },
  address:         { value: "",               enabled: false },
  city:            { value: "",               enabled: false },
  state:           { value: "",               enabled: false },
  pincode:         { value: "",               enabled: false },
  country:         { value: "",               enabled: false },
  phone1:          { value: "",               enabled: false },
  phone2:          { value: "",               enabled: false },
  tollFree:        { value: "",               enabled: false },
  officialEmail:   { value: "",               enabled: false },
  salesEmail:      { value: "",               enabled: false },
  jobsEmail:       { value: "",               enabled: false },
  website:         { value: "",               enabled: false },
  fax:             { value: "",               enabled: false },
  whatsapp:        { value: "",               enabled: false },
  googleMap:       { value: "",               enabled: false },
  timings:         { value: "",               enabled: false },
  colorLogo:       { value: "",               enabled: false },
  monoBlackLogo:   { value: "",               enabled: false },
  monoWhiteLogo:   { value: "",               enabled: false },
  colorIcon:       { value: "",               enabled: false },
  monoBlackIcon:   { value: "",               enabled: false },
  monoWhiteIcon:   { value: "",               enabled: false },
  favicon:         { value: "",               enabled: false },
  fontFamily:      { value: "",               enabled: false },
  primaryColor:    { value: "#270585",        enabled: false },
  secondaryColor:  { value: "#850527",        enabled: false },
  accentColor:     { value: "#cda12b",        enabled: false },
  colorGradient:   { value: "from-brand-700 to-accent-700", enabled: false },
  theme:           { value: "auto-expo",      enabled: false },
  image:           { value: "",               enabled: false },
  ogImage:         { value: "",               enabled: false },
  video:           { value: "",               enabled: false },
  brochure:        { value: "",               enabled: false },
  ppt:             { value: "",               enabled: false },
  catalogue:       { value: "",               enabled: false },
  whatsappLink:    { value: "",               enabled: false },
  facebookLink:    { value: "",               enabled: false },
  instagramLink:   { value: "",               enabled: false },
  threadsLink:     { value: "",               enabled: false },
  xLink:           { value: "",               enabled: false },
  linkedinLink:    { value: "",               enabled: false },
  youtubeLink:     { value: "",               enabled: false },
  telegramLink:    { value: "",               enabled: false },
  snapchatLink:    { value: "",               enabled: false },
};

/* ──────────────────────────────────────────────────────────────
   2 · EVENT INFORMATION
   ────────────────────────────────────────────────────────────── */

export const EVENT_CONFIG = {
  eventId:         { value: "auto-expo-2026",  enabled: true  },
  name:            { value: "Bengaluru Auto Expo", enabled: true },
  startDate:       { value: "2026-10-08",       enabled: true  },
  endDate:         { value: "2026-10-11",       enabled: true  },
  startTime:       { value: "10:00 AM",         enabled: true  },
  endTime:         { value: "07:00 PM",         enabled: true  },
  tagline:         { value: "The Future of Mobility, Unleashed", enabled: true },
  shortDesc:       { value: "8th Edition · 8–11 Oct 2026",  enabled: true  },
  longDesc:        { value: "South Asia's flagship automotive exhibition — uniting OEMs, suppliers, startups and enthusiasts to shape the future of mobility.", enabled: true },
  venueAddress:    { value: "Bangalore International Exhibition Centre (BIEC)", enabled: true },
  venueCity:       { value: "Bengaluru",         enabled: true  },
  venueState:      { value: "Karnataka",         enabled: true  },
  venuePincode:    { value: "562123",            enabled: true  },
  venueCountry:    { value: "India",             enabled: true  },
  venueGoogleMap:  { value: "https://maps.google.com/?q=Bangalore+International+Exhibition+Centre+BIEC", enabled: true },
  address:         { value: "10th Mile, Tumakuru Rd, Madavara, Dasanapura, Bengaluru, Karnataka 562123", enabled: true },
  city:            { value: "Bengaluru, India",  enabled: true  },
  state:           { value: "Karnataka",         enabled: false },
  pincode:         { value: "562123",            enabled: false },
  country:         { value: "India",             enabled: false },
  phone1:          { value: "+91 80 4500 8800",  enabled: true  },
  phone2:          { value: "",                  enabled: false },
  tollFree:        { value: "",                  enabled: false },
  officialEmail:   { value: "info@bengaluruautoexpo.in", enabled: true },
  salesEmail:      { value: "sales@bengaluruautoexpo.in",    enabled: true  },
  feedbackEmail:   { value: "feedback@bengaluruautoexpo.in", enabled: false },
  partnerEmail:    { value: "partners@bengaluruautoexpo.in", enabled: false },
  mediaEmail:      { value: "media@bengaluruautoexpo.in",    enabled: false },
  supportEmail:    { value: "visitors@bengaluruautoexpo.in", enabled: true  },
  website:         { value: "bengaluruautoexpo.in",          enabled: true  },
  fax:             { value: "",                  enabled: false },
  whatsapp:        { value: "+918045008800",     enabled: true  },
  googleMap:       { value: "https://maps.google.com/?q=Bangalore+International+Exhibition+Centre+BIEC", enabled: true },
  timings:         { value: "10:00 AM – 7:00 PM (Business days open at 9:00 AM)", enabled: true },
  colorLogo:       { value: "",                  enabled: false },
  monoBlackLogo:   { value: "",                  enabled: false },
  monoWhiteLogo:   { value: "",                  enabled: false },
  colorIcon:       { value: "",                  enabled: false },
  monoBlackIcon:   { value: "",                  enabled: false },
  monoWhiteIcon:   { value: "",                  enabled: false },
  favicon:         { value: "",                  enabled: false },
  fontFamily:      { value: "Sora, Inter, sans-serif", enabled: true },
  primaryColor:    { value: "#270585",           enabled: true  },
  secondaryColor:  { value: "#850527",           enabled: true  },
  accentColor:     { value: "#cda12b",           enabled: false },
  colorGradient:   { value: "from-brand-700 to-accent-700", enabled: true },
  theme:           { value: "auto-expo",         enabled: true  },
  image:           { value: "",                  enabled: false },
  heroImage:       { value: "/images/hero.jpg",  enabled: true  },
  floorPlan1:      { value: "https://raw.githubusercontent.com/srishali/testing/refs/heads/main/AS79STLSFP2.svg", enabled: true },
  floorPlan2:      { value: "grid", enabled: true },
  floorPlan3:      { value: "grid", enabled: false },
  ogImage:         { value: "",                  enabled: false },
  video:           { value: "",                  enabled: false },
  heroVideo:       { value: "",                  enabled: false },
  brochure:        { value: "https://www.autoexpo-themotorshow.in/wp-content/uploads/2022/12/Brochure-Auto-Expo-2023.pdf", enabled: true },
  ppt:             { value: "",                  enabled: false },
  catalogue:       { value: "",                  enabled: false },
  whatsappLink:    { value: "",                  enabled: false },
  facebookLink:    { value: "",                  enabled: false },
  instagramLink:   { value: "",                  enabled: false },
  threadsLink:     { value: "",                  enabled: false },
  xLink:           { value: "",                  enabled: false },
  linkedinLink:    { value: "",                  enabled: false },
  youtubeLink:     { value: "",                  enabled: false },
  telegramLink:    { value: "",                  enabled: false },
  snapchatLink:    { value: "",                  enabled: false },
};

/** Helper: read value only if enabled: true. */
export function brand(field: { value: string; enabled: boolean }): string {
  return field.enabled ? field.value : "";
}

/** Flat object exported for components — guarantees non-empty values when enabled. */
export const EVENT = {
  name:             brand(EVENT_CONFIG.name),
  year:             "2026",
  edition:          "8th Edition",
  tagline:          brand(EVENT_CONFIG.tagline),
  dates:            "8–11 October 2026",
  dateShort:        "08–11 Oct 2026",
  startISO:         "2026-10-08T10:00:00+05:30",
  venue:            brand(EVENT_CONFIG.venueAddress),
  venueShort:       brand(EVENT_CONFIG.venueCity) || "BIEC, Bengaluru",
  city:             brand(EVENT_CONFIG.city),
  address:          brand(EVENT_CONFIG.address),
  email:            brand(EVENT_CONFIG.officialEmail),
  phone:            brand(EVENT_CONFIG.phone1),
  whatsapp:         brand(EVENT_CONFIG.whatsapp),
  hours:            brand(EVENT_CONFIG.timings),
  website:          brand(EVENT_CONFIG.website) || "bengaluruautoexpo.in",
  expectedVisitors: "150,000+",
  exhibitors:       "500+",
  countries:        "35+",
  area:             "80,000+",
};

export const COMPANY = COMPANY_CONFIG;
