'use client';

import { useState } from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  lang: 'id' | 'en';
  setLang: (lang: 'id' | 'en') => void;
  t: any;
}

export default function Navbar({ t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="navbar">
      <div className="logo">
        <h2>Porto</h2>
      </div>

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