import { z } from 'zod';

export const bookingSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  mobile: z.string().min(10, 'Valid mobile number required'),
  eventType: z.string().min(1, 'Event type required'),
  eventDate: z.string().transform((str) => new Date(str)),
  venue: z.string().optional(),
  message: z.string().optional(),
});

export const contactInfoSchema = z.object({
  address: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional(),
  mapEmbed: z.string().optional(),
  openingHours: z.string().optional(),
  socialLinks: z.string().optional(),
});