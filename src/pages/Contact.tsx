import { PageHeader } from "../components/PageHeader";
import { PageSections, type SectionRegistry } from "../lib/renderSections";
import { PAGES } from "../config/site.config";
import {
  ContactMethods,
  ContactFormBlock,
  ContactMapBlock,
  ContactFaq,
} from "../components/contact/ContactSections";

const REGISTRY: SectionRegistry = {
  contactMethods: ContactMethods,
  contactFormBlock: ContactFormBlock,
  contactMap: ContactMapBlock,
  contactFaq: ContactFaq,
};

export default function Contact() {
  return (
    <>
      <PageHeader header={PAGES.contact.header!} />
      <PageSections ids={PAGES.contact.sections} registry={REGISTRY} />
    </>
  );
}
