import { getPhotoFramePrices } from '@/lib/data';

export default async function PhotoFramePricingTable() {
  const prices = await getPhotoFramePrices();
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="font-heading text-4xl text-gold text-center mb-12">Photo Frame Pricing</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-border">
          <thead className="bg-navy-light">
            <tr>
              <th className="p-4 text-left text-gold">Size</th>
              <th className="p-4 text-left text-gold">Type</th>
              <th className="p-4 text-left text-gold">Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => (
              <tr key={item.id} className="border-t border-border hover:bg-navy-light/50">
                <td className="p-4">{item.size}</td>
                <td className="p-4">{item.type}</td>
                <td className="p-4 font-semibold text-gold">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}