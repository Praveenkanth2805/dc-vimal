'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaTimes } from 'react-icons/fa';

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    rating: 5,
    reviewText: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/public/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      setSubmitted(true);
      setForm({ customerName: '', rating: 5, reviewText: '' });
    } catch (err) {
      setError('Could not submit review. Please try again.');
    }
  };

  return (
    <section className="py-16 bg-navy-light">
      <div className="container mx-auto px-4 text-center">
        {!open && !submitted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="bg-gold text-navy font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2"
          >
            <FaStar /> Add Your Review
          </motion.button>
        )}

        <AnimatePresence>
          {open && !submitted && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto mt-8 bg-navy border border-border p-6 rounded-xl space-y-4 overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-heading text-gold">Share Your Experience</h3>
                <button type="button" onClick={() => setOpen(false)} className="text-text-secondary hover:text-gold">
                  <FaTimes />
                </button>
              </div>

              <input
                placeholder="Your Name"
                required
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                className="w-full bg-navy border border-border p-2 rounded text-text-primary"
              />

              <div className="flex items-center gap-2">
                <span className="text-text-secondary">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setForm({ ...form, rating: star })}
                    className={`text-2xl ${star <= form.rating ? 'text-gold' : 'text-gray-500'}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Your review..."
                required
                rows={4}
                value={form.reviewText}
                onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
                className="w-full bg-navy border border-border p-2 rounded text-text-primary resize-none"
              />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button type="submit" className="w-full bg-gold text-navy py-2 rounded-full font-semibold hover:bg-gold-dark transition">
                Submit Review
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-lg font-semibold mt-6"
          >
            Thank you for your review! ⭐
          </motion.div>
        )}
      </div>
    </section>
  );
}