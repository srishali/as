import { LegalPageView, type LegalPage } from "../components/LegalPage";

const refund: LegalPage = {
  header: {
    current: "Refund Policy",
    eyebrow: "Legal",
    image: "/images/ev-showcase.jpg",
    title: "Transparent, fair ",
    accent: "refund policy",
    subtitle:
      "We want you to feel confident when registering for Bengaluru Auto Expo. Here is exactly how cancellations and refunds work.",
  },
  intro: "At Bengaluru Auto Expo, we aim to make every transaction simple and fair. This Refund Policy explains the conditions under which refunds, credits, or transfers may be offered for Visitor Passes, Exhibitor Booths, Sponsor Packages, and other services purchased through our official website or authorised partners.",
  sections: [
    {
      heading: "1. Visitor Passes",
      body: "Visitor Passes are issued free of charge for trade and media categories during pre-registration periods. For any paid early-bird or premium passes:\n• Full refund: requested 7 or more days before the event start date.\n• 50% refund: requested 3–6 days before the event start date.\n• No refund: requested within 48 hours of the event start date or after entry has been granted.\n\nAll approved refunds are processed within 7–10 business days to the original payment method.",
    },
    {
      heading: "2. Exhibitor Booth Bookings",
      body: "Booth bookings are confirmed only after full payment or a signed instalment agreement. Refunds for exhibitor bookings are processed as follows:\n• Cancellation 60+ days before the event: 90% refund (10% retained as administrative and operational costs).\n• Cancellation 30–59 days before the event: 50% refund.\n• Cancellation less than 30 days before the event: no refund, but the booking may be transferred to the next edition or assigned to a colleague from the same company, subject to approval.\n• No-shows and on-site cancellations are non-refundable.\n\nIf the event is cancelled or rescheduled by the organiser, exhibitors may choose a full refund, a credit towards the next edition, or an equivalent booth at the rescheduled event.",
    },
    {
      heading: "3. Sponsorship & Partnership Packages",
      body: "Sponsorship commitments are treated as binding contracts. Refunds, where offered, follow the schedule above. Branding and production costs already incurred at the time of cancellation will be deducted from the refundable amount. All sponsorship agreements are subject to the specific terms of the signed partnership contract.",
    },
    {
      heading: "4. Event Cancellation or Rescheduling by the Organiser",
      body: "If the event is cancelled in full by the organiser, all paid fees will be refunded in full within 15 business days. If the event is rescheduled, paid registrations are automatically transferred to the new dates; attendees and exhibitors who cannot attend the new dates may request a full refund within 14 days of the reschedule announcement.",
    },
    {
      heading: "5. Refund Process",
      body: "To request a refund, please email refunds@bengaluruautoexpo.in with the following information:\n• Your full name and registered email/phone\n• Booking or pass ID\n• Date of purchase\n• Reason for the refund request\n• Supporting documents (if any)\n\nOur team will acknowledge your request within 2 business days and provide a resolution timeline.",
    },
    {
      heading: "6. Non-Refundable Items",
      body: "The following are non-refundable:\n• Convenience and processing fees charged by payment gateways.\n• Add-on services (workshops, networking dinners, branded merchandise) once they have been delivered, used, or shipped.\n• Late-stage customisation or fabrication work for exhibitor stalls that has already begun.",
    },
    {
      heading: "7. Chargebacks",
      body: "We encourage customers to contact us first to resolve any payment or refund issues before initiating a chargeback with their bank or card issuer. Unjustified chargebacks may result in suspension of your account and future registration privileges.",
    },
    {
      heading: "8. Force Majeure",
      body: "In the event of force majeure (natural disasters, epidemics, government orders, civil unrest, etc.) the organiser may, at its sole discretion, offer credits for the next edition, partial refunds after deducting unavoidable costs, or reschedule the event. The organiser's decision in such matters is final.",
    },
    {
      heading: "9. Changes to this Policy",
      body: "We may update this Refund Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services after such changes indicates acceptance of the revised policy.",
    },
    {
      heading: "10. Contact",
      body: "For any refund-related queries, please write to refunds@bengaluruautoexpo.in or call +91 80 4500 8800 (Mon–Fri, 10:00 AM – 6:00 PM IST).",
    },
  ],
};

export default function RefundPolicy() {
  return <LegalPageView page={refund} />;
}
