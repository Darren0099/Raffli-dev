import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://rafflidev.my.id'),
  title: {
    default: 'Al-Man Raffli Saputra | Raffli Dev',
    template: '%s | Raffli Dev',
  },
  description: 'Portofolio Al-Man Raffli Saputra: pengembangan website, desain antarmuka, analisis data, proyek digital, dan pengalaman profesional.',
  applicationName: 'Raffli Dev',
  authors: [{ name: 'Al-Man Raffli Saputra', url: 'https://rafflidev.my.id/' }],
  creator: 'Al-Man Raffli Saputra',
  keywords: ['Al-Man Raffli Saputra', 'Al Man Raffli', 'Raffli Dev', 'Web Developer', 'Data Analyst', 'Graphic Designer', 'Politeknik Negeri Sriwijaya', 'Palembang'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Raffli Dev',
    url: 'https://rafflidev.my.id/',
    title: 'Al-Man Raffli Saputra | Raffli Dev',
    description: 'Portofolio proyek, pengalaman, dan karya digital Al-Man Raffli Saputra.',
    images: [{ url: '/img/im1.png', alt: 'Al-Man Raffli Saputra' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al-Man Raffli Saputra | Raffli Dev',
    description: 'Portofolio proyek dan karya digital Al-Man Raffli Saputra.',
    images: ['/img/im1.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
