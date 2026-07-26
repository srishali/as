import { useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react";
import type { SVGProps } from "react";
import * as React from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { EVENT, NAV_LINKS, FOOTER, LEGAL_LINKS, FOOTER_TOOLS, SOCIALS } from "../config/site.config";
import { FOOTER_LAYOUT } from "../config/view-config";

const LinkedinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
  </svg>
);
const FacebookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z" />
  </svg>
);
const YoutubeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
  </svg>
);
const XIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3L17.61 20.65z" />
  </svg>
);

const socialIconMap: Record<string, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  "X (Twitter)": XIcon,
};

export function Footer() {
  // Filter + sort footer nav links by enabled + order
  const exploreLinks = useMemo(() => {
    const all = [...NAV_LINKS, ...LEGAL_LINKS, ...FOOTER_TOOLS];
    return all
      .filter((l) => l.enabled !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, []);

  const activeSocials = useMemo(() => {
    return [...SOCIALS]
      .filter((s) => s.enabled !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, []);

  if (!FOOTER_LAYOUT.enabled) return null;

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100/80">
      {/* decorative glows */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-700/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-700/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA strip */}
        {FOOTER_LAYOUT.ctaStrip.enabled && (
          <div
            className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-10 md:flex-row md:items-center"
            style={{ order: FOOTER_LAYOUT.ctaStrip.order }}
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {FOOTER.ctaHeading}
              </h3>
              <p className="mt-2 max-w-xl text-brand-100/70">{FOOTER.ctaText}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {FOOTER.ctaPrimary.enabled !== false && (
                <Button to={FOOTER.ctaPrimary.to} variant="primary" size="lg">
                  {FOOTER.ctaPrimary.label}
                </Button>
              )}
              {FOOTER.ctaSecondary.enabled !== false && (
                <Button to={FOOTER.ctaSecondary.to} variant="accent" size="lg">
                  {FOOTER.ctaSecondary.label}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Main footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          {FOOTER_LAYOUT.brandCol.enabled && (
            <div className="lg:col-span-4" style={{ order: FOOTER_LAYOUT.brandCol.order }}>
              <div className="[&_*]:!text-white">
                <Logo light />
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/70">
                {FOOTER.about}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeSocials.map((s) => {
                  const Icon = socialIconMap[s.label] || LinkedinIcon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-brand-100/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {FOOTER_LAYOUT.exploreCol.enabled && (
            <div className="lg:col-span-2" style={{ order: FOOTER_LAYOUT.exploreCol.order }}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                Explore
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                {exploreLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-brand-100/70 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {FOOTER_LAYOUT.reachCol.enabled && (
            <div className="lg:col-span-3" style={{ order: FOOTER_LAYOUT.reachCol.order }}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                Reach Us
              </h4>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  <span className="text-brand-100/70">{EVENT.address}</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  <a
                    href={`mailto:${EVENT.email}`}
                    className="text-brand-100/70 transition-colors hover:text-white"
                  >
                    {EVENT.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  <a
                    href={`tel:${EVENT.phone.replace(/\s/g, "")}`}
                    className="text-brand-100/70 transition-colors hover:text-white"
                  >
                    {EVENT.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  <span className="text-brand-100/70">{EVENT.hours}</span>
                </li>
              </ul>
            </div>
          )}

          {FOOTER_LAYOUT.newsletterCol.enabled && (
            <div className="lg:col-span-3" style={{ order: FOOTER_LAYOUT.newsletterCol.order }}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                {FOOTER.newsletter.heading}
              </h4>
              <p className="mt-4 text-sm text-brand-100/70">
                {FOOTER.newsletter.text}
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-4"
              >
                <input
                  type="email"
                  required
                  placeholder={FOOTER.newsletter.placeholder}
                  className="w-full bg-transparent text-sm text-white placeholder:text-brand-100/50 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-accent-600 text-white transition-transform hover:scale-105"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        {FOOTER_LAYOUT.bottomBar.enabled && (
          <div
            className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-brand-100/60 sm:flex-row"
            style={{ order: FOOTER_LAYOUT.bottomBar.order }}
          >
            <p>
              © {new Date().getFullYear()} {EVENT.name} {EVENT.year}. All rights
              reserved.
            </p>
            <p>
              {FOOTER.bottomNote}{" "}
              {FOOTER.bottomAuthor.enabled !== false && (
                <a
                  href={FOOTER.bottomAuthor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-white hover:text-gold-300"
                >
                  {FOOTER.bottomAuthor.label}
                </a>
              )}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
