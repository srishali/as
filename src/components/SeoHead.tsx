import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SEO_GLOBAL,
  OPEN_GRAPH,
  TWITTER_CARD,
  PAGE_SEO,
  generateEventJsonLd,
  type PageSeoConfig,
} from "../config/seo-config";

function updateMetaTag(nameOrProperty: string, value: string, attr = "name") {
  let element = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, nameOrProperty);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function updateCanonical(url: string) {
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function injectJsonLd(json: object) {
  let script = document.querySelector("script[id='json-ld-event']") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = "json-ld-event";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(json);
}

/**
 * SeoHead
 * Dynamically updates document title, meta tags, OpenGraph tags,
 * Twitter cards, canonical links, and JSON-LD schema on route changes.
 */
export function SeoHead({ pageKey }: { pageKey?: string }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!SEO_GLOBAL.enabled) return;

    // Determine config based on explicit pageKey or current route
    let cfg: PageSeoConfig | undefined = pageKey ? PAGE_SEO[pageKey] : undefined;

    if (!cfg) {
      const match = Object.values(PAGE_SEO).find((p) => p.path === pathname);
      cfg = match || PAGE_SEO.home;
    }

    // Update Page Title
    document.title = cfg.title;

    // Update Standard Meta Tags
    updateMetaTag("description", cfg.description);
    updateMetaTag("keywords", cfg.keywords);
    updateMetaTag("author", SEO_GLOBAL.author);
    updateMetaTag("robots", cfg.noIndex ? "noindex, nofollow" : SEO_GLOBAL.robots);

    // Canonical Link
    const fullUrl = `${SEO_GLOBAL.baseUrl}/#${pathname}`;
    updateCanonical(fullUrl);

    // OpenGraph Meta Tags
    if (OPEN_GRAPH.enabled) {
      updateMetaTag("og:title", cfg.title, "property");
      updateMetaTag("og:description", cfg.description, "property");
      updateMetaTag("og:type", OPEN_GRAPH.type, "property");
      updateMetaTag("og:url", fullUrl, "property");
      updateMetaTag("og:site_name", OPEN_GRAPH.siteName, "property");
      updateMetaTag("og:locale", OPEN_GRAPH.locale, "property");
      updateMetaTag("og:image", cfg.ogImage || OPEN_GRAPH.defaultImage, "property");
    }

    // Twitter Card Meta Tags
    if (TWITTER_CARD.enabled) {
      updateMetaTag("twitter:card", TWITTER_CARD.cardType);
      updateMetaTag("twitter:site", TWITTER_CARD.siteHandle);
      updateMetaTag("twitter:title", cfg.title);
      updateMetaTag("twitter:description", cfg.description);
      updateMetaTag("twitter:image", cfg.ogImage || TWITTER_CARD.defaultImage);
    }

    // JSON-LD Structured Data for Event
    injectJsonLd(generateEventJsonLd());
  }, [pathname, pageKey]);

  return null;
}
