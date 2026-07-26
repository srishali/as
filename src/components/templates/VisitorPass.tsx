/**
 * VisitorPass — Branded 3in × 4in on-screen badge component.
 * Layout mirrors the canvas renderer for absolute visual consistency.
 */
import { forwardRef } from "react";
import { EVENT } from "../../config/site.config";
import { LogoMark } from "../Logo";

export interface PassData {
  id: string;
  fullName: string;
  gender: string;
  dob: string;
  qrDataUrl: string;
  issuedAt: string;
}

/** 3in × 4in at 96 CSS DPI → 288 × 384 px. */
const PASS_WIDTH = 288;
const PASS_HEIGHT = 384;

const WEBSITE = EVENT.website || "bengaluruautoexpo.in";

export const VisitorPassCard = forwardRef<HTMLDivElement, { data: PassData }>(
  function VisitorPassCard({ data }, ref) {
    const { id, fullName, qrDataUrl } = data;

    return (
      <div
        ref={ref}
        style={{ width: `${PASS_WIDTH}px`, height: `${PASS_HEIGHT}px` }}
        className="overflow-hidden rounded-[10px] bg-white text-slate-900 shadow-2xl flex flex-col"
      >
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-brand-700 via-accent-700 to-brand-800" />

        {/* TOP — logo and event title only */}
        <div className="flex flex-col items-center justify-center pt-5 pb-3 text-center">
          <LogoMark className="h-10 w-10" />
          <p className="mt-2 text-center text-[10px] font-extrabold tracking-[0.12em] text-brand-950">
            {EVENT.name.toUpperCase()} {EVENT.year}
          </p>
        </div>

        {/* MIDDLE — QR + Visitor ID + Name */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="rounded-lg border border-slate-200 p-1 bg-white">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Visitor QR" className="h-24 w-24" />
            ) : (
              <div className="h-24 w-24 rounded bg-slate-100 animate-pulse" />
            )}
          </div>
          <p className="mt-3 font-mono text-[12px] font-extrabold tracking-[0.12em] text-brand-700">
            {id}
          </p>
          <p className="mt-1 text-[12px] font-extrabold text-brand-950 text-center uppercase">
            {fullName}
          </p>
        </div>

        {/* Spacing before bottom section */}
        <div className="h-5" />

        {/* BOTTOM — event details, gradient background */}
        <div className="bg-gradient-to-br from-brand-800 via-brand-900 to-accent-800 px-4 py-4 text-center text-white">
          <p className="text-[9px] font-extrabold tracking-[0.15em] uppercase">
            {EVENT.dates}
          </p>
          <p className="text-[8px] font-medium text-brand-100/85">
            10:00 AM – 7:00 PM DAILY
          </p>
          <p className="mt-0.5 text-[8px] font-medium text-brand-100/85 uppercase">
            BIEC, BENGALURU, INDIA
          </p>
          <p className="mt-2 text-[8px] font-semibold tracking-wide text-gold-300">
            {WEBSITE}
          </p>
        </div>
      </div>
    );
  }
);
