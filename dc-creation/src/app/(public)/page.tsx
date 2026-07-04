import HeroBanner from '@/components/HeroBanner';
import AboutSection from '@/components/AboutSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ServicesSection from '@/components/ServicesSection';
import PortfolioGallery from '@/components/PortfolioGallery';
import VideoShowcase from '@/components/VideoShowcase';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import StatsSection from '@/components/StatsSection';
import BookingCTA from '@/components/BookingCTA';
import ContactSection from '@/components/ContactSection';
import { getHomepageContent, getPortfolioImages } from '@/lib/data';

export default async function Home() {
  const content = await getHomepageContent();
  const portfolioImages = await getPortfolioImages(8);
  return (
    <>
      <HeroBanner data={content ? {
        heroTitle: content.heroTitle ?? undefined,
        heroSubtitle: content.heroSubtitle ?? undefined,
        heroImage: content.heroImage ?? undefined
      } : undefined} />
      <AboutSection data={content?.aboutText ?? undefined} />
      <WhyChooseUs points={content?.whyChooseUs ? JSON.parse(content.whyChooseUs) : []} />
      <ServicesSection />
      <PortfolioGallery images={portfolioImages} limit={8} />
      <VideoShowcase />
      <ReviewsCarousel />
      <StatsSection />
      <BookingCTA />
      <ContactSection />
    </>
  );
}