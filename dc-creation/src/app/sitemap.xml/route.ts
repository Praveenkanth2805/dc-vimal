export async function GET() {
  const base = 'https://www.dc-creation.in';
  const pages = ['', 'about', 'services', 'portfolio', 'video-gallery', 'reviews', 'faq', 'contact', 'book-now', 'photo-frame-pricing', 'privacy', 'terms'];
  const urls = pages.map(path => `<url><loc>${base}/${path}</loc><changefreq>weekly</changefreq></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}