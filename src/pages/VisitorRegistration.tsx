import { PageHeader } from "../components/PageHeader";
import { VisitorForm } from "../components/forms/VisitorForm";
import { Reveal } from "../components/Reveal";
import { ShieldCheck, CalendarDays, MapPin, Users } from "lucide-react";
import { EVENT } from "../config/site.config";

const perks = [
  { icon: CalendarDays, text: `${EVENT.dates} — all four days` },
  { icon: MapPin, text: `${EVENT.venueShort}` },
  { icon: Users, text: "150,000+ fellow enthusiasts & professionals" },
  { icon: ShieldCheck, text: "Free entry for children under 8" },
];

export default function VisitorRegistration() {
  return (
    <>
      <PageHeader
        header={{
          current: "Visitor Pass",
          eyebrow: "Get Your Pass",
          image: "/images/expo-floor.jpg",
          title: "Your gateway to ",
          accent: "mobility's biggest week",
          subtitle:
            "Register in 60 seconds. Your personalised Visitor Pass with a unique QR code is generated instantly — download it as an image or PDF.",
        }}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left info */}
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  What's included in your pass?
                </h2>
                <ul className="mt-6 space-y-4">
                  {perks.map((p) => (
                    <li key={p.text} className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <p.icon className="h-5 w-5" />
                      </span>
                      <span className="pt-2 text-sm font-medium text-slate-600">{p.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-5">
                  <p className="text-sm font-semibold text-brand-800">
                    ✅ Your pass is generated instantly
                  </p>
                  <p className="mt-1 text-xs text-brand-700/80">
                    No waiting, no approval needed. Fill the form, get your
                    pass — download as image or PDF right away.
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-semibold text-amber-700">
                    📋 Terms & Conditions
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] text-amber-700/80 leading-relaxed">
                    <li>• One pass per person — not transferable.</li>
                    <li>• Valid for all four days of the expo.</li>
                    <li>• Must be 18+ to register independently.</li>
                    <li>• Present pass at the entrance gate for scanning.</li>
                    <li>• Children under 8 enter free (with registered adult).</li>
                    <li>• Organiser reserves the right to refuse entry.</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Right form */}
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 shadow-xl shadow-brand-900/10 sm:p-10">
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Register for your Visitor Pass
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    All fields marked <span className="text-red-500">*</span> are mandatory.
                  </p>
                  <div className="mt-6">
                    <VisitorForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
