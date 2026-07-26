import { PageHeader } from "./PageHeader";
import { ChevronRight } from "lucide-react";

export type LegalSection = { heading: string; body: string };
export type LegalPage = {
  header: {
    current: string;
    eyebrow: string;
    image: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  intro: string;
  sections: LegalSection[];
};

export function LegalPageView({ page }: { page: LegalPage }) {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHeader
        header={{
          current: page.header.current,
          eyebrow: page.header.eyebrow,
          image: page.header.image,
          title: page.header.title,
          accent: page.header.accent,
          subtitle: page.header.subtitle,
        }}
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <span>Last updated</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-700">{lastUpdated}</span>
          </div>

          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {page.intro}
          </p>

          <div className="mt-10 space-y-10">
            {page.sections.map((s) => (
              <div
                key={s.heading}
                className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/60 p-6 sm:p-8"
              >
                <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                  {s.heading}
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50/40 p-6 text-sm text-slate-600 sm:p-8">
            <p>
              For any questions about this page, please write to us at{" "}
              <a
                href="mailto:legal@bengaluruautoexpo.in"
                className="font-semibold text-brand-700 hover:underline"
              >
                legal@bengaluruautoexpo.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
