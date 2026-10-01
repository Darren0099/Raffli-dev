'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const roles = ["Full Stack Developer", "Data Analyst", "Graphic Designer", "Human Resource"];

export default function Hero({ t, lang }: { t: any, lang: 'id' | 'en' }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFullRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentFullRole.substring(0, prev.length - 1)
          : currentFullRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const floatingTags = [
    { label: 'Data Analysis', className: 'tag-data' },
    { label: 'Human Resource', className: 'tag-hr' },
    { label: 'Graphic Design', className: 'tag-graphic' },
  ];

  return (
    <section className="modern-hero-section" id="about">
      <div className="hero-content-wrapper">
        
        {/* KOLOM KIRI: HEADLINE & TYPEWRITER */}
        <div className="hero-left-box">
          <span className="about-me-tag">(About me)</span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-main-title"
          >
            Empowering digital vision and solving complex growth struggles. I help as a{" "}
            <span className="typewriter-text">{displayText}</span>
            <span className="typewriter-cursor">|</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-cta-group"
          >
            <a href="mailto:almanraffli1@gmail.com" className="get-in-touch-btn">
              <span>✦</span> Get in touch
            </a>
          </motion.div>
        </div>

        {/* KOLOM KANAN: SHAPE TERBALIK, COAKAN DI KANAN, & DAPAT DIISI FOTO */}
        <div className="hero-right-box">
          <div className="erwin-hero-container">
            
            {/* SVG SHAPE ORANGE BELAKANG (DIBALIK KE BAWAH & MIRROR KANAN) */}
            <div className="cta-shape-bg">
              <svg viewBox="0 0 610 547" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(610, 547) scale(-1, -1)">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M116.134 529.548C116.134 538.642 123.506 546.015 132.6 546.015H211.63C211.635 546.015 211.638 546.011 211.638 546.007V546.007C211.638 546.003 211.642 545.999 211.646 545.999H592.691C601.786 545.999 609.158 538.627 609.158 529.533L609.157 251.366C609.157 242.272 601.785 234.899 592.691 234.899H401.097C392.003 234.899 384.631 227.527 384.631 218.433V112.465C384.631 103.371 377.259 95.999 368.164 95.999H214.466C205.372 95.999 198 88.6268 198 79.5327V16.4662C198 7.37219 190.628 0 181.534 0H88.4662C79.3722 0 72 7.37219 72 16.4662V104.534C72 113.628 79.3722 121 88.4662 121H166.917C176.011 121 183.383 128.372 183.383 137.466V273.565C183.383 282.659 176.011 290.031 166.917 290.031H116.134H116.134H16.5634C7.46936 290.031 0.0971666 297.403 0.0971666 306.497V445.923C0.0971666 455.017 7.46935 462.39 16.5634 462.39H99.6677C108.762 462.39 116.134 469.762 116.134 478.856V529.548Z" 
                    fill="#FE5000"
                  />
                </g>
              </svg>
            </div>

            <div className="person-content-box desktop-person-info">
              <h3 className="person-name">Al-man<br />Raffli<br />Saputra</h3>
              <p className="person-role">Full Stack Dev</p>
            </div>

            <div className="cta_img-wrapper">
  <svg viewBox="0 0 464 463" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="masked-photo-svg">
    <defs>
      <clipPath id="e-letter-right">
        <path d="M426.794 276.327L349.999 353.122C347.867 355.254 344.424 355.254 342.306 353.122C340.174 350.991 340.174 347.547 342.306 345.429L419.088 268.647C439.598 248.137 439.598 214.877 419.088 194.366L342.292 117.571C340.16 115.439 340.16 111.996 342.292 109.878V109.878C344.42 107.749 347.871 107.749 349.999 109.878L426.781 186.659C428.954 188.832 431.277 190.772 433.695 192.494C446.39 201.445 463.908 192.153 463.908 176.616V51.7481C463.908 23.1753 440.746 0 412.16 0H52.6832C24.0967 0 0.935059 23.1616 0.935059 51.7481V411.252C0.935059 439.825 24.0967 463 52.6832 463H412.187C440.76 463 463.935 439.838 463.935 411.252V286.411C463.935 270.861 446.39 261.555 433.695 270.519C431.277 272.228 428.967 274.168 426.808 276.327H426.794Z" />
      </clipPath>
    </defs>
    
    <rect width="100%" height="100%" fill="#1f1f1f" clipPath="url(#e-letter-right)" />
    <text x="35%" y="58%" fill="rgba(255,255,255,0.25)" fontSize="110" fontWeight="900" clipPath="url(#e-letter-right)">AR</text>

    <image
      href="/img/im1.png"
      xlinkHref="/img/im1.png"
      x="0"
      y="0"
      width="464"
      height="463"
      preserveAspectRatio="xMidYMid slice"
      clipPath="url(#e-letter-right)"
    />
  </svg>
</div>

            {floatingTags.map((tag, idx) => (
              <motion.div
                key={idx}
                className={`floating-badge-box ${tag.className}`}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3 + idx * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg className="orange-arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="#FE5000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{tag.label}</span>
              </motion.div>
            ))}

            <div className="person-content-box mobile-person-info">
              <h3 className="person-name">Al-man Raffli Saputra</h3>
              <p className="person-role">Full Stack Dev</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}