import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Now',
  description: 'Book DC Creation for your wedding, event, or portrait session.',
};

export default function BookNowPage() {
  return (
    <section className="pt-24 pb-20 container mx-auto px-4 max-w-2xl">
      <h1 className="font-heading text-4xl text-gold text-center mb-8">Book Your Session</h1>
      <p className="text-text-secondary text-center mb-8">
        Fill the form below and you’ll be redirected to WhatsApp with all your details.
      </p>
      <ContactForm />
    </section>
  );
}