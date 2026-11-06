import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Graphic Design Archive | Al-man Raffli Saputra',
  description: 'Graphic design, Youth Ranger Indonesia social media campaigns, and Summit of Stars creative archive.'
};

export default function GraphicDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
