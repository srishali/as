import { Handshake } from "lucide-react";
import { LogoMarquee } from "../LogoMarquee";
import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { SECTIONS } from "../../config/site.config";

const S = SECTIONS.partnersBar;

export function PartnersBar() {
  return (
    <section className="border-y border-slate-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          {S.marqueeLabel}
        </p>
        <div className="mt-8">
          <LogoMarquee />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {S.tiers.map((t, i) => (
            <Reveal key={t.role} delay={i * 0.06}>
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white">
                  <t.icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
                    {t.role}
                  </div>
                  <div className="font-display text-sm font-bold text-slate-900">
                    {t.brand}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl bg-gradient-to-r from-brand-700 to-accent-700 px-6 py-8 text-center text-white sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <Handshake className="h-8 w-8 text-gold-300" />
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
