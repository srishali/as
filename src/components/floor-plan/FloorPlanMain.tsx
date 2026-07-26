import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarCheck2,
  CircleCheckBig,
  Clock3,
  LayoutGrid,
  RotateCcw,
  Search,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { EVENT, EVENT_CONFIG, SECTIONS } from "../../config/site.config";
import { fetchFloorPlanStalls, type FloorPlanStall } from "../../lib/floorPlanData";
import { buildInteractiveSvg, boothStatus, getAspect, type StatusFilter } from "../../lib/interactiveSvg";
import { FloorPlanInfoPanel } from "../FloorPlanInfoPanel";
import { Reveal } from "../Reveal";
import { cn } from "../../lib/utils";

type PlanOption = { label: string; url: string };

const PLAN_OPTIONS: PlanOption[] = [
  { label: "Floor Plan 1", url: EVENT_CONFIG.floorPlan1.enabled ? EVENT_CONFIG.floorPlan1.value : "" },
  { label: "Floor Plan 2", url: EVENT_CONFIG.floorPlan2.enabled ? EVENT_CONFIG.floorPlan2.value : "" },
  { label: "Floor Plan 3", url: EVENT_CONFIG.floorPlan3.enabled ? EVENT_CONFIG.floorPlan3.value : "" },
].filter((plan) => plan.url && plan.url !== "grid");

const CONFIG = SECTIONS.floorPlanMain;
const VIEW = CONFIG.content;
const COPY = CONFIG.labels;

