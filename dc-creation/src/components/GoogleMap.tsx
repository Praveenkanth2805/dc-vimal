export default function GoogleMap({ embedCode }: { embedCode?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border h-80">
      {embedCode ? (
        <iframe src={embedCode} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
      ) : (
        <div className="w-full h-full bg-navy-light flex items-center justify-center text-text-secondary">
          Map Placeholder
        </div>
      )}
    </div>
  );
}