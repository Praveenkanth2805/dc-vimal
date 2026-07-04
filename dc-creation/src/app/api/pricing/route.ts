import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const prices = await prisma.photoFramePrice.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(prices);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const price = await prisma.photoFramePrice.create({ data: body });
  return NextResponse.json(price, { status: 201 });
}