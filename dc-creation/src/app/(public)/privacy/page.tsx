import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <section className="pt-24 pb-20 container mx-auto px-4 max-w-3xl">
      <h1 className="font-heading text-4xl text-gold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-text-secondary">
        <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
        <h3>Information We Collect</h3>
        <p>When you fill a contact or booking form, we collect your name, mobile number, and event details solely to communicate with you regarding our services.</p>
        <h3>How We Use Your Information</h3>
        <p>We use the information to respond to your enquiry, schedule appointments, and improve our services. We do not sell or share your data with third parties.</p>
        <h3>Data Security</h3>
        <p>We implement appropriate security measures to protect your data. All information is stored securely.</p>
        <h3>Contact Us</h3>
        <p>If you have any questions, please contact us at 072003 04753.</p>
      </div>
    </section>
  );
}