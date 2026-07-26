import { useEffect, useState } from "react";
import { Handshake } from "lucide-react";
import { fetchTab, field } from "./sheets";
import { resolveIcon } from "./icons";
import { SHEETS } from "../config/site.config";
import type { PartnerCategory } from "../config/site.config";

/**
 * Reads the flat "Partners" sheet tab and groups rows by Category into the
 * same shape the PartnersSection already renders. Falls back to the config
 * categories if Sheets is disabled or the tab is empty/unavailable.
 *
 * Category-level fields (Icon, Blurb, Color) are taken from the FIRST row
 * of each category. Row Order sorts partners; category order follows first
 * appearance in the (already Order-sorted) sheet.
 */
export function useSheetGroupedPartners(
  fallback: PartnerCategory[]
): PartnerCategory[] {
  const [categories, setCategories] = useState<PartnerCategory[]>(fallback);

  useEffect(() => {
    if (!SHEETS.enabled || !SHEETS.spreadsheetId) return;
    let alive = true;
    fetchTab("partners").then((rows) => {
      if (!alive || !rows || rows.length === 0) return;

      const groups = new Map<string, PartnerCategory>();
      for (const row of rows) {
        const category = field(row, "category") || "Partners";
        const name = field(row, "name");
        const full = field(row, "full");
        // skip rows with no partner identity at all
        if (!name && !full) continue;

        if (!groups.has(category)) {
          groups.set(category, {
            title: category,
            icon: resolveIcon(field(row, "categoryIcon"), Handshake),
            blurb: field(row, "categoryBlurb"),
            badgeClass: field(row, "categoryColor") || "bg-brand-700",
            partners: [],
          });
        }
        groups.get(category)!.partners.push({
          name,
          full,
          role: field(row, "role"),
          logo: field(row, "logo") || undefined,
        });
      }

      const result = [...groups.values()].filter((g) => g.partners.length > 0);
      if (result.length > 0) setCategories(result);
    });
    return () => {
      alive = false;
    };
  }, [fallback]);

  return categories;
}
