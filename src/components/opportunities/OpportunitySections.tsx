import {
  Briefcase, Store, Landmark, Banknote, GraduationCap, Users, TrendingUp,
  Award, Check, ArrowRight,
} from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { Button } from "../Button";
import { Extras } from "../Extras";
import { SECTIONS } from "../../config/site.config";
import { useSheetList } from "../../lib/useSheet";
import { cn } from "../../lib/utils";

const WHY = SECTIONS.oppWhy;
const TIERS = SECTIONS.tiers;
const AUDIENCE = SECTIONS.audience;
const ROI = SECTIONS.roi;

type PointItem = (typeof WHY.items)[number] & {
  extra?: { label: string; value: string }[];
};
type TierItem = (typeof TIERS.items)[number];

const audienceIcons = [Briefcase, Store, Landmark, Banknote, GraduationCap, Users];

/** Six opportunity points. */
export function WhyBeHere() {
  const items = useSheetList<PointItem>(
    "opportunityPoints",
    WHY.items,
    (row, h) => ({
      title: h.get(row, "title"),
      desc: h.get(row, "desc"),
      extra: row.extra,
    })
  );

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...WHY.heading} />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((o, i) => (
            <StaggerItem key={o.title || i} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-7 transition hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10">
                <span className="font-display text-4xl font-extrabold text-brand-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {o.title && (
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900">
                    {o.title}
                  </h3>
                )}
                {o.desc && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {o.desc}
                  </p>
                )}
                <Extras items={o.extra} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Sponsorship tiers on dark band. */
export function SponsorTiers() {
  const tiers = useSheetList<TierItem>(
    "sponsorshipPlans",
    TIERS.items,
    (row, h) => ({
      name: h.get(row, "name"),
      accent: h.get(row, "accent") || "from-brand-700 to-brand-600",
      featured: h.bool(h.get(row, "featured")),
      perks: h.list(h.get(row, "perks")),
    })
  );

  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent-700/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...TIERS.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-7 backdrop-blur-md transition hover:-translate-y-1.5",
                  t.featured
                    ? "border-accent-400/40 bg-accent-700/20 ring-1 ring-accent-400/30"
                    : "border-white/10 bg-white/5"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                    t.accent
                  )}
                >
                  <Award className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {t.name}
                </h3>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-300" />
                      <span className="text-brand-100/85">{p}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  to="/contact"
                  variant={t.featured ? "accent" : "solidLight"}
                  size="sm"
                  className="mt-6 w-full"
                >
                  Enquire
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Who should attend. */
export function Audience() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...AUDIENCE.heading} />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.items.map((v, i) => {
            const Icon = audienceIcons[i % audienceIcons.length];
            return (
              <StaggerItem key={v} className="h-full">
                <div className="flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-brand-200 hover:bg-white hover:shadow-lg hover:shadow-brand-900/10">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm font-bold text-slate-900">
                    {v}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/** ROI band. */
export function RoiBand() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-accent-800 p-8 text-white sm:p-12">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-gold-300" />
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {ROI.title}
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {ROI.items.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.07}>
                <div>
                  <div className="font-display text-4xl font-extrabold text-gradient-light sm:text-5xl">
                    {r.value}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    {r.label}
                  </div>
                  <div className="text-xs text-brand-100/70">{r.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
