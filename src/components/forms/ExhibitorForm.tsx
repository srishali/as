import { useState, useCallback, useEffect } from "react";
import { Send, CheckCircle2, RotateCcw, Building2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { FormField, inputCls } from "./FormField";
import {
  PersonalFields,
  validatePersonal,
  personalValid,
  type PersonalState,
  type PersonalTouched,
} from "./PersonalFields";
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validatePincode,
  validateGSTIN,
  type ValidationResult,
} from "../../lib/validation";
import { generateId } from "../../lib/uniqueId";
import { lookupIndianPincode } from "../../lib/postal";
import { submitRegistration } from "../../lib/submissions";
import { FORM_URLS, EVENT_CONFIG, EXHIBITOR_BROCHURE } from "../../config/site.config";
import type { BoothInterest } from "../RegistrationModalContext";


/* ── Company fields ────────────────────────────────────────────── */
const INDUSTRY_CATEGORIES = [
  "Passenger & Commercial Vehicles",
  "Electric & Hybrid Vehicles",
  "Two-Wheelers & Micro-Mobility",
  "Auto Components & Electronics",
  "Tyres, Batteries & Consumables",
  "Charging & Energy Infrastructure",
  "Logistics & Supply Chain",
  "Finance, Leasing & Insurance",
  "Service, Repair & Aftermarket",
  "R&D, Design & Engineering",
  "Investors & Venture Capital",
  "Government & Trade Bodies",
  "Other",
];

interface CompanyState {
  companyName: string;
  category: string;
  companyPhone: string;
  companyEmail: string;
  gstin: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

interface CompanyTouched {
  companyName: boolean; category: boolean; companyPhone: boolean;
  companyEmail: boolean; gstin: boolean; address: boolean; city: boolean;
  district: boolean; state: boolean; pincode: boolean;
}

interface CompanyResults {
  companyName: ValidationResult | null; category: ValidationResult | null;
  companyPhone: ValidationResult | null; companyEmail: ValidationResult | null;
  gstin: ValidationResult | null; address: ValidationResult | null; city: ValidationResult | null;
  district: ValidationResult | null; state: ValidationResult | null; pincode: ValidationResult | null;
}

function validateCompany(s: CompanyState): CompanyResults {
  return {
    companyName: validateRequired(s.companyName, "Company name", 2, 120),
    category: s.category ? { ok: true, msg: "" } : { ok: false, msg: "Please select a category." },
    companyPhone: validatePhone(s.companyPhone),
    companyEmail: validateEmail(s.companyEmail),
    gstin: validateGSTIN(s.gstin),
    address: validateRequired(s.address, "Address", 5, 250),
    city: validateRequired(s.city, "City", 2, 80),
    district: validateRequired(s.district, "District", 2, 80),
    state: s.state ? { ok: true, msg: "" } : { ok: false, msg: "Please select a state." },
    pincode: validatePincode(s.pincode),
  };
}

function companyValid(r: CompanyResults): boolean {
  return Object.values(r).every((v) => v?.ok === true);
}

/* ── component ────────────────────────────────────────────────── */
const PERSONAL_INIT: PersonalState = { fullName: "", email: "", phone: "", gender: "", dob: "" };
const PERSONAL_TOUCHED_INIT: PersonalTouched = { fullName: false, email: false, phone: false, gender: false, dob: false };
const COMPANY_INIT: CompanyState = { companyName: "", category: "", companyPhone: "", companyEmail: "", gstin: "", address: "", city: "", district: "", state: "", pincode: "" };
const COMPANY_TOUCHED_INIT: CompanyTouched = { companyName: false, category: false, companyPhone: false, companyEmail: false, gstin: false, address: false, city: false, district: false, state: false, pincode: false };

export function ExhibitorForm({ boothInterest }: { boothInterest?: BoothInterest } = {}) {
  const [personal, setPersonal] = useState<PersonalState>(PERSONAL_INIT);
  const [pTouched, setPTouched] = useState<PersonalTouched>(PERSONAL_TOUCHED_INIT);
  const [company, setCompany] = useState<CompanyState>(COMPANY_INIT);
  const [cTouched, setCTouched] = useState<CompanyTouched>(COMPANY_TOUCHED_INIT);
  const [sent, setSent] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pinLookup, setPinLookup] = useState<"idle" | "loading" | "found" | "not-found">("idle");

