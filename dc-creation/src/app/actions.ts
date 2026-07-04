'use server';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/lib/validations';

export async function submitBooking(rawData: unknown) {
  const data = bookingSchema.parse(rawData);
  await prisma.booking.create({ data });
  return { success: true };
}