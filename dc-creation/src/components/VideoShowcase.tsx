import { getAllVideos } from '@/lib/data';

export default async function VideoShowcase() {
  const videos = await getAllVideos();
  // show first 3 as showcase
  const showcase = videos.slice(0, 3);
  return (
    <section className="py-20 bg-navy-light">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl text-gold text-center mb-12">Video Showcase</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {showcase.map((video) => (
            <div key={video.id} className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                className="w-full h-full rounded-lg border border-border"
                allowFullScreen
              />
              <p className="text-sm mt-2 text-text-secondary">{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}