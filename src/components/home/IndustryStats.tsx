import { Cog } from "lucide-react";
import { SECTIONS, type Stat } from "../../config/site.config";
import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { Extras } from "../Extras";
import { useSheetList } from "../../lib/useSheet";

const S = SECTIONS.industry;

type StatItem = Stat & { extra?: { label: string; value: string }[] };
type Fact = (typeof S.facts)[number] & {
  extra?: { label: string; value: string }[];
};

export function IndustryStats() {
  const stats = useSheetList<StatItem>("industryStats", S.stats, (row, h) => ({
    value: h.get(row, "value"),
    label: h.get(row, "label"),
    sub: h.get(row, "sub"),
    extra: row.extra,
  }));

  const facts = useSheetList<Fact>("facts", S.facts, (row, h) => ({
    icon: h.icon(h.get(row, "icon"), Cog),
    title: h.get(row, "title"),
    desc: h.get(row, "desc"),
    extra: row.extra,
  }));

  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
      <div className="absolute inset-0">
        <img
          src={S.bgImage}
          alt=""
          className="h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-950/90 to-brand-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-700/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...S.heading} />

        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {stats.map((s, i) => (
            <StaggerItem key={s.label || i}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:bg-white/10">
                {s.value && (
                  <div className="font-display text-4xl font-extrabold text-gradient-light sm:text-5xl">
                    {s.value}
                  </div>
                )}
                {s.label && (
                  <div className="mt-2 text-sm font-semibold text-white">
                    {s.label}
                  </div>
                )}
                {s.sub && (
                  <div className="mt-0.5 text-xs text-brand-100/70">{s.sub}</div>
                )}
                <Extras items={s.extra} light />
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.title || i} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 text-white">
                  <f.icon className="h-6 w-6" />
                </span>
                {f.title && (
                  <h3 className="mt-4 font-display text-lg font-bold text-white">
                    {f.title}
                  </h3>
                )}
                {f.desc && (
                  <p className="mt-2 text-sm leading-relaxed text-brand-100/80">
                    {f.desc}
                  </p>
                )}
                <Extras items={f.extra} light />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
