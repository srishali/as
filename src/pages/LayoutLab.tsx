import { useMemo, useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  FileCode2,
  FileSpreadsheet,
  LayoutGrid,
  CalendarCheck2,
  Clock3,
  CircleCheckBig,
  RotateCcw,
  Search,
  Upload,
  ZoomIn,
  ZoomOut,
  CloudLightning,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { FloorPlanInfoPanel } from "../components/FloorPlanInfoPanel";
import { parseCSV, csvToRecords } from "../lib/csv";
import type { FloorPlanStall } from "../lib/floorPlanData";
import { cn } from "../lib/utils";

type MappingKey =
  | "boothId"
  | "category"
  | "width"
  | "length"
  | "totalArea"
  | "rate"
  | "totalAmount"
  | "status"
  | "exhibitorName"
  | "exhibitorLogo"
  | "address"
  | "phone"
  | "email"
  | "website"
  | "brief";

type Mapping = Record<MappingKey, string>;

const FIELDS: { key: MappingKey; label: string; aliases: string[] }[] = [
  { key: "boothId", label: "Booth ID", aliases: ["Booth ID", "Booth", "Stall ID", "Stall"] },
  { key: "category", label: "Category", aliases: ["Category", "Booth Category"] },
  { key: "width", label: "Width", aliases: ["Width", "Width m"] },
  { key: "length", label: "Length", aliases: ["Length", "Length m"] },
  { key: "totalArea", label: "Total Area m²", aliases: ["Total Area m²", "Total Area", "Area"] },
  { key: "rate", label: "Rate per m²", aliases: ["Rate per m²", "Rate / m²", "Rate"] },
  { key: "totalAmount", label: "Total Amount", aliases: ["Total Amount", "Amount"] },
  { key: "status", label: "Status", aliases: ["Status", "Availability"] },
  { key: "exhibitorName", label: "Exhibitor Name", aliases: ["Exhibitor Name", "Company Name", "Exhibitor"] },
  { key: "exhibitorLogo", label: "Exhibitor Logo", aliases: ["Exhibitor Logo", "Logo URL", "Logo"] },
  { key: "address", label: "Address", aliases: ["Address", "Exhibitor Address"] },
  { key: "phone", label: "Phone", aliases: ["Phone", "Exhibitor Phone"] },
  { key: "email", label: "Email", aliases: ["Email", "Exhibitor Email"] },
  { key: "website", label: "Website", aliases: ["Website", "Web URL"] },
  { key: "brief", label: "Exhibitor Brief", aliases: ["Exhibitor Brief", "Brief", "Description"] },
];

const EMPTY_MAPPING = FIELDS.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {} as Mapping);

function autoMap(headers: string[]): Mapping {
  return FIELDS.reduce((result, field) => {
    const found = headers.find((header) => field.aliases.some((alias) => alias.toLowerCase() === header.toLowerCase()));
    result[field.key] = found || "";
    return result;
  }, { ...EMPTY_MAPPING });
}

