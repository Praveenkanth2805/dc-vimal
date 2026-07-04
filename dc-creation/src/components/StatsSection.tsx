'use client';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { label: 'Happy Clients', value: 150 },
  { label: 'Projects Done', value: 320 },
  { label: 'Awards Won', value: 12 },
  { label: 'Years Experience', value: 5 },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-navy">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <CountUp end={stat.value} duration={2} className="text-4xl font-heading text-gold" />
            <p className="text-text-secondary mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}