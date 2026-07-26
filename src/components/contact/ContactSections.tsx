import { useState } from "react";
import { MessageSquare, ChevronDown, Navigation, Send } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { Button } from "../Button";
import { ContactForm } from "../ContactForm";
import { SECTIONS } from "../../config/site.config";
import { useSheetList } from "../../lib/useSheet";
import { cn } from "../../lib/utils";

type FaqItem = { q: string; a: string };

const METHODS = SECTIONS.contactMethods;
const FORMBLOCK = SECTIONS.contactFormBlock;
const MAP = SECTIONS.contactMap;
const FAQ = SECTIONS.contactFaq;

/** Quick contact method cards. */
export function ContactMethods() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHODS.items.map((m, i) => {
            const inner = (
              <div className="flex h-full items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-brand-900/10">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white">
                  <m.icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {m.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-800">
                    {m.value}
                  </div>
                </div>
              </div>
            );
            return (
              <Reveal key={m.label} delay={i * 0.06}>
                {m.href ? (
                  <a
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Departments list + enquiry form. */
export function ContactFormBlock() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading {...FORMBLOCK.heading} />

            <div className="mt-8 space-y-3">
              {FORMBLOCK.departments.map((d) => (
                <a
                  key={d.email}
                  href={`mailto:${d.email}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <MessageSquare className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {d.name}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-accent-700 group-hover:underline">
                    {d.email}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/10 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Embedded Google Map. */
export function ContactMapBlock() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-brand-900/10">
          <iframe
            title="Map to Bengaluru Auto Expo 2026 venue"
            src={MAP.mapSrc}
            className="h-[400px] w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button href={MAP.directionsUrl} variant="primary" size="md">
            <Navigation className="h-4 w-4" />
            {MAP.directionsLabel}
          </Button>
          <Button to="/exhibitors" variant="ghost" size="md">
            <Send className="h-4 w-4" />
            {MAP.registerLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** FAQ accordion. */
export function ContactFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const items = useSheetList<FaqItem>("faqs", FAQ.items, (row, h) => ({
    q: h.get(row, "q"),
    a: h.get(row, "a"),
  }));

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...FAQ.heading} />
        <div className="mt-10 space-y-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition",
                  isOpen ? "border-brand-200 shadow-md" : "border-slate-200"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-bold text-slate-900 sm:text-base">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
