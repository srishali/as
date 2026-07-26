/**
 * ============================================================
 *  MASTER RE-EXPORT BARREL — SITE CONFIGURATION
 *  ------------------------------------------------------------
 *  This file aggregates exports from the 5 dedicated config modules:
 *
 *    1. brand-config.ts     → Company & Event identity (with enabled toggles)
 *    2. link-config.ts      → Google Sheets, Email, WhatsApp, Analytics, Maps
 *    3. view-config.ts      → SECTIONS (enabled, order: 1..N, align) & PAGES
 *    4. content-config.ts   → Static copy, nav links, form dropdown options
 *    5. fallback-config.ts  → Default data for when Google Sheets is off
 *
 *  Import directly from this file (or the modular files) everywhere in the app!
 * ============================================================
 */

/* ── 1. BRAND Identity ──────────────────────────────────────── */
export { COMPANY, EVENT, EVENT_CONFIG, brand } from "./brand-config";

/* ── 2. LINKS & External Integrations ───────────────────────── */
export {
  GOOGLE_SHEETS,
  SHEETS,
  EMAIL_SERVICE,
  VISITOR_PASS_ATTACHMENTS,
  EXHIBITOR_BROCHURE,
  WHATSAPP_CHAT,
  ANALYTICS,
  MAPS,
  SOCIAL_AUTH,
  CUSTOM_API,
  SHEET_TABS,
  FORM_URLS,
  FLOOR_PLAN_SHEET,
  type TabMapping,
  type SheetKey,
} from "./link-config";

/* ── 3. VIEW Layout & Display Settings ──────────────────────── */
export {
  SECTIONS,
  PAGES,
  NAVBAR,
  FOOTER_LAYOUT,
  type HeadingConfig,
  type PageHeaderConfig,
  type CtaConfig,
  type Highlight,
  type Sector,
  type Stat,
  type Testimonial,
  type Partner,
  type PartnerCategory,
  type SectionKey,
} from "./view-config";

/* ── 4. CONTENT Static Copy & Text Strings ──────────────────── */
export {
  NAV_LINKS,
  UI_LABELS,
  FOOTER,
  LEGAL_LINKS,
  FOOTER_TOOLS,
  SOCIALS,
  FORM_INTERESTS,
  INDUSTRY_CATEGORIES,
  GENDERS,
  PAGE_HEADERS,
  FLOOR_PLAN_CONTENT,
  HOME_HEADINGS,
  ABOUT_TEXTS,
  FORM_LABELS,
  VISITOR_PASS,
  WHATSAPP_TEXTS,
  LEGAL_CONTACT,
} from "./content-config";

/* ── 5. FALLBACK Data ────────────────────────────────────────── */
export {
  FALLBACK_HIGHLIGHTS,
  FALLBACK_SECTORS,
  FALLBACK_INDUSTRY_STATS,
  FALLBACK_FACTS,
  FALLBACK_SPONSORS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_TIMELINE,
  FALLBACK_BOOTH_PLANS,
  FALLBACK_OPPORTUNITY_POINTS,
  FALLBACK_SPONSORSHIP_PLANS,
  FALLBACK_PARTNER_CATEGORIES,
  FALLBACK_CLIENTS,
  FALLBACK_WHY_EXHIBIT,
  FALLBACK_FAQS,
  /* Legacy exports for compatibility */
  HIGHLIGHTS,
  SECTORS,
  INDUSTRY_STATS,
  FACTS,
  SPONSORS,
  TESTIMONIALS,
  TIMELINE,
  BOOTH_PLANS,
  OPPORTUNITY_POINTS,
  PARTNER_CATEGORIES,
  FAQS,
  fallback,
} from "./fallback-config";
