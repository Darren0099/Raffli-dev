'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionTransitionProps {
  fromColor?: string;
  toColor?: string;
}

export default function SectionTransition({ fromColor = '#121212', toColor = '#F7F2EB' }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animasi 5 kolom tangga grafik dari atas ke bawah
  const col1 = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);
  const col2 = useTransform(scrollYProgress, [0.2, 0.6], ['0%', '100%']);
  const col3 = useTransform(scrollYProgress, [0.3, 0.7], ['0%', '100%']);
  const col4 = useTransform(scrollYProgress, [0.2, 0.6], ['0%', '100%']);
  const col5 = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);

  return (
    <div ref={containerRef} className="section-transition-wrap" style={{ backgroundColor: fromColor }}>
      <div className="section-transition-sticky">
        <div className="section-transition-columns">
          <motion.div className="t-col" style={{ height: col1, backgroundColor: toColor }} />
          <motion.div className="t-col" style={{ height: col2, backgroundColor: toColor }} />
          <motion.div className="t-col" style={{ height: col3, backgroundColor: toColor }} />
          <motion.div className="t-col" style={{ height: col4, backgroundColor: toColor }} />
          <motion.div className="t-col" style={{ height: col5, backgroundColor: toColor }} />
        </div>
      </div>
    </div>
  );
}