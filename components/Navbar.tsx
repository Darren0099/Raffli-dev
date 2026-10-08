'use client';

import { useState } from 'react';

interface NavbarProps {
  lang: 'id' | 'en';
  setLang: (lang: 'id' | 'en') => void;
  t: any;
}

export default function Navbar({ lang, setLang, t }: NavbarProps) {
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
          <a href="#profile" className="nav-item active" onClick={(e) => handleScroll(e, 'profile')}>
            <span className="dot"></span> {t.navProfile}
          </a>
          <a href="#skills" className="nav-item" onClick={(e) => handleScroll(e, 'skills')}>
            <span className="dot"></span> {t.navSkills}
          </a>
          <a href="#experience" className="nav-item" onClick={(e) => handleScroll(e, 'experience')}>
            <span className="dot"></span> {t.navExperience}
          </a>
          <a href="#projects" className="nav-item" onClick={(e) => handleScroll(e, 'projects')}>
            <span className="dot"></span> {t.navProjects}
          </a>
          <a href="#contact" className="nav-item" onClick={(e) => handleScroll(e, 'contact')}>
            <span className="dot"></span> {t.navContact}
          </a>
        </nav>
      </div>

      <div className="header-right">
        <div 
          className={`lang-toggle ${lang === 'en' ? 'en' : ''}`}
          onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
          style={{ cursor: 'pointer' }}
        >
          <div className="toggle-pill"></div>
          <span className={`lang-opt opt-en ${lang === 'en' ? 'active' : ''}`}>EN</span>
          <span className={`lang-opt opt-id ${lang === 'id' ? 'active' : ''}`}>ID</span>
        </div>

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