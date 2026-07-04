import { prisma } from '@/lib/prisma';
import DashboardStats from '@/components/Admin/DashboardStats';

export default async function AdminDashboard() {
  const [portfolio, videos, reviews, bookings] = await Promise.all([
    prisma.portfolio.count(),
    prisma.video.count(),
    prisma.review.count(),
    prisma.booking.count(),
  ]);
  return (
    <div>
      <h1 className="font-heading text-3xl text-gold mb-6">Dashboard</h1>
      <DashboardStats stats={{ portfolio, videos, reviews, bookings }} />
    </div>
  );
}