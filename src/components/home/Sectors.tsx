import { ArrowRight, Car } from "lucide-react";
import { SECTIONS, type Sector } from "../../config/site.config";
import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { Button } from "../Button";
import { Extras } from "../Extras";
import { CustomIcon } from "../CustomIcon";
import { useSheetList } from "../../lib/useSheet";

const S = SECTIONS.sectors;

type SectorItem = Sector & { customIcon?: string; extra?: { label: string; value: string }[] };

export function Sectors() {
  const items = useSheetList<SectorItem>("sectors", S.items, (row, h) => ({
    icon: h.icon(h.get(row, "icon"), Car),
    customIcon: h.get(row, "customIcon"),
    title: h.get(row, "title"),
    desc: h.get(row, "desc"),
    extra: row.extra,
  }));

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...S.heading} />

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((s, i) => (
            <StaggerItem key={s.title || i} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-accent-200 hover:bg-white hover:shadow-xl hover:shadow-brand-900/10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-accent-700 shadow-sm ring-1 ring-slate-200 transition duration-300 group-hover:bg-accent-700 group-hover:text-white">
                  <CustomIcon
                    customIconUrl={s.customIcon}
                    FallbackIcon={s.icon}
                    className="h-6 w-6"
                    alt={s.title}
                  />
                </span>
                {s.title && (
                  <h3 className="mt-4 font-display text-sm font-bold leading-snug text-slate-900">
                    {s.title}
                  </h3>
                )}
                {s.desc && (
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {s.desc}
                  </p>
                )}
                <Extras items={s.extra} />
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-gradient-to-r from-brand-50 to-accent-50/60 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              {S.ctaStrip.title}
            </h3>
            <p className="text-sm text-slate-500">{S.ctaStrip.text}</p>
          </div>
          <Button to={S.ctaStrip.button.to} variant="primary" size="lg" className="shrink-0">
            {S.ctaStrip.button.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
