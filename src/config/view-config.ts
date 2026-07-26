/**
 * ============================================================
 *  VIEW CONFIGURATION — FRONT-END LAYOUT, ORDER, ALIGNMENT
 *  ------------------------------------------------------------
 *  Controls EVERY section's visual display:
 *    · enabled  → true / false  (show or hide section)
 *    · order    → number        (1, 2, 3... - sections are dynamically sorted ascending)
 *    · align    → "left" | "center"  (heading/content alignment)
 * ============================================================
 */

import type { ReactNode } from "react";
import {
  CalendarDays, MapPin, Plane, TramFront, Car as CarIcon, Award, Crown, Gem,
  Lightbulb, Mail, Phone, Clock, Search, LayoutGrid, BadgeCheck, Rocket,
  Eye, HeartHandshake, TrendingUp, Store,
  type LucideIcon,
} from "lucide-react";
import {
  FALLBACK_HIGHLIGHTS,
  FALLBACK_SECTORS,
  FALLBACK_INDUSTRY_STATS,
  FALLBACK_FACTS,
  FALLBACK_TIMELINE,
  FALLBACK_BOOTH_PLANS,
  FALLBACK_OPPORTUNITY_POINTS,
  FALLBACK_SPONSORSHIP_PLANS,
  FALLBACK_PARTNER_CATEGORIES,
  FALLBACK_WHY_EXHIBIT,
  FALLBACK_FAQS,
  FALLBACK_TESTIMONIALS,
} from "./fallback-config";
import { FLOOR_PLAN_CONTENT, PAGE_HEADERS } from "./content-config";

/* ──────────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────────── */

export interface HeadingConfig {
  eyebrow?: string;
  title?: ReactNode;
  accent?: string;
  suffix?: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}

export interface PageHeaderConfig {
  current: string;
  eyebrow?: string;
  image?: string;
  title: string;
  accent?: string;
  suffix?: string;
  subtitle?: string;
}

export interface CtaConfig {
  label: string;
  to: string;
}

export type Highlight = { icon: LucideIcon; title: string; desc: string };
export type Sector = { icon: LucideIcon; title: string; desc: string };
export type Stat = { value: string; label: string; sub: string };
export type Testimonial = { quote: string; name: string; role: string; initials: string; photo?: string };
export type Partner = { name: string; full: string; role: string; logo?: string };
export type PartnerCategory = { icon: LucideIcon; title: string; blurb: string; badgeClass: string; partners: Partner[] };

/* ──────────────────────────────────────────────────────────────
   SECTIONS CONFIG — WITH ENABLED, ORDER & ALIGNMENT
   ────────────────────────────────────────────────────────────── */

