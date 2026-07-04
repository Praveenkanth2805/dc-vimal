import Link from 'next/link';

export default function BookingCTA() {
  return (
    <section className="py-20 bg-navy-light text-center">
      <h2 className="font-heading text-4xl text-gold mb-4">Ready to Capture Your Moments?</h2>
      <p className="text-text-secondary mb-8 max-w-xl mx-auto">
        Let’s create something beautiful together. Book your session today.
      </p>
      <Link
        href="/book-now"
        className="inline-block bg-gold text-navy px-10 py-4 rounded-full font-semibold text-lg hover:bg-gold-dark transition"
      >
        Book Now
      </Link>
    </section>
  );
}