  const personalResults = validatePersonal(personal);
  const companyResults = validateCompany(company);
  const personalDone = personalValid(personalResults);
  const allValid = personalDone && companyValid(companyResults);

  useEffect(() => {
    if (!/^[1-9][0-9]{5}$/.test(company.pincode)) {
      setPinLookup("idle");
      return;
    }
    let alive = true;
    setPinLookup("loading");
    lookupIndianPincode(company.pincode).then((data) => {
      if (!alive) return;
      if (!data) {
        setPinLookup("not-found");
        return;
      }
      setCompany((c) => ({
        ...c,
        city: c.city || data.city,
        district: data.district,
        state: data.state,
      }));
      setCTouched((t) => ({ ...t, city: true, district: true, state: true }));
      setPinLookup("found");
    });
    return () => {
      alive = false;
    };
  }, [company.pincode]);

  const touchAllPersonal = useCallback(() => {
    setPTouched({ fullName: true, email: true, phone: true, gender: true, dob: true });
  }, []);
  const touchAllCompany = useCallback(() => {
    setCTouched({ companyName: true, category: true, companyPhone: true, companyEmail: true, gstin: true, address: true, city: true, district: true, state: true, pincode: true });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    touchAllPersonal();
    touchAllCompany();
    if (!allValid || submitting) return;

    setSubmitting(true);

    try {
      // Submit to backend — it will generate & return the authoritative Unique ID
      const brochureUrl = EVENT_CONFIG.brochure.enabled ? EVENT_CONFIG.brochure.value : "";
      const attachBrochure = EXHIBITOR_BROCHURE.attachFile;

      const result = await submitRegistration({
        type: "exhibitor",
        personal: { ...personal },
        company: { ...company, ...(boothInterest ? { boothInterest: JSON.stringify(boothInterest) } : {}) },
        ...(brochureUrl ? { brochureUrl, brochureName: "Event Brochure", attachBrochure } : {}),
      });

      // Prefer backend-generated ID (source of truth); fallback to local only if offline
      const finalId = result.id || generateId("exhibitor");
      setGeneratedId(finalId);
      setSent(true);
    } catch {
      // Submission failed — user can retry
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setPersonal(PERSONAL_INIT); setPTouched(PERSONAL_TOUCHED_INIT);
    setCompany(COMPANY_INIT); setCTouched(COMPANY_TOUCHED_INIT);
    setSent(false); setGeneratedId("");
  }

  /* ── SUBMITTING — loading state ── */
  if (submitting) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Loader2 className="h-10 w-10 animate-spin text-brand-700" />
        <p className="font-display text-base font-bold text-slate-700">
          Submitting your registration…
        </p>
        <p className="text-xs text-slate-400">Please wait — this takes a few seconds.</p>
      </div>
    );
  }

  /* ── DONE ── */
  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 font-display text-xl font-bold text-slate-900">Registration Received!</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">
          Thank you, <strong>{personal.fullName}</strong>. Our sales team will contact you within one business day with floor plans and availability.
        </p>
        <div className="mt-4 rounded-full bg-brand-50 px-5 py-2">
          <span className="font-mono text-sm font-bold tracking-widest text-brand-700">{generatedId}</span>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {FORM_URLS.exhibitor
            ? `A confirmation email has been sent to ${personal.email}`
            : "Registration saved locally. Email delivery will activate once the Apps Script Web App URL is connected."}
        </p>
        <button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800">
          <RotateCcw className="h-4 w-4" /> Register another exhibitor
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* ── Section 1: Personal Details ── */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">1</span>
          Personal Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <PersonalFields
            state={personal}
            touched={pTouched}
            results={personalResults}
            onChange={(f, v) => setPersonal((p) => ({ ...p, [f]: v }))}
            onBlur={(f) => setPTouched((t) => ({ ...t, [f]: true }))}
          />
        </div>
      </div>