function getAspect(markup: string) {
  const match = markup.match(/viewBox\s*=\s*["']\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*["']/i);
  if (!match) return 1.4;
  const width = Number(match[3]);
  const height = Number(match[4]);
  return width && height ? width / height : 1.4;
}

type StatusFilter = "all" | "available" | "booked" | "reserved";

function boothStatus(status: string): Exclude<StatusFilter, "all"> {
  if (/reserved|hold/i.test(status)) return "reserved";
  if (/booked|sold|inactive/i.test(status)) return "booked";
  return "available";
}

function shapeBounds(shape: Element) {
  if (shape.tagName.toLowerCase() === "rect") {
    const x = Number(shape.getAttribute("x") || 0);
    const y = Number(shape.getAttribute("y") || 0);
    const width = Number(shape.getAttribute("width") || 0);
    const height = Number(shape.getAttribute("height") || 0);
    return { x, y, width, height };
  }
  if (shape.tagName.toLowerCase() === "polygon") {
    const values = (shape.getAttribute("points") || "").match(/-?[\d.]+/g)?.map(Number) || [];
    const xs = values.filter((_, index) => index % 2 === 0);
    const ys = values.filter((_, index) => index % 2 === 1);
    if (!xs.length || !ys.length) return null;
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }
  return null;
}

/** Sanitizes a locally-uploaded SVG and overlays live booth availability. */
function buildInteractiveSvg(
  markup: string,
  stalls: FloorPlanStall[],
  selectedBoothId: string | null,
  highlightedIds: Set<string>,
  filterActive: boolean
) {
  if (!markup || typeof DOMParser === "undefined") return "";
  const doc = new DOMParser().parseFromString(markup, "image/svg+xml");
  if (doc.querySelector("parsererror")) return "";

  const svg = doc.documentElement;
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.querySelectorAll("script, foreignObject").forEach((node) => node.remove());
  svg.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      if (/^on/i.test(attribute.name)) node.removeAttribute(attribute.name);
    });
  });

  const allIdElements = [...svg.querySelectorAll("[id]")];
  stalls.forEach((stall) => {
    const boothId = stall.boothId.toUpperCase();
    // Prefer the Illustrator group whose ID exactly matches the Booth ID.
    const element = allIdElements.find((node) => (node.getAttribute("id") || "").toUpperCase() === boothId)
      || allIdElements.find((node) => (node.getAttribute("id") || "").replace(/_\d+_?$/, "").toUpperCase() === boothId);
    if (!element) return;

    element.setAttribute("data-booth-id", stall.boothId);
    element.classList.add("layout-lab-booth");
    const targets = element.matches("rect, polygon, path")
      ? [element]
      : [...element.querySelectorAll("rect, polygon, path")];
    const kind = boothStatus(stall.status);
    const fill = selectedBoothId === stall.boothId
      ? "#270585"
      : kind === "available"
        ? "#a8d4af"
        : kind === "reserved"
          ? "#f0d27a"
          : "#cbd5e1";
    const matches = !filterActive || highlightedIds.has(stall.boothId);

    element.setAttribute("opacity", matches ? "1" : "0.16");
    if (matches && filterActive) element.classList.add("layout-lab-match");
    targets.forEach((target) => {
      target.setAttribute("fill", fill);
      target.setAttribute("stroke", selectedBoothId === stall.boothId ? "#850527" : matches && filterActive ? "#270585" : "#ffffff");
      target.setAttribute("stroke-width", selectedBoothId === stall.boothId ? "7" : matches && filterActive ? "5" : "3");
    });

    // Native fallback tooltip for browsers and accessibility.
    const title = doc.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `${stall.boothId} · ${stall.category || "Booth"} · ${stall.width || "?"} × ${stall.length || "?"} m · ${stall.status}`;
    element.insertBefore(title, element.firstChild);

    // Add a readable booth ID at the visual center when Illustrator has none.
    if (!element.querySelector("text")) {
      const shape = targets.find((target) => /^(rect|polygon)$/i.test(target.tagName));
      const bounds = shape ? shapeBounds(shape) : null;
      if (bounds && bounds.width > 20 && bounds.height > 16) {
        const label = doc.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", String(bounds.x + bounds.width / 2));
        label.setAttribute("y", String(bounds.y + bounds.height / 2));
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("dominant-baseline", "central");
        label.setAttribute("font-family", "Arial, sans-serif");
        label.setAttribute("font-size", String(Math.max(9, Math.min(20, bounds.height * 0.28))));
        label.setAttribute("font-weight", "700");
        label.setAttribute("fill", selectedBoothId === stall.boothId ? "#ffffff" : "#172033");
        label.setAttribute("pointer-events", "none");
        label.textContent = stall.boothId;
        element.appendChild(label);
      }
    }
  });

  const style = doc.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = ".layout-lab-booth{cursor:pointer;transition:opacity .2s ease,filter .2s ease}.layout-lab-booth:hover{filter:brightness(.82);opacity:1!important}.layout-lab-match{filter:drop-shadow(0 0 7px rgba(39,5,133,.38))}";
  svg.appendChild(style);
  return new XMLSerializer().serializeToString(svg);
}

