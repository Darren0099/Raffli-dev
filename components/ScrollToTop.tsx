'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button 
      className={`scroll-to-top-btn ${showScrollTop ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}