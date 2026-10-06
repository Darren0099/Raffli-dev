'use client';

import { useState } from 'react';
import { translations } from '@/data/translations';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import ScrollToTop from '@/components/ScrollToTop';
import SectionWrapper from '@/components/SectionWrapper';
import HighlightSection from '@/components/HighlightSection';
import Footer from '@/components/footer';
import Preloader from '@/components/Preloader'; 
import BridgeShowcase from '@/components/BridgeShowcase';

export default function Home() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <Ticker />
      <Skills t={t} />
      
      <SectionWrapper bgColor="#F15A24">
        <Experience />
      </SectionWrapper>
      <BridgeShowcase />
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