import ContactSection from '@/components/ContactSection';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with DC Creation for photography and videography bookings.',
};

export default function ContactPage() {
  return (
    <section className="pt-24 pb-20 container mx-auto px-4">
      <h1 className="font-heading text-4xl text-gold text-center mb-12">Contact Us</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <ContactSection />
        <ContactForm />
      </div>
    </section>
  );
}