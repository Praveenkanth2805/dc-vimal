import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// DELETE a review
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// UPDATE a review (partial update)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();

  // Allow updating customer name, rating, review text, and photo URL
  const updatedReview = await prisma.review.update({
    where: { id },
    data: {
      ...(body.customerName !== undefined && { customerName: body.customerName }),
      ...(body.rating !== undefined && { rating: body.rating }),
      ...(body.reviewText !== undefined && { reviewText: body.reviewText }),
      ...(body.photoUrl !== undefined && { photoUrl: body.photoUrl }),
    },
  });

  return NextResponse.json(updatedReview);
}