import { cn } from "../../lib/utils";
import { useSheetList } from "../../lib/useSheet";
import { Reveal } from "../Reveal";
import { SECTIONS } from "../../config/site.config";

const S = SECTIONS.exhibitorMarquee;

type ExhibitorItem = { name: string; logo?: string; category?: string };

function ExhibitorCard({ item }: { item: ExhibitorItem }) {
  return (
    <div className="mx-3 inline-flex w-40 shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:border-brand-200 hover:shadow-md sm:w-48">
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.name}
          className="h-10 max-w-full object-contain"
          loading="lazy"
        />
      ) : (
        <div className="flex h-10 items-center justify-center gap-1.5">
          <span className="inline-block h-2 w-2 rotate-45 rounded-[2px] bg-gradient-to-br from-brand-500 to-accent-600" />
          <span className="font-display text-sm font-bold text-slate-700 leading-tight text-center">
            {item.name}
          </span>
        </div>
      )}
      {item.category && (
        <span className="mt-2 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
          {item.category}
        </span>
      )}
    </div>
  );
}

export function ExhibitorMarquee() {
  const fallback: ExhibitorItem[] = S.fallbackNames.map((name) => ({ name }));
  const items = useSheetList<ExhibitorItem>("exhibitors", fallback, (row, h) => ({
    name: h.get(row, "name"),
    logo: h.get(row, "logo"),
    category: h.get(row, "category"),
  }));

  const row = [...items, ...items];

  return (
    <section className="border-y border-slate-100 bg-slate-50/70 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {S.label}
          </p>
        </Reveal>
        <div
          className={cn("mask-fade-x overflow-hidden")}
        >
          <div className="flex w-max animate-marquee items-stretch hover:[animation-play-state:paused]">
            {row.map((item, i) => (
              <ExhibitorCard key={`${item.name}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
