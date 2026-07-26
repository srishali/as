import { Link } from "react-router-dom";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "../lib/utils";
import { useRegistrationModal, type RegistrationType } from "./RegistrationModalContext";

type Variant =
  | "primary"
  | "accent"
  | "outline"
  | "light"
  | "solidLight"
  | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-700 to-brand-600 text-white shadow-lg shadow-brand-700/25 hover:shadow-xl hover:shadow-brand-700/40 hover:-translate-y-0.5",
  accent:
    "bg-gradient-to-r from-accent-700 to-accent-600 text-white shadow-lg shadow-accent-700/25 hover:shadow-xl hover:shadow-accent-700/40 hover:-translate-y-0.5",
  outline:
    "border-2 border-brand-200 text-brand-700 hover:border-brand-700 hover:bg-brand-50",
  light:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
  solidLight: "bg-white text-brand-700 hover:bg-brand-50 shadow-lg shadow-black/10",
  ghost: "text-slate-600 hover:bg-slate-100",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  to,
  href,
  onClick,
  type,
  modal = true,
  disabled = false,
}: CommonProps & {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** CTA links to forms can open a popup by default. */
  modal?: boolean;
  disabled?: boolean;
}) {
  const registrationModal = useRegistrationModal();
  const classes = cn(base, variants[variant], sizes[size], className);

  // Determine modal type based on route target or CTA text
  let modalType: RegistrationType | null = null;
  if (to === "/exhibitors") {
    modalType = "exhibitor";
  } else if (to === "/visitor-pass") {
    modalType = "visitor";
  } else if (to === "/contact") {
    modalType = "contact";

    // Extract plain text from children (handles string or arrays with icons)
    const extractText = (node: ReactNode): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(extractText).join(" ");
      return "";
    };
    const text = extractText(children).trim();

    if (/Partner/i.test(text)) {
      modalType = "partner";
    } else if (/Request/i.test(text)) {
      modalType = "booth";
    } else if (/Enquire/i.test(text)) {
      modalType = "sponsor";
    }
  }

  function handleLinkClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.();
    if (modal && modalType) {
      e.preventDefault();
      registrationModal.open(modalType);
    }
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleLinkClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
