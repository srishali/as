import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Ticket, Building2, MessageSquare } from "lucide-react";
import { useRegistrationModal } from "./RegistrationModalContext";
import { ExhibitorForm } from "./forms/ExhibitorForm";
import { VisitorForm } from "./forms/VisitorForm";
import { ContactForm } from "./ContactForm";

export function RegistrationModal() {
  const { type, booth, close } = useRegistrationModal();
  const [selection, setSelection] = useState<"exhibitor" | "visitor">("exhibitor");

  const isChooser = type === "chooser";
  const activeType = isChooser ? selection : type;

  const isExhibitor = activeType === "exhibitor";
  const isVisitor = activeType === "visitor";
  
  // Checking if the current modal type is a General Enquiry variant
  const isEnquiry =
    activeType === "contact" ||
    activeType === "partner" ||
    activeType === "booth" ||
    activeType === "sponsor";

  // If opened from specific CTAs, the interest is locked
  const isLockedEnquiry =
    activeType === "partner" ||
    activeType === "booth" ||
    activeType === "sponsor";

  // Map sub-type to standard dropdown interests
  const interestMap: Record<string, string> = {
    partner: "Sponsorship & Partnership",
    sponsor: "Sponsorship & Partnership",
    booth:   "Exhibitor Registration",
    contact: "General Enquiry",
  };

  const defaultInterest = isEnquiry && activeType ? interestMap[activeType] : "";

  useEffect(() => {
    document.body.style.overflow = type ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [type]);

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-950/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl shadow-brand-950/40"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-md sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-accent-700 text-white">
                    {isExhibitor && <Building2 className="h-5 w-5" />}
                    {isVisitor && <Ticket className="h-5 w-5" />}
                    {isEnquiry && <MessageSquare className="h-5 w-5" />}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-slate-900">
                      {isExhibitor && "Exhibitor Registration"}
                      {isVisitor && "Visitor Pass Registration"}
                      {isEnquiry && "General Enquiry"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isExhibitor && "Complete both sections to reserve your space."}
                      {isVisitor && "Generate your QR visitor pass instantly."}
                      {isEnquiry && `Inquire about ${defaultInterest.toLowerCase()}.`}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close registration popup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {isChooser && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setSelection("exhibitor")}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      selection === "exhibitor"
                        ? "border-brand-600 bg-brand-50"
                        : "border-slate-200 bg-white hover:border-brand-200"
                    }`}
                  >
                    <p className="text-sm font-bold text-slate-900">Exhibitor Registration</p>
                    <p className="text-xs text-slate-500">For companies, stalls, and brand participation.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelection("visitor")}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      selection === "visitor"
                        ? "border-brand-600 bg-brand-50"
                        : "border-slate-200 bg-white hover:border-brand-200"
                    }`}
                  >
                    <p className="text-sm font-bold text-slate-900">Visitor Registration</p>
                    <p className="text-xs text-slate-500">For visitor pass and entry QR generation.</p>
                  </button>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-8">
              {isExhibitor && <ExhibitorForm boothInterest={booth} />}
              {isVisitor && <VisitorForm />}
              {isEnquiry && <ContactForm defaultInterest={defaultInterest} locked={isLockedEnquiry} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
