import { getHomepageContent, getPortfolioImages } from "@/lib/data";
import HomePageClient from "@/components/HomePageClient";

export default async function Home() {
  const content = await getHomepageContent();
  const portfolioImages = await getPortfolioImages(8);

  // Reshape for easier consumption
  const heroData = content
    ? {
        heroTitle: content.heroTitle ?? undefined,
        heroSubtitle: content.heroSubtitle ?? undefined,
        heroImage: content.heroImage ?? undefined,
      }
    : undefined;

  return (
    <HomePageClient
       content={{
        hero: content ? {
          heroTitle: content.heroTitle ?? undefined,
          heroSubtitle: content.heroSubtitle ?? undefined,
          heroImage: content.heroImage ?? undefined,
        } : undefined,
        about: content?.aboutText ?? undefined,
        whyChooseUs: content?.whyChooseUs ?? [],
        stats: content?.stats ?? [],
      }}
      portfolioImages={portfolioImages}
    />
  );
}