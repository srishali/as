import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { Button } from "../Button";
import { SECTIONS } from "../../config/site.config";

const S = SECTIONS.gallery;

export function GalleryStrip() {
  return (
    <section className="bg-gradient-to-b from-white to-brand-50/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading {...S.heading} />

        <Stagger className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-4">
          {S.items.map((g) => (
            <StaggerItem key={g.label} className={g.span}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <img
                  src={g.src}
                  alt={g.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-white sm:text-base">
                    {g.label}
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-brand-700">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 text-center">
          <Button to={S.button.to} variant="outline" size="lg">
            {S.button.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
