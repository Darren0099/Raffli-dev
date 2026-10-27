'use client';

import { useEffect } from 'react';
import { useLanguage } from './LanguageProvider';

interface Props {
  images: string[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function ProjectLightbox({ images, index, onClose, onChange }: Props) {
  const { lang } = useLanguage();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [index, images.length, onClose, onChange]);

  if (!images.length || index < 0) return null;

  return (
    <div className="project-lightbox" role="dialog" aria-modal="true"
      aria-label={lang === 'id' ? 'Pratinjau gambar proyek' : 'Project image preview'}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button type="button" className="lightbox-close" onClick={onClose}
        aria-label={lang === 'id' ? 'Tutup gambar' : 'Close image'}>×</button>
      <button type="button" className="lightbox-arrow" onClick={() => onChange((index - 1 + images.length) % images.length)}
        aria-label={lang === 'id' ? 'Gambar sebelumnya' : 'Previous image'}>←</button>
      <figure className="lightbox-figure">
        <img src={images[index]} alt={`Project screenshot ${index + 1}`} />
        <figcaption>{index + 1} / {images.length} · {lang === 'id' ? 'Gunakan ← → atau Esc' : 'Use ← → or Esc'}</figcaption>
      </figure>
      <button type="button" className="lightbox-arrow" onClick={() => onChange((index + 1) % images.length)}
        aria-label={lang === 'id' ? 'Gambar selanjutnya' : 'Next image'}>→</button>
    </div>
  );
}
