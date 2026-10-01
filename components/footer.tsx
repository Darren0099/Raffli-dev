'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Pixel = ({ index, cols, rows, progress }: { index: number, cols: number, rows: number, progress: any }) => {
  const row = Math.floor(index / cols);
  const randomScatter = Math.abs(Math.sin(index * 12.9898 + 78.233)) % 1;
  const invertedRow = rows - 1 - row;
  const start = (invertedRow / rows) * 0.5 + (randomScatter * 0.3); 
  const end = start + 0.2;

  const opacity = useTransform(progress, [start, end], [1, 0]);

  return <motion.div className="black-pixel" style={{ opacity }} />;
};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*!?";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentYear, setCurrentYear] = useState<number>(2026);

  const originalLine1 = "Let me Run";
  const originalLine2 = "your next";
  const originalLine3 = "project!";

  const [text1, setText1] = useState(originalLine1);
  const [text2, setText2] = useState(originalLine2);
  const [text3, setText3] = useState(originalLine3);
  const [isScrambling, setIsScrambling] = useState(false);

  const scrambleText = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = 12;

    const interval = setInterval(() => {
      setText1(
        originalLine1
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return originalLine1[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      setText2(
        originalLine2
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return originalLine2[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      setText3(
        originalLine3
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return originalLine3[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setText1(originalLine1);
        setText2(originalLine2);
        setText3(originalLine3);
        setIsScrambling(false);
      }
    }, 40);
  }, [isScrambling, originalLine1, originalLine2, originalLine3]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentYear(now.getFullYear());
      const timeString = now.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end 95%'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.1 && value < 0.9) {
        scrambleText();
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, scrambleText]);

  const cols = 12;
  const rows = 12;
  const totalPixels = cols * rows;

  return (
    <footer ref={containerRef} className="pixel-footer-wrapper">
      
      <div className="pixel-overlay">
        {Array.from({ length: totalPixels }).map((_, i) => (
          <Pixel key={i} index={i} cols={cols} rows={rows} progress={scrollYProgress} />
        ))}
      </div>

      <div className="footer-content">
        
        <div className="footer-top-border">
          <div className="corner-square left"></div>
          <div className="corner-square right"></div>
        </div>
        
        <div className="footer-grid">
          
          <div className="footer-col left-col">
            <h1 
              className="footer-heading"
              onMouseEnter={scrambleText}
              style={{ cursor: 'pointer' }}
            >
              {text1}<br />{text2}<br />{text3}
            </h1>
            <p className="footer-sub">
              IT&apos;S THE ONE YOU DIDN&apos;T EXPECT.<br />
              NOT IN THE SPOTLIGHT, BUT OUT<br />
              THERE ON THE EDGE.
            </p>
          </div>

          <div className="footer-col right-merged-col">
            
            <div className="merged-links-contact-grid">
              
              <div className="sub-group">
                <h4 className="col-title">Links</h4>
                <ul className="footer-links">
                  <li><a href="#about">ABOUT</a></li>
                  <li><a href="#skills">TOOLS</a></li>
                  <li><a href="#projects">WORK</a></li>
                  <li className="active-link">
                    LET&apos;S CREATE <span className="black-square-inline"></span>
                  </li>
                </ul>
              </div>

              <div className="sub-group">
                <h4 className="col-title">Contact</h4>
                <ul className="footer-links">
                  <li><a href="https://www.linkedin.com/in/al-man-raffli" target="_blank" rel="noreferrer">LINKEDIN</a></li>
                  <li><a href="https://github.com/Darren0099" target="_blank" rel="noreferrer">GITHUB</a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noreferrer">INSTAGRAM</a></li>
                </ul>
              </div>

            </div>

            <div className="merged-bottom-section">
              <a href="mailto:almanraffli1@gmail.com" className="email-send">
                <span>EMAIL</span>
                <span>almanraffli1@gmail.com</span>
              </a>
            </div>

          </div>

        </div>

        <div className="footer-bottom-bar">
          <span className="info-time">
            © {currentYear} ✦ {currentTime || '19:00:00'} WIB (Palembang, Indonesia)
          </span>
        </div>

      </div>
    </footer>
  );
}