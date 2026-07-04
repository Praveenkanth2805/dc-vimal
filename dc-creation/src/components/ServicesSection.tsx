import { getAllServices } from '@/lib/data';
import Link from 'next/link';
import * as Icons from 'react-icons/fa'; // dynamic icon usage
import { motion } from "framer-motion";

export default async function ServicesSection() {
  const services = await getAllServices();
  // Group by category
  const categories = Array.from(new Set(services.map(s => s.category)));
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="font-heading text-4xl text-gold text-center mb-12">Our Services</h2>
      {categories.map(cat => (
        <div key={cat} className="mb-12">
          <h3 className="text-2xl font-heading text-gold mb-4">{cat}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(s => s.category === cat).map(service => {
              const IconComponent = service.icon ? (Icons as any)[service.icon] : Icons.FaCamera;
              return (
                <motion.div
  key={service.id}
  whileHover={{ scale: 1.03, borderColor: "#D4AF37" }}
  className="bg-navy-light border border-border p-6 rounded-lg group transition-colors"
>
                  {IconComponent && <IconComponent className="text-gold text-3xl mb-3" />}
                  <h4 className="text-xl font-semibold mb-2">{service.name}</h4>
                  <p className="text-text-secondary">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="text-center mt-8">
        <Link href="/services" className="text-gold underline hover:no-underline">View All Services</Link>
      </div>
    </section>
  );
}