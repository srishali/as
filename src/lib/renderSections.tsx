import type { ReactElement } from "react";
import { SECTIONS, type SectionKey } from "../config/site.config";

export type SectionRegistry = Partial<Record<SectionKey, () => ReactElement>>;

/**
 * Renders a page's sections dynamically from the config:
 *  - Toggles: skips sections with `enabled: false`
 *  - Order: automatically sorts sections ascending by their numeric `order` property
 *    (e.g., order: 1 renders before order: 2)
 *  - Registry: maps section keys to React components
 */
export function PageSections({
  ids,
  registry,
}: {
  ids: readonly SectionKey[];
  registry: SectionRegistry;
}) {
  const activeIds = [...ids]
    .filter((id) => {
      const config = SECTIONS[id] as { enabled?: boolean } | undefined;
      return config && config.enabled !== false;
    })
    .sort((a, b) => {
      const orderA = (SECTIONS[a] as { order?: number } | undefined)?.order ?? 999;
      const orderB = (SECTIONS[b] as { order?: number } | undefined)?.order ?? 999;
      return orderA - orderB;
    });

  return (
    <>
      {activeIds.map((id) => {
        const Component = registry[id];
        if (!Component) return null;
        return <Component key={id} />;
      })}
    </>
  );
}
