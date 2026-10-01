'use client';

import { useState, useEffect, useRef } from 'react';
import { initialCertificates } from '@/data/certificates';

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);

  const filteredCertificates = initialCertificates.filter((cert) => {
    if (selectedCategory === 'all') return true;
    return cert.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || selectedCategory !== 'all') return;

    let intervalId: NodeJS.Timeout;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (!isHoveredRef.current && container) {
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1.2;
          }
        }
      }, 20);
    };

    startAutoScroll();

    return () => clearInterval(intervalId);
  }, [selectedCategory]);

  return (
    <section className="certificates-section" id="certificates">
      <div className="cert-header">
        <div className="cert-header-left">
          <div className="small-badge">
            <i className="fa-solid fa-award"></i> CERTIFICATIONS &amp; CREDENTIALS
          </div>
          <h2 className="cert-title">Lisensi &amp; Sertifikasi</h2>
          <p className="cert-desc">
            Bukti kompetensi resmi dalam bidang Human Resource, Data Analyst, Web Developer, Frontend Developer, dan Graphic Design.
          </p>
        </div>

        <div className="cert-filter-wrapper">
          <label htmlFor="certFilterSelect" className="filter-label">Kategori:</label>
          <div className="custom-select-box">
            <select 
              id="certFilterSelect" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Semua Sertifikat</option>
              <option value="hr">Human Resource</option>
              <option value="data">Data Analyst</option>
              <option value="webdev">Web Developer</option>
              <option value="frontend">Frontend Developer</option>
              <option value="design">Graphic Design</option>
              <option value="cyber">Cyber Security</option>
              <option value="cloud">Cloud Computing</option>
            </select>
            <i className="fa-solid fa-chevron-down select-arrow"></i>
          </div>
        </div>
      </div>

      <div 
        className="cert-carousel-container" 
        ref={containerRef}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {filteredCertificates.length > 0 ? (
          <div className={`cert-bento-track ${selectedCategory !== 'all' ? 'filtered-grid' : 'all-carousel'}`}>
            {filteredCertificates.map((cert) => (
              <div 
                key={cert.id} 
                className={`cert-card ${selectedCategory === 'all' ? cert.cardType : 'cert-filtered-card'} ${cert.colorClass || ''}`}
              >
                <span className="cert-pill">{cert.pill}</span>
                {cert.imageUrl && (
                  <img src={cert.imageUrl} alt={cert.title} className="cert-bg" />
                )}
                <div className="cert-content">
                  <span className="cert-category">{cert.categoryLabel}</span>
                  <h3>{cert.title}</h3>
                  <p>{cert.description}</p>
                </div>
                <div className="corner-cutout">
                  <a href={cert.link} className="arrow-btn" target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-cert-found">
            <i className="fa-solid fa-folder-open"></i>
            <p>Belum ada sertifikat untuk kategori ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}