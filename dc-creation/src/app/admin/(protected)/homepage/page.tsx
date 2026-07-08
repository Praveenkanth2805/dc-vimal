export const dynamic = "force-dynamic";
import { prisma } from '@/lib/prisma';
import HomepageEditor from '@/components/Admin/HomepageEditor';

export default async function AdminHomepagePage() {
  const content = await prisma.homepageContent.findFirst();
  // Parse JSON fields for the form
  const defaultData = content
    ? {
        heroTitle: content.heroTitle || '',
        heroSubtitle: content.heroSubtitle || '',
        heroImage: content.heroImage || '',
        aboutText: content.aboutText || '',
        whyChooseUs: content.whyChooseUs ? JSON.parse(content.whyChooseUs) : [],
        stats: content.stats ? JSON.parse(content.stats) : [],
      }
    : {
        heroTitle: '',
        heroSubtitle: '',
        heroImage: '',
        aboutText: '',
        whyChooseUs: [] as string[],
        stats: [] as { label: string; value: number }[],
      };

  return <HomepageEditor initialData={defaultData} />;
}