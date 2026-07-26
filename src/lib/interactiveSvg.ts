import type { FloorPlanStall } from "./floorPlanData";

export type StatusFilter = "all" | "available" | "booked" | "reserved";

export function boothStatus(status: string): Exclude<StatusFilter, "all"> {
  if (/reserved|hold/i.test(status)) return "reserved";
  if (/booked|sold|inactive/i.test(status)) return "booked";
  return "available";
}

export function getAspect(markup: string) {
  const match = markup.match(/viewBox\s*=\s*["']\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*["']/i);
  if (!match) return 1.4;
  const w = Number(match[3]);
  const h = Number(match[4]);
  return w && h ? w / h : 1.4;
}

function shapeBounds(shape: Element) {
  if (shape.tagName.toLowerCase() === "rect") {
    return {
      x: Number(shape.getAttribute("x") || 0),
      y: Number(shape.getAttribute("y") || 0),
      width: Number(shape.getAttribute("width") || 0),
      height: Number(shape.getAttribute("height") || 0),
    };
  }
  if (shape.tagName.toLowerCase() === "polygon") {
    const values = (shape.getAttribute("points") || "").match(/-?[\d.]+/g)?.map(Number) || [];
    const xs = values.filter((_, i) => i % 2 === 0);
    const ys = values.filter((_, i) => i % 2 === 1);
    if (!xs.length || !ys.length) return null;
    return { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
  }
  return null;
}

export function buildInteractiveSvg(
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
  svg.querySelectorAll("script, foreignObject").forEach((n) => n.remove());
  svg.querySelectorAll("*").forEach((n) => {
    [...n.attributes].forEach((a) => { if (/^on/i.test(a.name)) n.removeAttribute(a.name); });
  });

  const allIdElements = [...svg.querySelectorAll("[id]")];
  stalls.forEach((stall) => {
    const boothId = stall.boothId.toUpperCase();
    const element = allIdElements.find((n) => (n.getAttribute("id") || "").toUpperCase() === boothId)
      || allIdElements.find((n) => (n.getAttribute("id") || "").replace(/_\d+_?$/, "").toUpperCase() === boothId);
    if (!element) return;

    element.setAttribute("data-booth-id", stall.boothId);
    element.classList.add("fp-interactive-booth");
    const targets = element.matches("rect, polygon, path")
      ? [element]
      : [...element.querySelectorAll("rect, polygon, path")];
    const kind = boothStatus(stall.status);
    const fill = selectedBoothId === stall.boothId
      ? "#270585"
      : kind === "available" ? "#a8d4af" : kind === "reserved" ? "#f0d27a" : "#cbd5e1";
    const matches = !filterActive || highlightedIds.has(stall.boothId);

    element.setAttribute("opacity", matches ? "1" : "0.16");
    if (matches && filterActive) element.classList.add("fp-match");
    targets.forEach((t) => {
      t.setAttribute("fill", fill);
      t.setAttribute("stroke", selectedBoothId === stall.boothId ? "#850527" : matches && filterActive ? "#270585" : "#ffffff");
      t.setAttribute("stroke-width", selectedBoothId === stall.boothId ? "7" : matches && filterActive ? "5" : "3");
    });

    const title = doc.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `${stall.boothId} · ${stall.category || "Booth"} · ${stall.status}`;
    element.insertBefore(title, element.firstChild);

    if (!element.querySelector("text")) {
      const shape = targets.find((t) => /^(rect|polygon)$/i.test(t.tagName));
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
  style.textContent = `.fp-interactive-booth{cursor:pointer;transition:opacity .2s,filter .2s}.fp-interactive-booth:hover{filter:brightness(.82);opacity:1!important}.fp-match{filter:drop-shadow(0 0 7px rgba(39,5,133,.38))}`;
  svg.appendChild(style);
  return new XMLSerializer().serializeToString(svg);
}
