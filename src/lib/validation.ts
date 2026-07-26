/**
 * Form Validation — industry-standard rules
 * ------------------------------------------
 * All validators return { ok: boolean; msg: string }.
 * Empty-string msg = valid.
 */

export interface ValidationResult {
  ok: boolean;
  msg: string;
}

const ok = (): ValidationResult => ({ ok: true, msg: "" });
const err = (msg: string): ValidationResult => ({ ok: false, msg });

/* ── Full Name ─────────────────────────────────────────────────────
   Rules:
   • 2–80 characters
   • Only letters (incl. accents / Devanagari Unicode), spaces, hyphens, apostrophes
   • Must have at least two words (first + last)
   • No consecutive spaces/hyphens
   ────────────────────────────────────────────────────────────────── */
export function validateName(v: string): ValidationResult {
  const s = v.trim();
  if (!s) return err("Full name is required.");
  if (s.length < 2) return err("Name is too short.");
  if (s.length > 80) return err("Name must be 80 characters or fewer.");
  if (!/^[\p{L}\s'\-]+$/u.test(s))
    return err("Name may only contain letters, spaces, hyphens and apostrophes.");
  if (/\s{2,}|[-]{2,}/.test(s))
    return err("No consecutive spaces or hyphens allowed.");
  if (s.split(/\s+/).filter(Boolean).length < 2)
    return err("Please enter your first and last name.");
  return ok();
}

/* ── Email ─────────────────────────────────────────────────────────
   RFC 5321 simplified — rejects clearly invalid patterns.
   ────────────────────────────────────────────────────────────────── */
export function validateEmail(v: string): ValidationResult {
  const s = v.trim().toLowerCase();
  if (!s) return err("Email address is required.");
  if (s.length > 254) return err("Email address is too long.");
  // Standard email regex (RFC 5322 simplified)
  const re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;
  if (!re.test(s)) return err("Please enter a valid email address.");
  // Block obviously disposable or test domains
  const domain = s.split("@")[1];
  const blocklist = ["test.com", "example.com", "mailinator.com", "tempmail.com"];
  if (blocklist.includes(domain))
    return err("Please use a valid business or personal email.");
  return ok();
}

/* ── Indian Mobile Number ──────────────────────────────────────────
   TRAI standard (as of 2026):
   • Exactly 10 digits
   • First digit must be 6, 7, 8, or 9
     (covers Jio 6xxx/7xxx, Airtel 7/8/9xxx, Vi 7/8/9xxx, BSNL 7/9xxx, MTNL 9xxx)
   • Rejects sequential/repeated patterns like 9999999999, 1234567890
   ────────────────────────────────────────────────────────────────── */
const REPEATED_RE = /^(\d)\1{9}$/; // 9999999999, 0000000000, etc.
const SEQUENTIAL_ASC = "0123456789";
const SEQUENTIAL_DESC = "9876543210";

export function validatePhone(v: string): ValidationResult {
  const s = v.replace(/[\s\-().+]/g, ""); // strip allowed separators
  if (!s) return err("Mobile number is required.");
  if (!/^\d+$/.test(s)) return err("Mobile number must contain only digits.");
  if (s.length !== 10)
    return err(`Mobile number must be exactly 10 digits (entered ${s.length}).`);
  if (!/^[6-9]/.test(s))
    return err("Enter a valid Indian mobile number starting with 6, 7, 8, or 9.");
  if (REPEATED_RE.test(s))
    return err("This number appears to be invalid (all same digits).");
  if (SEQUENTIAL_ASC.includes(s) || SEQUENTIAL_DESC.includes(s))
    return err("This number appears to be invalid (sequential digits).");
  return ok();
}

/* ── Date of Birth — 18+ years ─────────────────────────────────────*/
export function validateDOB(v: string): ValidationResult {
  if (!v) return err("Date of birth is required.");
  const dob = new Date(v);
  if (isNaN(dob.getTime())) return err("Please enter a valid date.");
  const today = new Date();
  const cutoff = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  if (dob > cutoff)
    return err("You must be at least 18 years old to register.");
  // Sanity: not before 1900
  if (dob.getFullYear() < 1900)
    return err("Please enter a valid year (1900 or later).");
  return ok();
}

/* ── Generic required string ───────────────────────────────────────*/
export function validateRequired(
  v: string,
  label: string,
  min = 2,
  max = 200
): ValidationResult {
  const s = v.trim();
  if (!s) return err(`${label} is required.`);
  if (s.length < min) return err(`${label} must be at least ${min} characters.`);
  if (s.length > max) return err(`${label} must be ${max} characters or fewer.`);
  return ok();
}

/* ── Pincode (India) ───────────────────────────────────────────────*/
export function validatePincode(v: string): ValidationResult {
  const s = v.trim();
  if (!s) return err("Pin code is required.");
  if (!/^[1-9][0-9]{5}$/.test(s)) return err("Enter a valid 6-digit Indian pin code.");
  return ok();
}

/* ── GSTIN (India) — optional, but validated when present ──────────
   Format: 15 chars
   2 digits state code + 10 PAN chars + 1 entity + Z + 1 checksum
   Example: 29ABCDE1234F1Z5
   ────────────────────────────────────────────────────────────────── */
export function validateGSTIN(v: string): ValidationResult {
  const s = v.trim().toUpperCase();
  if (!s) return ok();
  const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
  if (!re.test(s)) return err("Enter a valid 15-character GSTIN (e.g. 29ABCDE1234F1Z5).");
  return ok();
}
