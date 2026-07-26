import { useEffect, useState } from "react";
import { fetchTab, field, type SheetRow } from "./sheets";
import { SHEETS, type SheetKey } from "../config/site.config";
import { resolveIcon } from "./icons";
import type { LucideIcon } from "lucide-react";

/**
 * useSheetList
 * ------------
 * Returns a ready-to-render list for a section. It ALWAYS starts with the
 * hard-coded `fallback` (so the design renders instantly and never breaks),
 * then transparently swaps in Google-Sheet rows once/if they load.
 *
 * @param key       Which sheet tab to read (see SHEET_TABS).
 * @param fallback  The existing config array — used when Sheets is off/empty.
 * @param mapRow    Converts a raw SheetRow into the shape the component wants.
 */
export function useSheetList<T>(
  key: SheetKey,
  fallback: T[],
  mapRow: (row: SheetRow, helpers: RowHelpers) => T
): T[] {
  const [items, setItems] = useState<T[]>(fallback);

  useEffect(() => {
    if (!SHEETS.enabled || !SHEETS.spreadsheetId) return;
    let alive = true;
    fetchTab(key).then((rows) => {
      if (!alive || !rows || rows.length === 0) return;
      setItems(rows.map((r) => mapRow(r, helpers)));
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return items;
}

export interface RowHelpers {
  /** Read a mapped string field (empty string if missing). */
  get: (row: SheetRow, field: string) => string;
  /** Resolve a Lucide icon by name, with a fallback icon. */
  icon: (name: string, fallback: LucideIcon) => LucideIcon;
  /** Interpret a truthy cell ("Yes"/"TRUE"/"1"). */
  bool: (value: string) => boolean;
  /** Split a pipe/newline separated cell into a clean string[]. */
  list: (value: string) => string[];
}

const helpers: RowHelpers = {
  get: (row, f) => field(row, f),
  icon: (name, fallback) => resolveIcon(name, fallback),
  bool: (v) => /^(true|yes|y|1|x|✓)$/i.test((v || "").trim()),
  list: (v) =>
    (v || "")
      .split(/\||\n/)
      .map((s) => s.trim())
      .filter(Boolean),
};