export const SECTIONS = {
  /* ── HOME PAGE SECTIONS ────────────────────────────────────── */

  hero: {
    enabled: true,
    order: 1,
    align: "left" as const,
    pill: "8th Edition · 8–11 October 2026",
    titleTop: "Bengaluru",
    titleAccent: "Auto Expo",
    year: "2026",
    subtitle: "The Future of Mobility, Unleashed. South Asia's flagship automotive exhibition — four days where global brands, future mobility and passionate fans collide.",
    ctaPrimary: { label: "Exhibitor Registration", to: "/exhibitors" },
    ctaSecondary: { label: "Visitor Registration", to: "/visitor-pass" },
    meta: [
      { icon: CalendarDays, value: "8–11 October 2026" },
      { icon: MapPin, value: "BIEC, Bengaluru" },
    ],
    stats: [
      { value: "500+", label: "Exhibitors" },
      { value: "150K+", label: "Visitors" },
      { value: "35+", label: "Countries" },
      { value: "50+", label: "Launches" },
    ],
    bgImage: "/images/hero.jpg",
  },

  countdown: {
    enabled: true,
    order: 2,
    align: "center" as const,
    eyebrow: "The countdown has begun",
    title: "Doors open 8–11 October 2026",
  },

  aboutBrief: {
    enabled: true,
    order: 3,
    align: "left" as const,
    heading: {
      eyebrow: "About the Expo",
      title: "Four days that move an ",
      accent: "entire industry",
      suffix: " forward",
      subtitle: "Now in its 8th edition, Bengaluru Auto Expo is South Asia's most influential gathering of automakers, suppliers, startups and enthusiasts — a stage where the future of mobility is revealed.",
      align: "left" as const,
    } as HeadingConfig,
    bullets: [
      "World & India premieres on a grand mainstage",
      "Dedicated EV, classic car and startup zones",
      "Global Mobility Summit with 150+ speakers",
      "Pre-screened B2B buyer–seller meetings",
    ],
    primaryBtn: { label: "Discover the Expo", to: "/about" },
    secondaryBtn: { label: "Become an Exhibitor", to: "/exhibitors" },
    image: { src: "/images/expo-floor.jpg", alt: "Visitors exploring new cars on the Bengaluru Auto Expo exhibition floor" },
    stat: { value: "80,000+", label: "sq.m. of showcase space" },
    badge: { top: "Edition", value: "8th · 2026" },
  },

  highlights: {
    enabled: true,
    order: 4,
    align: "center" as const,
    heading: {
      eyebrow: "Event Highlights",
      title: "Ten unforgettable experiences, ",
      accent: "all under one roof",
      subtitle: "From world premieres to stunt shows, every zone is engineered to thrill, connect and inspire — whether you're here to do business or to be amazed.",
      align: "center" as const,
    } as HeadingConfig,
    items: FALLBACK_HIGHLIGHTS.items,
  },

  quickContact: {
    enabled: true,
    order: 5,
    align: "left" as const,
    badge: "Quick Contact",
    title: "Have a question? Let's talk.",
    blurb: "Whether you want to exhibit, sponsor, partner or visit — our team is ready to help you make the most of Bengaluru Auto Expo 2026.",
    details: [
      { icon: Mail, label: "Email", value: "info@bengaluruautoexpo.in", href: "mailto:info@bengaluruautoexpo.in" },
      { icon: Phone, label: "Phone", value: "+91 80 4500 8800", href: "tel:+918045008800" },
      { icon: Clock, label: "Expo Hours", value: "10 AM – 7 PM Daily", href: "" },
      { icon: MapPin, label: "Venue", value: "BIEC, Bengaluru", href: "" },
    ],
    formTitle: "Request your registration",
    formSub: "Fill in the form and we'll be in touch within one business day.",
  },

  sectors: {
    enabled: true,
    order: 6,
    align: "center" as const,
    heading: {
      eyebrow: "Who Should Participate",
      title: "Built for every player in the ",
      accent: "automotive universe",
      subtitle: "If you make, move, finance, power, service or sell anything on wheels — and the industries that orbit them — this is your marketplace.",
      align: "center" as const,
    } as HeadingConfig,
    items: FALLBACK_SECTORS.items,
    ctaStrip: {
      title: "Don't see your category?",
      text: "Talk to our team — there's a place for every allied industry at the expo.",
      button: { label: "Explore Opportunities", to: "/opportunities" },
    },
  },

  industry: {
    enabled: true,
    order: 7,
    align: "center" as const,
    heading: {
      eyebrow: "Industry Highlights",
      title: "Plug into India's ",
      accent: "$300B+ mobility boom",
      subtitle: "India is the world's third-largest automobile market and among its fastest-growing EV ecosystems — and Bengaluru Auto Expo is its annual meeting point.",
      align: "center" as const,
      light: true,
    } as HeadingConfig,
    stats: FALLBACK_INDUSTRY_STATS.items,
    facts: FALLBACK_FACTS.items,
    bgImage: "/images/future-mobility.jpg",
  },

  gallery: {
    enabled: true,
    order: 8,
    align: "center" as const,
    heading: {
      eyebrow: "Gallery",
      title: "A glimpse of the ",
      accent: "spectacle",
      subtitle: "Sleek launches, roaring classics and the electric buzz of thousands of enthusiasts — a taste of what awaits.",
      align: "center" as const,
    } as HeadingConfig,
    items: [
      { src: "/images/ev-showcase.jpg", label: "EV & Future Zone", span: "sm:col-span-2 sm:row-span-2" },
      { src: "/images/expo-floor.jpg", label: "The Show Floor", span: "" },
      { src: "/images/vintage.jpg", label: "Classic Pavilion", span: "" },
      { src: "/images/future-mobility.jpg", label: "Concept Unveilings", span: "sm:col-span-2" },
    ],
    button: { label: "Explore the Full Experience", to: "/about" },
  },

  venue: {
    enabled: true,
    order: 9,
    align: "center" as const,
    heading: {
      eyebrow: "Venue & Access",
      title: "One iconic venue, ",
      accent: "easy to reach",
      subtitle: "Held at Bengaluru's premier exhibition destination, with excellent connectivity from across the city.",
      align: "center" as const,
    } as HeadingConfig,
    image: "/images/venue.jpg",
    mapSrc: "https://maps.google.com/maps?q=Bangalore%20International%20Exhibition%20Centre%20BIEC&t=&z=14&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=Bangalore+International+Exhibition+Centre+BIEC",
    directionsLabel: "Get Directions",
    venueTeamLabel: "Contact the Venue Team",
    access: [
      { icon: Plane, label: "Kempegowda Intl. Airport", value: "~45 min drive" },
      { icon: TramFront, label: "Nagasandra Metro (Green Line)", value: "~20 min" },
      { icon: CarIcon, label: "On-site parking", value: "6,000+ bays" },
    ],
  },

  partnersBar: {
    enabled: true,
    order: 10,
    align: "center" as const,
    marqueeLabel: "Trusted by the industry's leading names",
    tiers: [
      { icon: Crown, role: "Title Sponsor", brand: "Velocity Motors" },
      { icon: Gem, role: "Platinum Partner", brand: "NovaDrive" },
      { icon: Award, role: "Mobility Partner", brand: "Aether EV" },
      { icon: Lightbulb, role: "Knowledge Partner", brand: "GlobalAuto Review" },
    ],
    banner: {
      title: "Become a Sponsor or Partner",
      text: "Put your brand at the centre of South Asia's mobility conversation.",
      button: { label: "Partner With Us", to: "/contact" },
    },
  },

  exhibitorMarquee: {
    enabled: true,
    order: 11,
    align: "center" as const,
    label: "Join 500+ leading brands at the expo",
    fallbackNames: [
      "Velocity Motors", "Aether EV", "NovaDrive", "Pinnacle Auto",
      "Vortex Tyres", "Apex Batteries", "Quantum Mobility", "Helix Components",
      "StratoTech", "Lumen Charge", "Titan Logistics", "Zenith Assurance",
    ],
  },

  testimonials: {
    enabled: true,
    order: 12,
    align: "center" as const,
    heading: {
      eyebrow: "Voices from the Industry",
      title: "Trusted by leaders across ",
      accent: "the mobility world",
      subtitle: "Exhibitors, founders and journalists return edition after edition. Here's why.",
      align: "center" as const,
    } as HeadingConfig,
    items: FALLBACK_TESTIMONIALS.items,
  },

  ctaBand: {
    enabled: true,
    order: 13,
    align: "center" as const,
    pill: "Registration is now open",
    title: "Your place at the centre of ",
    accent: "mobility's biggest week",
    subtitle: "Stalls and passes are limited. Secure your spot at Bengaluru Auto Expo 2026 today.",
    ctaPrimary: { label: "Exhibitor Registration", to: "/exhibitors" },
    ctaSecondary: { label: "Get Visitor Pass", to: "/visitor-pass" },
    bgImage: "/images/hero.jpg",
  },

  /* ── ABOUT PAGE SECTIONS ───────────────────────────────────── */

  aboutIntro: {
    enabled: true,
    order: 1,
    align: "left" as const,
    heading: {
      eyebrow: "Who We Are",
      title: "More than a motor show — a ",
      accent: "movement",
      align: "left" as const,
    } as HeadingConfig,
    paragraphs: [
      "Bengaluru Auto Expo is where the full breadth of the automotive world converges — from global OEMs and Tier-1 suppliers to electric-vehicle pioneers, mobility startups and devoted enthusiasts.",
      "Over four immersive days, we transform BIEC, Bengaluru into a living showcase of launches, technology, heritage and deal-making — designed equally for the boardroom and the showroom floor.",
      "Backed by industry associations and supported by government and global partners, we exist to drive Indian mobility forward.",
    ],
    image: { src: "/images/future-mobility.jpg", alt: "Futuristic concept vehicle representing the future of mobility" },
  },

  pillars: {
    enabled: true,
    order: 2,
    align: "center" as const,
    items: [
      { icon: Store, title: "Our Mission", desc: "To be South Asia's definitive platform where automakers, suppliers, startups and customers connect, collaborate and catalyse the future of mobility." },
      { icon: Eye, title: "Our Vision", desc: "A cleaner, smarter, more connected world on wheels — and a thriving Indian industry leading it on the global stage." },
      { icon: HeartHandshake, title: "Our Promise", desc: "A meticulously curated, world-class experience for exhibitors, delegates and visitors — every single edition." },
    ],
  },

  numbers: {
    enabled: true,
    order: 3,
    align: "center" as const,
    heading: {
      eyebrow: "By The Numbers",
      title: "A legacy built over eight editions",
      align: "center" as const,
      light: true,
    } as HeadingConfig,
    items: [
      { value: "8", label: "Editions Hosted" },
      { value: "1.2M+", label: "Lifetime Visitors" },
      { value: "60+", label: "Countries Reached" },
      { value: "5,000+", label: "Brands Showcased" },
    ],
  },

  timelineSection: {
    enabled: true,
    order: 4,
    align: "center" as const,
    heading: {
      eyebrow: "4-Day Journey",
      title: "What unfolds across ",
      accent: "four epic days",
      subtitle: "Each day is themed for a different audience — from trade and innovation to public celebration.",
      align: "center" as const,
    } as HeadingConfig,
    items: FALLBACK_TIMELINE.items,
  },

  whyBengaluru: {
    enabled: true,
    order: 5,
    align: "center" as const,
    heading: {
      eyebrow: "Why Bengaluru",
      title: "Held in India's ",
      accent: "innovation capital",
      subtitle: "There's no better city to host the future of mobility.",
      align: "center" as const,
    } as HeadingConfig,
    items: [
      { icon: Store, title: "India's Tech Capital", desc: "Home to the country's deepest pool of mobility, software and EV engineering talent." },
      { icon: TrendingUp, title: "An EV & Startup Hub", desc: "More EV startups and R&D centres than any other Indian city — the natural home of innovation." },
      { icon: MapPin, title: "World-Class Venue", desc: "BIEC offers premier, well-connected exhibition infrastructure built for global events." },
    ],
    supportText: "Supported by leading industry associations, government bodies and global trade partners.",
  },

  partnersSection: {
    enabled: true,
    order: 6,
    align: "center" as const,
    heading: {
      eyebrow: "Our Partners",
      title: "Powered by the industry's ",
      accent: "strongest alliances",
      subtitle: "Government bodies, trade associations, premier institutes and changemakers standing together behind Bengaluru Auto Expo 2026.",
      align: "center" as const,
    } as HeadingConfig,
    categories: FALLBACK_PARTNER_CATEGORIES.items,
    banner: {
      title: "Interested in partnering with the expo?",
      text: "Join government, academia and industry leaders shaping the future of mobility.",
      button: { label: "Become a Partner", to: "/contact" },
    },
  },

  /* ── EXHIBITORS PAGE SECTIONS ──────────────────────────────── */

  benefits: {
    enabled: true,
    order: 1,
    align: "center" as const,
    heading: {
      eyebrow: "Why Exhibit",
      title: "Six reasons to book your ",
      accent: "stall today",
      subtitle: "Beyond footfall, the expo is engineered to deliver measurable business outcomes.",
      align: "center" as const,
    } as HeadingConfig,
    items: FALLBACK_WHY_EXHIBIT.items,
  },

  plansSection: {
    enabled: true,
    order: 2,
    align: "center" as const,
    heading: {
      eyebrow: "Booth & Space Options",
      title: "Choose the space that ",
      accent: "fits your ambition",
      subtitle: "From turnkey starter booths to fully managed pavilions — there's a perfect option for every brand and budget.",
      align: "center" as const,
    } as HeadingConfig,
    plans: FALLBACK_BOOTH_PLANS.items,
    note: "Prices are indicative for 2026 and exclusive of taxes. Early-bird and bulk-booking discounts available.",
  },

  featured: {
    enabled: true,
    order: 3,
    align: "center" as const,
    heading: {
      eyebrow: "Featured Exhibitors",
      title: "Join a roster of ",
      accent: "industry leaders",
      subtitle: "A snapshot of the brands and categories that power the expo floor.",
      align: "center" as const,
    } as HeadingConfig,
    count: 8,
  },

  howTo: {
    enabled: true,
    order: 4,
    align: "center" as const,
    heading: {
      eyebrow: "How To Exhibit",
      title: "From enquiry to exhibit in ",
      accent: "four simple steps",
      align: "center" as const,
    } as HeadingConfig,
    steps: [
      { icon: Search, title: "Enquire", desc: "Submit the form or talk to our sales team about your goals." },
      { icon: LayoutGrid, title: "Choose Your Space", desc: "Pick a shell-scheme booth or custom bare space from the floor plan." },
      { icon: BadgeCheck, title: "Confirm & Reserve", desc: "Sign the agreement and lock in your preferred location." },
      { icon: Rocket, title: "Build & Exhibit", desc: "Design your pavilion with our contractor guidelines and go live." },
    ],
  },

  exhibitForm: {
    enabled: true,
    order: 5,
    align: "center" as const,
    heading: {
      eyebrow: "Reserve Your Space",
      title: "Book your stall at the 2026 expo",
      subtitle: "Tell us what you're looking for and our team will send availability and a tailored proposal within one business day.",
      align: "center" as const,
    } as HeadingConfig,
  },

  /* ── OPPORTUNITIES PAGE SECTIONS ───────────────────────────── */

  oppWhy: {
    enabled: true,
    order: 1,
    align: "center" as const,
    heading: {
      eyebrow: "Why Be Here",
      title: "Six ways the expo ",
      accent: "drives your growth",
      subtitle: "Every opportunity below is designed to turn four days into a year of momentum.",
      align: "center" as const,
    } as HeadingConfig,
    items: FALLBACK_OPPORTUNITY_POINTS.items,
  },

  tiers: {
    enabled: true,
    order: 2,
    align: "center" as const,
    heading: {
      eyebrow: "Sponsorship & Partnership",
      title: "Align your brand with ",
      accent: "the future of mobility",
      subtitle: "Flexible partnership packages designed for maximum visibility, influence and ROI.",
      align: "center" as const,
      light: true,
    } as HeadingConfig,
    items: FALLBACK_SPONSORSHIP_PLANS.items,
  },

  audience: {
    enabled: true,
    order: 3,
    align: "center" as const,
    heading: {
      eyebrow: "Who Should Attend",
      title: "A stage built for ",
      accent: "every audience",
      subtitle: "From boardrooms to garages — there's value here for everyone in and around the automotive world.",
      align: "center" as const,
    } as HeadingConfig,
    items: [
      "Trade Professionals & Buyers",
      "Dealers & Distributors",
      "Government & Policy Makers",
      "Investors & Venture Capital",
      "Engineers, Designers & Students",
      "Auto Enthusiasts & Families",
    ],
  },

  roi: {
    enabled: true,
    order: 4,
    align: "center" as const,
    title: "Proven impact, edition after edition",
    items: [
      { value: "$2.4B+", label: "Deals Facilitated", sub: "cumulative, across editions" },
      { value: "94%", label: "Exhibitor Retention", sub: "return year on year" },
      { value: "1.2M+", label: "Total Reach", sub: "visitors, media & online" },
      { value: "85%", label: "Plan to Return", sub: "of surveyed attendees" },
    ],
  },

  /* ── CONTACT PAGE SECTIONS ─────────────────────────────────── */

  contactMethods: {
    enabled: true,
    order: 1,
    align: "center" as const,
    items: [
      { icon: Mail, label: "Email Us", value: "info@bengaluruautoexpo.in", href: "mailto:info@bengaluruautoexpo.in" },
      { icon: Phone, label: "Call Us", value: "+91 80 4500 8800", href: "tel:+918045008800" },
      { icon: MapPin, label: "Visit Us", value: "BIEC, Bengaluru", href: "https://maps.google.com/?q=Bangalore+International+Exhibition+Centre+BIEC" },
      { icon: Clock, label: "Expo Hours", value: "10 AM – 7 PM Daily", href: "" },
    ],
  },

  contactFormBlock: {
    enabled: true,
    order: 2,
    align: "left" as const,
    heading: {
      eyebrow: "Send a Message",
      title: "We'd love to ",
      accent: "hear from you",
      subtitle: "Fill in the form and we'll respond within one business day.",
      align: "left" as const,
    } as HeadingConfig,
    departments: [
      { name: "Exhibitor Sales", email: "sales@bengaluruautoexpo.in" },
      { name: "Sponsorship & Partnerships", email: "partners@bengaluruautoexpo.in" },
      { name: "Media & PR", email: "media@bengaluruautoexpo.in" },
      { name: "Visitor Support", email: "visitors@bengaluruautoexpo.in" },
    ],
  },

  contactMap: {
    enabled: true,
    order: 3,
    align: "center" as const,
    mapSrc: "https://maps.google.com/maps?q=Bangalore%20International%20Exhibition%20Centre%20BIEC&t=&z=14&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=Bangalore+International+Exhibition+Centre+BIEC",
    directionsLabel: "Open in Google Maps",
    registerLabel: "Register to Exhibit",
  },

  contactFaq: {
    enabled: true,
    order: 4,
    align: "center" as const,
    heading: {
      eyebrow: "FAQ",
      title: "Frequently asked ",
      accent: "questions",
      align: "center" as const,
    } as HeadingConfig,
    items: FALLBACK_FAQS.items,
  },

  /* ── FLOOR PLAN PAGE MAIN SECTION ─────────────────────────────
     The shared How To, Partners Bar and Exhibitor Marquee sections
     keep their existing config entries and are reused on this page.
     ────────────────────────────────────────────────────────────── */
  floorPlanMain: {
    enabled: true,
    order: 1,
    align: "center" as const,
    content: {
      heading:        { enabled: true, order: 1, align: "left" as const },
      planSelector:   { enabled: true, order: 2, align: "right" as const },
      stats:          { enabled: true, order: 3, align: "center" as const },
      categoryFilter: { enabled: true, order: 4, align: "center" as const },
      viewer:         { enabled: true, order: 5, align: "center" as const },
      viewerControls: { enabled: true, order: 6, align: "right" as const },
      hoverTooltip:   { enabled: true, order: 7, align: "left" as const },
      information:    { enabled: true, order: 8, align: "left" as const },
    },
    labels: FLOOR_PLAN_CONTENT,
  },
};

