export default function Loading() {
  return (
    <div className="fixed inset-0 bg-navy z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}