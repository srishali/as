import { PageHeader } from "../components/PageHeader";
import { PageSections, type SectionRegistry } from "../lib/renderSections";
import { PAGES } from "../config/site.config";
import {
  WhyBeHere,
  SponsorTiers,
  Audience,
  RoiBand,
} from "../components/opportunities/OpportunitySections";
import { CtaBand } from "../components/home/CtaBand";

const REGISTRY: SectionRegistry = {
  oppWhy: WhyBeHere,
  tiers: SponsorTiers,
  audience: Audience,
  roi: RoiBand,
  ctaBand: CtaBand,
};

export default function Opportunities() {
  return (
    <>
      <PageHeader header={PAGES.opportunities.header!} />
      <PageSections ids={PAGES.opportunities.sections} registry={REGISTRY} />
    </>
  );
}
