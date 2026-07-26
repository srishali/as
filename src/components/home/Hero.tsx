import { ArrowRight, Ticket } from "lucide-react";
import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { SECTIONS } from "../../config/site.config";

const H = SECTIONS.hero;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-brand-950">
        <img
          src={H.bgImage}
          alt="Luxury concept car on the Bengaluru Auto Expo mainstage"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-900/80 to-accent-950/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/30 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Glow accents */}
      <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-accent-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400" />
              {H.pill}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              {H.titleTop}
              <br />
              <span className="text-gradient-light">{H.titleAccent}</span>{" "}
              <span className="relative inline-block">
                {H.year}
                <span className="absolute -right-3 -top-2 text-2xl text-gold-400 sm:text-3xl">
                  ✦
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100/90 sm:text-xl">
              {H.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-brand-100/90">
              {H.meta.map((m) => (
                <span key={m.value} className="inline-flex items-center gap-2">
                  <m.icon className="h-4 w-4 text-gold-400" />
                  {m.value}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={H.ctaPrimary.to} variant="accent" size="lg">
                <Ticket className="h-5 w-5" />
                {H.ctaPrimary.label}
              </Button>
              <Button to={H.ctaSecondary.to} variant="solidLight" size="lg">
                {H.ctaSecondary.label}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md sm:grid-cols-4">
              {H.stats.map((s) => (
                <div key={s.label} className="px-4 py-5 text-center">
                  <dt className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-100/70">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em]">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/80" />
        </span>
      </div>
    </section>
  );
}