export default function LayoutLab() {
  const [activeTab, setActiveTab] = useState<"cloud" | "local">("cloud");
  const [svgMarkup, setSvgMarkup] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<Mapping>(EMPTY_MAPPING);
  const [selectedBoothId, setSelectedBoothId] = useState<string | null>(null);
  
  // Cloud states
  const [driveInput, setDriveInput] = useState("");
  const [sheetIdInput, setSheetIdInput] = useState("");
  const [sheetTabInput, setSheetTabInput] = useState("Floor Plan 1");
  const [loading, setLoading] = useState(false);
  const [cloudErrorMsg, setCloudErrorMsg] = useState("");

  // Once confirmed, both setup and mapping panels disappear.
  const [mappingSubmitted, setMappingSubmitted] = useState(false);
  const [mappingError, setMappingError] = useState("");

  // Final viewer filters and hover details.
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [hoveredBoothId, setHoveredBoothId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Zoom / Pan states
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const svgHost = useRef<HTMLDivElement>(null);
  const dragMoved = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const stalls = useMemo<FloorPlanStall[]>(() => rows
    .map((row, index) => ({
      srNo: String(index + 1),
      boothId: row[mapping.boothId] || "",
      category: row[mapping.category] || "",
      width: row[mapping.width] || "",
      length: row[mapping.length] || "",
      totalArea: row[mapping.totalArea] || "",
      rate: row[mapping.rate] || "",
      totalAmount: row[mapping.totalAmount] || "",
      status: row[mapping.status] || "Available",
      exhibitorName: row[mapping.exhibitorName] || "",
      exhibitorLogo: row[mapping.exhibitorLogo] || "",
      address: row[mapping.address] || "",
      phone: row[mapping.phone] || "",
      email: row[mapping.email] || "",
      website: row[mapping.website] || "",
      brief: row[mapping.brief] || "",
      floorPlan: "Layout Lab",
    }))
    .filter((stall) => stall.boothId), [rows, mapping]);

  const selectedStall = useMemo(() => stalls.find((stall) => stall.boothId === selectedBoothId) || null, [stalls, selectedBoothId]);
  const hoveredStall = useMemo(() => stalls.find((stall) => stall.boothId === hoveredBoothId) || null, [stalls, hoveredBoothId]);
  const stats = useMemo(() => ({
    all: stalls.length,
    available: stalls.filter((stall) => boothStatus(stall.status) === "available").length,
    booked: stalls.filter((stall) => boothStatus(stall.status) === "booked").length,
    reserved: stalls.filter((stall) => boothStatus(stall.status) === "reserved").length,
  }), [stalls]);
  const categories = useMemo(() => [...new Set(stalls.map((stall) => stall.category).filter(Boolean))].sort(), [stalls]);
  const highlightedIds = useMemo(() => new Set(
    stalls
      .filter((stall) => statusFilter === "all" || boothStatus(stall.status) === statusFilter)
      .filter((stall) => categoryFilter === "all" || stall.category === categoryFilter)
      .map((stall) => stall.boothId)
  ), [stalls, statusFilter, categoryFilter]);
  const filterActive = statusFilter !== "all" || categoryFilter !== "all";
  const aspect = useMemo(() => getAspect(svgMarkup), [svgMarkup]);
  const orientation = aspect >= 1 ? "landscape" : "portrait";
  const interactiveMarkup = useMemo(
    () => buildInteractiveSvg(svgMarkup, stalls, selectedBoothId, highlightedIds, filterActive),
    [svgMarkup, stalls, selectedBoothId, highlightedIds, filterActive]
  );

  // Ctrl + mouse-wheel zoom only. Normal wheel scrolling remains available
  // for the page. A non-passive native listener prevents browser page zoom.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      event.preventDefault();

      const step = event.deltaY > 0 ? -0.3 : 0.3;
      setScale((current) => {
        const next = Math.max(1, Math.min(10, current + step));
        if (next === 1) setOffset({ x: 0, y: 0 });
        return next;
      });
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, []);

  async function uploadSvg(file?: File) {
    if (!file) return;
    const text = await file.text();
    setSvgMarkup(text);
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setSelectedBoothId(null);
    setMappingSubmitted(false);
  }

  async function uploadSheet(file?: File) {
    if (!file) return;
    let recordRows: Record<string, string>[] = [];
    let nextHeaders: string[] = [];
    if (/\.csv$/i.test(file.name)) {
      const matrix = parseCSV(await file.text());
      nextHeaders = matrix[0]?.map((header) => header.trim()) || [];
      recordRows = csvToRecords(matrix);
    } else {
      const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: "" });
      nextHeaders = (matrix[0] || []).map((header) => String(header).trim());
      recordRows = matrix.slice(1).map((cells) => nextHeaders.reduce((row, header, index) => ({ ...row, [header]: String(cells[index] ?? "").trim() }), {} as Record<string, string>));
    }
    setHeaders(nextHeaders);
    setRows(recordRows);
    setMapping(autoMap(nextHeaders));
    setSelectedBoothId(null);
    setMappingSubmitted(false);
  }

  /**
   * Fetch a public SVG URL. For Drive links, try Google's common public
   * delivery endpoints. Any other URL is used directly. The source server
   * must allow browser CORS so the SVG markup can be mapped interactively.
   */
  async function fetchSvgSource(input: string) {
    const trimmed = input.trim();
    const driveMatch = trimmed.match(/file\/d\/([\w-]+)|[?&]id=([\w-]+)/i);
    const isDriveId = /^[\w-]{20,}$/.test(trimmed);
    const driveId = driveMatch ? (driveMatch[1] || driveMatch[2]) : isDriveId ? trimmed : "";

    const candidates = driveId
      ? [
          `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`,
          `https://docs.google.com/uc?export=download&id=${driveId}`,
          `https://lh3.googleusercontent.com/d/${driveId}`,
        ]
      : [trimmed];

    let lastError = "Unable to load SVG source.";
    for (const url of candidates) {
      try {
        const response = await fetch(url, { redirect: "follow" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = (await response.text()).replace(/^\uFEFF/, "").trim();
        if (/<svg[\s>]/i.test(text)) return text;
        lastError = "The source returned a web page instead of SVG markup.";
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
      }
    }
    throw new Error(lastError);
  }

  async function connectCloud() {
    if (!driveInput || !sheetIdInput || !sheetTabInput) return;
    setLoading(true);
    setCloudErrorMsg("");
    setMappingSubmitted(false);

    let svgLoaded = false;
    let sheetLoaded = false;

    // 1. Fetch SVG from Google Drive OR any public/CORS-enabled URL
    if (driveInput) {
      try {
        const svgText = await fetchSvgSource(driveInput);
        setSvgMarkup(svgText);
        svgLoaded = true;
      } catch (err) {
        setCloudErrorMsg(
          `SVG could not be loaded: ${err instanceof Error ? err.message : String(err)} ` +
          "Use a public raw SVG URL from any storage/web server with CORS enabled, or use Local File Upload."
        );
      }
    }

    // 2. Fetch Google Sheet
    if (sheetIdInput && sheetTabInput) {
      const url = `https://docs.google.com/spreadsheets/d/${sheetIdInput}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetTabInput)}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch spreadsheet");
        const text = await res.text();
        if (text.trim().startsWith("<html") || text.trim().startsWith("<!DOCTYPE")) {
          throw new Error("Sheet is not public. Please share: Anyone with link -> Viewer");
        }
        const matrix = parseCSV(text);
        const nextHeaders = matrix[0]?.map((h) => h.trim()) || [];
        setHeaders(nextHeaders);
        setRows(csvToRecords(matrix));
        setMapping(autoMap(nextHeaders));
        setSelectedBoothId(null);
        sheetLoaded = true;
      } catch (err) {
        setCloudErrorMsg((current) => `${current ? `${current} ` : ""}Sheet could not be loaded: ${String(err)}`);
      }
    }
    if (svgLoaded && sheetLoaded) setMappingError("");
    setLoading(false);
  }

  function submitMapping() {
    if (!svgMarkup || headers.length === 0) {
      setMappingError("Connect or upload both an SVG and a booth sheet first.");
      return;
    }
    if (!mapping.boothId) {
      setMappingError("Booth ID is required to map the spreadsheet rows to SVG element IDs.");
      return;
    }
    if (stalls.length === 0) {
      setMappingError("No valid booth rows were found using the selected Booth ID column.");
      return;
    }
    setMappingError("");
    setSelectedBoothId(null);
    resetView();
    setMappingSubmitted(true);
  }

  function resetView() { setScale(1); setOffset({ x: 0, y: 0 }); }
  
  function startDrag(clientX: number, clientY: number) {
    if (scale <= 1) return;
    dragMoved.current = false;
    setDragging(true);
    dragStart.current = { x: clientX - offset.x, y: clientY - offset.y };
  }
  
  function moveDrag(clientX: number, clientY: number) {
    if (!dragging) return;
    if (Math.abs(clientX - dragStart.current.x - offset.x) > 3 || Math.abs(clientY - dragStart.current.y - offset.y) > 3) {
      dragMoved.current = true;
    }
    setOffset({ x: clientX - dragStart.current.x, y: clientY - dragStart.current.y });
  }

  return (
    <>
      <PageHeader header={{ current: "Layout Lab", eyebrow: "Internal Tool", image: "/images/expo-floor.jpg", title: "Map your ", accent: "exhibition layout", subtitle: "Connect Google Drive SVGs and Google Sheets to test interactive mapping live. Auto-maps matching columns instantly." }} />

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!mappingSubmitted && (
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
              {/* Tabs */}
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                <button
                  onClick={() => setActiveTab("cloud")}
                  className={cn(
                    "flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all",
                    activeTab === "cloud"
                      ? "border-brand-700 text-brand-700 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  )}
                >
                  <CloudLightning className="inline-block h-4 w-4 mr-2" />
                  Live Cloud Connect (Recommended)
                </button>
                <button
                  onClick={() => setActiveTab("local")}
                  className={cn(
                    "flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all",
                    activeTab === "local"
                      ? "border-brand-700 text-brand-700 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  )}
                >
                  <Upload className="inline-block h-4 w-4 mr-2" />
                  Local File Upload
                </button>
              </div>

              <div className="p-5 sm:p-8">
                {activeTab === "cloud" ? (
                  <div className="grid gap-5 md:grid-cols-12 items-end">
                    <div className="md:col-span-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">SVG Source URL / Google Drive Link</label>
                      <input
                        type="text"
                        placeholder="https://cdn.example.com/floor-plan.svg or Drive link/ID"
                        value={driveInput}
                        onChange={(e) => setDriveInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:bg-white focus:border-brand-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Google Sheet ID</label>
                      <input
                        type="text"
                        placeholder="Paste Google Sheet ID"
                        value={sheetIdInput}
                        onChange={(e) => setSheetIdInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:bg-white focus:border-brand-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sheet Tab Name</label>
                      <input
                        type="text"
                        placeholder="Floor Plan 1"
                        value={sheetTabInput}
                        onChange={(e) => setSheetTabInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:bg-white focus:border-brand-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="button"
                        onClick={connectCloud}
                        disabled={loading || !driveInput || !sheetIdInput || !sheetTabInput}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-accent-700 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CloudLightning className="h-4 w-4" />}
                        Connect
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-4 transition hover:border-brand-600 hover:bg-brand-50">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white"><FileCode2 className="h-5 w-5" /></span>
                      <span>
                        <span className="block text-sm font-bold text-slate-900">Upload Floor Plan SVG</span>
                        <span className="mt-0.5 block text-xs text-slate-500">Adobe Illustrator SVG exports supported</span>
                      </span>
                      <Upload className="ml-auto h-5 w-5 text-brand-600" />
                      <input type="file" accept=".svg,image/svg+xml" className="sr-only" onChange={(e) => uploadSvg(e.target.files?.[0])} />
                    </label>
                    <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-accent-300 bg-accent-50/40 p-4 transition hover:border-accent-600 hover:bg-accent-50">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-700 text-white"><FileSpreadsheet className="h-5 w-5" /></span>
                      <span>
                        <span className="block text-sm font-bold text-slate-900">Upload Booth Sheet</span>
                        <span className="mt-0.5 block text-xs text-slate-500">CSV, XLS, or XLSX files supported</span>
                      </span>
                      <Upload className="ml-auto h-5 w-5 text-accent-600" />
                      <input type="file" accept=".csv,.xls,.xlsx" className="sr-only" onChange={(e) => uploadSheet(e.target.files?.[0])} />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
          )}

          {/* Cloud CORS Error Warning */}
          {!mappingSubmitted && cloudErrorMsg && (
            <Reveal>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-800 leading-relaxed">
                <XCircle className="h-5 w-5 shrink-0 text-amber-600" />
                <p>{cloudErrorMsg}</p>
              </div>
            </Reveal>
          )}

          {/* Step 2 — map columns, then submit to open the final layout. */}
          {!mappingSubmitted && svgMarkup && headers.length > 0 && (
            <Reveal delay={0.05}>
              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Step 2 · Column Mapping</p>
                    <p className="text-xs text-slate-500">Confirm the mappings, then submit to generate the interactive layout.</p>
                  </div>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{rows.length} rows loaded</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {FIELDS.map((field) => (
                      <label key={field.key} className="block">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">{field.label}</span>
                        <select
                          value={mapping[field.key]}
                          onChange={(e) => setMapping((current) => ({ ...current, [field.key]: e.target.value }))}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-brand-500"
                        >
                          <option value="">Not mapped</option>
                          {headers.map((header) => <option key={header} value={header}>{header}</option>)}
                        </select>
                      </label>
                    ))}
                  </div>
                  {mappingError && <p className="mt-4 text-right text-xs font-semibold text-red-600">{mappingError}</p>}
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={submitMapping}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-accent-700 px-7 py-3 text-xs font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Apply Mapping & Open Layout
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* Interactive Viewer Section */}
          {mappingSubmitted && (
          <>
          {/* Professional live statistics and filters */}
          <Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {([
                { key: "all", label: "Total Booths", value: stats.all, icon: LayoutGrid, style: "from-brand-700 to-brand-500" },
                { key: "booked", label: "Booked", value: stats.booked, icon: CalendarCheck2, style: "from-slate-700 to-slate-500" },
                { key: "reserved", label: "Reserved", value: stats.reserved, icon: Clock3, style: "from-amber-600 to-gold-400" },
                { key: "available", label: "Available", value: stats.available, icon: CircleCheckBig, style: "from-emerald-700 to-emerald-500" },
              ] as const).map((card) => (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => { setStatusFilter(card.key); setSelectedBoothId(null); }}
                  className={cn(
                    "group flex items-center gap-4 rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg",
                    statusFilter === card.key ? "border-brand-400 ring-2 ring-brand-100" : "border-slate-200"
                  )}
                >
                  <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${card.style} text-white`}>
                    <card.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-extrabold text-slate-900">{card.value}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">{card.label}</span>
                  </span>
                </button>
              ))}

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Search className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</span>
                  <select
                    value={categoryFilter}
                    onChange={(event) => { setCategoryFilter(event.target.value); setSelectedBoothId(null); }}
                    className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </span>
              </label>
            </div>
            {filterActive && (
              <div className="mt-3 flex items-center justify-between rounded-xl border border-brand-100 bg-brand-50/70 px-4 py-2 text-xs text-brand-800">
                <span><strong>{highlightedIds.size}</strong> matching booths are highlighted. Other booths remain visible for context.</span>
                <button type="button" onClick={() => { setStatusFilter("all"); setCategoryFilter("all"); }} className="font-bold hover:underline">Clear filters</button>
              </div>
            )}
          </Reveal>

          <div className={cn("mt-8 flex gap-8", orientation === "landscape" ? "flex-col" : "flex-col lg:flex-row lg:items-start")}>
            <div className={orientation === "landscape" ? "w-full" : "w-full lg:min-w-0 lg:flex-1"}>
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-brand-900/10">
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><Search className="h-4 w-4 text-brand-600" /> Select a booth · Ctrl + wheel to zoom · drag hand to pan</div>
                    <div className="flex gap-1"><button type="button" onClick={() => setScale((v) => Math.max(1, v - 0.25))} className="rounded-lg p-2 hover:bg-slate-100"><ZoomOut className="h-4 w-4" /></button><button type="button" onClick={() => setScale((v) => Math.min(10, v + 0.25))} className="rounded-lg p-2 hover:bg-slate-100"><ZoomIn className="h-4 w-4" /></button><button type="button" onClick={resetView} className="rounded-lg p-2 hover:bg-slate-100"><RotateCcw className="h-4 w-4" /></button></div>
                  </div>
                  <div
                    ref={viewportRef}
                    className="relative overflow-hidden bg-slate-100/50"
                    style={{ aspectRatio: svgMarkup ? `${Math.max(aspect, 0.65)}` : "1.4" }}
                    onMouseDown={(e) => { if (e.button === 0) startDrag(e.clientX, e.clientY); }}
                    onMouseMove={(e) => {
                      moveDrag(e.clientX, e.clientY);
                      const target = e.target as Element;
                      const booth = target.closest("[data-booth-id]");
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredBoothId(booth?.getAttribute("data-booth-id") || null);
                      setTooltipPosition({ x: e.clientX - rect.left + 14, y: e.clientY - rect.top + 14 });
                    }}
                    onMouseUp={() => setDragging(false)}
                    onMouseLeave={() => { setDragging(false); setHoveredBoothId(null); }}
                  >
                    {!svgMarkup && <div className="absolute inset-0 flex flex-col items-center justify-center text-center"><FileCode2 className="h-9 w-9 text-slate-300" /><p className="mt-3 text-sm font-bold text-slate-600">Connect cloud or upload local SVG</p><p className="mt-1 text-xs text-slate-400">The SVG becomes an interactive booth viewer here.</p></div>}
                    {interactiveMarkup && <div ref={svgHost} className={cn("absolute inset-5 flex items-center justify-center transition-transform", dragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-default")} style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: "center center" }} onClick={(e) => { const target = e.target as Element; const booth = target.closest("[data-booth-id]"); if (booth && !dragMoved.current) setSelectedBoothId(booth.getAttribute("data-booth-id")); dragMoved.current = false; }} dangerouslySetInnerHTML={{ __html: interactiveMarkup }} />}
                    {hoveredStall && !dragging && (
                      <div
                        className="pointer-events-none absolute z-20 w-52 rounded-xl border border-white/20 bg-brand-950/95 p-3 text-white shadow-2xl backdrop-blur-md"
                        style={{ left: Math.min(tooltipPosition.x, (viewportRef.current?.clientWidth || 280) - 220), top: Math.max(8, tooltipPosition.y) }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-sm font-extrabold">{hoveredStall.boothId}</span>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] font-bold uppercase">{hoveredStall.status}</span>
                        </div>
                        {hoveredStall.category && <p className="mt-1 text-[10px] font-semibold text-brand-200">{hoveredStall.category}</p>}
                        <div className="mt-2 grid grid-cols-2 gap-2 text-[9px] text-brand-100/80">
                          <span>{hoveredStall.width || "?"} × {hoveredStall.length || "?"} m</span>
                          <span>{hoveredStall.totalArea || "—"} m²</span>
                        </div>
                        {hoveredStall.exhibitorName && <p className="mt-2 truncate border-t border-white/10 pt-2 text-[10px] font-bold">{hoveredStall.exhibitorName}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
            <div className={orientation === "landscape" ? "w-full" : "w-full lg:w-[420px] lg:shrink-0"}><Reveal delay={0.1}><aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-brand-900/10 sm:p-6"><FloorPlanInfoPanel stall={selectedStall} /></aside></Reveal></div>
          </div>
          </>
          )}
        </div>
      </section>
    </>
  );
}
