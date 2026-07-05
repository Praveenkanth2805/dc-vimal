'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-[80px] h-[8  0px] flex items-center justify-center">
  
  <Image
    src="/icon.png"
    alt="DC Creation"
    width={80}
    height={80}
    className="z-10"
  />

  <motion.div
    className="absolute w-[95px] h-[95px] rounded-full border-4 border-gold border-t-transparent"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
  />
</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}