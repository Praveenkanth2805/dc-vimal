export const dynamic = "force-dynamic";
import { prisma } from '@/lib/prisma';
import SettingsForm from '@/components/Admin/SettingsForm';

export default async function AdminSettingsPage() {
  const info = await prisma.contactInfo.findFirst();
  return (
  <SettingsForm
    initialData={
      info
        ? {
            ...info,
            email: info.email ?? undefined,
            address: info.address ?? undefined,
            phone: info.phone ?? undefined,
            whatsapp: info.whatsapp ?? undefined,
            mapEmbed: info.mapEmbed ?? undefined,
            openingHours: info.openingHours ?? undefined,
            socialLinks: info.socialLinks ?? undefined,
          }
        : null
    }
  />
);
}