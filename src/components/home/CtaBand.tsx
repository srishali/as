import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { EVENT, SECTIONS } from "../../config/site.config";

const S = SECTIONS.ctaBand;

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={S.bgImage}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/90 to-accent-950/80" />
        <div className="absolute inset-0 bg-grid opacity-25" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400" />
            {S.pill}
          </div>
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {S.title}{" "}
            <span className="text-gradient-light">{S.accent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-100/85">
            {S.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={S.ctaPrimary.to} variant="accent" size="lg">
              <Ticket className="h-5 w-5" />
              {S.ctaPrimary.label}
            </Button>
            <Button to={S.ctaSecondary.to} variant="solidLight" size="lg">
              {S.ctaSecondary.label}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-brand-100/85">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold-400" />
              {EVENT.dates}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-400" />
              {EVENT.venueShort}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
