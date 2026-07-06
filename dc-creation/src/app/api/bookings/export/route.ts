import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Get search query from URL params (optional filter)
  const url = new URL(req.url);
  const search = url.searchParams.get('search') || '';

  // Fetch bookings (filtered by search if provided)
  const bookings = await prisma.booking.findMany({
    where: search
      ? {
          OR: [
            { fullName: { contains: search } },
            { mobile: { contains: search } },
          ],
        }
      : {},
    orderBy: { createdAt: 'desc' },
  });

  // Build CSV content
  const csvHeaders = ['ID', 'Name', 'Mobile', 'Event Type', 'Event Date', 'Venue', 'Message', 'Contacted', 'Date Received'];
  const csvRows = bookings.map((b) => [
    b.id,
    `"${b.fullName}"`,
    `"${b.mobile}"`,
    `"${b.eventType}"`,
    b.eventDate.toISOString().slice(0, 10),
    `"${b.venue || ''}"`,
    `"${b.message?.replace(/"/g, '""') || ''}"`,
    b.contacted ? 'Yes' : 'No',
    b.createdAt.toISOString().slice(0, 10),
  ]);

  const csvContent = [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n');
  
  // Add BOM for proper Excel UTF‑8 encoding
  const bom = '\uFEFF';
  return new NextResponse(bom + csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bookings.csv"',
    },
  });
}