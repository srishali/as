import { LegalPageView, type LegalPage } from "../components/LegalPage";

const privacy: LegalPage = {
  header: {
    current: "Privacy Policy",
    eyebrow: "Legal",
    image: "/images/venue.jpg",
    title: "Your privacy is our ",
    accent: "priority",
    subtitle:
      "We are committed to protecting your personal information and being transparent about how we use it.",
  },
  intro: "Bengaluru Auto Expo ('we', 'us', or 'our') operates the website bengaluruautoexpo.in and related event services. This Privacy Policy explains how we collect, use, store, share and protect your personal information when you interact with our website, register for the expo, visit our premises, or use any of our services.",
  sections: [
    {
      heading: "1. Information We Collect",
      body: "We collect personal information that you voluntarily provide to us, including:\n• Identity & contact details: full name, email address, mobile number, date of birth, gender.\n• Professional information: company name, category, GSTIN, address, city, district, state, pin code, country.\n• Payment and billing data when you make a purchase or reserve a stall (processed by trusted payment partners).\n• Identity verification documents only when required for exhibitor / sponsor contracts.\n• Technical data: IP address, browser type, device information, pages visited and time spent, collected through cookies and analytics tools.\n• Visitor images / videos captured by CCTV and event photography in our venue.",
    },
    {
      heading: "2. How We Use Your Information",
      body: "We use the information collected to:\n• Process your registration as a visitor, exhibitor, partner, or sponsor.\n• Issue your Visitor Pass with a unique QR code and your Exhibitor Reference ID.\n• Send transactional emails, including pass confirmations, welcome emails, brochures, and event updates.\n• Verify your identity at the venue using the QR code.\n• Improve our website, services, marketing, and event experience.\n• Comply with applicable laws, regulations, and contractual obligations.\n• Respond to your enquiries and provide customer support.\n\nWe will never sell your personal information to third parties.",
    },
    {
      heading: "3. Sharing of Information",
      body: "We may share your data only with:\n• Event partners, sponsors, and exhibitors, but only when you explicitly opt in for a meeting request.\n• Service providers that help us operate the event (venue operations, payment processors, email/SMS gateways, cloud hosting, QR verification at entry gates).\n• Government or law-enforcement agencies when required by law or to protect our legal rights.\n• A successor entity in case of merger, acquisition, or business transfer — with prior notice to you.\n\nAll third-party processors are bound by confidentiality and data-protection obligations.",
    },
    {
      heading: "4. Cookies and Tracking",
      body: "We use cookies, local storage and similar technologies to keep you signed in, remember your form inputs, measure website performance, and personalise content. You can control cookies through your browser settings; however, disabling them may limit certain features such as the Visitor Pass download.",
    },
    {
      heading: "5. Data Security and Retention",
      body: "We employ industry-standard security measures — encrypted HTTPS transport, secure cloud storage, restricted staff access and periodic security reviews — to protect your information. We retain personal data only for as long as necessary to fulfil the purposes described in this policy, comply with our legal obligations, and resolve disputes. Once retention expires, data is securely deleted or anonymised.",
    },
    {
      heading: "6. Your Rights",
      body: "Subject to applicable law, you have the right to:\n• Access the personal data we hold about you.\n• Request correction of inaccurate or incomplete data.\n• Request deletion (right to be forgotten) of your data, subject to legal exceptions.\n• Withdraw consent at any time for processing based on consent.\n• Opt out of marketing communications via the 'unsubscribe' link in any email.\n• Request a portable copy of the information you provided to us.\n\nTo exercise any of these rights, contact us at privacy@bengaluruautoexpo.in.",
    },
    {
      heading: "7. Children's Privacy",
      body: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can delete it.",
    },
    {
      heading: "8. International Visitors",
      body: "If you are visiting from outside India, please note that your information will be transferred to, stored, and processed in India. By using our services, you consent to this transfer. We take appropriate safeguards to protect your data in accordance with this policy and applicable laws.",
    },
    {
      heading: "9. Changes to this Policy",
      body: "We may update this Privacy Policy from time to time. Material changes will be communicated via a prominent notice on our website and, where appropriate, by email. Continued use of our services after such changes indicates acceptance of the revised policy.",
    },
    {
      heading: "10. Contact Us",
      body: "For any privacy-related questions or concerns, please contact our Data Protection Officer at:\nEmail: privacy@bengaluruautoexpo.in\nPhone: +91 80 4500 8800\nAddress: Bengaluru Auto Expo, 10th Mile, Tumakuru Rd, Madavara, Bengaluru, Karnataka 562123, India.",
    },
  ],
};

export default function PrivacyPolicy() {
  return <LegalPageView page={privacy} />;
}
