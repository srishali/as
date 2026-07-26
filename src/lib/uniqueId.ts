/**
 * Unique ID Generator
 * -------------------
 * Prefix rules:
 *   - Exhibitor:        ET-YYDDD-00000
 *   - Visitor:          VT-YYDDD-00000
 *   - General Enquiry:  GE-YYDDD-00000
 *
 * YY    = 2-digit year (e.g. 26)
 * DDD   = Day count in year (1-366, padded to 3 digits, e.g. 199)
 * 00000 = Sequence counter (00001 to 99999)
 */

export type FormType = "exhibitor" | "visitor" | "contact";

function pad(n: number, len: number) {
  return String(n).padStart(len, "0");
}

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

function nextSeq(type: FormType): number {
  const key = `seq_${type}`;
  const prev = parseInt(sessionStorage.getItem(key) ?? "0", 10);
  const next = prev + 1;
  sessionStorage.setItem(key, String(next));
  return next;
}

export function generateId(type: FormType): string {
  const now = new Date();
  let prefix = "GE";
  if (type === "exhibitor") prefix = "ET";
  if (type === "visitor") prefix = "VT";

  const yy = pad(now.getFullYear() % 100, 2);
  const day = pad(dayOfYear(now), 3);
  const seq = pad(nextSeq(type), 5);
  return `${prefix}-${yy}${day}-${seq}`;
}