      {/* ── Section 2: Company Details (animated reveal) ── */}
      <AnimatePresence>
        {personalDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-2xl border border-brand-200 bg-brand-50/40 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold text-slate-900">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-700 text-xs font-bold text-white">2</span>
                <Building2 className="h-4 w-4 text-accent-700" />
                Company Information
              </h3>
              <p className="mb-4 text-sm text-slate-500">Tell us about your organisation so we can match you with the right stall options.</p>
              {boothInterest?.boothId && (
                <div className="mb-5 rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-slate-700">
                  <span className="font-semibold text-accent-700">Interested Booth:</span>{" "}
                  <span className="font-mono font-bold">{boothInterest.boothId}</span>
                  {boothInterest.category ? ` · ${boothInterest.category}` : ""}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Company Name */}
                <div className="sm:col-span-2">
                  <FormField label="Company Name" required touched={cTouched.companyName} result={cTouched.companyName ? companyResults.companyName : null}>
                    <input type="text" placeholder="Your company / brand name" value={company.companyName}
                      onChange={(e) => setCompany((c) => ({ ...c, companyName: e.target.value }))}
                      onBlur={() => setCTouched((t) => ({ ...t, companyName: true }))}
                      className={inputCls(cTouched.companyName, cTouched.companyName ? companyResults.companyName : null) + " pr-9"} />
                  </FormField>
                </div>

                {/* Category */}
                <FormField label="Industry Category" required touched={cTouched.category} result={cTouched.category ? companyResults.category : null}>
                  <select value={company.category}
                    onChange={(e) => { setCompany((c) => ({ ...c, category: e.target.value })); setCTouched((t) => ({ ...t, category: true })); }}
                    onBlur={() => setCTouched((t) => ({ ...t, category: true }))}
                    className={inputCls(cTouched.category, cTouched.category ? companyResults.category : null)}>
                    <option value="" disabled>Select category</option>
                    {INDUSTRY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>

                {/* Company Phone */}
                <FormField label="Company Phone" required touched={cTouched.companyPhone} result={cTouched.companyPhone ? companyResults.companyPhone : null}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">+91</span>
                    <input type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit number" value={company.companyPhone}
                      onChange={(e) => setCompany((c) => ({ ...c, companyPhone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                      onBlur={() => setCTouched((t) => ({ ...t, companyPhone: true }))}
                      className={inputCls(cTouched.companyPhone, cTouched.companyPhone ? companyResults.companyPhone : null) + " pl-12 pr-9"} />
                  </div>
                </FormField>

                {/* Company Email */}
                <FormField label="Company Email" required touched={cTouched.companyEmail} result={cTouched.companyEmail ? companyResults.companyEmail : null}>
                  <input type="email" placeholder="info@company.com" value={company.companyEmail}
                    onChange={(e) => setCompany((c) => ({ ...c, companyEmail: e.target.value }))}
                    onBlur={() => setCTouched((t) => ({ ...t, companyEmail: true }))}
                    className={inputCls(cTouched.companyEmail, cTouched.companyEmail ? companyResults.companyEmail : null) + " pr-9"} />
                </FormField>

                {/* GSTIN (optional) */}
                <FormField label="GSTIN (optional)" touched={cTouched.gstin || !!company.gstin} result={(cTouched.gstin || !!company.gstin) ? companyResults.gstin : null}>
                  <input type="text" maxLength={15} placeholder="29ABCDE1234F1Z5" value={company.gstin}
                    onChange={(e) => setCompany((c) => ({ ...c, gstin: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15) }))}
                    onBlur={() => setCTouched((t) => ({ ...t, gstin: true }))}
                    className={inputCls(cTouched.gstin || !!company.gstin, (cTouched.gstin || !!company.gstin) ? companyResults.gstin : null) + " pr-9 uppercase"} />
                </FormField>

                {/* Address */}
                <div className="sm:col-span-2">
                  <FormField label="Address" required touched={cTouched.address} result={cTouched.address ? companyResults.address : null}>
                    <textarea rows={2} placeholder="Street address, area" value={company.address}
                      onChange={(e) => setCompany((c) => ({ ...c, address: e.target.value }))}
                      onBlur={() => setCTouched((t) => ({ ...t, address: true }))}
                      className={inputCls(cTouched.address, cTouched.address ? companyResults.address : null) + " resize-none"} />
                  </FormField>
                </div>

                {/* City */}
                <FormField label="City" required touched={cTouched.city} result={cTouched.city ? companyResults.city : null}>
                  <input type="text" placeholder="City" value={company.city}
                    onChange={(e) => setCompany((c) => ({ ...c, city: e.target.value }))}
                    onBlur={() => setCTouched((t) => ({ ...t, city: true }))}
                    className={inputCls(cTouched.city, cTouched.city ? companyResults.city : null) + " pr-9"} />
                </FormField>

                {/* District */}
                <FormField label="District" required touched={cTouched.district} result={cTouched.district ? companyResults.district : null}>
                  <input type="text" placeholder="District" value={company.district}
                    onChange={(e) => setCompany((c) => ({ ...c, district: e.target.value }))}
                    onBlur={() => setCTouched((t) => ({ ...t, district: true }))}
                    className={inputCls(cTouched.district, cTouched.district ? companyResults.district : null) + " pr-9"} />
                </FormField>

                {/* State */}
                <FormField label="State" required touched={cTouched.state} result={cTouched.state ? companyResults.state : null}>
                  <input type="text" placeholder="State" value={company.state}
                    onChange={(e) => setCompany((c) => ({ ...c, state: e.target.value }))}
                    onBlur={() => setCTouched((t) => ({ ...t, state: true }))}
                    className={inputCls(cTouched.state, cTouched.state ? companyResults.state : null) + " pr-9"} />
                </FormField>

                {/* Pincode */}
                <FormField label="Pin Code" required touched={cTouched.pincode} result={cTouched.pincode ? companyResults.pincode : null}>
                  <div className="relative">
                    <input type="text" inputMode="numeric" maxLength={6} placeholder="6-digit pin code" value={company.pincode}
                      onChange={(e) => setCompany((c) => ({ ...c, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))}
                      onBlur={() => setCTouched((t) => ({ ...t, pincode: true }))}
                      className={inputCls(cTouched.pincode, cTouched.pincode ? companyResults.pincode : null) + " pr-9"} />
                    {pinLookup === "loading" && (
                      <Loader2 className="absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-600" />
                    )}
                  </div>
                  {pinLookup === "found" && (
                    <p className="mt-1 text-xs font-medium text-emerald-600">
                      City, district and state auto-filled from India Post.
                    </p>
                  )}
                  {pinLookup === "not-found" && (
                    <p className="mt-1 text-xs font-medium text-amber-600">
                      PIN code not found. Please enter city, district and state manually.
                    </p>
                  )}
                </FormField>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!allValid}
        className={`w-full transition-opacity ${allValid ? "opacity-100" : "opacity-60 cursor-not-allowed"}`}
      >
        <Send className="h-5 w-5" />
        Submit Exhibitor Registration
      </Button>

      {!personalDone && (
        <p className="text-center text-xs text-slate-500">Complete your personal details to reveal the company section.</p>
      )}
      <p className="text-center text-xs text-slate-400">We respect your privacy. Your details are never shared.</p>
    </form>
  );
}
