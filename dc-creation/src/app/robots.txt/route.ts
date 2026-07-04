export async function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: https://www.dc-creation.in/sitemap.xml`);
}