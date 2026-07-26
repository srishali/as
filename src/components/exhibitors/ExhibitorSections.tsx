import { Check, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { Button } from "../Button";
import { ExhibitorForm } from "../forms/ExhibitorForm";
import { SECTIONS, SPONSORS } from "../../config/site.config";
import { useSheetList } from "../../lib/useSheet";
import { cn } from "../../lib/utils";

type PlanItem = (typeof PLANS.plans)[number];
type ClientItem = { name: string; logo?: string; category?: string };

const BEN = SECTIONS.benefits;
const PLANS = SECTIONS.plansSection;
const FEAT = SECTIONS.featured;
const HOW = SECTIONS.howTo;
const FORM = SECTIONS.exhibitForm;

/** Six benefits cards. */
export function Benefits() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...BEN.heading} />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BEN.items.map((b) => (
            <StaggerItem key={b.title} className="h-full">
              <div className="flex h-full gap-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-brand-900/10">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white">
                  <b.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {b.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Booth pricing plans. */
export function Plans() {
  const plans = useSheetList<PlanItem>("boothPlans", PLANS.plans, (row, h) => ({
    name: h.get(row, "name"),
    price: h.get(row, "price"),
    unit: h.get(row, "unit"),
    tagline: h.get(row, "tagline"),
    features: h.list(h.get(row, "features")),
    featured: h.bool(h.get(row, "featured")),
  }));

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...PLANS.heading} />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-8",
                  p.featured
                    ? "border-brand-400 bg-gradient-to-b from-brand-800 to-brand-950 text-white shadow-2xl shadow-brand-900/30 lg:-translate-y-3"
                    : "border-slate-200 bg-white text-slate-700 shadow-sm"
                )}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-600 to-accent-700 px-4 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-lg">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </span>
                )}
                <h3
                  className={cn(
                    "font-display text-xl font-bold",
                    p.featured ? "text-white" : "text-slate-900"
                  )}
                >
                  {p.name}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    p.featured ? "text-brand-100/80" : "text-slate-500"
                  )}
                >
                  {p.tagline}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span
                    className={cn(
                      "font-display text-4xl font-extrabold",
                      p.featured ? "text-white" : "text-slate-900"
                    )}
                  >
                    {p.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      p.featured ? "text-brand-100/70" : "text-slate-400"
                    )}
                  >
                    {p.unit}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-[18px] w-[18px] shrink-0",
                          p.featured ? "text-gold-300" : "text-brand-600"
                        )}
                      />
                      <span className={p.featured ? "text-brand-100/90" : "text-slate-600"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    to="/contact"
                    variant={p.featured ? "accent" : "outline"}
                    size="md"
                    className="w-full"
                  >
                    Request This Option
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">{PLANS.note}</p>
      </div>
    </section>
  );
}

/** Featured exhibitors / clients logo grid. */
export function Featured() {
  const fallback: ClientItem[] = SPONSORS.map((name) => ({ name }));
  const clients = useSheetList<ClientItem>("clients", fallback, (row, h) => ({
    name: h.get(row, "name"),
    logo: h.get(row, "logo"),
  }));

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...FEAT.heading} />
        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {clients.slice(0, FEAT.count).map((c, i) => (
            <StaggerItem key={c.name || i}>
              <div className="flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-slate-500 transition hover:border-brand-200 hover:bg-white hover:shadow-md">
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-12 max-w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex items-center gap-2 font-display text-base font-bold">
                    <span className="inline-block h-2 w-2 rotate-45 rounded-[2px] bg-gradient-to-br from-brand-500 to-accent-600" />
                    {c.name}
                  </span>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** 4-step process. */
export function HowTo() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...HOW.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {HOW.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-6">
                <span className="font-display text-5xl font-extrabold text-brand-100">
                  {i + 1}
                </span>
                <span className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Stall registration form. */
export function ExhibitForm() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...FORM.heading} />
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-10">
          <ExhibitorForm />
        </div>
      </div>
    </section>
  );
}
