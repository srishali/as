import { cn } from "../lib/utils";
import { Reveal } from "./Reveal";
import type { HeadingConfig } from "../config/site.config";

type SectionHeadingProps = HeadingConfig & {
  className?: string;
};

/**
 * Standard section heading. Supports config-driven usage:
 *   <SectionHeading {...SECTIONS.highlights.heading} />
 * `title` renders normally, `accent` renders in the brand gradient,
 * and `align` / `light` control layout and theme.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  suffix,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
            light
              ? "border-white/25 bg-white/10 text-white"
              : "border-brand-200 bg-brand-50 text-brand-700"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-600" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.7rem]",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className={light ? "text-gradient-light" : "text-gradient"}>
              {accent}
            </span>
          </>
        )}
        {suffix && <>{suffix}</>}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-brand-100/80" : "text-slate-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
