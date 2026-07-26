import { PageHeader } from "../components/PageHeader";
import { PageSections, type SectionRegistry } from "../lib/renderSections";
import { PAGES } from "../config/site.config";
import {
  AboutIntro,
  Pillars,
  NumbersBand,
  TimelineSection,
  WhyBengaluru,
} from "../components/about/AboutSections";
import { PartnersSection } from "../components/PartnersSection";
import { CtaBand } from "../components/home/CtaBand";

const REGISTRY: SectionRegistry = {
  aboutIntro: AboutIntro,
  pillars: Pillars,
  numbers: NumbersBand,
  timelineSection: TimelineSection,
  whyBengaluru: WhyBengaluru,
  partnersSection: PartnersSection,
  ctaBand: CtaBand,
};

export default function About() {
  return (
    <>
      <PageHeader header={PAGES.about.header!} />
      <PageSections ids={PAGES.about.sections} registry={REGISTRY} />
    </>
  );
}
