import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const reviewSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().min(1, 'Review text is required'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reviewSchema.parse(body);
    const review = await prisma.review.create({ data: parsed });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}