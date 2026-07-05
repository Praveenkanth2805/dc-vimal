import { prisma } from '@/lib/prisma';
import PortfolioManager from '@/components/Admin/PortfolioManager';

export default async function AdminPortfolioPage() {
  const images = await prisma.portfolio.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <PortfolioManager
      initialImages={images.map((img) => ({
        ...img,
        thumbnailUrl: img.thumbnailUrl ?? undefined,
      }))}
    />
  );
}