import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Graphic Design Archive | Al-man Raffli Saputra',
  description: 'Graphic design by Al-man Raffli Saputra: Youth Ranger Sumsel, Summit of Stars I and II, YRI Fest x Expo, International Kingdom Indonesia, and Youthopia Symposium.'
};

export default function GraphicDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
