import { getContactInfo } from '@/lib/data';
import GoogleMap from './GoogleMap';

export default async function ContactSection() {
  const info = await getContactInfo();
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="font-heading text-4xl text-gold text-center mb-12">Get In Touch</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4 text-text-secondary">
          <p><strong>Address:</strong> {info?.address || 'Kodi Street, V. Maruthur, Villupuram, TN - 605602'}</p>
          <p><strong>Phone:</strong> {info?.phone || '072003 04753'}</p>
          <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${info?.whatsapp || '917200304753'}`} className="text-gold">{info?.whatsapp || '917200304753'}</a></p>
          <p><strong>Email:</strong> {info?.email || 'contact@dc-creation.in'}</p>
          <p><strong>Opening Hours:</strong></p>
          <pre className="whitespace-pre-line">{info?.openingHours ? JSON.parse(info.openingHours).join('\n') : 'Mon-Sun: 9 AM - 5 PM'}</pre>
        </div>
        <GoogleMap embedCode={info?.mapEmbed ?? undefined} />
      </div>
    </section>
  );
}