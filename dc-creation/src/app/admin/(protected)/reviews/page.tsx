import { prisma } from '@/lib/prisma';
import ReviewManager from '@/components/Admin/ReviewManager';

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <ReviewManager
      initialReviews={reviews.map((review) => ({
        ...review,
        photoUrl: review.photoUrl ?? undefined,
      }))}
    />
  );
}