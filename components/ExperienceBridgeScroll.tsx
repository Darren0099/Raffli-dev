'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Experience from './Experience';
import dynamic from 'next/dynamic';
const BridgeShowcase = dynamic(() => import('./BridgeShowcase'), { ssr: false });
import { useLanguage } from './LanguageProvider';
import '../app/styles/experience-bridge-scroll.css';

type Measurements = { travel: number; viewportHeight: number };

export default function ExperienceBridgeScroll() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Measurements>({ travel: 0, viewportHeight: 0 });
  const reducedMotion = useReducedMotion();
  const [bridgeVisible, setBridgeVisible] = useState(false);

  // Import Three.js and mount its WebGL canvas only as the user approaches the showcase.
  // The placeholder has the same flex-basis, so horizontal scroll length remains stable.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setBridgeVisible(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setBridgeVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '1200px 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const bridgePanel = bridgeVisible
    ? <BridgeShowcase />
    : <div className="bridge-scroll-container" aria-hidden="true" />;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!viewport || !rail) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportWidth = viewport.clientWidth;
        const travel = Math.max(0, Math.ceil(rail.scrollWidth - viewportWidth));
        const viewportHeight = viewport.clientHeight;
        setSize(previous =>
          previous.travel === travel && previous.viewportHeight === viewportHeight
            ? previous
            : { travel, viewportHeight }
        );
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    observer.observe(viewport);
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // A single scroll timeline controls BOTH panels. The last stretch lets visitors
  // explore the 3D object before the page continues vertically into Projects.
  const travelScroll = size.travel / 1.55;
  const exploreHold = Math.max(0, size.viewportHeight * 0.72);
  const totalScroll = travelScroll + exploreHold;
  const arriveAt = totalScroll ? Math.min(.999, travelScroll / totalScroll) : .5;
  const x = useTransform(
    scrollYProgress,
    [0, arriveAt, 1],
    [0, -size.travel, -size.travel]
  );

  if (reducedMotion) {
    return (
      <section ref={sectionRef} id="experience" className="experience-bridge-reduced">
        <Experience />
        {bridgePanel}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-bridge-scroll"
      aria-label={lang === 'id' ? 'Perjalanan pengalaman dan showcase interaktif' : 'Experience journey and interactive showcase'}
      style={{ height: size.viewportHeight ? size.viewportHeight + totalScroll : '100dvh' }}
    >
      <div ref={viewportRef} className="experience-bridge-sticky">
        <motion.div ref={railRef} className="experience-bridge-rail" style={{ x }}>
          <Experience />
          {bridgePanel}
        </motion.div>
        <span className="experience-bridge-progress" aria-hidden="true">
          <motion.span style={{ scaleX: scrollYProgress }} />
        </span>
      </div>
    </section>
  );
}
