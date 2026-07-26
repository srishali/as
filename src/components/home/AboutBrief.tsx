import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { SECTIONS } from "../../config/site.config";

const S = SECTIONS.aboutBrief;

export function AboutBrief() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-5">
            <SectionHeading {...S.heading} />

            <Reveal delay={0.1}>
              <ul className="mt-7 space-y-3">
                {S.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-sm font-medium text-slate-600">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to={S.primaryBtn.to} variant="primary" size="md">
                  {S.primaryBtn.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button to={S.secondaryBtn.to} variant="ghost" size="md">
                  {S.secondaryBtn.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100 via-transparent to-accent-100 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-brand-900/10">
                  <img
                    src={S.image.src}
                    alt={S.image.alt}
                    className="h-[340px] w-full object-cover sm:h-[460px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent" />
                </div>

                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-2 w-56 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-brand-900/10 sm:-left-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-display text-2xl font-extrabold text-slate-900">
                        {S.stat.value}
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        {S.stat.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-2 top-6 rounded-2xl border border-white/20 bg-brand-900/80 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:-right-5">
                  <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-brand-100/80">
                    {S.badge.top}
                  </div>
                  <div className="font-display text-xl font-bold">{S.badge.value}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
