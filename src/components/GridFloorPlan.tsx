import { cn } from "../lib/utils";
import type { FloorPlanStall } from "../lib/floorPlanData";

function statusAvailable(status: string) {
  return /available|active|open|interest/i.test(status) && !/book|sold|hold|inactive/i.test(status);
}

/** Read numeric dimensions from values such as "6", "6 m", or "6.0". */
function dimension(value: string, fallback = 3) {
  const parsed = Number.parseFloat(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/**
 * Compact plan scale: 11 screen pixels represent one metre.
 * This keeps booths proportional while fitting many booths on a normal screen.
 */
function boothSize(stall: FloorPlanStall) {
  let width = dimension(stall.width);
  let length = dimension(stall.length);

  // If dimensions are unavailable, derive a square from total area.
  if (!stall.width && !stall.length && stall.totalArea) {
    const side = Math.sqrt(dimension(stall.totalArea, 9));
    width = side;
    length = side;
  }

  return {
    width: Math.max(30, Math.round(width * 11)),
    height: Math.max(30, Math.round(length * 11)),
  };
}

export function GridFloorPlan({
  stalls,
  selectedBoothId,
  onBoothClick,
}: {
  stalls: FloorPlanStall[];
  selectedBoothId?: string | null;
  onBoothClick: (id: string) => void;
}) {
  if (stalls.length === 0) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center">
        <p className="text-sm font-semibold text-slate-700">No booths mapped yet.</p>
        <p className="mt-1 text-xs text-slate-500 max-w-[260px]">
          Add rows to the Google Sheet and assign them to this Floor Plan.
        </p>
      </div>
    );
  }

  // Group stalls by Category for a structured visual layout
  const grouped = stalls.reduce((acc, stall) => {
    const cat = stall.category || "Standard Booths";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(stall);
    return acc;
  }, {} as Record<string, FloorPlanStall[]>);

  return (
    <div className="space-y-5 p-3 sm:p-5">
      {Object.entries(grouped).map(([category, catStalls]) => (
        <section key={category}>
          <h4 className="mb-2.5 font-display text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {category}
          </h4>
          <div className="flex flex-wrap items-start gap-1.5 rounded-xl bg-slate-100/70 p-2">
            {catStalls.map((stall) => {
              const available = statusAvailable(stall.status);
              const occupied = /reserved|booked|sold|hold|inactive/i.test(stall.status);
              const isSelected = selectedBoothId === stall.boothId;
              const size = boothSize(stall);

              return (
                <button
                  key={stall.srNo || stall.boothId}
                  type="button"
                  onClick={() => onBoothClick(stall.boothId)}
                  style={{ width: size.width, height: size.height }}
                  title={`${stall.boothId} · ${stall.width || "?"} × ${stall.length || "?"} m · ${stall.status}`}
                  className={cn(
                    "relative flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-md border p-1 text-center transition-all hover:-translate-y-0.5 hover:shadow-md",
                    isSelected
                      ? "border-brand-700 bg-brand-700 text-white shadow-lg shadow-brand-900/20"
                      : available
                        ? "border-slate-200 bg-white hover:border-brand-300"
                        : occupied
                          ? "border-slate-200 bg-slate-100 opacity-80"
                          : "border-amber-200 bg-amber-50"
                  )}
                >
                  <span className="max-w-full truncate font-mono text-[9px] font-bold leading-none tracking-tight sm:text-[10px]">
                    {stall.boothId}
                  </span>
                  {stall.width && stall.length && size.height >= 42 && (
                    <span className={cn("mt-1 text-[7px] font-semibold leading-none", isSelected ? "text-brand-200" : "text-slate-400")}>
                      {stall.width}×{stall.length}m
                    </span>
                  )}
                  
                  {/* Occupied badge / Exhibitor Name */}
                  {occupied && stall.exhibitorName && (
                    <div className={cn("absolute bottom-0 left-0 right-0 px-1 py-0.5", isSelected ? "bg-brand-800/50" : "bg-slate-200/70")}>
                      <span className={cn("block truncate text-[6px] font-bold", isSelected ? "text-white" : "text-slate-600")}>
                        {stall.exhibitorName}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