/* ──────────────────────────────────────────────────────────────
   NAVBAR & FOOTER LAYOUT CONTROLS
   ──────────────────────────────────────────────────────────────
   These control entire navbar/footer visibility, order of
   internal elements (logo, links, CTA), and alignment.
   ────────────────────────────────────────────────────────────── */

export const NAVBAR = {
  enabled: true,
  order: 1,
  align: "center" as const,
  logo:       { enabled: true, order: 1, align: "left" as const },
  links:      { enabled: true, order: 2, align: "center" as const },
  cta:        { enabled: true, order: 3, align: "right" as const },
  mobileToggle:{ enabled: true, order: 4, align: "right" as const },
};

export const FOOTER_LAYOUT = {
  enabled: true,
  order: 99,
  align: "left" as const,
  ctaStrip:      { enabled: true, order: 1, align: "center" as const },
  brandCol:      { enabled: true, order: 2, align: "left" as const },
  exploreCol:    { enabled: true, order: 3, align: "left" as const },
  reachCol:      { enabled: true, order: 4, align: "left" as const },
  newsletterCol: { enabled: true, order: 5, align: "left" as const },
  bottomBar:     { enabled: true, order: 6, align: "center" as const },
};

/* ──────────────────────────────────────────────────────────────
   PAGE MAPPINGS
   ────────────────────────────────────────────────────────────── */

