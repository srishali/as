import { PageHeader } from "../components/PageHeader";
import { FloorPlanMain } from "../components/floor-plan/FloorPlanMain";
import { HowTo } from "../components/exhibitors/ExhibitorSections";
import { PartnersBar } from "../components/home/PartnersBar";
import { ExhibitorMarquee } from "../components/home/ExhibitorMarquee";
import { PAGES } from "../config/site.config";
import { PageSections, type SectionRegistry } from "../lib/renderSections";

/**
 * Floor Plan page — fully driven by view-config.ts.
 * Visibility and order are controlled by:
 *   SECTIONS.floorPlanMain / howTo / partnersBar / exhibitorMarquee
 *   PAGES.floorPlan.sections
 */
const REGISTRY: SectionRegistry = {
  floorPlanMain: FloorPlanMain,
  howTo: HowTo,
  partnersBar: PartnersBar,
  exhibitorMarquee: ExhibitorMarquee,
};

export default function FloorPlan() {
  return (
    <>
      <PageHeader header={PAGES.floorPlan.header!} />
      <PageSections ids={PAGES.floorPlan.sections} registry={REGISTRY} />
    </>
  );
}