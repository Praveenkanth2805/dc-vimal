"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import HeroBanner from "./HeroBanner";

export default function AnimatedHeroSection({
  data,
}: {
  data?: { heroTitle?: string; heroSubtitle?: string; heroImage?: string };
}) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  // Increment key every time the hero comes back into view
  useEffect(() => {
    if (isInView) {
      setKey((prev) => prev + 1);
    }
  }, [isInView]);

  // Also remount when navigating to "/" from another page
  useEffect(() => {
    if (pathname === "/") {
      setKey((prev) => prev + 1);
    }
  }, [pathname]);

  return (
    <div ref={sectionRef}>
      <HeroBanner key={key} data={data} />
    </div>
  );
}