import { parseCSV, csvToRecords } from "./csv";
import { FLOOR_PLAN_SHEET } from "../config/site.config";

export type FloorPlanStall = {
  srNo: string;
  boothId: string;
  category: string;
  width: string;
  length: string;
  totalArea: string;
  rate: string;
  totalAmount: string;
  status: string;
  exhibitorName: string;
  exhibitorLogo: string;
  // Additional fields (ready for when sheet columns are added)
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  website?: string;
  brief?: string;
  floorPlan: string;
};

const isVisible = (v: string) => !/^(false|no|hidden|hide)$/i.test(v.trim());

function mapRecords(records: Record<string, string>[], planLabel: string): FloorPlanStall[] {
  return records
    .filter((r) => !r.Status || isVisible(r.Status))
    .sort((a, b) => Number(a.Order || 99999) - Number(b.Order || 99999))
    .map((r) => ({
      srNo: r["Sr. No."] || r["Sr No"] || r["Order"] || "",
      boothId: r["Booth ID"] || "",
      category: r.Category || "",
      width: r.Width || "",
      length: r.Length || "",
      totalArea: r["Total Area m²"] || r["Total Area"] || "",
      rate: r["Rate per m²"] || r["Rate"] || "",
      totalAmount: r["Total Amount"] || "",
      status: r.Status || "Available",
      exhibitorName: r["Exhibitor Name"] || "",
      exhibitorLogo: r["Exhibitor Logo"] || r["Logo URL"] || "",
      address: r.Address || "",
      city: r.City || "",
      state: r.State || "",
      phone: r.Phone || "",
      email: r.Email || "",
      website: r.Website || "",
      brief: r["Exhibitor Brief"] || r.Brief || r.Description || "",
      floorPlan: planLabel,
    }))
    .filter((stall) => stall.boothId || stall.category || stall.exhibitorName);
}

/** Fetches stalls from ALL floor plan tabs and tags each with its plan label. */
export async function fetchFloorPlanStalls(): Promise<FloorPlanStall[]> {
  if (!FLOOR_PLAN_SHEET.enabled || !FLOOR_PLAN_SHEET.spreadsheetId) return [];

  const allStalls: FloorPlanStall[] = [];

  for (const [label, tabName] of Object.entries(FLOOR_PLAN_SHEET.tabs)) {
    const url = `https://docs.google.com/spreadsheets/d/${FLOOR_PLAN_SHEET.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const records = csvToRecords(parseCSV(await response.text()));
      allStalls.push(...mapRecords(records, label));
    } catch {
      // Skip tabs that fail to load
    }
  }

  return allStalls;
}
