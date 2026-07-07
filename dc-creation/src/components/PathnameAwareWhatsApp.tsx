"use client";
import { usePathname } from "next/navigation";
import WhatsAppButton from "./WhatsAppButton";

export function PathnameAwareWhatsApp() {
  const pathname = usePathname();
  if (pathname === "/book-now") return null;
  return <WhatsAppButton />;
}