export function FloorPlanMain() {
  const [selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [stalls, setStalls] = useState<FloorPlanStall[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoothId, setSelectedBoothId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [hoveredBoothId, setHoveredBoothId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const dragMoved = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedPlan?.url) return;
    let active = true;
    setSvgMarkup("");
    fetch(selectedPlan.url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => { if (active) { setSvgMarkup(text); setScale(1); setOffset({ x: 0, y: 0 }); } })
      .catch(() => { if (active) setSvgMarkup(""); });
    return () => { active = false; };
  }, [selectedPlan]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchFloorPlanStalls().then((data) => { if (active) { setStalls(data); setLoading(false); } });
    return () => { active = false; };
  }, []);

  const visibleStalls = useMemo(
    () => stalls.filter((stall) => !stall.floorPlan || stall.floorPlan === selectedPlan?.label),
    [stalls, selectedPlan]
  );
  const selectedStall = useMemo(
    () => visibleStalls.find((stall) => stall.boothId === selectedBoothId) || null,
    [visibleStalls, selectedBoothId]
  );
  const hoveredStall = useMemo(
    () => visibleStalls.find((stall) => stall.boothId === hoveredBoothId) || null,
    [visibleStalls, hoveredBoothId]
  );
  const stats = useMemo(() => ({
    all: visibleStalls.length,
    available: visibleStalls.filter((stall) => boothStatus(stall.status) === "available").length,
    reserved: visibleStalls.filter((stall) => boothStatus(stall.status) === "reserved").length,
    booked: visibleStalls.filter((stall) => boothStatus(stall.status) === "booked").length,
  }), [visibleStalls]);
  const categories = useMemo(
    () => [...new Set(visibleStalls.map((stall) => stall.category).filter(Boolean))].sort(),
    [visibleStalls]
  );
  const highlightedIds = useMemo(() => new Set(
    visibleStalls
      .filter((stall) => statusFilter === "all" || boothStatus(stall.status) === statusFilter)
      .filter((stall) => categoryFilter === "all" || stall.category === categoryFilter)
      .map((stall) => stall.boothId)
  ), [visibleStalls, statusFilter, categoryFilter]);
  const filterActive = statusFilter !== "all" || categoryFilter !== "all";
  const aspect = useMemo(() => getAspect(svgMarkup), [svgMarkup]);
  const orientation = aspect >= 1 ? "landscape" : "portrait";
  const interactiveMarkup = useMemo(
    () => buildInteractiveSvg(svgMarkup, visibleStalls, selectedBoothId, highlightedIds, filterActive),
    [svgMarkup, visibleStalls, selectedBoothId, highlightedIds, filterActive]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const zoom = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      setScale((current) => Math.max(1, Math.min(10, current + (event.deltaY > 0 ? -0.3 : 0.3))));
    };
    viewport.addEventListener("wheel", zoom, { passive: false });
    return () => viewport.removeEventListener("wheel", zoom);
  }, []);

  function resetView() { setScale(1); setOffset({ x: 0, y: 0 }); }
  function startDrag(x: number, y: number) {
    if (scale <= 1) return;
    dragMoved.current = false;
    setDragging(true);
    dragStart.current = { x: x - offset.x, y: y - offset.y };
  }
  function moveDrag(x: number, y: number) {
    if (!dragging) return;
    dragMoved.current = true;
    setOffset({ x: x - dragStart.current.x, y: y - dragStart.current.y });
  }

  const alignment = CONFIG.align === "center" ? "text-center" : CONFIG.align === "right" ? "text-right" : "text-left";

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(VIEW.heading.enabled || VIEW.planSelector.enabled) && (
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            {VIEW.heading.enabled && (
              <Reveal className={alignment}>
                <div style={{ order: VIEW.heading.order }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{COPY.eyebrow}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">{COPY.title} {EVENT.venueShort}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-slate-500">{COPY.subtitle}</p>
                </div>
              </Reveal>
            )}
            {VIEW.planSelector.enabled && PLAN_OPTIONS.length > 1 && (
              <div className="flex items-center gap-2" style={{ order: VIEW.planSelector.order }}>
                {PLAN_OPTIONS.map((plan) => (
                  <button key={plan.label} type="button"
                    onClick={() => { setSelectedPlan(plan); setSelectedBoothId(null); setStatusFilter("all"); setCategoryFilter("all"); resetView(); }}
                    className={cn("rounded-full border px-4 py-2 text-xs font-semibold transition", selectedPlan?.label === plan.label ? "border-brand-700 bg-brand-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-300")}
                  >{plan.label}</button>
                ))}
              </div>
            )}
          </div>
        )}

        {(VIEW.stats.enabled || VIEW.categoryFilter.enabled) && (
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5" style={{ order: Math.min(VIEW.stats.order, VIEW.categoryFilter.order) }}>
              {VIEW.stats.enabled && ([
                { key: "all" as StatusFilter, label: COPY.totalBooths, value: stats.all, icon: LayoutGrid, style: "from-brand-700 to-brand-500" },
                { key: "available" as StatusFilter, label: COPY.available, value: stats.available, icon: CircleCheckBig, style: "from-emerald-700 to-emerald-500" },
                { key: "reserved" as StatusFilter, label: COPY.reserved, value: stats.reserved, icon: Clock3, style: "from-amber-600 to-gold-400" },
                { key: "booked" as StatusFilter, label: COPY.booked, value: stats.booked, icon: CalendarCheck2, style: "from-slate-700 to-slate-500" },
              ]).map((card) => (
                <button key={card.key} type="button" onClick={() => { setStatusFilter(card.key); setSelectedBoothId(null); }}
                  className={cn("flex items-center gap-4 rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg", statusFilter === card.key ? "border-brand-400 ring-2 ring-brand-100" : "border-slate-200")}
                >
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.style} text-white`}><card.icon className="h-5 w-5" /></span>
                  <span><span className="block font-display text-2xl font-extrabold text-slate-900">{card.value}</span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">{card.label}</span></span>
                </button>
              ))}
              {VIEW.categoryFilter.enabled && (
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <Search className="h-5 w-5 shrink-0 text-brand-700" />
                  <span className="min-w-0 flex-1"><span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">{COPY.category}</span>
                    <select value={categoryFilter} onChange={(event) => { setCategoryFilter(event.target.value); setSelectedBoothId(null); }} className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none">
                      <option value="all">{COPY.allCategories}</option>
                      {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                  </span>
                </label>
              )}
            </div>
            {filterActive && <div className="mt-3 flex justify-between rounded-xl border border-brand-100 bg-brand-50/70 px-4 py-2 text-xs text-brand-800"><span><strong>{highlightedIds.size}</strong> {COPY.matchingBooths}</span><button type="button" onClick={() => { setStatusFilter("all"); setCategoryFilter("all"); }} className="font-bold hover:underline">{COPY.clearFilters}</button></div>}
          </Reveal>
        )}

        {(VIEW.viewer.enabled || VIEW.information.enabled) && (
          <div className={cn("mt-8 flex gap-8", orientation === "landscape" ? "flex-col" : "flex-col lg:flex-row lg:items-start")}>
            {VIEW.viewer.enabled && (
              <div className={orientation === "landscape" ? "w-full" : "w-full lg:min-w-0 lg:flex-1"} style={{ order: VIEW.viewer.order }}>
                <Reveal>
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-brand-900/10">
                    {VIEW.viewerControls.enabled && <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3"><div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><Search className="h-4 w-4 text-brand-600" />{COPY.viewerHelp}</div><div className="flex gap-1"><button type="button" onClick={() => setScale((v) => Math.max(1, v - 0.3))} className="rounded-lg p-2 hover:bg-slate-100"><ZoomOut className="h-4 w-4" /></button><button type="button" onClick={() => setScale((v) => Math.min(10, v + 0.3))} className="rounded-lg p-2 hover:bg-slate-100"><ZoomIn className="h-4 w-4" /></button><button type="button" onClick={resetView} className="rounded-lg p-2 hover:bg-slate-100"><RotateCcw className="h-4 w-4" /></button></div></div>}
                    <div ref={viewportRef} className="relative overflow-hidden bg-slate-100/50" style={{ aspectRatio: svgMarkup ? Math.max(aspect, 0.65) : 1.4 }} onMouseDown={(event) => { if (event.button === 0) startDrag(event.clientX, event.clientY); }} onMouseMove={(event) => { moveDrag(event.clientX, event.clientY); const booth = (event.target as Element).closest("[data-booth-id]"); setHoveredBoothId(booth?.getAttribute("data-booth-id") || null); setTooltipPosition({ x: event.clientX - event.currentTarget.getBoundingClientRect().left + 14, y: event.clientY - event.currentTarget.getBoundingClientRect().top + 14 }); }} onMouseUp={() => setDragging(false)} onMouseLeave={() => { setDragging(false); setHoveredBoothId(null); }}>
                      {(loading || !svgMarkup) && <div className="absolute inset-0 flex animate-pulse items-center justify-center text-sm text-slate-400">{COPY.loading}</div>}
                      {interactiveMarkup && <div className={cn("absolute inset-5 flex items-center justify-center transition-transform", dragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-default")} style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: "center center" }} onClick={(event) => { const booth = (event.target as Element).closest("[data-booth-id]"); if (booth && !dragMoved.current) setSelectedBoothId(booth.getAttribute("data-booth-id")); dragMoved.current = false; }} dangerouslySetInnerHTML={{ __html: interactiveMarkup }} />}
                      {VIEW.hoverTooltip.enabled && hoveredStall && !dragging && <div className="pointer-events-none absolute z-20 w-52 rounded-xl bg-brand-950/95 p-3 text-white shadow-2xl" style={{ left: Math.min(tooltipPosition.x, (viewportRef.current?.clientWidth || 300) - 220), top: Math.max(8, tooltipPosition.y) }}><div className="flex justify-between gap-2"><span className="font-mono text-sm font-extrabold">{hoveredStall.boothId}</span><span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] font-bold uppercase">{hoveredStall.status}</span></div>{hoveredStall.category && <p className="mt-1 text-[10px] font-semibold text-brand-200">{hoveredStall.category}</p>}<div className="mt-2 grid grid-cols-2 gap-2 text-[9px] text-brand-100/80"><span>{hoveredStall.width || "?"} × {hoveredStall.length || "?"} m</span><span>{hoveredStall.totalArea || "—"} m²</span></div>{hoveredStall.exhibitorName && <p className="mt-2 truncate border-t border-white/10 pt-2 text-[10px] font-bold">{hoveredStall.exhibitorName}</p>}</div>}
                    </div>
                  </div>
                </Reveal>
              </div>
            )}
            {VIEW.information.enabled && <div className={orientation === "landscape" ? "w-full" : "w-full lg:w-[420px] lg:shrink-0"} style={{ order: VIEW.information.order }}><Reveal delay={0.1}><aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-brand-900/10 sm:p-6"><FloorPlanInfoPanel stall={selectedStall} /></aside></Reveal></div>}
          </div>
        )}
      </div>
    </section>
  );
}