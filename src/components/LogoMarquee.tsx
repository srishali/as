import { cn } from "../lib/utils";
import { SPONSORS } from "../config/site.config";
import { useSheetList } from "../lib/useSheet";

type Sponsor = { name: string; logo?: string };

function Wordmark({ item }: { item: Sponsor }) {
  if (item.logo) {
    return (
      <span className="mx-6 inline-flex items-center">
        <img
          src={item.logo}
          alt={item.name}
          className="h-8 w-auto object-contain sm:h-10"
          loading="lazy"
        />
      </span>
    );
  }
  return (
    <span className="mx-6 inline-flex items-center gap-2 whitespace-nowrap font-display text-xl font-bold tracking-tight sm:text-2xl">
      <span className="inline-block h-2.5 w-2.5 rotate-45 rounded-[3px] bg-gradient-to-br from-brand-500 to-accent-600" />
      {item.name}
    </span>
  );
}

export function LogoMarquee({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const fallback: Sponsor[] = SPONSORS.map((name) => ({ name }));
  const sponsors = useSheetList<Sponsor>("sponsors", fallback, (row, h) => ({
    name: h.get(row, "name"),
    logo: h.get(row, "logo"),
  }));

  const row = [...sponsors, ...sponsors];
  return (
    <div
      className={cn(
        "mask-fade-x overflow-hidden",
        dark ? "text-white/70" : "text-slate-400",
        className
      )}
    >
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <Wordmark key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
