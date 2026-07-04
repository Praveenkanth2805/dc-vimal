import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'dc-creation/portfolio' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });

  const image = await prisma.portfolio.create({
    data: { title, category, imageUrl: uploadResult.secure_url, thumbnailUrl: uploadResult.secure_url },
  });
  return NextResponse.json(image, { status: 201 });
}

export async function GET() {
  const images = await prisma.portfolio.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(images);
}