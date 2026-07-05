import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

// DELETE a portfolio image
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.portfolio.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// UPDATE portfolio (metadata + optionally replace image)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const title = formData.get('title') as string | null;
  const category = formData.get('category') as string | null;
  const file = formData.get('file') as File | null;
  if (file) {
  console.log("Received file:", file.name);
  console.log("Size:", (file.size / 1024 / 1024).toFixed(2), "MB");
}

  // Prepare data to update
  const updateData: any = {};
  if (title) updateData.title = title;
  if (category) updateData.category = category;

  // If a new image file is provided, upload to Cloudinary
  if (file && file.size > 0) {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "dc-creation/portfolio",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    updateData.imageUrl = uploadResult.secure_url;
    updateData.thumbnailUrl = uploadResult.secure_url;

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}

  const updated = await prisma.portfolio.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(updated);
}