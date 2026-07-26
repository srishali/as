import { useEffect, useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Ticket, Building2 } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { NAV_LINKS } from "../config/site.config";
import { NAVBAR } from "../config/view-config";
import { useRegistrationModal } from "./RegistrationModalContext";
import { cn } from "../lib/utils";

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const registrationModal = useRegistrationModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome || open;

  // Filter + sort nav links by enabled and order
  const activeLinks = useMemo(() => {
    return [...NAV_LINKS]
      .filter((l) => l.enabled !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, []);

  if (!NAVBAR.enabled) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {NAVBAR.logo.enabled && (
          <div style={{ order: NAVBAR.logo.order }}>
            <Logo light={!solid} />
          </div>
        )}

        {/* Desktop nav */}
        {NAVBAR.links.enabled && (
          <ul
            className="hidden items-center gap-1 lg:flex"
            style={{ order: NAVBAR.links.order }}
          >
            {activeLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      solid
                        ? isActive
                          ? "text-brand-700"
                          : "text-slate-600 hover:text-brand-700"
                        : isActive
                          ? "text-white"
                          : "text-white/80 hover:text-white",
                      isActive &&
                        (solid
                          ? "bg-brand-50"
                          : "bg-white/10 backdrop-blur-sm")
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {NAVBAR.cta.enabled && (
          <div
            className="hidden items-center gap-2 lg:flex"
            style={{ order: NAVBAR.cta.order }}
          >
            <Button variant={solid ? "primary" : "light"} size="md" onClick={() => registrationModal.open("chooser")}>
              <Ticket className="h-4 w-4" />
              Register
            </Button>
          </div>
        )}

        {/* Mobile toggle */}
        {NAVBAR.mobileToggle.enabled && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors lg:hidden",
              solid
                ? "border-slate-200 text-slate-700 hover:bg-slate-100"
                : "border-white/30 text-white hover:bg-white/10"
            )}
            style={{ order: NAVBAR.mobileToggle.order }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </nav>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "overflow-hidden border-t border-slate-200 bg-white transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {activeLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-700 hover:bg-slate-50"
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="flex flex-col gap-2 pt-2">
            <Button variant="primary" size="lg" className="w-full" onClick={() => registrationModal.open("exhibitor")}>
              <Building2 className="h-4 w-4" />
              Exhibitor Registration
            </Button>
            <Button variant="accent" size="lg" className="w-full" onClick={() => registrationModal.open("visitor")}>
              <Ticket className="h-4 w-4" />
              Visitor Passes
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
