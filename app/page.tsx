'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/data/translations';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Skills from '@/components/Skills';
import ExperienceBridgeScroll from '@/components/ExperienceBridgeScroll';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import ScrollToTop from '@/components/ScrollToTop';
import SectionWrapper from '@/components/SectionWrapper';
import HighlightSection from '@/components/HighlightSection';
import Footer from '@/components/footer';
import Preloader from '@/components/Preloader'; 

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  // Re-align URL deep links once the preloader and measured horizontal
  // Experience section have settled. This also covers /#contact links
  // opened from another page or an external website.
  useEffect(() => {
    if (loading) return;

    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    if (!['about', 'skills', 'experience', 'contact'].includes(sectionId)) return;

    const alignToSection = () => {
      const target = document.getElementById(sectionId);
      if (!target || window.location.hash !== '#' + sectionId) return;
      const top = Math.max(
        0,
        window.scrollY + target.getBoundingClientRect().top - 16
      );
      window.scrollTo({ top, behavior: 'instant' });
    };

    let nextFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      nextFrame = window.requestAnimationFrame(alignToSection);
    });
    const resync = window.setTimeout(alignToSection, 400);

    const stopResync = () => window.clearTimeout(resync);
    window.addEventListener('wheel', stopResync, { passive: true });
    window.addEventListener('touchstart', stopResync, { passive: true });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(nextFrame);
      window.clearTimeout(resync);
      window.removeEventListener('wheel', stopResync);
      window.removeEventListener('touchstart', stopResync);
    };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <Ticker />
      <Skills t={t} />
      
      <ExperienceBridgeScroll />
        <Projects />
      <Certificates />
      
      <SectionWrapper bgColor="#121212">  
        <HighlightSection />
      </SectionWrapper>
      
      <ScrollToTop />
      <Footer />
    </>
  );
}