import { Handshake } from "lucide-react";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SECTIONS, type Partner } from "../config/site.config";
import { useSheetGroupedPartners } from "../lib/usePartners";
import { cn } from "../lib/utils";

const S = SECTIONS.partnersSection;

/** Monogram crest used as a logo placeholder. Swap with a real image via `logo`. */
function PartnerLogo({
  partner,
  badgeClass,
  Icon,
}: {
  partner: Partner;
  badgeClass: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="relative">
      <div className="rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-600 p-[2px] shadow-md shadow-brand-900/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-brand-700/25">
        {partner.logo ? (
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[14px] bg-white p-2 sm:h-20 sm:w-20">
            <img
              src={partner.logo}
              alt={`${partner.full} logo`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-[14px] bg-white sm:h-20 sm:w-20">
            <span
              className={cn(
                "px-1 font-display font-extrabold leading-none tracking-tight text-gradient",
                partner.name.length > 3 ? "text-sm sm:text-base" : "text-lg sm:text-xl"
              )}
            >
              {partner.name}
            </span>
          </div>
        )}
      </div>
      <span
        className={cn(
          "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white ring-2 ring-white",
          badgeClass
        )}
      >
        <Icon className="h-3 w-3" />
      </span>
    </div>
  );
}

export function PartnersSection() {
  const categories = useSheetGroupedPartners(S.categories);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-accent-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...S.heading} />

        <div className="mt-12 space-y-12">
          {categories.map((cat, ci) => (
            <div key={cat.title}>
              {/* Category header */}
              <Reveal>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md shadow-brand-900/10",
                      cat.badgeClass
                    )}
                  >
                    <cat.icon className="h-5 w-5" />
                  </span>
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
                      {cat.title}
                    </h3>
                    {cat.blurb && (
                      <p className="text-xs text-slate-500 sm:text-sm">
                        {cat.blurb}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-brand-200 via-slate-200 to-transparent" />
              </Reveal>

              {/* Partner cards */}
              <Stagger
                className={cn(
                  "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
                  ci % 2 === 1 && "lg:gap-5"
                )}
              >
                {cat.partners.map((p) => (
                  <StaggerItem key={p.name} className="h-full">
                    <article className="group flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/70 px-4 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-brand-900/10">
                      <PartnerLogo
                        partner={p}
                        badgeClass={cat.badgeClass}
                        Icon={cat.icon}
                      />
                      {p.name && (
                        <h4 className="mt-4 font-display text-sm font-bold text-slate-900">
                          {p.name}
                        </h4>
                      )}
                      {p.full && (
                        <p className="mt-1 text-[11px] leading-snug text-slate-500">
                          {p.full}
                        </p>
                      )}
                      {p.role && (
                        <span className="mt-3 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                          {p.role}
                        </span>
                      )}
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-brand-700 to-accent-700 px-6 py-8 text-center text-white sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <span className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/15 sm:inline-flex">
                <Handshake className="h-6 w-6 text-gold-300" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  {S.banner.title}
                </h3>
                <p className="text-sm text-brand-100/80">{S.banner.text}</p>
              </div>
            </div>
            <Button to={S.banner.button.to} variant="solidLight" size="lg" className="shrink-0">
              {S.banner.button.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
