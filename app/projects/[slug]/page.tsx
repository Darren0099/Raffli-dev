'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projectsData } from '@/data/projectsData';
import Footer from '@/components/footer';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/components/LanguageProvider';
import { useLocalizedProject } from '@/hooks/useLocalizedProjects';
import ProjectLightbox from '@/components/ProjectLightbox';
import RelatedProjects from '@/components/Projects';
import '../page2.css';
import '../lightbox.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const { lang } = useLanguage();
  const p = useLocalizedProject(project);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeNav, setActiveNav] = useState<string>('overview');
  const [galleryIndex, setGalleryIndex] = useState(0);

  const bottomGallery = p.bottomGalleryImages || [
    p.image,
    p.heroImage || p.image,
    p.largeBannerImage || p.image,
    ...(p.gridThumbnails || [])
  ];

  const maxGalleryIndex = Math.max(0, bottomGallery.length - 1);

  const nextGallery = () => {
    if (galleryIndex < maxGalleryIndex) setGalleryIndex((prev) => prev + 1);
  };

  const prevGallery = () => {
    if (galleryIndex > 0) setGalleryIndex((prev) => prev - 1);
  };

  const defaultServicePills = p.services?.pills || ["Design", "Build", "Automate"];
  const defaultServiceList = p.services?.list || [
    "Digital Design",
    "Webflow development",
    "User Experience Design",
    "User Interface Design"
  ];

  const imageSources = Array.from(new Set([
    p.image,
    p.heroImage || p.image,
    ...(p.galleryImages || []),
    p.largeBannerImage || p.image,
    ...(p.gridThumbnails || []),
    ...(p.bottomGalleryImages || []),
    ...(p.outcomeGallery || [])
  ]));
  const openImage = (src: string) => setLightboxIndex(imageSources.indexOf(src));
  const ui = lang === 'id' ? {
    home: 'Beranda', overview: 'Ringkasan', showcase: 'Proses', collaboration: 'Implementasi',
    gallery: 'Galeri', services: 'Layanan', client: 'Klien', source: 'Website / Demo',
    technologies: 'Teknologi yang Digunakan', github: 'Kode Sumber',
    enlarge: 'Klik untuk memperbesar gambar'
  } : {
    home: 'Home', overview: 'Overview', showcase: 'Process', collaboration: 'Implementation',
    gallery: 'Gallery', services: 'Services', client: 'Client', source: 'Website / Demo',
    technologies: 'Technology Used', github: 'Source Code',
    enlarge: 'Click to enlarge the image'
  };

  return (
    <main className="detail-page-container">
      
      <header className="navbar">
        <div className="logo">
          <Link href="/" className="logo-link">
            <h2>Porto</h2>
          </Link>
        </div>

        <div className="nav-wrapper">
          <nav className="nav-links">
            <Link 
              href="/" 
              className="nav-item"
            >
              <span className="dot"></span> {ui.home}
            </Link>
            
            <a 
              href="#overview" 
              className={`nav-item ${activeNav === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveNav('overview')}
            >
              <span className="dot"></span> {ui.overview}
            </a>

            <a 
              href="#showcase" 
              className={`nav-item ${activeNav === 'showcase' ? 'active' : ''}`}
              onClick={() => setActiveNav('showcase')}
            >
              <span className="dot"></span> {ui.showcase}
            </a>

            <a 
              href="#collaboration" 
              className={`nav-item ${activeNav === 'collaboration' ? 'active' : ''}`}
              onClick={() => setActiveNav('collaboration')}
            >
              <span className="dot"></span> {ui.collaboration}
            </a>

            <a 
              href="#gallery" 
              className={`nav-item ${activeNav === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveNav('gallery')}
            >
              <span className="dot"></span> {ui.gallery}
            </a>
          </nav>
        </div>

        <div className="header-right">
          <LanguageToggle />

          <a 
            href="https://wa.me/6282183945815" 
            className="phone-btn" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Contact Phone"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
            </svg>
          </a>
        </div>
      </header>

      <div className="detail-content-wrap">

        <header className="detail-header-section">
          <div className="detail-category-badge">
            <span className="dot"></span>
            <span>{p.category || 'Case'}</span>
          </div>

          <h1 className="detail-main-title">{p.title}</h1>
        </header>

        <section className="detail-hero-media-wrapper">
          <div className="hero-top-left-tab">
            <span className="tab-dot"></span>
            <span className="tab-text">
              {p.buildTime || p.category}
            </span>

            <div className="tab-corner corner-right">
              <svg viewBox="0 0 26 42" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M26 0H-18.0576V41.9707H-18.0572V2H8C16.8366 2 24 9.16344 24 18V41.9707H26V0Z" fill="#f3efef" />
              </svg>
            </div>
            <div className="tab-corner corner-bottom">
              <svg viewBox="0 0 26 42" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M26 0H-18.0576V41.9707H-18.0572V2H8C16.8366 2 24 9.16344 24 18V41.9707H26V0Z" fill="#f3efef" />
              </svg>
            </div>
          </div>

          <div className="detail-hero-media">
            <button type="button" className="clickable-project-image"
              onClick={() => openImage(p.heroImage || p.image)} aria-label={ui.enlarge}>
              <img src={p.heroImage || p.image} alt={p.title} />
            </button>
          </div>
        </section>

        <section className="detail-below-hero-section">
          <div className="services-top-bar">
            <div className="service-col-main">
              <div className="meta-label-with-dot">
                <span className="pink-dot"></span>
                <span className="font-bold">{ui.services}</span>
              </div>
              <div className="services-pill-group">
                {defaultServicePills.map((pill, idx) => (
                  <span key={idx} className="service-pill">{pill}</span>
                ))}
              </div>
            </div>

            <div className="service-col-dynamic-list">
              {defaultServiceList.map((item, idx) => (
                <span key={idx} className="bullet-item">• {item}</span>
              ))}
            </div>
          </div>

          <div className="info-content-grid">
            <div className="info-sidebar-left">
              <div className="meta-info-block">
                <span className="meta-info-label">{ui.client}</span>
                <span className="meta-info-value">{p.client}</span>
              </div>

              <div className="meta-info-block">
                <span className="meta-info-label">{ui.source}</span>
                <a href={p.link} target="_blank" rel="noreferrer" className="meta-info-link">
                  {p.link.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>

            <div className="info-narrative-right" id="overview">
              <h2 className="narrative-lead-heading">{p.summaryQuote || p.title}</h2>
              <div className="narrative-body-text">
                {p.descriptionParagraphs?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </section>

        {p.galleryImages && p.galleryImages.length > 0 && (
          <section className="detail-dual-gallery">
            {p.galleryImages.slice(0, 2).map((imgUrl, i) => (
              <div key={i} className="gallery-card-item">
                <button type="button" className="clickable-project-image" onClick={() => openImage(imgUrl)} aria-label={ui.enlarge}>
                  <img src={imgUrl} alt={`${p.title} screenshot ${i + 1}`} />
                </button>
              </div>
            ))}
          </section>
        )}

        <section className="detail-info-block-section" id="showcase">
          <h2 className="block-main-title">
            {p.section1Title || "Showcasing creative courses in an engaging way"}
          </h2>
          <div className="block-two-cols-text">
            <p>
              {p.section1Text1 || "Our partnership was fueled by a mutual ambition to revolutionize education. Our strategy began with an immersive exploration of core values and goals."}
            </p>
            <p>
              {p.section1Text2 || "Recognizing the importance of autonomy in the creative process, we chose modern tools to empower teams visually, fostering flexibility in ongoing evolution."}
            </p>
          </div>
        </section>

        <section className="detail-banner-image-box">
          <button type="button" className="clickable-project-image"
            onClick={() => openImage(p.largeBannerImage || p.heroImage || p.image)} aria-label={ui.enlarge}>
            <img src={p.largeBannerImage || p.heroImage || p.image} alt={p.title} />
          </button>
        </section>

        <section className="detail-info-block-section" id="collaboration">
          <h2 className="block-main-title">
            {p.section2Title || "Collaboration fueled by creativity"}
          </h2>
          <div className="block-two-cols-text">
            <p>
              {p.section2Text1 || "Collaboration with the core team was essential. Together, we harnessed the full potential of creative education and scalable digital frameworks."}
            </p>
            <p>
              {p.section2Text2 || "Talented creators played a crucial role, building captivating visuals and engaging content that elevated the platform's overall reach."}
            </p>
          </div>
        </section>

        <section className="slug-bottom-gallery-section" id="gallery">
          <div className="slug-gallery-carousel-wrapper">
            <div 
              className="slug-gallery-track"
              style={{ transform: `translateX(-${galleryIndex * 316}px)` }}
            >
              {bottomGallery.map((imgUrl, idx) => (
                <div key={idx} className="slug-gallery-card">
                  <button type="button" className="clickable-project-image" onClick={() => openImage(imgUrl)} aria-label={ui.enlarge}>
                    <img src={imgUrl} alt={`Gallery slide ${idx + 1}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="slug-gallery-nav-actions">
            <button 
              onClick={prevGallery} 
              disabled={galleryIndex === 0}
              className="slug-gallery-btn"
              aria-label="Previous image"
            >
              ←
            </button>
            <button 
              onClick={nextGallery} 
              disabled={galleryIndex >= maxGalleryIndex}
              className="slug-gallery-btn"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </section>

        <section className="detail-info-block-section case-outcome-section" id="outcome">
          <h2 className="block-main-title">{p.outcomeTitle || (lang === 'id' ? 'Hasil yang Diperoleh' : 'The Outcome')}</h2>
          <p className="case-outcome-description">{p.outcomeText}</p>
          {!!p.outcomeStats?.length && (
            <div className="case-outcome-stats">
              {p.outcomeStats.map((stat, i) => (
                <div className="case-stat" key={i}><strong>{stat.value}</strong><span>{stat.label}</span></div>
              ))}
            </div>
          )}
          <h3 className="case-tools-heading">{ui.technologies}</h3>
          <div className="case-tools-list">
            {p.tools.map((tool) => <span key={tool} className="service-pill">{tool}</span>)}
          </div>
          <div className="case-source-links">
            <a href={p.link} target="_blank" rel="noopener noreferrer">{ui.source} ↗</a>
            {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">{ui.github} ↗</a>}
          </div>
          {!!p.outcomeGallery?.length && (
            <div className="case-outcome-gallery">
              {p.outcomeGallery.map((src, i) => (
                <button key={i} type="button" className="clickable-project-image" onClick={() => openImage(src)} aria-label={ui.enlarge}>
                  <img src={src} alt={`${p.title} result ${i+1}`} />
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
      {lightboxIndex >= 0 && <ProjectLightbox images={imageSources} index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)} onChange={setLightboxIndex} />}
      <RelatedProjects />
      <Footer />
    </main>
  );
}