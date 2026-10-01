'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Pastikan path import CSS ini sesuai dengan letak file CSS Anda
import '../app/styles/highlight.css'; 

const textPitch = "Building a dynamic web ecosystem and precise data insights to drive your business scalability.";
const words = textPitch.split(" ");

export default function HighlightSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Pantau progress scroll di dalam section ini
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Animasi menggambar garis abstrak (wavy) dari kiri ke kanan (0 ke 1)
  const lineDraw = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  // Melacak posisi mouse untuk efek spotlight (titik-titik putih)
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      ref={containerRef} 
      className="highlight-scroll-container"
      onMouseMove={handleMouseMove}
    >
      {/* Mengirim kordinat mouse ke CSS via custom properties untuk efek senter */}
      <div 
        className="sticky-viewport" 
        style={{ 
          '--mouse-x': `${mousePos.x}px`, 
          '--mouse-y': `${mousePos.y}px` 
        } as React.CSSProperties}
      >
        
        {/* Background Titik-titik (Spotlight Tracker) */}
        <div className="dot-pattern-bg"></div>

        {/* Garis Dekoratif (Tengah bolong & Pinggir solid) */}
        <div className="center-horizontal-line"></div>
        <div className="edge-line left-line"></div>
        <div className="edge-line right-line"></div>

        {/* Logo 3D Melayang */}
        <div className="floating-logos-wrapper">
          <div className="logo-3d logo-vscode">
            <i className="fa-solid fa-code"></i>
          </div>
          <div className="logo-3d logo-github">
            <i className="fa-brands fa-github"></i>
          </div>
          <div className="logo-3d logo-canva">
            <i className="fa-solid fa-pen-nib"></i>
          </div>
        </div>

        {/* Teks Motivasi (Reveal per-kata saat di-scroll) */}
        <div className="highlight-content">
          <h2 className="highlight-text">
            {words.map((word, i) => {
              // Kalkulasi kapan kata mulai terang dan selesai terang
              const start = (i / words.length) * 0.7;
              const end = start + (1 / words.length);
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const wordColor = useTransform(scrollYProgress, [start, end], ['#333333', '#ffffff']);
              
              return (
                <motion.span key={i} style={{ color: wordColor, transition: 'color 0.1s ease-out' }}>
                  {word}{' '}
                </motion.span>
              );
            })}
          </h2>
        </div>

        {/* Garis Abstrak Lengkung (Wavy SVG) */}
        <div className="wavy-line-wrapper">
          <svg 
            viewBox="0 0 1440 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="wavy-svg"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M -100 200 C 300 200, 450 350, 720 350 C 990 350, 1140 100, 1540 100"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ pathLength: lineDraw }} 
            />
          </svg>
        </div>

      </div>
    </section>
  );
}