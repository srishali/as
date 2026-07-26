/**
 * ============================================================
 *  FALLBACK CONFIGURATION — DEFAULT DATA WHEN SHEETS IS OFF
 *  ------------------------------------------------------------
 *  When the Google Sheet is disabled, unavailable, or a fetch
 *  fails, the site falls back to the data defined here.
 *
 *  ALL FALLBACK SECTIONS HAVE BEEN SET TO `enabled: false`
 *  as requested, so the site fetches and displays live content
 *  from your Google Sheet (1VtlcfZTBCE13WdPUUWccv_gd-Nvd3kUsRgjhvIACPzE).
 * ============================================================
 */

import {
  Store, Rocket, Zap, Crown, Flame, Presentation, Car, Users, Lightbulb,
  Briefcase, BatteryCharging, Bike, Cpu, Truck, ShieldCheck, Wrench, PlugZap,
  Settings2, FlaskConical, Banknote, Globe2, Factory, Gauge, Cog, Target,
  Landmark, Handshake, GraduationCap, Leaf, Megaphone,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   1 · HIGHLIGHTS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_HIGHLIGHTS_RAW = [
  { enabled: true,  icon: Store,        title: "500+ Exhibitors",       desc: "OEMs, component makers, EV pioneers and allied industries across 80,000+ sq.m. of premium showcase space." },
  { enabled: true,  icon: Rocket,       title: "50+ Global Launches",   desc: "Witness world & India premieres, concept unveilings and next-gen model debuts on a grand stage." },
  { enabled: true,  icon: Zap,          title: "EV & Future Mobility Zone", desc: "Electric, hybrid, hydrogen and autonomous vehicles charting the road to a sustainable tomorrow." },
  { enabled: true,  icon: Crown,        title: "Classic & Vintage Pavilion", desc: "A curated hall of restored legends and rare classics celebrating a century of motoring heritage." },
  { enabled: true,  icon: Flame,        title: "Live Stunt & Drift Arena", desc: "Heart-pounding precision driving, drift battles and stunt shows by champion international drivers." },
  { enabled: true,  icon: Presentation, title: "Global Mobility Summit", desc: "150+ speakers across 20 sessions decoding policy, technology and the future of transportation." },
  { enabled: true,  icon: Car,          title: "Test Drive Track",      desc: "Get behind the wheel. Experience the latest cars and EVs on a purpose-built handling circuit." },
  { enabled: true,  icon: Users,        title: "B2B Networking Lounge", desc: "Pre-screened buyer–seller meetings with 10,000+ delegates and curated deal rooms." },
  { enabled: true,  icon: Lightbulb,    title: "Startup & Innovation Hub", desc: "50+ mobility startups showcase breakthrough tech to investors and industry leaders." },
  { enabled: true,  icon: Briefcase,    title: "Career & Talent Fair",  desc: "Connect top engineering and EV talent with leading employers across the automotive value chain." },
];

export const FALLBACK_HIGHLIGHTS = {
  enabled: false,
  items: FALLBACK_HIGHLIGHTS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   2 · SECTORS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_SECTORS_RAW = [
  { enabled: true,  icon: Car,             title: "Passenger & Commercial Vehicles", desc: "OEMs, CV makers and body builders showcasing new models and platforms." },
  { enabled: true,  icon: BatteryCharging, title: "Electric & Hybrid Vehicles",      desc: "EV manufacturers, battery cell makers and drivetrain innovators." },
  { enabled: true,  icon: Bike,            title: "Two-Wheelers & Micro-Mobility",   desc: "Motorcycles, scooters, e-rickshaws and last-mile mobility solutions." },
  { enabled: true,  icon: Cpu,             title: "Auto Components & Electronics",   desc: "Tier-1–3 suppliers, ECUs, sensors and connected-car technology." },
  { enabled: true,  icon: Settings2,       title: "Tyres, Batteries & Consumables",  desc: "Tyre brands, energy storage, lubricants and aftermarket parts." },
  { enabled: true,  icon: PlugZap,         title: "Charging & Energy Infrastructure", desc: "Charging networks, swappable stations and grid technology." },
  { enabled: true,  icon: Truck,           title: "Logistics & Supply Chain",        desc: "Freight, warehousing, EV fleet operators and 3PL providers." },
  { enabled: true,  icon: ShieldCheck,     title: "Finance, Leasing & Insurance",    desc: "Auto finance, fleet leasing, insurance and warranty providers." },
  { enabled: true,  icon: Wrench,          title: "Service, Repair & Aftermarket",   desc: "Workshop equipment, diagnostics, accessories and detailing." },
  { enabled: true,  icon: FlaskConical,    title: "R&D, Design & Engineering",       desc: "Design houses, testing labs, simulation and prototyping firms." },
  { enabled: true,  icon: Banknote,        title: "Investors & Venture Capital",     desc: "Funds and accelerators backing the next mobility unicorns." },
  { enabled: true,  icon: Globe2,          title: "Government & Trade Bodies",       desc: "Policy makers, embassies, consulates and industry associations." },
];

export const FALLBACK_SECTORS = {
  enabled: false,
  items: FALLBACK_SECTORS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   3 · INDUSTRY STATS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_INDUSTRY_STATS_RAW = [
  { enabled: true,  value: "#3",    label: "Largest Auto Market",  sub: "in the world by volume" },
  { enabled: true,  value: "$300B+", label: "Industry Value",       sub: "projected by 2026" },
  { enabled: true,  value: "37M+",  label: "Jobs Supported",        sub: "direct & indirect" },
  { enabled: true,  value: "7.1%",  label: "Share of GDP",          sub: "and rising fast" },
  { enabled: true,  value: "100%",  label: "FDI Permitted",         sub: "under automatic route" },
  { enabled: true,  value: "#1",    label: "Two-Wheelers Globally", sub: "largest producer" },
];

export const FALLBACK_INDUSTRY_STATS = {
  enabled: false,
  items: FALLBACK_INDUSTRY_STATS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   4 · FACTS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_FACTS_RAW = [
  { enabled: true,  icon: Factory, title: "Manufacturing Powerhouse",  desc: "India is the 4th largest vehicle manufacturer in the world with one of the deepest auto-component ecosystems." },
  { enabled: true,  icon: Gauge,   title: "EV Revolution",             desc: "India is the 3rd largest automobile market and among the fastest-growing EV ecosystems globally." },
  { enabled: true,  icon: Cog,     title: "Self-Reliant Supply Chain", desc: "From steel to semiconductors, the allied industry fuels a complete, scalable manufacturing value chain." },
];

export const FALLBACK_FACTS = {
  enabled: false,
  items: FALLBACK_FACTS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   5 · SPONSORS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_SPONSORS = {
  enabled: false,
  names: [
    "Velocity Motors", "Aether EV", "NovaDrive", "Pinnacle Auto", "Vortex Tyres",
    "Apex Batteries", "Quantum Mobility", "Helix Components", "StratoTech",
    "Lumen Charge", "Titan Logistics", "Zenith Assurance",
  ],
};

/* ──────────────────────────────────────────────────────────────
   6 · TESTIMONIALS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_TESTIMONIALS_RAW = [
  { enabled: true,  quote: "The scale and professionalism were outstanding. We closed supply deals worth more than the whole year's pipeline in four days.", name: "Rajiv Menon",   role: "Managing Director, Helix Components", initials: "RM" },
  { enabled: true,  quote: "By far the most credible mobility platform in South Asia. The investor meetings here gave our startup the launchpad we needed.",     name: "Ananya Iyer",   role: "Founder & CEO, Aether EV",            initials: "AI" },
  { enabled: true,  quote: "From global launches to the vintage pavilion, there is simply nothing like it. Our coverage reached millions of enthusiasts.",         name: "Daniel Brooks", role: "Editor-in-Chief, GlobalAuto Review",  initials: "DB" },
];

export const FALLBACK_TESTIMONIALS = {
  enabled: false,
  items: FALLBACK_TESTIMONIALS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   7 · TIMELINE
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_TIMELINE_RAW = [
  { enabled: true,  day: "Day 1 · Thu 8 Oct", title: "Grand Opening & Premieres", desc: "Inaugural ceremony, red-carpet model unveilings and the CEO keynote at the Mobility Summit." },
  { enabled: true,  day: "Day 2 · Fri 9 Oct", title: "Business & B2B Day",        desc: "Dedicated trade hours, buyer–seller meet and policy roundtables with industry leaders." },
  { enabled: true,  day: "Day 3 · Sat 10 Oct", title: "Tech, EV & Innovation",     desc: "EV zone spotlight, startup pitches, test drives and the future-of-mobility panel series." },
  { enabled: true,  day: "Day 4 · Sun 11 Oct", title: "Public Festival & Stunts",   desc: "Drift arena finals, classic car parade, awards night and a closing music celebration." },
];

export const FALLBACK_TIMELINE = {
  enabled: false,
  items: FALLBACK_TIMELINE_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   8 · BOOTH PLANS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_BOOTH_PLANS_RAW = [
  {
    enabled: true,
    name: "Shell Scheme", price: "₹14,500", unit: "/ sq.m.",
    tagline: "Turnkey booth for first-time exhibitors",
    features: ["Walls, fascia & carpet included", "2 spotlights + 1 counter", "Standard power supply", "Listing in exhibitor directory", "2 exhibitor badges"],
    featured: false,
  },
  {
    enabled: true,
    name: "Premium Space", price: "₹11,200", unit: "/ sq.m.",
    tagline: "Bare space for custom-built pavilions",
    features: ["Minimum 54 sq.m. area", "Prime aisle / corner locations", "Upgraded power allocation", "Priority listing & logo placement", "Dedicated liaison manager", "10 exhibitor badges"],
    featured: true,
  },
  {
    enabled: true,
    name: "Pavilion Partner", price: "Custom", unit: "",
    tagline: "Title or co-presenting sponsor packages",
    features: ["Country / category pavilion", "Mainstage branding & keynote slot", "Lounge & meeting room access", "Full digital & media campaign", "Unlimited exhibitor badges"],
    featured: false,
  },
];

export const FALLBACK_BOOTH_PLANS = {
  enabled: false,
  items: FALLBACK_BOOTH_PLANS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   9 · OPPORTUNITY POINTS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_OPPORTUNITY_POINTS_RAW = [
  { enabled: true,  title: "Reach 150,000+ Buyers",    desc: "Engage decision-makers, fleet operators, dealers and distributors from across India and 35+ countries in four focused days." },
  { enabled: true,  title: "Launch on a Global Stage", desc: "Use the mainstage and media center to unveil products to 500+ journalists, influencers and millions of followers." },
  { enabled: true,  title: "Generate Qualified Leads", desc: "Our matchmaking platform schedules pre-screened B2B meetings, so you spend less time chasing and more time closing." },
  { enabled: true,  title: "Build Brand Authority",    desc: "Position your brand among industry leaders with premium pavilion space, awards and thought-leadership speaking slots." },
  { enabled: true,  title: "Find Partners & Talent",   desc: "Meet suppliers, distributors, investors and top engineering talent in the networking lounge and career fair." },
  { enabled: true,  title: "Tap India's Growth Story", desc: "Plug into the world's 3rd largest auto market as EV, connected and shared mobility redefine the next decade." },
];

export const FALLBACK_OPPORTUNITY_POINTS = {
  enabled: false,
  items: FALLBACK_OPPORTUNITY_POINTS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   10 · SPONSORSHIP PLANS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_SPONSORSHIP_PLANS_RAW = [
  { enabled: true,  name: "Title Sponsor",   accent: "from-accent-700 to-accent-600", featured: true,  perks: ["Naming rights & mainstage branding", "Keynote & ribbon-cutting slot", "Largest premium pavilion", "Full media & digital campaign"] },
  { enabled: true,  name: "Platinum Partner", accent: "from-brand-700 to-brand-600",  featured: false, perks: ["Co-presenting branding", "Award-night sponsorship", "Premium lounge access", "Large corner pavilion"] },
  { enabled: true,  name: "Gold Partner",    accent: "from-gold-500 to-gold-400",    featured: false, perks: ["Category exclusivity", "Zone sponsorship", "Speaking opportunity", "Standard pavilion"] },
  { enabled: true,  name: "Silver Associate", accent: "from-slate-500 to-slate-400", featured: false, perks: ["Logo & signage visibility", "Booth + meeting room", "App & guide listing", "Networking access"] },
];

export const FALLBACK_SPONSORSHIP_PLANS = {
  enabled: false,
  items: FALLBACK_SPONSORSHIP_PLANS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   11 · PARTNERS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_PARTNER_CATEGORIES_RAW = [
  {
    enabled: true,
    icon: Landmark,
    title: "Government Partners",
    blurb: "Backed by ministries and state agencies driving India's mobility policy.",
    badgeClass: "bg-brand-700",
    partners: [
      { enabled: true,  name: "MHI",   full: "Ministry of Heavy Industries, Govt. of India", role: "Principal Government Partner" },
      { enabled: true,  name: "MoRTH", full: "Ministry of Road Transport & Highways",       role: "Policy Partner" },
      { enabled: true,  name: "GoK",   full: "Government of Karnataka",                     role: "State Partner" },
      { enabled: true,  name: "IK",    full: "Invest Karnataka",                            role: "Investment Promotion Partner" },
    ],
  },
  {
    enabled: true,
    icon: Handshake,
    title: "Industry Associations",
    blurb: "The leading trade bodies representing every artery of the auto industry.",
    badgeClass: "bg-accent-700",
    partners: [
      { enabled: true,  name: "SIAM",     full: "Society of Indian Automobile Manufacturers",        role: "Strategic Partner" },
      { enabled: true,  name: "ACMA",     full: "Automotive Component Manufacturers Association",    role: "Partner Association" },
      { enabled: true,  name: "FADA",     full: "Federation of Automobile Dealers Associations",     role: "Dealer Network Partner" },
      { enabled: true,  name: "SAEIndia", full: "Society of Automotive Engineers India",             role: "Technical Partner" },
    ],
  },
  {
    enabled: true,
    icon: GraduationCap,
    title: "Institutes & Academia",
    blurb: "Research and engineering powerhouses shaping tomorrow's mobility talent.",
    badgeClass: "bg-gold-500",
    partners: [
      { enabled: true,  name: "ARAI", full: "Automotive Research Association of India",       role: "Testing & Compliance Partner" },
      { enabled: true,  name: "ICAT", full: "International Centre for Automotive Technology", role: "Homologation Partner" },
      { enabled: true,  name: "IISc", full: "Indian Institute of Science, Bengaluru",         role: "Research Partner" },
      { enabled: true,  name: "IITM", full: "Indian Institute of Technology Madras",          role: "Academic Partner" },
    ],
  },
  {
    enabled: true,
    icon: Leaf,
    title: "NGOs & Sustainability",
    blurb: "Champions of clean air, green energy and safer roads across India.",
    badgeClass: "bg-emerald-600",
    partners: [
      { enabled: true,  name: "GMF", full: "Green Mobility Foundation",          role: "Sustainability Partner" },
      { enabled: true,  name: "TERI", full: "The Energy and Resources Institute", role: "Green Insights Partner" },
      { enabled: true,  name: "CAB",  full: "Clean Air Bengaluru Collective",     role: "Environment Partner" },
      { enabled: true,  name: "SRT",  full: "Safer Roads Trust",                 role: "Road Safety Partner" },
    ],
  },
];

export const FALLBACK_PARTNER_CATEGORIES = {
  enabled: false,
  items: FALLBACK_PARTNER_CATEGORIES_RAW.map(({ enabled: _, partners, ...rest }) => ({
    ...rest,
    partners: partners.map(({ enabled: __, ...pRest }) => pRest),
  })),
};

/* ──────────────────────────────────────────────────────────────
   12 · CLIENTS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_CLIENTS = {
  enabled: false,
  items: FALLBACK_SPONSORS.names.slice(0, 8).map((name) => ({ name, category: "", logo: "" })),
};

/* ──────────────────────────────────────────────────────────────
   13 · WHY EXHIBIT
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_WHY_EXHIBIT_RAW = [
  { enabled: true,  icon: Users,     title: "150,000+ Footfall",  desc: "Reach a massive, high-intent audience of buyers, dealers and enthusiasts over four days." },
  { enabled: true,  icon: Target,    title: "Qualified Leads",    desc: "Our matchmaking platform pre-screens B2B meetings so you close faster." },
  { enabled: true,  icon: Rocket,    title: "Mainstage Launches", desc: "Unveil new models and products to 500+ media and millions of followers." },
  { enabled: true,  icon: Megaphone, title: "Premium Visibility", desc: "Brand exposure across signage, the event app, digital campaigns and PR." },
  { enabled: true,  icon: Handshake, title: "Smart Networking",   desc: "Access exclusive lounges, awards nights and curated deal rooms." },
  { enabled: true,  icon: Globe2,    title: "Global Reach",       desc: "Connect with buyers and partners from 35+ countries in one place." },
];

export const FALLBACK_WHY_EXHIBIT = {
  enabled: false,
  items: FALLBACK_WHY_EXHIBIT_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   14 · FAQS
   ────────────────────────────────────────────────────────────── */

export const FALLBACK_FAQS_RAW = [
  { enabled: true,  q: "When and where is the expo held?", a: "Bengaluru Auto Expo 2026 runs from 8–11 October 2026 at the Bangalore International Exhibition Centre (BIEC), Bengaluru, India. Doors open daily from 10:00 AM to 7:00 PM, with business hours from 9:00 AM." },
  { enabled: true,  q: "How do I register as an exhibitor?", a: "Submit the exhibitor enquiry form on the Exhibitors page or Contact page. Our sales team will share availability, floor plans and a formal proposal within one business day." },
  { enabled: true,  q: "Is there an entry fee for visitors?", a: "Yes. Visitor passes are available online at an early-bird rate, with complimentary entry for accredited media and pre-registered trade delegates on business day. Children under 8 enter free." },
  { enabled: true,  q: "Are international visitors and exhibitors supported?", a: "Absolutely. We provide visa invitation letters, on-ground hospitality desks, translation services and dedicated international buyer lounges for our global participants." },
  { enabled: true,  q: "Can I book a custom-built pavilion?", a: "Yes. Choose bare Premium Space and bring your own contractor, or upgrade to a Pavilion Partner package for a fully managed, branded experience. Our team coordinates everything end-to-end." },
];

export const FALLBACK_FAQS = {
  enabled: false,
  items: FALLBACK_FAQS_RAW.map(({ enabled: _, ...rest }) => rest),
};

/* ──────────────────────────────────────────────────────────────
   LEGACY FLAT EXPORTS
   ────────────────────────────────────────────────────────────── */

export const HIGHLIGHTS = FALLBACK_HIGHLIGHTS.items;
export const SECTORS = FALLBACK_SECTORS.items;
export const INDUSTRY_STATS = FALLBACK_INDUSTRY_STATS.items;
export const FACTS = FALLBACK_FACTS.items;
export const SPONSORS = FALLBACK_SPONSORS.names;
export const TESTIMONIALS = FALLBACK_TESTIMONIALS.items;
export const TIMELINE = FALLBACK_TIMELINE.items;
export const BOOTH_PLANS = FALLBACK_BOOTH_PLANS.items;
export const OPPORTUNITY_POINTS = FALLBACK_OPPORTUNITY_POINTS.items;
export const PARTNER_CATEGORIES = FALLBACK_PARTNER_CATEGORIES.items;
export const FAQS = FALLBACK_FAQS.items;

/** Helper: return items if enabled, else empty array. */
export function fallback<T>(field: { enabled: boolean; items: T[] }): T[] {
  return field.enabled ? field.items : [];
}
