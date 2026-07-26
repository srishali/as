import { PageSections, type SectionRegistry } from "../lib/renderSections";
import { PAGES } from "../config/site.config";
import { Hero } from "../components/home/Hero";
import { CountdownSection } from "../components/home/CountdownSection";
import { AboutBrief } from "../components/home/AboutBrief";
import { Highlights } from "../components/home/Highlights";
import { QuickContact } from "../components/home/QuickContact";
import { Sectors } from "../components/home/Sectors";
import { IndustryStats } from "../components/home/IndustryStats";
import { GalleryStrip } from "../components/home/GalleryStrip";
import { VenueMap } from "../components/home/VenueMap";
import { PartnersBar } from "../components/home/PartnersBar";
import { ExhibitorMarquee } from "../components/home/ExhibitorMarquee";
import { Testimonials } from "../components/home/Testimonials";
import { CtaBand } from "../components/home/CtaBand";

const REGISTRY: SectionRegistry = {
  hero: Hero,
  countdown: CountdownSection,
  aboutBrief: AboutBrief,
  highlights: Highlights,
  quickContact: QuickContact,
  sectors: Sectors,
  industry: IndustryStats,
  gallery: GalleryStrip,
  venue: VenueMap,
  partnersBar: PartnersBar,
  exhibitorMarquee: ExhibitorMarquee,
  testimonials: Testimonials,
  ctaBand: CtaBand,
};

export default function Home() {
  return <PageSections ids={PAGES.home.sections} registry={REGISTRY} />;
}
