import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Al-man Raffli Saputra - Portofolio',
  description: 'Portofolio Full Stack Developer & Data Analyst',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}