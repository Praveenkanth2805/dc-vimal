import { prisma } from '@/lib/prisma';
import BookingManager from '@/components/Admin/BookingManager';

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
  return <BookingManager initialBookings={bookings} />;
}