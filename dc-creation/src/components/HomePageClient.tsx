
import AnimatedHeroSection from "./AnimatedHeroSection";
import AboutSection from "./AboutSection";
import WhyChooseUs from "./WhyChooseUs";
import ServicesSection from "./ServicesSection";
import PortfolioGallery from "./PortfolioGallery";
import VideoShowcase from "./VideoShowcase";
import ReviewsCarousel from "./ReviewsCarousel";
import StatsSection from "./StatsSection";
import BookingCTA from "./BookingCTA";
import ContactSection from "./ContactSection";
import ReviewForm from "./ReviewForm";

export default function HomePageClient({
  content,
  portfolioImages,
}: {
  content: any;
  portfolioImages: any[];
}) {
  return (
    <>
      <AnimatedHeroSection data={content?.hero} />
      <AboutSection data={content?.about} />
      <WhyChooseUs points={content?.whyChooseUs} />
      {/* <ServicesSection /> */}
      <PortfolioGallery images={portfolioImages} limit={8} />
      <VideoShowcase />
      <ReviewsCarousel />
      <StatsSection />
      <BookingCTA />
      <ContactSection />
      <ReviewForm />
    </>
  );
}