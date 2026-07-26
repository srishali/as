/**
 * Renders any EXTRA columns an editor adds to a Google Sheet tab that aren't
 * in the field mapping. Keeps the exact card styling so the site's look is
 * preserved — extra info simply appears as neat label/value chips.
 */
export function Extras({
  items,
  light = false,
}: {
  items?: { label: string; value: string }[];
  light?: boolean;
}) {
  if (!items || items.length === 0) return null;
  return (
    <dl className="mt-3 flex flex-wrap gap-1.5">
      {items.map((e) => (
        <div
          key={e.label}
          className={
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold " +
            (light
              ? "bg-white/10 text-brand-100/90"
              : "bg-brand-50 text-brand-700")
          }
        >
          <dt className="uppercase tracking-wide opacity-70">{e.label}:</dt>
          <dd>{e.value}</dd>
        </div>
      ))}
    </dl>
  );
}
