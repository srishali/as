import { type ChangeEvent, type ReactNode } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import type { ValidationResult } from "../../lib/validation";

/* ── shared input className ──────────────────────────────────────── */
export function inputCls(touched: boolean, res: ValidationResult | null) {
  return cn(
    "w-full rounded-xl border bg-slate-50/70 px-4 py-3 text-sm text-slate-900",
    "placeholder:text-slate-400 transition-all duration-200",
    "focus:bg-white focus:outline-none focus:ring-4",
    !touched || !res
      ? "border-slate-200 focus:border-brand-500 focus:ring-brand-500/10"
      : res.ok
        ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/10"
        : "border-red-400 focus:border-red-500 focus:ring-red-500/10"
  );
}

/* ── label className ─────────────────────────────────────────────── */
export const labelCls =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600";

/* ── FormField wrapper ───────────────────────────────────────────── */
export function FormField({
  label,
  required,
  touched,
  result,
  children,
}: {
  label: string;
  required?: boolean;
  touched: boolean;
  result: ValidationResult | null;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative">
        {children}
        {touched && result && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            {result.ok ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </span>
        )}
      </div>
      {touched && result && !result.ok && (
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {result.msg}
        </p>
      )}
    </div>
  );
}

/* ── PhoneInput — strips non-digits, caps at 10 chars ───────────── */
export function PhoneInput({
  value,
  onChange,
  onBlur,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  className?: string;
}) {
  function handle(e: ChangeEvent<HTMLInputElement>) {
    // Allow only digits, cap at 10
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(digits);
  }
  return (
    <input
      type="tel"
      inputMode="numeric"
      maxLength={10}
      placeholder="10-digit mobile number"
      value={value}
      onChange={handle}
      onBlur={onBlur}
      className={className}
    />
  );
}
