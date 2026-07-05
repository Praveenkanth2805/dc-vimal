"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

type Image = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  thumbnailUrl?: string | null;
};

export default function PortfolioGallery({
  images,
  limit,
}: {
  images: Image[];
  limit?: number;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    ...Array.from(new Set(images.map((img) => img.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);
  const displayed = limit ? filtered.slice(0, limit) : filtered;

  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  }, [activeCategory]);

  return (
    <section className="py-20 container mx-auto px-4" id="gallery">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-5xl text-gold text-center mb-8"
      >
        Our Portfolio
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-gold text-navy border-gold"
                : "text-gold border-gold hover:bg-gold/10"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {displayed.map((img) => (
            <motion.a
              key={img.id}
              href={img.imageUrl}
              data-pswp-width={1200}
              data-pswp-height={800}
              target="_blank"
              rel="noreferrer"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group overflow-hidden rounded-lg border border-border hover:border-gold transition-colors relative aspect-square"
            >
              <Image
                src={img.thumbnailUrl || img.imageUrl}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all flex items-end p-4">
                <span className="text-text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all text-sm font-medium">
                  {img.title}
                </span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      {limit && filtered.length > limit && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <a
            href="/portfolio"
            className="inline-block border border-gold text-gold px-6 py-3 rounded-full hover:bg-gold hover:text-navy transition"
          >
            View Full Portfolio
          </a>
        </motion.div>
      )}
    </section>
  );
}