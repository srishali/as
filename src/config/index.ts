/**
 * ============================================================
 *  CONFIG BARREL — RE-EXPORTS EVERYTHING FROM SITE CONFIG
 *  ------------------------------------------------------------
 *  New code can import directly from this barrel:
 *    import { EVENT, SECTIONS, PAGES, SHEETS, SHEET_TABS } from "@/config";
 * ============================================================
 */

export {
  COMPANY, EVENT, EVENT_CONFIG,
  SHEETS, SHEET_TABS, EMAIL_SERVICE, WHATSAPP_CHAT, ANALYTICS, MAPS,
  NAV_LINKS, LEGAL_LINKS, FORM_INTERESTS, FOOTER,
  SECTIONS, PAGES,
  HIGHLIGHTS, SECTORS, INDUSTRY_STATS, FACTS, SPONSORS, TESTIMONIALS,
  TIMELINE, BOOTH_PLANS, OPPORTUNITY_POINTS, PARTNER_CATEGORIES, FAQS,
  FALLBACK_HIGHLIGHTS, FALLBACK_SECTORS, FALLBACK_INDUSTRY_STATS,
  FALLBACK_FACTS, FALLBACK_SPONSORS, FALLBACK_TESTIMONIALS,
  FALLBACK_TIMELINE, FALLBACK_BOOTH_PLANS, FALLBACK_OPPORTUNITY_POINTS,
  FALLBACK_SPONSORSHIP_PLANS, FALLBACK_PARTNER_CATEGORIES,
  FALLBACK_CLIENTS, FALLBACK_WHY_EXHIBIT, FALLBACK_FAQS,
} from "./site.config";

export type { HeadingConfig, PageHeaderConfig, CtaConfig, Highlight, Sector, Stat, Testimonial, Partner, PartnerCategory, SheetKey } from "./site.config";

export { type TabMapping } from "./link-config";
