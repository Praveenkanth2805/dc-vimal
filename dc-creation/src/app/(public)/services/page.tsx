import { getAllServices } from '@/lib/data';
import * as Icons from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Wedding photography, videography, drone coverage, and creative design services.',
};

export default async function ServicesPage() {
  const services = await getAllServices();
  const categories = Array.from(new Set(services.map(s => s.category)));
  return (
    <section className="pt-32 pb-20 container mx-auto px-4">
      <h1 className="font-heading text-4xl text-gold text-center mb-12">Our Services</h1>
      {categories.map(cat => (
        <div key={cat} className="mb-12">
          <h2 className="text-3xl font-heading text-gold mb-6">{cat}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(s => s.category === cat).map(service => {
              const IconComponent = service.icon ? (Icons as any)[service.icon] : Icons.FaCamera;
              return (
                <div key={service.id} className="bg-navy-light border border-border p-6 rounded-lg">
                  {IconComponent && <IconComponent className="text-gold text-3xl mb-3" />}
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-text-secondary">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}