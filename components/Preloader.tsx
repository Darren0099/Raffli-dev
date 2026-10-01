'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const firstPart = "Raf".split("");
const lastPart = "fli®".split("");

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 600);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div 
          className="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.div 
            className="preloader-panel top-panel"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="preloader-text-wrapper top-text">
              <motion.div
                initial={{ scale: 2.2, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="preloader-title-wrapper"
              >
                <div className="name-group">
                  {firstPart.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
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
                      transition={{ duration: 0.4, delay: 0.4 + (i * 0.1), ease: "backOut" }}
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
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
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