import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import type { PageHeaderConfig } from "../config/site.config";

/**
 * Inner-page hero banner. Fully driven by the master config:
 *   <PageHeader header={PAGES.about.header} />
 */
export function PageHeader({ header }: { header: PageHeaderConfig }) {
  const { current, eyebrow, image, title, accent, suffix, subtitle } = header;

  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
      <div className="absolute inset-0 -z-10">
        {image && (
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-30"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-950/90 to-accent-950/80" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
      <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-accent-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <nav className="flex items-center gap-1.5 text-xs font-medium text-brand-100/70">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{current}</span>
          </nav>

          {eyebrow && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              {eyebrow}
            </div>
          )}
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-gradient-light">{accent}</span>
              </>
            )}
            {suffix}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100/85 sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
