'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const firstPart = "Raf".split("");
const lastPart = "fli®".split("");

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isDone, setIsDone] = useState(false);
  const reducedMotion = useReducedMotion();

  // Preserve the original split-panel animation, only shorten the intro.
  // The page renders beneath the overlay; no content request is gated on it.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsDone(true), reducedMotion ? 50 : 950);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div 
          className="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.div 
            className="preloader-panel top-panel"
            exit={{ y: "-100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="preloader-text-wrapper top-text">
              <motion.div
                initial={{ scale: 2.2, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="preloader-title-wrapper"
              >
                <div className="name-group">
                  {firstPart.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.22, delay: reducedMotion ? 0 : i * 0.06, ease: "easeOut" }}
                      className="preloader-char"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                
                <div className="name-group">
                  {lastPart.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: reducedMotion ? 0 : 0.28, delay: reducedMotion ? 0 : 0.16 + (i * 0.085), ease: "backOut" }}
                      className="preloader-char popup-char"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="preloader-panel bottom-panel"
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="preloader-text-wrapper bottom-text">
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
                className="preloader-subtitle"
              >
                Full Stack Developer & Data Analyst
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}