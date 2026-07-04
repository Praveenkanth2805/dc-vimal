"use client";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function WhyChooseUs({ points }: { points?: string[] }) {
  const items = points || [];
  return (
    <section className="py-24 bg-navy-light">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl text-gold text-center mb-16"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-start gap-4 bg-navy p-6 rounded-xl border border-border hover:border-gold transition-colors"
            >
              <FaCheckCircle className="text-gold text-2xl mt-1 flex-shrink-0" />
              <span className="text-text-primary text-lg">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}