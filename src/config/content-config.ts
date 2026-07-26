/**
 * ============================================================
 *  CONTENT CONFIGURATION — ALL STATIC TEXT ON THE SITE
 *  ------------------------------------------------------------
 *  Every piece of copy, label, heading, and paragraph lives
 *  here.  Change a single word and it reflects everywhere
 *  without touching any component code.
 *
 *  IMPORTANT: Menu items (NAV_LINKS, LEGAL_LINKS, etc.) now
 *  have { enabled, order, align } so you can toggle / reorder
 *  from config — sorting is done automatically in Navbar/Footer.
 * ============================================================
 */

/* ──────────────────────────────────────────────────────────────
   NAVIGATION
   ──────────────────────────────────────────────────────────────
   • enabled: true/false → show or hide the menu item
   • order:   1, 2, 3...  → visual order (sorted ascending)
   • align:   left | center | right (optional, for future layouts)
   ────────────────────────────────────────────────────────────── */

export const NAV_LINKS = [
  { label: "Home",           to: "/",              enabled: true,  order: 1, align: "left" as const },
  { label: "About Us",       to: "/about",         enabled: true,  order: 2, align: "left" as const },
  { label: "Exhibitors",     to: "/exhibitors",    enabled: true,  order: 3, align: "left" as const },
  { label: "Opportunities",  to: "/opportunities", enabled: true,  order: 4, align: "left" as const },
  { label: "Floor Plan",     to: "/floor-plan",    enabled: true,  order: 5, align: "left" as const },
  { label: "Contact Us",     to: "/contact",       enabled: true,  order: 6, align: "left" as const },
];

/* ──────────────────────────────────────────────────────────────
   FOOTER — CTA STRIP + EXPLORE + SOCIALS
   ────────────────────────────────────────────────────────────── */

export const FOOTER = {
  ctaHeading: "Be part of India's flagship auto showcase.",
  ctaText: "Stalls are filling fast. Reserve your space or grab your visitor pass today.",
  ctaPrimary: { label: "Book a Stall", to: "/exhibitors", enabled: true, order: 1 },
  ctaSecondary: { label: "Get Visitor Pass", to: "/visitor-pass", enabled: true, order: 2 },
  about: "8th Edition of South Asia's most influential automotive exhibition — uniting OEMs, suppliers, startups and enthusiasts to shape the future of mobility.",
  newsletter: {
    heading: "Newsletter",
    text: "Get launch announcements, speaker reveals and early-bird offers.",
    placeholder: "Your email",
    enabled: true,
    order: 5,
  },
  bottomNote: "Design and Maintained with ❤️ by",
  bottomAuthor: { label: "D2FM", href: "https://d2fm.in", enabled: true },
};

export const LEGAL_LINKS = [
  { label: "Privacy Policy",      to: "/privacy-policy",    enabled: true, order: 7, align: "left" as const },
  { label: "Terms & Conditions",  to: "/terms-conditions",  enabled: true, order: 8, align: "left" as const },
  { label: "Refund Policy",       to: "/refund-policy",     enabled: true, order: 9, align: "left" as const },
];

/** Internal utilities intentionally shown in the footer only, not main navigation. */
export const FOOTER_TOOLS = [
  { label: "Layout Lab", to: "/layout", enabled: true, order: 10, align: "left" as const },
];

export const SOCIALS = [
  { label: "LinkedIn",    href: "#", enabled: true, order: 1 },
  { label: "Instagram",   href: "#", enabled: true, order: 2 },
  { label: "Facebook",    href: "#", enabled: true, order: 3 },
  { label: "YouTube",     href: "#", enabled: true, order: 4 },
  { label: "X (Twitter)", href: "#", enabled: true, order: 5 },
];

export const UI_LABELS = {
  registerBtn:        "Register",
  exhibitorCta:       "Exhibitor Registration",
  visitorCta:         "Visitor Passes",
  bookStallBtn:       "Book a Stall",
  getVisitorPassBtn:  "Get Visitor Pass",
  partnerBtn:         "Partner With Us",
  submitBtn:          "Submit",
  downloadBtn:        "Download",
};

/* ──────────────────────────────────────────────────────────────
   FORM DROPDOWN OPTIONS
   ────────────────────────────────────────────────────────────── */

export const FORM_INTERESTS = [
  "Exhibitor Registration",
  "Visitor / Business Pass",
  "Sponsorship & Partnership",
  "Media Accreditation",
  "General Enquiry",
];

export const INDUSTRY_CATEGORIES = [
  "Passenger & Commercial Vehicles",
  "Electric & Hybrid Vehicles",
  "Two-Wheelers & Micro-Mobility",
  "Auto Components & Electronics",
  "Tyres, Batteries & Consumables",
  "Charging & Energy Infrastructure",
  "Logistics & Supply Chain",
  "Finance, Leasing & Insurance",
  "Service, Repair & Aftermarket",
  "R&D, Design & Engineering",
  "Investors & Venture Capital",
  "Government & Trade Bodies",
  "Other",
];

