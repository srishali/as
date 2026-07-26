import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-700 shadow-lg shadow-brand-700/30",
        className
      )}
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-white" fill="none">
        <path
          d="M16 3l3.5 5.2L26 9.8l-4.5 4.6 1 6.6L16 18l-6.5 3 1-6.6L6 9.8l6.5-1.6L16 3z"
          fill="currentColor"
          opacity="0.18"
        />
        <path
          d="M7 22h6l1.2-2.2c.6-1.1 2-1.1 2.6 0L18 22h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 26l3-7.5c.5-1.2 1.6-2 2.9-2h8.2c1.3 0 2.4.8 2.9 2L26 26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="26" r="2" fill="currentColor" />
        <circle cx="20" cy="26" r="2" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="Bengaluru Auto Expo 2026 — Home"
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[0.95rem] font-extrabold tracking-tight",
            light ? "text-white" : "text-slate-900"
          )}
        >
          BENGALURU <span className="text-gradient">AUTO EXPO</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.32em]",
            light ? "text-brand-100/70" : "text-slate-400"
          )}
        >
          8–11 Oct 2026 · India
        </span>
      </span>
    </Link>
  );
}
