"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useLoading } from "@/lib/loading-context";
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
  const { isLoading } = useLoading();

  // Increment key when hero comes into view (scroll up)
  useEffect(() => {
    if (isInView) {
      setKey((prev) => prev + 1);
    }
  }, [isInView]);

  // Increment key when navigating to "/" (client navigation)
  useEffect(() => {
    if (pathname === "/") {
      setKey((prev) => prev + 1);
    }
  }, [pathname]);

  // Don't render the hero until loading screen is done
  if (isLoading) return null;

  return (
    <div ref={sectionRef}>
      <HeroBanner key={key} data={data} />
    </div>
  );
}