export type SectionKey = keyof typeof SECTIONS;

export const PAGES: Record<
  "home" | "about" | "exhibitors" | "opportunities" | "contact" | "floorPlan",
  { header?: PageHeaderConfig; sections: SectionKey[] }
> = {
  home: {
    sections: [
      "hero", "countdown", "aboutBrief", "highlights", "quickContact",
      "sectors", "industry", "gallery", "venue", "partnersBar",
      "exhibitorMarquee", "testimonials", "ctaBand",
    ],
  },
  about: {
    header: {
      current: "About Us",
      eyebrow: "Our Story",
      image: "/images/expo-floor.jpg",
      title: "Eight editions. One unstoppable ",
      accent: "love affair",
      suffix: " with mobility.",
      subtitle: "Since our first edition, Bengaluru Auto Expo has grown into South Asia's most anticipated automotive gathering — a stage where the industry's biggest ideas take their first public breath.",
    },
    sections: ["aboutIntro", "pillars", "numbers", "timelineSection", "whyBengaluru", "partnersSection", "ctaBand"],
  },
  exhibitors: {
    header: {
      current: "Exhibitors",
      eyebrow: "Exhibit With Us",
      image: "/images/ev-showcase.jpg",
      title: "Put your brand at the ",
      accent: "centre of mobility",
      subtitle: "Prime locations are selling fast. Join 500+ exhibitors shaping the future of automotive at South Asia's flagship expo.",
    },
    sections: ["benefits", "plansSection", "featured", "howTo", "exhibitForm", "ctaBand"],
  },
  opportunities: {
    header: {
      current: "Opportunities",
      eyebrow: "Opportunities",
      image: "/images/future-mobility.jpg",
      title: "Opportunities that move ",
      accent: "business forward",
      subtitle: "Whether you want to exhibit, sponsor, partner or simply attend, Bengaluru Auto Expo opens doors across the entire automotive value chain.",
    },
    sections: ["oppWhy", "tiers", "audience", "roi", "ctaBand"],
  },
  contact: {
    header: {
      current: "Contact Us",
      eyebrow: "Get In Touch",
      image: "/images/venue.jpg",
      title: "Let's start a ",
      accent: "conversation",
      subtitle: "Questions about exhibiting, visiting, sponsoring or partnering? Our team is ready to help you make the most of Bengaluru Auto Expo 2026.",
    },
    sections: ["contactMethods", "contactFormBlock", "contactMap", "contactFaq"],
  },
  floorPlan: {
    header: PAGE_HEADERS.floorPlan,
    sections: ["floorPlanMain", "howTo", "partnersBar", "exhibitorMarquee"],
  },
};
