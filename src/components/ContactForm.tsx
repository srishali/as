import { useState, useCallback } from "react";
import { Send, CheckCircle2, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { FormField, inputCls } from "./forms/FormField";
import {
  PersonalFields,
  validatePersonal,
  personalValid,
  type PersonalState,
  type PersonalTouched,
} from "./forms/PersonalFields";
import { validateRequired, type ValidationResult } from "../lib/validation";
import { FORM_INTERESTS, FORM_URLS } from "../config/site.config";
import { submitRegistration } from "../lib/submissions";
import { generateId } from "../lib/uniqueId";
import { cn } from "../lib/utils";

const PERSONAL_INIT: PersonalState = { fullName: "", email: "", phone: "", gender: "", dob: "" };
const TOUCHED_INIT: PersonalTouched = { fullName: false, email: false, phone: false, gender: false, dob: false };

export function ContactForm({ light = false, defaultInterest = "", locked = false }: { light?: boolean, defaultInterest?: string, locked?: boolean }) {
  const [personal, setPersonal] = useState<PersonalState>(PERSONAL_INIT);
  const [touched, setTouched] = useState<PersonalTouched>(TOUCHED_INIT);
  const [interest, setInterest] = useState(defaultInterest);
  const [interestTouched, setInterestTouched] = useState(!!defaultInterest);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const personalResults = validatePersonal(personal);
  const interestResult: ValidationResult = interest
    ? { ok: true, msg: "" }
    : { ok: false, msg: "Please select an interest." };
  const messageResult: ValidationResult =
    validateRequired(message, "Message", 5, 1000);
  const allValid =
    personalValid(personalResults) && interestResult.ok && messageResult.ok;

  const touchAll = useCallback(() => {
    setTouched({ fullName: true, email: true, phone: true, gender: true, dob: true });
    setInterestTouched(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    touchAll();
    if (!allValid || submitting) return;

    setSubmitting(true);

    // Show immediate feedback; ID will update once backend responds
    setSent(true);

    const result = await submitRegistration({
      type: "contact",
      personal: { ...personal },
      interest,
      message,
    });

    // Use backend-generated ID; fallback to local only if offline
    setGeneratedId(result.id || generateId("contact"));
    setSubmitting(false);
  }

  /* ── SUBMITTING — loading state ── */
  if (submitting) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Loader2 className="h-10 w-10 animate-spin text-brand-700" />
        <p className="font-display text-base font-bold text-slate-700">
          Sending your enquiry…
        </p>
        <p className="text-xs text-slate-400">Please wait — this takes a few seconds.</p>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
          Enquiry Submitted Successfully!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">
          Thank you, <strong>{personal.fullName}</strong>. Our team will respond within one business day.
        </p>
        <div className="mt-4 rounded-full bg-brand-50 px-5 py-2">
          <span className="font-mono text-sm font-bold tracking-widest text-brand-700">
            {generatedId}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {FORM_URLS.contact
            ? `An acknowledgement email has been sent to ${personal.email}`
            : "Enquiry saved locally."}
        </p>
        <button
          type="button"
          onClick={() => {
            setPersonal(PERSONAL_INIT);
            setTouched(TOUCHED_INIT);
            setInterest("");
            setInterestTouched(false);
            setMessage("");
            setGeneratedId("");
            setSent(false);
          }}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          <RotateCcw className="h-4 w-4" />
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <PersonalFields
          state={personal}
          touched={touched}
          results={personalResults}
          onChange={(f, v) => setPersonal((p) => ({ ...p, [f]: v }))}
          onBlur={(f) => setTouched((t) => ({ ...t, [f]: true }))}
        />

        {/* Interest */}
        <div className="sm:col-span-2">
          <FormField
            label="I'm interested in"
            required
            touched={interestTouched}
            result={interestTouched ? interestResult : null}
          >
            <select
              value={interest}
              onChange={locked ? undefined : (e) => { setInterest(e.target.value); setInterestTouched(true); }}
              onBlur={() => setInterestTouched(true)}
              disabled={locked}
              className={cn(
                inputCls(interestTouched, interestTouched ? interestResult : null),
                locked && "opacity-60 cursor-not-allowed bg-slate-100"
              )}
            >
              <option value="" disabled>Select an option</option>
              {FORM_INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </FormField>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <FormField
            label="Message"
            required
            touched={!!message}
            result={message ? messageResult : null}
          >
            <textarea
              rows={4}
              placeholder="Tell us a bit about what you're looking for…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={
                inputCls(!!message, message ? messageResult : null) + " resize-none"
              }
            />
          </FormField>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!allValid}
        className={`w-full transition-opacity ${allValid ? "opacity-100" : "opacity-60"}`}
      >
        <Send className="h-4 w-4" />
        Submit Enquiry
      </Button>

      {!allValid && Object.values(touched).some(Boolean) && (
        <p className="text-center text-xs text-red-500">
          Please fill all required fields correctly before submitting.
        </p>
      )}

      <p className={`text-center text-xs ${light ? "text-brand-100/70" : "text-slate-400"}`}>
        We respect your privacy. Your details are never shared.
      </p>
    </form>
  );
}
