import type { MetadataRoute } from 'next';
import { projectsData } from '@/data/projectsData';

const origin = 'https://rafflidev.my.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages = ['', '/aboutme', '/projects', '/graphic-design', '/cv'];
  const workPages = projectsData
    .filter((project) => project.slug !== 'youth-visual-identity')
    .map((project) => '/projects/' + project.slug);
  return [...mainPages, ...workPages].map((path) => ({
    url: origin + (path || '/'),
    changeFrequency: path ? 'monthly' : 'weekly',
    priority: path === '' ? 1 : path === '/aboutme' ? 0.9 : 0.7,
  }));
}
