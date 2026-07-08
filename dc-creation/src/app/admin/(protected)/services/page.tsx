export const dynamic = "force-dynamic";
import { prisma } from '@/lib/prisma';
import ServiceManager from '@/components/Admin/ServiceManager';

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <ServiceManager
      initialServices={services.map((service) => ({
        ...service,
        description: service.description ?? undefined,
        icon: service.icon ?? undefined,
      }))}
    />
  );
}