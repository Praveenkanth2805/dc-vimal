export default function DashboardStats({ stats }: { stats: { portfolio: number; videos: number; reviews: number; bookings: number } }) {
  const items = [
    { label: 'Portfolio Images', value: stats.portfolio },
    { label: 'Videos', value: stats.videos },
    { label: 'Reviews', value: stats.reviews },
    { label: 'Bookings', value: stats.bookings },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(item => (
        <div key={item.label} className="bg-navy border border-border p-6 rounded-xl text-center">
          <p className="text-3xl font-heading text-gold">{item.value}</p>
          <p className="text-text-secondary text-sm mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
}