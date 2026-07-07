'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaImages, FaVideo, FaConciergeBell, FaStar, FaCalendarAlt, FaDollarSign, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { FaHome } from 'react-icons/fa';

const links = [
  { href: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
  { href: '/admin/homepage', icon: FaHome, label: 'Homepage' },
  { href: '/admin/portfolio', icon: FaImages, label: 'Portfolio' },
  { href: '/admin/videos', icon: FaVideo, label: 'Videos' },
  //{ href: '/admin/services', icon: FaConciergeBell, label: 'Services' },
  { href: '/admin/reviews', icon: FaStar, label: 'Reviews' },
  { href: '/admin/bookings', icon: FaCalendarAlt, label: 'Bookings' },
  { href: '/admin/pricing', icon: FaDollarSign, label: 'Pricing' }, 
  { href: '/admin/settings', icon: FaCog, label: 'Settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-navy border-r border-border min-h-screen p-6 flex flex-col">
      <h2 className="font-heading text-2xl text-gold mb-8">DC Admin</h2>
      <nav className="flex-1 space-y-2">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-lg text-sm transition ${
                pathname === link.href ? 'bg-gold text-navy' : 'text-text-secondary hover:bg-navy-light'
              }`}
            >
              <Icon />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex items-center gap-3 p-3 text-text-secondary hover:text-red-400 transition mt-4"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}