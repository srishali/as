import { ContactForm } from "../ContactForm";
import { Reveal } from "../Reveal";
import { SECTIONS } from "../../config/site.config";

const S = SECTIONS.quickContact;

export function QuickContact() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-brand-900/10 lg:grid lg:grid-cols-5">
            {/* Brand panel */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 p-8 text-white sm:p-12 lg:col-span-2">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-600/30 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                  {S.badge}
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {S.title}
                </h2>
                <p className="mt-4 text-brand-100/80">{S.blurb}</p>

                <ul className="mt-8 space-y-4">
                  {S.details.map((d) => (
                    <li key={d.label} className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                        <d.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-brand-100/60">
                          {d.label}
                        </div>
                        {d.href ? (
                          <a
                            href={d.href}
                            className="text-sm font-medium text-white hover:text-gold-300"
                          >
                            {d.value}
                          </a>
                        ) : (
                          <div className="text-sm font-medium text-white">
                            {d.value}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form panel */}
            <div className="bg-slate-50/50 p-8 sm:p-12 lg:col-span-3">
              <h3 className="font-display text-xl font-bold text-slate-900">
                {S.formTitle}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{S.formSub}</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
