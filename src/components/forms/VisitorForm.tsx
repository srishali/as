import { useState, useCallback } from "react";
import { FileImage, FileText, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { Button } from "../Button";
import { PersonalFields, validatePersonal, personalValid, type PersonalState, type PersonalTouched } from "./PersonalFields";
import { LocationFields, validateLocation, locationValid, type LocationState, type LocationTouched } from "./LocationFields";
import { generateId } from "../../lib/uniqueId";
import {
  generateQRDataUrl,
  renderPassToCanvasDataUrl,
  downloadDataUrl,
  downloadPdf,
  generatePdfBase64,
} from "../../lib/passGenerator";
import { submitRegistration } from "../../lib/submissions";
import { FORM_URLS, EVENT, VISITOR_PASS_ATTACHMENTS } from "../../config/site.config";
import { VisitorPassCard, type PassData } from "../templates/VisitorPass";

const PERSONAL_INIT: PersonalState = { fullName: "", email: "", phone: "", gender: "", dob: "" };
const PERSONAL_TOUCHED_INIT: PersonalTouched = { fullName: false, email: false, phone: false, gender: false, dob: false };
const LOCATION_INIT: LocationState = { city: "", pincode: "", district: "", state: "" };
const LOCATION_TOUCHED_INIT: LocationTouched = { city: false, pincode: false, district: false, state: false };

type Step = "form" | "generating" | "done";

export function VisitorForm() {
  const [personal, setPersonal] = useState<PersonalState>(PERSONAL_INIT);
  const [pTouched, setPTouched] = useState<PersonalTouched>(PERSONAL_TOUCHED_INIT);
  const [location, setLocation] = useState<LocationState>(LOCATION_INIT);
  const [lTouched, setLTouched] = useState<LocationTouched>(LOCATION_TOUCHED_INIT);
  const [step, setStep] = useState<Step>("form");
  const [passData, setPassData] = useState<PassData | null>(null);
  const [passPng, setPassPng] = useState<string>("");

  const personalResults = validatePersonal(personal);
  const locationResults = validateLocation(location);
  const allValid = personalValid(personalResults) && locationValid(locationResults);

  async function handleDownloadImage() {
    if (passPng && passData) {
      const filename = `${EVENT.name} - Visitor Pass - ${passData.id}.png`;
      downloadDataUrl(passPng, filename);
    }
  }

  async function handleDownloadPdf() {
    if (passPng && passData) {
      const filename = `${EVENT.name} - Visitor Pass - ${passData.id}.pdf`;
      downloadPdf(passPng, filename);
    }
  }

  const touchAll = useCallback(() => {
    setPTouched({ fullName: true, email: true, phone: true, gender: true, dob: true });
    setLTouched({ city: true, pincode: true, district: true, state: true });
  }, []);

// ... (imports remain the same)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    touchAll();
    if (!allValid) return;

    setStep("generating");

    try {
      // ── STEP 1: Save row to Google Sheets and get sequential ID (No email sent yet) ──
      const regResult = await submitRegistration({
        type: "visitor",
        action: "register",
        personal: { ...personal, ...location, interest: "Visitor Registration" },
      });

      // Fallback to local ID generator only if backend is offline/fails
      const realId = regResult.id || generateId("visitor");

      // ── STEP 2: Generate QR Code & draw Canvas Pass using the REAL ID ──
      const qrText = `${EVENT.name.toUpperCase().replace(/\s+/g, "-")}|VISITOR|${realId}|${personal.fullName}`;
      const qrDataUrl = await generateQRDataUrl(qrText);
      const issuedAt = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const finalPass: PassData = {
        id: realId,
        fullName: personal.fullName,
        gender: personal.gender,
        dob: personal.dob,
        qrDataUrl,
        issuedAt,
      };

      // Draw the exact 3x4 pass image with the REAL ID printed on it
      const png = await renderPassToCanvasDataUrl(finalPass);
      const pdfBase64 = generatePdfBase64(png);

      setPassPng(png);
      setPassData(finalPass);

      // ── STEP 3: Send the rendered pass PNG & PDF to trigger emails (No duplicate row added) ──
      submitRegistration({
        type: "visitor",
        action: "send_pass",
        id: realId,
        personal: { ...personal, ...location, interest: "Visitor Registration" },
        passImage: png,
        passPdf: pdfBase64,
        attachImage: VISITOR_PASS_ATTACHMENTS.attachImage,
        attachPdf: VISITOR_PASS_ATTACHMENTS.attachPdf,
      }).catch((err) => {
        console.error("Email delivery failed non-fatally:", err);
      });

      setStep("done");
    } catch (err) {
      console.error("Visitor registration error:", err);
      // Fallback local display if network fails completely
      const localId = generateId("visitor");
      const qrDataUrl = await generateQRDataUrl(`VISITOR|${localId}|${personal.fullName}`);
      const fallbackPass: PassData = {
        id: localId,
        fullName: personal.fullName,
        gender: personal.gender,
        dob: personal.dob,
        qrDataUrl,
        issuedAt: new Date().toLocaleDateString("en-IN"),
      };
      const png = await renderPassToCanvasDataUrl(fallbackPass);
      setPassPng(png);
      setPassData(fallbackPass);
      setStep("done");
    }
  } 
  
  function reset() {
    setPersonal(PERSONAL_INIT);
    setPTouched(PERSONAL_TOUCHED_INIT);
    setLocation(LOCATION_INIT);
    setLTouched(LOCATION_TOUCHED_INIT);
    setPassData(null);
    setPassPng("");
    setStep("form");
  }

  if (step === "done" && passData) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          <h3 className="mt-3 font-display text-xl font-bold text-slate-900">Registration Successful!</h3>
          <p className="mt-1 text-sm text-slate-600">Your Visitor Pass is ready. Download it below.</p>
          <div className="mt-3 inline-flex items-center rounded-full bg-brand-50 px-4 py-1.5">
            <span className="font-mono text-sm font-bold tracking-widest text-brand-700">{passData.id}</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 flex justify-center">
          <VisitorPassCard data={passData} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="primary" size="lg" className="w-full shadow-lg" onClick={handleDownloadImage}>
            <FileImage className="h-5 w-5" /> Download as Image (PNG)
          </Button>
          <Button variant="accent" size="lg" className="w-full shadow-lg" onClick={handleDownloadPdf}>
            <FileText className="h-5 w-5" /> Download as PDF
          </Button>
        </div>

        <p className="text-center text-xs text-slate-500">
          {FORM_URLS.visitor ? (
            <>Your pass with ID <strong>{passData.id}</strong> has been emailed to <strong>{personal.email}</strong></>
          ) : (
            <>Registration saved locally.</>
          )}
        </p>

        <button
          type="button"
          onClick={reset}
          className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          <RotateCcw className="h-4 w-4" /> Register another visitor
        </button>
      </div>
    );
  }

  if (step === "generating") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Loader2 className="h-10 w-10 animate-spin text-brand-700" />
        <p className="font-display text-base font-bold text-slate-700">Registering & generating your Visitor Pass…</p>
        <p className="text-xs text-slate-400">Please wait — this takes a few seconds.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <h3 className="font-display text-base font-bold text-slate-900">Personal Details</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <PersonalFields
          state={personal}
          touched={pTouched}
          results={personalResults}
          onChange={(f, v) => setPersonal((p) => ({ ...p, [f]: v }))}
          onBlur={(f) => setPTouched((t) => ({ ...t, [f]: true }))}
        />
        <LocationFields
          state={location}
          touched={lTouched}
          results={locationResults}
          onChange={(f, v) => setLocation((p) => ({ ...p, [f]: v }))}
          onBlur={(f) => setLTouched((t) => ({ ...t, [f]: true }))}
          onAutoFill={(data) => setLocation((p) => ({ ...p, city: data.city || p.city, district: data.district || p.district, state: data.state || p.state }))}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!allValid}
        className={`w-full transition-opacity ${allValid ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
      >
        Register and Download Pass
      </Button>
    </form>
  );
}
