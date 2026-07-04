import PhotoFramePricingTable from '@/components/PhotoFramePricingTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Frame Pricing',
  description: 'High-quality customized photo frames starting from ₹120.',
};

export default function PhotoFramePricingPage() {
  return <PhotoFramePricingTable />;
}