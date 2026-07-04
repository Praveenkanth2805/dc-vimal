import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about DC Creation photography services.',
};

const faqs = [
  {
    q: 'What areas do you cover?',
    a: 'We are based in Villupuram and cover all surrounding areas. We also travel for destination weddings.',
  },
  {
    q: 'How can I book a session?',
    a: 'Use our Book Now page or WhatsApp us directly. We require a small advance to confirm your date.',
  },
  {
    q: 'Do you provide raw photos?',
    a: 'We provide fully edited, high-resolution images. Raw files are not included in standard packages.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Cancellations made 30 days before the event are eligible for a partial refund of the advance.',
  },
];

export default function FAQPage() {
  return (
    <section className="pt-24 pb-20 container mx-auto px-4 max-w-3xl">
      <h1 className="font-heading text-4xl text-gold text-center mb-12">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-navy-light border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gold mb-2">{faq.q}</h3>
            <p className="text-text-secondary">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}