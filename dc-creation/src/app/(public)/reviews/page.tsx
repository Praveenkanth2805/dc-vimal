import { getAllReviews } from '@/lib/data';
import { FaStar } from 'react-icons/fa';
import { Metadata } from 'next';
import ReviewForm from '@/components/ReviewForm';


export const metadata: Metadata = {
  title: 'Reviews',
  description: 'See what our clients say about DC Creation photography and videography services.',
};

export default async function ReviewsPage() {
  const reviews = await getAllReviews();
  return (
    <section className="pt-24 pb-20 container mx-auto px-4">
      <h1 className="font-heading text-4xl text-gold text-center mb-12">Client Reviews</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-navy-light border border-border p-6 rounded-lg">
            <div className="flex gap-1 text-gold mb-3">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < review.rating ? 'text-gold' : 'text-gray-500'} />
              ))}
            </div>
            <p className="text-text-secondary italic mb-4">"{review.reviewText}"</p>
            <p className="font-semibold">- {review.customerName}</p>
          </div>
        ))}
      </div>
       <div className="mt-16">
      <ReviewForm />
    </div>
    </section>
  );
}