/**
 * ============================================================
 *  SEO & META CONFIGURATION
 *  ------------------------------------------------------------
 *  All SEO, OpenGraph (OG), Twitter Card, Canonical URL, and
 *  JSON-LD Structured Data configurations live here.
 *
 *  Every setting has an `enabled` toggle so it can be enabled or
 *  disabled dynamically without removing the content.
 * ============================================================
 */



/* ──────────────────────────────────────────────────────────────
   1 · GLOBAL SEO DEFAULTS
   ────────────────────────────────────────────────────────────── */

export const SEO_GLOBAL = {
  enabled: true,
  siteName: "Bengaluru Auto Expo 2026",
  titleTemplate: "%s | Bengaluru Auto Expo 2026",
  defaultTitle: "Bengaluru Auto Expo 2026 | 8–11 October · BIEC, Bengaluru",
  defaultDescription:
    "Bengaluru Auto Expo 2026 — South Asia's flagship automotive exhibition. 8–11 October 2026 at Bangalore International Exhibition Centre (BIEC). Unveiling future EVs, concepts, launches and mobility innovations.",
  defaultKeywords:
    "Auto Expo 2026, Bengaluru Auto Show, BIEC Bangalore, Electric Vehicles India, EV Expo 2026, Automotive Exhibition India, Concept Cars Unveiling, Future Mobility Summit, Car Launches 2026",
  author: "Bengaluru Auto Expo Organising Committee",
  publisher: "D2FM",
  themeColor: "#270585",
  faviconUrl: "/favicon.ico",
  baseUrl: "https://bengaluruautoexpo.in",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
};

/* ──────────────────────────────────────────────────────────────
   2 · OPEN GRAPH (FB, LINKEDIN, WHATSAPP PREVIEWS)
   ────────────────────────────────────────────────────────────── */

export const OPEN_GRAPH = {
  enabled: true,
  type: "website",
  locale: "en_IN",
  siteName: SEO_GLOBAL.siteName,
  defaultImage: "https://bengaluruautoexpo.in/images/hero.jpg",
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: "Bengaluru Auto Expo 2026 Flagship Showcase at BIEC",
};

/* ──────────────────────────────────────────────────────────────
   3 · TWITTER CARDS
   ────────────────────────────────────────────────────────────── */

export const TWITTER_CARD = {
  enabled: true,
  cardType: "summary_large_image",
  siteHandle: "@BengaluruAutoExpo",
  creatorHandle: "@BengaluruAutoExpo",
  defaultImage: "https://bengaluruautoexpo.in/images/hero.jpg",
};

