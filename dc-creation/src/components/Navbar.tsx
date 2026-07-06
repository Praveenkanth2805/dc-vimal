'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  //{ href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/video-gallery', label: 'Videos' },
  { href: '/photo-frame-pricing', label: 'Pricing' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy/95 backdrop-blur shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <Link href="/" className="flex items-center gap-2">
  <Image
    src="/icon.png"
    alt="DC Creation"
    width={40}
    height={40}
    className="h-10 w-auto"
  />
 <span className={`${cinzel.className} text-2xl`}>
  <span className="text-red-600">DC</span>{" "}
  <span className="text-white">Creation</span>
</span>
</Link>
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm uppercase tracking-wider hover:text-gold transition ${
                pathname === link.href ? 'text-gold' : 'text-text-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-now"
            className="bg-gold text-navy px-5 py-2 rounded-full font-semibold text-sm hover:bg-gold-dark transition"
          >
            Book Now
          </Link>
        </div>
        <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-light border-t border-border"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 text-text-secondary hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-now"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-gold font-semibold"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}