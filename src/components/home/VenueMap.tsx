import { MapPin, Clock, Navigation, ArrowUpRight } from "lucide-react";
import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { EVENT, SECTIONS } from "../../config/site.config";

const S = SECTIONS.venue;

export function VenueMap() {
  return (
    <section className="relative bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...S.heading} />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: details */}
          <Reveal>
            <div className="flex h-full flex-col">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-brand-900/10">
                <img
                  src={S.image}
                  alt="Bangalore International Exhibition Centre (BIEC) at dusk"
                  className="h-56 w-full object-cover sm:h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                    <MapPin className="h-3.5 w-3.5" /> {EVENT.city}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">
                    {EVENT.venue}
                  </h3>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-brand-700">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Dates & Hours
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    {EVENT.dates}
                  </p>
                  <p className="text-xs text-slate-500">{EVENT.hours}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-brand-700">
                    <Navigation className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Address
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {EVENT.address}
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {S.access.map((a) => (
                  <li
                    key={a.label}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <a.icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {a.label}
                    </span>
                    <span className="ml-auto text-xs font-semibold text-accent-700">
                      {a.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={S.directionsUrl} variant="primary" size="md">
                  {S.directionsLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button to="/contact" variant="ghost" size="md">
                  {S.venueTeamLabel}
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Right: map */}
          <Reveal delay={0.1}>
            <div className="h-full min-h-[420px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-brand-900/10">
              <iframe
                title="Map to Bengaluru Auto Expo 2026 venue"
                src={S.mapSrc}
                className="h-full min-h-[420px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