/* ──────────────────────────────────────────────────────────────
   4 · PAGE-SPECIFIC META CONFIGURATIONS
   ────────────────────────────────────────────────────────────── */

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    title: "Bengaluru Auto Expo 2026 | 8–11 October · BIEC, Bengaluru",
    description:
      "Witness South Asia's premier automotive event. 500+ exhibitors, 50+ global launches, EV zone, vintage pavilion and live drift arena at BIEC, Bengaluru.",
    keywords:
      "Bengaluru Auto Expo 2026, Auto Expo India, BIEC Exhibition, EV Showcase, Car Launch 2026, Test Drive Track, B2B Auto Summit",
    path: "/",
    ogImage: "https://bengaluruautoexpo.in/images/hero.jpg",
  },
  about: {
    title: "About Us | Bengaluru Auto Expo 2026",
    description:
      "Discover the story behind 8 editions of Bengaluru Auto Expo. Our mission, vision, 4-day itinerary, and supporting government & industry partners.",
    keywords:
      "About Auto Expo, Bengaluru Automobile History, BIEC Event Venue, Automotive Leaders India, EV Startups Bengaluru",
    path: "/about",
    ogImage: "https://bengaluruautoexpo.in/images/expo-floor.jpg",
  },
  exhibitors: {
    title: "Exhibit With Us | Stall Registration — Bengaluru Auto Expo 2026",
    description:
      "Reserve your booth at South Asia's largest automotive showcase. Shell scheme and premium spaces available across 80,000+ sq.m. at BIEC.",
    keywords:
      "Book Stall Auto Expo, Exhibitor Registration, Automobile Booth Booking, Shell Scheme Pricing, BIEC Stall Reservation",
    path: "/exhibitors",
    ogImage: "https://bengaluruautoexpo.in/images/ev-showcase.jpg",
  },
  floorPlan: {
    title: "Interactive Floor Plan & Booth Availability | Bengaluru Auto Expo 2026",
    description: "Explore the interactive Bengaluru Auto Expo 2026 floor plan, compare booth sizes and availability, and register your interest directly with the exhibitor team.",
    keywords: "Auto Expo Floor Plan, BIEC Booth Availability, Exhibition Stall Booking, Bengaluru Auto Expo Booths",
    path: "/floor-plan",
    ogImage: "https://bengaluruautoexpo.in/images/expo-floor.jpg",
  },
  opportunities: {
    title: "Partnership & Sponsorship Opportunities | Bengaluru Auto Expo 2026",
    description:
      "Elevate your brand at India's leading automotive event. Title, Platinum, Gold, and Silver sponsorship packages available.",
    keywords:
      "Auto Expo Sponsorship, Mobility Partnerships, B2B Lead Generation, Automotive Media Coverage, Title Sponsor Package",
    path: "/opportunities",
    ogImage: "https://bengaluruautoexpo.in/images/future-mobility.jpg",
  },
  contact: {
    title: "Contact Us & Directions | Bengaluru Auto Expo 2026",
    description:
      "Get in touch with the organiser team. Venue directions to BIEC Tumakuru Road, enquiry form, phone numbers, and support email.",
    keywords:
      "BIEC Address, Auto Expo Contact Number, Bangalore Expo Venue Map, Exhibitor Helpdesk, Visitor Query Email",
    path: "/contact",
    ogImage: "https://bengaluruautoexpo.in/images/venue.jpg",
  },
  visitorPass: {
    title: "Get Free Visitor Pass | Bengaluru Auto Expo 2026",
    description:
      "Register online to generate your official Visitor Pass with unique QR code. Instant image & PDF download.",
    keywords:
      "Free Visitor Pass, Auto Expo Tickets, Online Visitor Registration, QR Entry Pass, BIEC Entry Pass 2026",
    path: "/visitor-pass",
    ogImage: "https://bengaluruautoexpo.in/images/expo-floor.jpg",
  },
  privacyPolicy: {
    title: "Privacy Policy | Bengaluru Auto Expo 2026",
    description:
      "Read our Privacy Policy explaining how we collect, store, and protect visitor and exhibitor information.",
    keywords: "Privacy Policy, Data Protection, User Rights, Cookies Policy",
    path: "/privacy-policy",
  },
  termsConditions: {
    title: "Terms & Conditions | Bengaluru Auto Expo 2026",
    description:
      "Official terms of service and venue entry regulations for Bengaluru Auto Expo 2026.",
    keywords: "Terms and Conditions, Visitor Regulations, Venue Policy",
    path: "/terms-conditions",
  },
  refundPolicy: {
    title: "Refund & Cancellation Policy | Bengaluru Auto Expo 2026",
    description:
      "Transparent refund guidelines for stall bookings, visitor passes, and sponsorship commitments.",
    keywords: "Refund Policy, Ticket Cancellation, Exhibitor Cancellation Rules",
    path: "/refund-policy",
  },
};

/* ──────────────────────────────────────────────────────────────
   5 · STRUCTURED DATA (JSON-LD SCHEMA GENERATOR)
   ────────────────────────────────────────────────────────────── */

export function generateEventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: SEO_GLOBAL.siteName,
    description: SEO_GLOBAL.defaultDescription,
    startDate: "2026-10-08T10:00:00+05:30",
    endDate: "2026-10-11T19:00:00+05:30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Bangalore International Exhibition Centre (BIEC)",
      address: {
        "@type": "PostalAddress",
        streetAddress: "10th Mile, Tumakuru Road, Madavara",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "562123",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "13.0614",
        longitude: "77.4746",
      },
    },
    image: [
      "https://bengaluruautoexpo.in/images/hero.jpg",
      "https://bengaluruautoexpo.in/images/expo-floor.jpg",
      "https://bengaluruautoexpo.in/images/venue.jpg",
    ],
    organizer: {
      "@type": "Organization",
      name: "Bengaluru Auto Expo Committee",
      url: SEO_GLOBAL.baseUrl,
      email: "info@bengaluruautoexpo.in",
      telephone: "+91-80-4500-8800",
    },
    offers: {
      "@type": "Offer",
      url: `${SEO_GLOBAL.baseUrl}/#/visitor-pass`,
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
  };
}
