import { LegalPageView, type LegalPage } from "../components/LegalPage";

const terms: LegalPage = {
  header: {
    current: "Terms & Conditions",
    eyebrow: "Legal",
    image: "/images/hero.jpg",
    title: "Terms & ",
    accent: "Conditions",
    subtitle:
      "These terms govern your use of the Bengaluru Auto Expo website, registration systems, and event services. By using our services, you agree to them.",
  },
  intro: "Welcome to Bengaluru Auto Expo. By accessing or using our website, mobile experience, registration systems, visitor passes, exhibitor booths, or any related service (collectively, the 'Services'), you agree to be bound by these Terms & Conditions. Please read them carefully before proceeding.",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      body: "By creating an account, registering as a visitor or exhibitor, downloading a pass, or otherwise using the Services, you confirm that you have read, understood, and agreed to these Terms, our Privacy Policy, and any guidelines made available to you. If you do not agree, please discontinue use of the Services.",
    },
    {
      heading: "2. Eligibility",
      body: "You must be at least 18 years old to register as a visitor, exhibitor, partner, or sponsor. By registering, you represent and warrant that all information you provide is accurate, current, and complete. You agree to promptly update such information to keep it accurate.",
    },
    {
      heading: "3. Visitor Pass",
      body: "Your Visitor Pass is personal, non-transferable, and must be presented at the entry gate along with a valid photo ID. The QR code on the pass is for verification purposes only and does not entitle the holder to any commercial benefits. Bengaluru Auto Expo reserves the right to refuse entry or revoke the pass for any violation of venue rules, including but not limited to disorderly conduct, possession of prohibited items, or misuse of the pass.",
    },
    {
      heading: "4. Exhibitor Responsibilities",
      body: "Exhibitors agree to abide by the exhibitor manual, venue safety guidelines, local laws, and any conditions set forth in the signed exhibitor agreement. Stall construction must use materials approved by venue management. Exhibitors are responsible for their own staff, contractors, equipment, and inventory. Selling counterfeit or pirated goods at the expo is strictly prohibited and may result in immediate removal and legal action.",
    },
    {
      heading: "5. Intellectual Property",
      body: "All content on this website — including but not limited to text, graphics, logos, images, videos, and software — is the property of Bengaluru Auto Expo or its licensors and is protected by applicable copyright, trademark, and intellectual-property laws. You may not reproduce, distribute, modify, or create derivative works without prior written consent.",
    },
    {
      heading: "6. Code of Conduct",
      body: "We expect all visitors, exhibitors, partners, and staff to behave professionally and respectfully. Harassment, discrimination, defamatory remarks, or any unlawful activity will not be tolerated. Bengaluru Auto Expo reserves the right to remove any individual from the venue and to take appropriate legal action.",
    },
    {
      heading: "7. Photography, Video & Media",
      body: "By attending the event, you consent to being photographed, filmed, and recorded. Bengaluru Auto Expo may use such media for promotional, marketing, editorial, and archival purposes without compensation. If you do not wish to appear in such media, please inform the photography team at the venue.",
    },
    {
      heading: "8. Limitation of Liability",
      body: "Bengaluru Auto Expo, its organisers, sponsors, partners, and venue management will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your attendance, use of the website, registration, or participation in any activity at the event, including but not limited to loss of data, personal injury, or property damage.",
    },
    {
      heading: "9. Force Majeure",
      body: "We shall not be liable for any failure or delay in performance due to causes beyond our reasonable control, including but not limited to natural disasters, epidemics, government orders, civil unrest, acts of war, terrorism, power failures, or internet outages. In such cases, the event may be rescheduled, moved online, or cancelled at the organiser's discretion.",
    },
    {
      heading: "10. Cancellations and Refunds",
      body: "Please refer to our Refund Policy for details on cancellations, refunds, and transfers. By registering, you acknowledge that you have read and agreed to the Refund Policy.",
    },
    {
      heading: "11. Modifications to the Services",
      body: "We reserve the right to modify, suspend, or discontinue any part of the Services at any time, with or without notice, including but not limited to event schedules, exhibitor listings, hall layouts, and visitor experiences. Refunds, where applicable, will be processed in accordance with our Refund Policy.",
    },
    {
      heading: "12. Governing Law & Jurisdiction",
      body: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.",
    },
    {
      heading: "13. Contact",
      body: "For questions about these Terms & Conditions, please contact us at legal@bengaluruautoexpo.in.",
    },
  ],
};

export default function TermsConditions() {
  return <LegalPageView page={terms} />;
}
