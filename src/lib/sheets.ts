import { parseCSV, csvToRecords } from "./csv";
import {
  SHEETS,
  SHEET_TABS,
  type SheetKey,
  type TabMapping,
} from "../config/site.config";

/** A normalised row: mapped string fields + any unmapped "extra" columns. */
export interface SheetRow {
  /** Mapped fields (e.g. title, desc). Empty cells are omitted entirely. */
  [key: string]: string | { label: string; value: string }[] | undefined;
  /** Columns present in the sheet but NOT in the mapping (auto-rendered). */
  extra: { label: string; value: string }[];
}

/** Helper: read a mapped string field safely. */
export function field(row: SheetRow, key: string): string {
  const v = row[key];
  return typeof v === "string" ? v : "";
}

const truthy = (v: string) =>
  /^(true|yes|y|1|x|✓|checked|show|on)$/i.test(v.trim());

const isControl = (label: string) =>
  label === SHEETS.controlColumns.status ||
  label === SHEETS.controlColumns.order;

function gvizCsvUrl(spreadsheetId: string, tab: string) {
  const base = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq`;
  const params = new URLSearchParams({ tqx: "out:csv", sheet: tab });
  return `${base}?${params.toString()}`;
}

/** In-memory + localStorage cache so we don't refetch on every navigation. */
function cacheKey(tab: string) {
  return `sheetcache:${SHEETS.spreadsheetId}:${tab}`;
}

function readCache(tab: string): string | null {
  try {
    const raw = localStorage.getItem(cacheKey(tab));
    if (!raw) return null;
    const { t, csv } = JSON.parse(raw) as { t: number; csv: string };
    if (Date.now() - t > SHEETS.cacheMinutes * 60_000) return null;
    return csv;
  } catch {
    return null;
  }
}

function writeCache(tab: string, csv: string) {
  try {
    localStorage.setItem(cacheKey(tab), JSON.stringify({ t: Date.now(), csv }));
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Fetch one tab, apply the header→field mapping, filter by Status,
 * sort by Order, drop fully-empty rows and collect extra columns.
 * Returns null on any failure so callers can fall back to config data.
 */
export async function fetchTab(key: SheetKey): Promise<SheetRow[] | null> {
  if (!SHEETS.enabled || !SHEETS.spreadsheetId) return null;

  const mapping: TabMapping = SHEET_TABS[key];
  const url = gvizCsvUrl(SHEETS.spreadsheetId, mapping.tab);

  let csv = readCache(mapping.tab);
  if (csv == null) {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      csv = await res.text();
      // gviz returns an HTML error page if the sheet/tab is not public
      if (csv.trimStart().startsWith("<")) return null;
      writeCache(mapping.tab, csv);
    } catch {
      return null;
    }
  }

  const records = csvToRecords(parseCSV(csv));
  if (records.length === 0) return null;

  const { status: statusCol, order: orderCol } = SHEETS.controlColumns;

  const orders = new WeakMap<SheetRow, number>();

  const rows = records
    // 1) Status column: keep only checked rows (missing column = keep all)
    .filter((rec) => {
      if (!(statusCol in rec)) return true;
      const v = rec[statusCol];
      return v === "" ? false : truthy(v);
    })
    // 2) map headers → fields, collect extras, hide empty values
    .map((rec) => {
      const row: SheetRow = { extra: [] };
      for (const [header, rawValue] of Object.entries(rec)) {
        const value = (rawValue ?? "").trim();
        if (isControl(header)) continue;
        const mapped = mapping.fields[header];
        if (mapped) {
          if (value) row[mapped] = value; // empty → key absent → hidden
        } else if (value) {
          // Unmapped, non-empty column → render it in the same card style
          row.extra.push({ label: header, value });
        }
      }
      // capture Order for sorting (kept off the row object)
      const orderRaw = rec[orderCol];
      orders.set(
        row,
        orderRaw && !Number.isNaN(Number(orderRaw))
          ? Number(orderRaw)
          : Number.MAX_SAFE_INTEGER
      );
      return row;
    })
    // 3) drop rows that ended up with no mapped content at all
    .filter((row) => {
      const keys = Object.keys(row).filter((k) => k !== "extra");
      return keys.length > 0 || row.extra.length > 0;
    });

  // 4) sort by Order (ascending, stable)
  rows.sort((a, b) => (orders.get(a) ?? 0) - (orders.get(b) ?? 0));

  return rows;
}
