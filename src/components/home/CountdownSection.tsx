import { Countdown } from "../Countdown";
import { Reveal } from "../Reveal";
import { EVENT, SECTIONS } from "../../config/site.config";

const S = SECTIONS.countdown;

export function CountdownSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-900 to-brand-950 py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-accent-600/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
            {S.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            {S.title}
          </h2>
          <div className="mx-auto mt-8 max-w-2xl">
            <Countdown target={EVENT.startISO} variant="light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
