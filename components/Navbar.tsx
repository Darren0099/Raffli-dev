'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  lang: 'id' | 'en';
  setLang: (lang: 'id' | 'en') => void;
  t: any;
}

export default function Navbar({ t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    const cancelScroll = () => {
      if (scrollAnimationRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }
    };

    // Allow wheel, keyboard and touch interactions to override navigation.
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
        cancelScroll();
      }
    };
    window.addEventListener('wheel', cancelScroll, { passive: true });
    window.addEventListener('touchstart', cancelScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelScroll();
      window.removeEventListener('wheel', cancelScroll);
      window.removeEventListener('touchstart', cancelScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    const target = document.getElementById(id);
    if (!target) {
      // Preserve direct-link navigation if the section is not on this page.
      window.location.assign('/#' + id);
      return;
    }

    // A real hash makes the destination shareable and back/forward friendly.
    if (window.location.hash !== '#' + id) {
      window.history.pushState(null, '', '/#' + id);
    }

    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startY = window.scrollY;
    const targetY = () =>
      Math.max(0, window.scrollY + target.getBoundingClientRect().top - 16);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: targetY(), behavior: 'instant' });
      scrollAnimationRef.current = null;
      return;
    }

    // The Experience showcase and Skills rows resize as they animate.
    // Recalculate the destination on every frame instead of relying on
    // one stale offset that can stop far short of Contact.
    const duration = 750;
    let startedAt: number | null = null;
    const step = (now: number) => {
      if (startedAt === null) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentDestination = targetY();

      window.scrollTo({
        top: startY + (currentDestination - startY) * eased,
        behavior: 'instant',
      });

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
        // Final alignment after animation-related layout shifts.
        window.scrollTo({ top: targetY(), behavior: 'instant' });
      }
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  };

  return (
    <header className="navbar">
      <a href="/" className="logo brand-mark-link" aria-label="Raffli — kembali ke beranda">
        <img src="/brand/raffli-logo.svg" alt="Raffli" width={77} height={60} />
      </a>

      <div className={`nav-wrapper ${isOpen ? 'active' : ''}`}>
        <nav className="nav-links">
          <a href="#about" className="nav-item active" onClick={(e) => handleScroll(e, 'about')}>
            <span className="dot"></span> {t.navProfile}
          </a>
          <a href="#skills" className="nav-item" onClick={(e) => handleScroll(e, 'skills')}>
            <span className="dot"></span> {t.navSkills}
          </a>
          <a href="#experience" className="nav-item" onClick={(e) => handleScroll(e, 'experience')}>
            <span className="dot"></span> {t.navExperience}
          </a>
          <Link href="/projects" className="nav-item" onClick={() => setIsOpen(false)}>
            <span className="dot"></span> {t.navProjects}
          </Link>
          <a href="#certificates" className="nav-item" onClick={(e) => handleScroll(e, 'certificates')}>
            <span className="dot"></span> {t.navCertificates}
          </a>
          <a href="#contact" className="nav-item" onClick={(e) => handleScroll(e, 'contact')}>
            <span className="dot"></span> {t.navContact}
          </a>
        </nav>
      </div>

      <div className="header-right">
        <LanguageToggle />

        <a href="https://wa.me/6282183945815" className="phone-btn" target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-phone"></i>
        </a>

        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}