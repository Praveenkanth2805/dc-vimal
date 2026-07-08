export const dynamic = "force-dynamic";
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { prisma } from "@/lib/prisma";


export default async function Footer() {

   const contactInfo = await prisma.contactInfo.findFirst();

  const social = contactInfo?.socialLinks
    ? JSON.parse(contactInfo.socialLinks)   
    : {};

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
            {['About','Portfolio','Videos','Pricing','Reviews','Contact'].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="text-text-secondary hover:text-gold transition">
                  {item}
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
            <p>Kodi Street, V. Maruthur, Villupuram, Tamil Nadu - 605602</p>
            <p>Phone: 072003 04753</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-text-secondary text-sm border-t border-border pt-6">
        © {new Date().getFullYear()} DC Creation. All rights reserved.
      </div>
    </footer>
  );
}