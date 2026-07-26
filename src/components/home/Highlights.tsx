import { Lightbulb } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { Extras } from "../Extras";
import { CustomIcon } from "../CustomIcon";
import { SECTIONS, type Highlight } from "../../config/site.config";
import { useSheetList } from "../../lib/useSheet";

const S = SECTIONS.highlights;

type HighlightItem = Highlight & {
  customIcon?: string;
  extra?: { label: string; value: string }[];
};

export function Highlights() {
  const items = useSheetList<HighlightItem>(
    "highlights",
    S.items,
    (row, h) => ({
      icon: h.icon(h.get(row, "icon"), Lightbulb),
      customIcon: h.get(row, "customIcon"),
      title: h.get(row, "title"),
      desc: h.get(row, "desc"),
      extra: row.extra,
    })
  );

  return (
    <section className="relative bg-gradient-to-b from-white to-brand-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...S.heading} />

        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {items.map((h, i) => (
            <StaggerItem key={h.title || i} className="h-full">
              <article className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/10 sm:p-6">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 transition duration-300 group-hover:from-brand-700 group-hover:to-accent-700 group-hover:text-white">
                  <CustomIcon
                    customIconUrl={h.customIcon}
                    FallbackIcon={h.icon}
                    className="h-7 w-7"
                    alt={h.title}
                  />
                </span>
                {h.title && (
                  <h3 className="mt-4 font-display text-base font-bold leading-snug text-slate-900 sm:text-lg">
                    {h.title}
                  </h3>
                )}
                {h.desc && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {h.desc}
                  </p>
                )}
                <Extras items={h.extra} />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
