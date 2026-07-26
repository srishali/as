import { PageHeader } from "../components/PageHeader";
import { PageSections, type SectionRegistry } from "../lib/renderSections";
import { PAGES } from "../config/site.config";
import {
  Benefits,
  Plans,
  Featured,
  HowTo,
  ExhibitForm,
} from "../components/exhibitors/ExhibitorSections";
import { CtaBand } from "../components/home/CtaBand";

const REGISTRY: SectionRegistry = {
  benefits: Benefits,
  plansSection: Plans,
  featured: Featured,
  howTo: HowTo,
  exhibitForm: ExhibitForm,
  ctaBand: CtaBand,
};

export default function Exhibitors() {
  return (
    <>
      <PageHeader header={PAGES.exhibitors.header!} />
      <PageSections ids={PAGES.exhibitors.sections} registry={REGISTRY} />
    </>
  );
}
