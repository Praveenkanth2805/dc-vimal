import { prisma } from '@/lib/prisma';
import SettingsForm from '@/components/Admin/SettingsForm';

export default async function AdminSettingsPage() {
  const info = await prisma.contactInfo.findFirst();
  return <SettingsForm initialData={info} />;
}