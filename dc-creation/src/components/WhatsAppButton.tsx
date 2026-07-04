import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    'Hello DC Creation,\nI would like to book your photography/videography service.\n\nName: \nPhone: \nEvent Type: \nEvent Date: \nVenue: \n\nMessage: \nThank you.'
  );
  return (
    <Link
      href={`https://wa.me/917200304753?text=${message}`}
      target="_blank"
      className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
    >
      <FaWhatsapp size={28} />
    </Link>
  );
}