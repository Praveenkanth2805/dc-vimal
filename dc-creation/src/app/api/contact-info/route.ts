import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const info = await prisma.contactInfo.findFirst();
  return NextResponse.json(info);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const existing = await prisma.contactInfo.findFirst();
  if (existing) {
    const updated = await prisma.contactInfo.update({ where: { id: existing.id }, data: body });
    return NextResponse.json(updated);
  } else {
    const created = await prisma.contactInfo.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  }
}