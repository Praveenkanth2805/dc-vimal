import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const videos = await prisma.video.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const video = await prisma.video.create({ data: { ...body } });
  return NextResponse.json(video, { status: 201 });
}