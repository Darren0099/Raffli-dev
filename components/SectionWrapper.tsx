'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  bgColor: string; 
}

export default function SectionWrapper({ children, bgColor }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });
  const h1 = useTransform(scrollYProgress, [0, 1], [0, 35 / 75]);
  const h2 = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const h3 = useTransform(scrollYProgress, [0, 1], [0, 25 / 75]);
  const h4 = useTransform(scrollYProgress, [0, 1], [0, 60 / 75]);
  const h5 = useTransform(scrollYProgress, [0, 1], [0, 40 / 75]);

  return (
    <div ref={ref} style={{ position: 'relative', backgroundColor: bgColor }}>
      <div 
        style={{
          position: 'absolute',
          bottom: '100%', 
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 10,
          pointerEvents: 'none' 
        }}
      >
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: '75vh', scaleY: h1, transformOrigin: 'bottom center' }} />
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: '75vh', scaleY: h2, transformOrigin: 'bottom center' }} />
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: '75vh', scaleY: h3, transformOrigin: 'bottom center' }} />
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: '75vh', scaleY: h4, transformOrigin: 'bottom center' }} />
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: '75vh', scaleY: h5, transformOrigin: 'bottom center' }} />
      </div>
      {children}
      
    </div>
  );
}