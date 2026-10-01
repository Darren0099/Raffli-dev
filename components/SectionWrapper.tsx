'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  bgColor: string; // Warna yang sama dengan latar belakang Section B
}

export default function SectionWrapper({ children, bgColor }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Memantau saat batas atas Section B masuk dari bawah layar hingga mencapai atas layar
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  // Efek Parallax: Kolom tumbuh (ditarik) ke atas menutupi Section A saat di-scroll
  const h1 = useTransform(scrollYProgress, [0, 1], ["0vh", "35vh"]);
  const h2 = useTransform(scrollYProgress, [0, 1], ["0vh", "75vh"]);
  const h3 = useTransform(scrollYProgress, [0, 1], ["0vh", "25vh"]);
  const h4 = useTransform(scrollYProgress, [0, 1], ["0vh", "60vh"]);
  const h5 = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"]);

  return (
    <div ref={ref} style={{ position: 'relative', backgroundColor: bgColor }}>
      
      {/* 
        GRAFIK TANGGA (OVERLAY)
        Posisinya absolut di 'bottom: 100%'. Artinya ia menempel persis di ujung ATAS 
        Section B, dan menjulur/bocor ke dalam wilayah Section A.
      */}
      <div 
        style={{
          position: 'absolute',
          bottom: '100%', 
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 10,
          pointerEvents: 'none' // Agar tidak memblokir klik di Section A
        }}
      >
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: h1, willChange: 'height' }} />
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: h2, willChange: 'height' }} />
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: h3, willChange: 'height' }} />
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: h4, willChange: 'height' }} />
        <motion.div style={{ flex: 1, backgroundColor: bgColor, height: h5, willChange: 'height' }} />
      </div>

      {/* Konten Section Asli (Skills, Experience, dll) */}
      {children}
      
    </div>
  );
}