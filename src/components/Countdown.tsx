import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const total = Math.max(0, target - Date.now());
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    milliseconds: total % 1000,
  };
}

export function Countdown({
  target,
  variant = "light",
}: {
  target: string;
  variant?: "light" | "dark";
}) {
  const targetTime = new Date(target).getTime();
  const [time, setTime] = useState(() => getRemaining(targetTime));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(targetTime)), 37);
    return () => clearInterval(id);
  }, [targetTime]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
    { label: "Millis", value: Math.floor(time.milliseconds / 10), digits: 2 },
  ];

  const isOver = time.total <= 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
      {units.map((u) => (
        <div
          key={u.label}
          className={
            variant === "light"
              ? "relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md sm:p-6"
              : "relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-lg shadow-brand-900/5 sm:p-6"
          }
        >
          <div
            className={
              variant === "light"
                ? "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                : "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent"
            }
          />
          <div
            className={
              "font-display text-4xl font-extrabold tabular-nums sm:text-5xl lg:text-6xl " +
              (variant === "light" ? "text-white" : "text-gradient")
            }
          >
            {isOver ? "0".repeat(u.digits ?? 2) : String(u.value).padStart(u.digits ?? 2, "0")}
          </div>
          <div
            className={
              "mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] sm:text-xs " +
              (variant === "light" ? "text-brand-100/80" : "text-slate-500")
            }
          >
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}
