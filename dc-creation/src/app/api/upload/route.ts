import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'dc-creation' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });
  return NextResponse.json({ url: result.secure_url });
}