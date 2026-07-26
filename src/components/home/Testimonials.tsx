import { Quote } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { Extras } from "../Extras";
import { SECTIONS, type Testimonial } from "../../config/site.config";
import { useSheetList } from "../../lib/useSheet";

const S = SECTIONS.testimonials;

type Item = Testimonial & {
  photo?: string;
  extra?: { label: string; value: string }[];
};

const avatarGradients = [
  "from-brand-600 to-accent-600",
  "from-accent-600 to-gold-500",
  "from-brand-700 to-brand-500",
];

export function Testimonials() {
  const items = useSheetList<Item>("testimonials", S.items, (row, h) => ({
    quote: h.get(row, "quote"),
    name: h.get(row, "name"),
    role: h.get(row, "role"),
    initials: h.get(row, "initials"),
    photo: h.get(row, "photo"),
    extra: row.extra,
  }));

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-accent-100/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...S.heading} />

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <StaggerItem key={t.name || i} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10">
                <Quote className="h-9 w-9 text-brand-200" />
                {t.quote && (
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                    "{t.quote}"
                  </blockquote>
                )}
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${
                        avatarGradients[i % avatarGradients.length]
                      } font-display text-sm font-bold text-white`}
                    >
                      {t.initials || (t.name ? t.name.charAt(0) : "•")}
                    </span>
                  )}
                  <div>
                    {t.name && (
                      <div className="font-display text-sm font-bold text-slate-900">
                        {t.name}
                      </div>
                    )}
                    {t.role && (
                      <div className="text-xs text-slate-500">{t.role}</div>
                    )}
                  </div>
                </figcaption>
                <Extras items={t.extra} />
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
