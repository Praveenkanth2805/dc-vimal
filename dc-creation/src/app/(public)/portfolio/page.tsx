import { getPortfolioImages } from '@/lib/data';
import PortfolioGallery from '@/components/PortfolioGallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse our wedding, candid, drone, and event photography portfolio in Viluppuram.',
};

export default async function PortfolioPage() {
  const images = await getPortfolioImages();
  return (
    <section className="pt-24 pb-20 container mx-auto px-4">
      <h1 className="font-heading text-4xl text-gold text-center mb-8">Our Portfolio</h1>
      <PortfolioGallery images={images} />
    </section>
  );
}