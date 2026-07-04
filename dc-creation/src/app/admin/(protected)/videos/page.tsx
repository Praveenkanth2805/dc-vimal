import { prisma } from '@/lib/prisma';
import VideoManager from '@/components/Admin/VideoManager';

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { order: 'asc' } });
  return <VideoManager initialVideos={videos} />;
}