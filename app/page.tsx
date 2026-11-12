import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Al-Man Raffli Saputra | Web Developer, Data Analyst & Graphic Designer',
  description: 'Portofolio resmi Al-Man Raffli Saputra (Raffli), lulusan D3 Teknik Komputer Politeknik Negeri Sriwijaya. Jelajahi proyek pengembangan web, analisis data, desain grafis, dan pengalaman profesional.',
  alternates: { canonical: '/' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://rafflidev.my.id/#website',
      name: 'Al-Man Raffli Saputra | Raffli Dev',
      alternateName: 'Raffli Dev',
      url: 'https://rafflidev.my.id/',
      inLanguage: 'id-ID',
    },
    {
      '@type': 'Person',
      '@id': 'https://rafflidev.my.id/#person',
      name: 'Al-Man Raffli Saputra',
      alternateName: ['Al-man Raffli', 'Raffli', 'Darren0099'],
      url: 'https://rafflidev.my.id/',
      image: 'https://rafflidev.my.id/img/im1.png',
      jobTitle: ['Web Developer', 'Data Analyst', 'Graphic Designer'],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Politeknik Negeri Sriwijaya',
      },
      sameAs: [
        'https://github.com/Darren0099',
        'https://www.linkedin.com/in/al-man-raffli',
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <HomeClient />
    </>
  );
}
