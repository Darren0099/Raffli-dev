import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    sitemap: 'https://rafflidev.my.id/sitemap.xml',
    host: 'https://rafflidev.my.id',
  };
}
