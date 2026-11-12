import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me — Al-Man Raffli Saputra',
  description: 'Kenalan dengan Al-Man Raffli Saputra (Raffli / Darren), lulusan D3 Teknik Komputer Politeknik Negeri Sriwijaya. Pengalaman organisasi, magang, proyek, dan tools.',
  alternates: { canonical: '/aboutme' },
};

const profile = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://rafflidev.my.id/aboutme#profile',
  url: 'https://rafflidev.my.id/aboutme',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://rafflidev.my.id/#person',
    name: 'Al-Man Raffli Saputra',
    alternateName: ['Raffli', 'Darren0099'],
    description: 'Lulusan D3 Teknik Komputer Politeknik Negeri Sriwijaya, pengembang website, data analyst, dan graphic designer.',
    image: 'https://rafflidev.my.id/img/im1.png',
    url: 'https://rafflidev.my.id/',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Politeknik Negeri Sriwijaya' },
    sameAs: ['https://github.com/Darren0099', 'https://www.linkedin.com/in/al-man-raffli'],
  },
};

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, '\\u003c') }}
      />
      {children}
    </>
  );
}
