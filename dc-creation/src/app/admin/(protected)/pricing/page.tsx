import { prisma } from '@/lib/prisma';
import PricingManager from '@/components/Admin/PricingManager';

export default async function AdminPricingPage() {
  const prices = await prisma.photoFramePrice.findMany({ orderBy: { id: 'asc' } });
  return <PricingManager initialPrices={prices} />;
}