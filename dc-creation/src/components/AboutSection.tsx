"use client";
import { motion } from "framer-motion";

export default function AboutSection({ data }: { data?: string }) {
  return (
    <section className="py-24 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl text-gold mb-8">
          About DC Creation
        </h2>
        <p className="text-text-secondary text-lg leading-relaxed">
          {data ||
            "DC Creation is a professional photography studio based in Kodi Street, V. Maruthur, Villupuram... We specialise in capturing timeless moments with creativity, emotion, and precision."}
        </p>
      </motion.div>
    </section>
  );
}