export const GENDERS = [
  "Male",
  "Female",
  "Transgender",
  "Prefer not to say",
];

/* ──────────────────────────────────────────────────────────────
   PAGE HEADERS (eyebrow, title accent, subtitle)
   ────────────────────────────────────────────────────────────── */

export const PAGE_HEADERS = {
  about: {
    current:  "About Us",
    eyebrow:  "Our Story",
    image:    "/images/expo-floor.jpg",
    title:    "Eight editions. One unstoppable ",
    accent:   "love affair",
    suffix:   " with mobility.",
    subtitle: "Since our first edition, Bengaluru Auto Expo has grown into South Asia's most anticipated automotive gathering — a stage where the industry's biggest ideas take their first public breath.",
  },
  exhibitors: {
    current:  "Exhibitors",
    eyebrow:  "Exhibit With Us",
    image:    "/images/ev-showcase.jpg",
    title:    "Put your brand at the ",
    accent:   "centre of mobility",
    subtitle: "Prime locations are selling fast. Join 500+ exhibitors shaping the future of automotive at South Asia's flagship expo.",
  },
  opportunities: {
    current:  "Opportunities",
    eyebrow:  "Opportunities",
    image:    "/images/future-mobility.jpg",
    title:    "Opportunities that move ",
    accent:   "business forward",
    subtitle: "Whether you want to exhibit, sponsor, partner or simply attend, Bengaluru Auto Expo opens doors across the entire automotive value chain.",
  },
  contact: {
    current:  "Contact Us",
    eyebrow:  "Get In Touch",
    image:    "/images/venue.jpg",
    title:    "Let's start a ",
    accent:   "conversation",
    subtitle: "Questions about exhibiting, visiting, sponsoring or partnering? Our team is ready to help you make the most of Bengaluru Auto Expo 2026.",
  },
  visitorPass: {
    current:  "Visitor Pass",
    eyebrow:  "Get Your Pass",
    image:    "/images/expo-floor.jpg",
    title:    "Your gateway to ",
    accent:   "mobility's biggest week",
    subtitle: "Register in 60 seconds. Your personalised Visitor Pass with a unique QR code is generated instantly — download it as an image or PDF.",
  },
  floorPlan: {
    current:  "Floor Plan",
    eyebrow:  "Exhibit at BIEC",
    image:    "/images/expo-floor.jpg",
    title:    "Find your place on the ",
    accent:   "show floor",
    subtitle: "Explore the interactive exhibition layout, compare available booths, and register your interest with one click.",
  },
};

/* ──────────────────────────────────────────────────────────────
   HOME PAGE — SECTION HEADING TEXTS
   ────────────────────────────────────────────────────────────── */

export const HOME_HEADINGS = {
  aboutBrief: {
    eyebrow: "About the Expo",
    title:   "Four days that move an ",
    accent:  "entire industry",
    suffix:  " forward",
    subtitle: "Now in its 8th edition, Bengaluru Auto Expo is South Asia's most influential gathering of automakers, suppliers, startups and enthusiasts — a stage where the future of mobility is revealed.",
  },
  highlights: {
    eyebrow: "Event Highlights",
    title:   "Ten unforgettable experiences, ",
    accent:  "all under one roof",
    subtitle: "From world premieres to stunt shows, every zone is engineered to thrill, connect and inspire — whether you're here to do business or to be amazed.",
  },
  sectors: {
    eyebrow: "Who Should Participate",
    title:   "Built for every player in the ",
    accent:  "automotive universe",
    subtitle: "If you make, move, finance, power, service or sell anything on wheels — and the industries that orbit them — this is your marketplace.",
  },
  industry: {
    eyebrow: "Industry Highlights",
    title:   "Plug into India's ",
    accent:  "$300B+ mobility boom",
    subtitle: "India is the world's third-largest automobile market and among its fastest-growing EV ecosystems — and Bengaluru Auto Expo is its annual meeting point.",
  },
  gallery: {
    eyebrow: "Gallery",
    title:   "A glimpse of the ",
    accent:  "spectacle",
    subtitle: "Sleek launches, roaring classics and the electric buzz of thousands of enthusiasts — a taste of what awaits.",
  },
  venue: {
    eyebrow: "Venue & Access",
    title:   "One iconic venue, ",
    accent:  "easy to reach",
    subtitle: "Held at Bengaluru's premier exhibition destination, with excellent connectivity from across the city.",
  },
  testimonials: {
    eyebrow: "Voices from the Industry",
    title:   "Trusted by leaders across ",
    accent:  "the mobility world",
    subtitle: "Exhibitors, founders and journalists return edition after edition. Here's why.",
  },
};

