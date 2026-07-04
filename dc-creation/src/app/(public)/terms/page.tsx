import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
};

export default function TermsPage() {
  return (
    <section className="pt-24 pb-20 container mx-auto px-4 max-w-3xl">
      <h1 className="font-heading text-4xl text-gold mb-8">Terms & Conditions</h1>
      <div className="prose prose-invert max-w-none text-text-secondary">
        <p>By using our services, you agree to the following terms.</p>
        <h3>Booking & Payment</h3>
        <p>A non-refundable advance is required to confirm your booking. The balance is due on the event day or as agreed.</p>
        <h3>Cancellations</h3>
        <p>If you cancel more than 30 days before the event, 50% of the advance will be refunded. Cancellations within 30 days are non-refundable.</p>
        <h3>Copyright</h3>
        <p>DC Creation retains the copyright of all images and videos. Clients receive a license for personal use. Commercial use requires written permission.</p>
        <h3>Limitation of Liability</h3>
        <p>DC Creation is not liable for any indirect or consequential loss arising from the use of our services.</p>
      </div>
    </section>
  );
}