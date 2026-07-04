import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const content = await prisma.homepageContent.findFirst();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const existing = await prisma.homepageContent.findFirst();
  if (existing) {
    const updated = await prisma.homepageContent.update({ where: { id: existing.id }, data: body });
    return NextResponse.json(updated);
  } else {
    const created = await prisma.homepageContent.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  }
}