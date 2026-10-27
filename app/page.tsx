'use client';

import { useState } from 'react';
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