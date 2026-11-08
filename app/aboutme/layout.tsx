import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | Al-Man Raffli Saputra',
  description: 'Kenalan dengan Al-Man Raffli Saputra (Raffli / Darren), lulusan D3 Teknik Komputer Politeknik Negeri Sriwijaya. Eksplorasi pengalaman organisasi, magang, proyek, dan tools.'
};

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
