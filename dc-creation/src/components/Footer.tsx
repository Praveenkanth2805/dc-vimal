"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {

   const [social, setSocial] = useState<{
    instagram?: string;
    facebook?: string;
    youtube?: string;
  }>({});

useEffect(() => {
  fetch("/api/contact-info")
    .then((res) => res.json())
    .then((data) => {
      setSocial(data.socialLinks ? JSON.parse(data.socialLinks) : {});
    });
}, []);
const [contactInfo, setContactInfo] = useState<any>(null);

useEffect(() => {
  fetch("/api/contact-info")
    .then((res) => res.json())
    .then(setContactInfo);
}, []);

const links = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Videos", href: "/video-gallery" },
  { label: "Pricing", href: "/photo-frame-pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

  return (
    <footer className="bg-navy-light border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-2xl text-gold mb-4">DC Creation</h3>
          <p className="text-text-secondary">Where art meets emotion. Professional photography studio in Viluppuram.</p>
        </div>
        <div>
          <h4 className="font-heading text-xl text-gold mb-4">Quick Links</h4>
          <ul className="space-y-2">
  {links.map((item) => (
    <li key={item.href}>
      <Link
        href={item.href}
        className="text-text-secondary hover:text-gold transition"
      >
        {item.label}
      </Link>
    </li>
  ))}
</ul>
        </div>
        <div>
          <h4 className="font-heading text-xl text-gold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-2xl text-text-secondary">
            <a
      href={social.instagram || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gold"
    >
      <FaInstagram />
    </a>

    <a
      href={social.facebook || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gold"
    >
      <FaFacebook />
    </a>

    <a
      href={social.youtube || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gold"
    >
      <FaYoutube />
    </a>
          </div>
          <div className="mt-4 text-text-secondary text-sm">
            <p>{contactInfo?.address}</p>
<p>{contactInfo?.phone}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-text-secondary text-sm border-t border-border pt-6">
        © {new Date().getFullYear()} DC Creation. All rights reserved.
      </div>
    </footer>
  );
}