"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroBanner({
  data,
}: {
  data?: { heroTitle?: string; heroSubtitle?: string; heroImage?: string };
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const titleWords = (data?.heroTitle || "Where Art Meets Emotion").split(" ");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: data?.heroImage
            ? `url(${data.heroImage})`
            : "none",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/30" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Animated Logo – larger size */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="mb-6"
        >
          <Image
            src="/icon.png"
            alt="DC Creation Logo"
            width={112}
            height={112}
            className="mx-auto h-28 w-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          />
        </motion.div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl text-gold mb-6 leading-tight">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto"
        >
          {data?.heroSubtitle ||
            "Capturing timeless moments with creativity & precision."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex gap-5 justify-center"
        >
          <Link
            href="/book-now"
            className="bg-gold text-navy px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-dark transition transform hover:scale-105"
          >
            Book Now
          </Link>
          <Link
            href="/portfolio"
            className="border-2 border-gold text-gold px-8 py-4 rounded-full text-lg hover:bg-gold hover:text-navy transition transform hover:scale-105"
          >
            View Portfolio
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        {/* <span className="text-text-secondary text-sm">Scroll</span> */}
        {/* <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-1 h-8 rounded-full bg-gold/50"
        /> */}
      </motion.div>
    </section>
  );
}