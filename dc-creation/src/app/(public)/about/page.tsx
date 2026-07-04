import { getHomepageContent } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about DC Creation, our vision, and team.',
};

export default async function AboutPage() {
  const content = await getHomepageContent();
  return (
    <section className="pt-32 pb-20 container mx-auto px-4">
      <h1 className="font-heading text-4xl text-gold mb-6">About DC Creation</h1>
      <p className="text-text-secondary leading-relaxed max-w-4xl">
        {content?.aboutText || 'DC Creation is a professional photography studio...'}
      </p>
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-heading text-gold mb-3">Our Vision</h3>
          <p className="text-text-secondary">At DC Creation, we believe photography is more than just taking pictures — it is about preserving emotions, telling stories, and creating memories that last forever.</p>
        </div>
        <div>
          <h3 className="text-2xl font-heading text-gold mb-3">Our Location</h3>
          <p className="text-text-secondary">Kodi Street, V. Maruthur, Villupuram, Tamil Nadu - 605602</p>
          <p className="text-text-secondary">Established on 15 January 2025</p>
        </div>
      </div>
    </section>
  );
}