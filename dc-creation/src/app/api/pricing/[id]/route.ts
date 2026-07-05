import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// DELETE a pricing entry
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.photoFramePrice.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// UPDATE a pricing entry (partial update)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  // Update size, type, price (whichever is provided)
  const updatedPrice = await prisma.photoFramePrice.update({
    where: { id },
    data: {
      ...(body.size !== undefined && { size: body.size }),
      ...(body.type !== undefined && { type: body.type }),
      ...(body.price !== undefined && { price: body.price }),
    },
  });

  return NextResponse.json(updatedPrice);
}