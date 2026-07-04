'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<any[]>([]);
  useEffect(() => {
  fetch('/api/reviews')
    .then((res) => res.json())
    .then(setReviews);
}, []);
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="font-heading text-4xl text-gold text-center mb-12">Client Love</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-navy-light border border-border p-6 rounded-lg h-full flex flex-col">
              <div className="flex gap-1 text-gold mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className={i < review.rating ? 'text-gold' : 'text-gray-500'} />
                ))}
              </div>
              <p className="text-text-secondary flex-1 italic">"{review.reviewText}"</p>
              <p className="mt-4 font-semibold text-text-primary">- {review.customerName}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}