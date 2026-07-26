import { Check, Building2, ArrowRight, Globe, Mail, Phone, MapPin, FileText } from "lucide-react";
import { useRegistrationModal } from "./RegistrationModalContext";
import type { FloorPlanStall } from "../lib/floorPlanData";
import { cn } from "../lib/utils";

function statusAvailable(status: string) {
  return /available|active|open|interest/i.test(status) && !/book|sold|hold|inactive/i.test(status);
}

/* ── Exhibitor logo size — change freely to any px value ───── */
const LOGO_WIDTH = 120;
const LOGO_HEIGHT = 120;

export function FloorPlanInfoPanel({ stall }: { stall: FloorPlanStall | null }) {
  const { open } = useRegistrationModal();
  const available = stall ? statusAvailable(stall.status) : false;

  if (!stall) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
        <div className="rounded-full bg-brand-50 p-4">
          <Building2 className="h-8 w-8 text-brand-600" />
        </div>
        <p className="mt-4 text-sm font-bold text-slate-800">No Booth Selected</p>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-[240px]">
          Click any highlighted booth on the floor plan to view its details and booking options.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header: Logo + Booth ID, Category, Exhibitor Name, Status */}
      <div className="flex items-start gap-5">
        <div
          className="shrink-0 flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-md"
          style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
        >
          {stall.exhibitorLogo ? (
            <img
              src={stall.exhibitorLogo}
              alt={stall.exhibitorName}
              className="h-full w-full object-contain"
            />
          ) : (
            <Building2 className="h-11 w-11 text-slate-300" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {/* 1. Booth ID */}
          <h3 className="font-display text-xl font-bold text-slate-900">{stall.boothId}</h3>
          {/* 2. Category */}
          {stall.category && (
            <span className="mt-1.5 inline-block rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
              {stall.category}
            </span>
          )}
          {/* 3. Exhibitor Name */}
          {stall.exhibitorName && (
            <p className="mt-2 truncate text-sm font-semibold text-slate-700">{stall.exhibitorName}</p>
          )}
          {/* 4. Status */}
          <span
            className={cn(
              "mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
              available
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-slate-100 text-slate-500 border border-slate-200"
            )}
          >
            {stall.status || "Available"}
          </span>
        </div>
      </div>

      {/* Booth specifications are public only while the booth is available. */}
      {available && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Booth Specifications</h4>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Dimensions</p>
              <p className="mt-0.5 text-sm font-bold text-slate-800">{stall.width} × {stall.length} m</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Total Area</p>
              <p className="mt-0.5 text-sm font-bold text-slate-800">{stall.totalArea || "—"} m²</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Rate / m²</p>
              <p className="mt-0.5 text-sm font-bold text-slate-800">{stall.rate || "—"}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Total Amount</p>
              <p className="mt-0.5 text-sm font-bold text-slate-800">{stall.totalAmount || "—"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Exhibitor Contact Details (if available) */}
      {(stall.phone || stall.email || stall.website || stall.address) && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Details</h4>
          <div className="mt-3 space-y-2.5">
            {stall.phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-600" />
                <a href={`tel:${stall.phone}`} className="text-sm font-medium text-slate-700 hover:text-brand-700">{stall.phone}</a>
              </div>
            )}
            {stall.email && (
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-600" />
                <a href={`mailto:${stall.email}`} className="truncate text-sm font-medium text-slate-700 hover:text-brand-700">{stall.email}</a>
              </div>
            )}
            {stall.website && (
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 shrink-0 text-brand-600" />
                <a href={stall.website} target="_blank" rel="noreferrer" className="truncate text-sm font-medium text-brand-700 hover:underline">{stall.website}</a>
              </div>
            )}
            {(stall.address || stall.city || stall.state) && (
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <p className="text-sm font-medium text-slate-700 leading-snug">
                  {[stall.address, stall.city, stall.state].filter(Boolean).join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Brief / Description */}
      {stall.brief && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <FileText className="h-3 w-3" /> Exhibitor Brief
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">{stall.brief}</p>
        </div>
      )}

      {/* Action Button */}
      {available ? (
        <button
          type="button"
          onClick={() => open("exhibitor", {
            boothId: stall.boothId,
            category: stall.category,
            width: stall.width,
            length: stall.length,
            totalArea: stall.totalArea,
            rate: stall.rate,
            totalAmount: stall.totalAmount
          })}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-accent-700 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-700/30"
        >
          <Building2 className="h-5 w-5" />
          Book Stall {stall.boothId}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 rounded-full bg-slate-100 py-3.5 text-sm font-bold text-slate-400 border border-slate-200 cursor-not-allowed">
          <Check className="h-5 w-5" />
          Stall Already Booked
        </div>
      )}
    </div>
  );
}
