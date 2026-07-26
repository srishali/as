import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { Extras } from "../Extras";
import { SECTIONS } from "../../config/site.config";
import { useSheetList } from "../../lib/useSheet";

const INTRO = SECTIONS.aboutIntro;
const PILLARS = SECTIONS.pillars;
const NUMBERS = SECTIONS.numbers;
const TL = SECTIONS.timelineSection;
const WHY = SECTIONS.whyBengaluru;

/** Who We Are — intro with image. */
export function AboutIntro() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading {...INTRO.heading} />
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {INTRO.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100 to-accent-100/60 blur-2xl" />
              <img
                src={INTRO.image.src}
                alt={INTRO.image.alt}
                className="h-[380px] w-full rounded-3xl border border-slate-200 object-cover shadow-2xl shadow-brand-900/10 sm:h-[460px]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Mission / Vision / Promise cards. */
export function Pillars() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {PILLARS.items.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-accent-700 text-white">
                  <p.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {p.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Dark "by the numbers" band. */
export function NumbersBand() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...NUMBERS.heading} />
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 lg:grid-cols-4">
          {NUMBERS.items.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="font-display text-5xl font-extrabold text-gradient-light sm:text-6xl">
                  {n.value}
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-brand-100/70">
                  {n.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 4-day journey cards. */
export function TimelineSection() {
  const items = useSheetList<
    (typeof TL.items)[number] & { extra?: { label: string; value: string }[] }
  >("timeline", TL.items, (row, h) => ({
    day: h.get(row, "day"),
    title: h.get(row, "title"),
    desc: h.get(row, "desc"),
    extra: row.extra,
  }));

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...TL.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((t, i) => (
            <Reveal key={t.day || i} delay={i * 0.08}>
              <div className="relative h-full rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6">
                <div className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-accent-700 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                  Day {i + 1}
                </div>
                {t.title && (
                  <h3 className="mt-3 font-display text-base font-bold text-slate-900">
                    {t.title}
                  </h3>
                )}
                {t.day && (
                  <div className="mt-1 text-xs font-semibold text-accent-700">
                    {t.day}
                  </div>
                )}
                {t.desc && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {t.desc}
                  </p>
                )}
                <Extras items={t.extra} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Why Bengaluru + support strip. */
export function WhyBengaluru() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...WHY.heading} />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {WHY.items.map((b) => (
            <StaggerItem key={b.title} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <b.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {b.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-brand-100 bg-white p-6 text-center">
            <CheckCircle2 className="h-6 w-6 text-brand-600" />
            <p className="text-sm font-medium text-slate-600">{WHY.supportText}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