/* ──────────────────────────────────────────────────────────────
   ABOUT PAGE — SECTION TEXTS
   ────────────────────────────────────────────────────────────── */

export const ABOUT_TEXTS = {
  introParagraphs: [
    "Bengaluru Auto Expo is where the full breadth of the automotive world converges — from global OEMs and Tier-1 suppliers to electric-vehicle pioneers, mobility startups and devoted enthusiasts.",
    "Over four immersive days, we transform BIEC, Bengaluru into a living showcase of launches, technology, heritage and deal-making — designed equally for the boardroom and the showroom floor.",
    "Backed by industry associations and supported by government and global partners, we exist to drive Indian mobility forward.",
  ],
  whyBengaluruSupport: "Supported by leading industry associations, government bodies and global trade partners.",
};

/* ──────────────────────────────────────────────────────────────
   EXHIBITOR / VISITOR REGISTRATION FORM LABELS
   ────────────────────────────────────────────────────────────── */

export const FORM_LABELS = {
  personalSectionTitle:   "Personal Details",
  locationSectionTitle:   "Location Details",
  companySectionTitle:    "Company Information",
  companySectionSub:      "Tell us about your organisation so we can match you with the right stall options.",
  nameLabel:              "Full Name",
  emailLabel:             "Email",
  phoneLabel:             "Mobile Number",
  genderLabel:            "Gender",
  dobLabel:               "Date of Birth (18+ required)",
  interestLabel:          "I'm interested in",
  messageLabel:           "Message",
  companyNameLabel:       "Company Name",
  categoryLabel:          "Industry Category",
  companyPhoneLabel:      "Company Phone",
  companyEmailLabel:      "Company Email",
  gstinLabel:             "GSTIN (optional)",
  addressLabel:           "Address",
  cityLabel:              "City",
  districtLabel:          "District",
  stateLabel:             "State",
  pincodeLabel:           "Pin Code",
  submitExhibitorBtn:     "Submit Exhibitor Registration",
  submitVisitorBtn:       "Generate My Visitor Pass",
  submitContactBtn:       "Submit Enquiry",
};

/* ──────────────────────────────────────────────────────────────
   VISITOR PASS — TEXT & LAYOUT
   ────────────────────────────────────────────────────────────── */

export const VISITOR_PASS = {
  title:            "Official Visitor Pass",
  scanLabel:        "Scan to Verify",
  visitorBadge:     "VISITOR",
  validText:        "Valid for all 4 days",
  dateText:         "8–11 October 2026",
  timeText:         "10:00 AM – 7:00 PM",
  venueText:        "BIEC, Bengaluru",
  websiteText:      "bengaluruautoexpo.in",
  termsFooter:      "This pass is non-transferable. One pass per person. Organiser reserves the right to refuse entry without notice. By attending, you consent to being photographed or filmed.",
  downloadImageBtn: "Download as Image",
  downloadPdfBtn:   "Download as PDF",
};

/* ──────────────────────────────────────────────────────────────
   WHATSAPP CHAT — TEXTS
   ────────────────────────────────────────────────────────────── */

export const WHATSAPP_TEXTS = {
  agentName:         "Auto Expo Support",
  agentSubtitle:     "Typically replies in 1 hour",
  greetingBubble:    "Hello! 👋",
  greetingFollowup:  "How can we help you regarding the Auto Expo 2026 today?",
  startChatBtn:      "Start Chat on WhatsApp",
  tooltipText:       "Need help? Chat with us!",
  closeLabel:        "Close chat",
};

/* ──────────────────────────────────────────────────────────────
   LEGAL PAGES — TEXTS
   ────────────────────────────────────────────────────────────── */

export const LEGAL_CONTACT = {
  email: "legal@bengaluruautoexpo.in",
  phone: "+91 80 4500 8800",
  address: "10th Mile, Tumakuru Rd, Madavara, Bengaluru, Karnataka 562123, India",
};

/* ──────────────────────────────────────────────────────────────
   FLOOR PLAN PAGE — STATIC COPY
   ────────────────────────────────────────────────────────────── */

export const FLOOR_PLAN_CONTENT = {
  eyebrow: "Interactive Floor Plan",
  title: "Plan your presence at",
  subtitle: "Select a booth on the map, use the cards below to filter, and book your space.",
  totalBooths: "Total Booths",
  available: "Available",
  reserved: "Reserved",
  booked: "Booked",
  category: "Category",
  allCategories: "All Categories",
  clearFilters: "Clear filters",
  matchingBooths: "matching booths are highlighted",
  viewerHelp: "Click a booth · Ctrl+wheel to zoom · drag to pan",
  loading: "Loading floor plan…",
};
