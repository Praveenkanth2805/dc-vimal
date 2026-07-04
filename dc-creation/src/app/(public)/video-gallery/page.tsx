import { getAllVideos } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Gallery',
  description: 'Watch our wedding films, highlight videos, drone videos, and event videos.',
};

export default async function VideoGalleryPage() {
  const videos = await getAllVideos();
  return (
    <section className="pt-24 pb-20 container mx-auto px-4">
      <h1 className="font-heading text-4xl text-gold text-center mb-12">Video Gallery</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-navy-light border border-border rounded-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-text-secondary text-sm">{video.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}