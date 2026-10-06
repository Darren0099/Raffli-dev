'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projectsData } from '@/data/projectsData';
import Footer from '@/components/footer';
import RelatedProjects from '@/components/Projects';
import '../page2.css';

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

  const [lang, setLang] = useState<'id' | 'en'>('en');
  const [activeNav, setActiveNav] = useState<string>('overview');
  const [galleryIndex, setGalleryIndex] = useState(0);

  const bottomGallery = project.bottomGalleryImages || [
    project.image,
    project.heroImage || project.image,
    project.largeBannerImage || project.image,
    ...(project.gridThumbnails || [])
  ];

  const maxGalleryIndex = Math.max(0, bottomGallery.length - 1);

  const nextGallery = () => {
    if (galleryIndex < maxGalleryIndex) setGalleryIndex((prev) => prev + 1);
  };

  const prevGallery = () => {
    if (galleryIndex > 0) setGalleryIndex((prev) => prev - 1);
  };

  const [leadParagraph, para1, para2, para3] = project.descriptionParagraphs || [
    "In today's fast-paced creative industry, becoming a top-tier designer, videographer, or animator requires more than just talent—it demands innovative education.",
    "Understanding the target audience and business objectives was central to our strategy. We prioritized creating a seamless user journey.",
    "By leveraging modern development stacks and clean design systems, we delivered a robust solution tailored for scalability.",
    "The resulting platform bridges the gap between functional performance and captivating visual aesthetics."
  ];

  const defaultServicePills = project.services?.pills || ["Design", "Build", "Automate"];
  const defaultServiceList = project.services?.list || [
    "Digital Design",
    "Webflow development",
    "User Experience Design",
    "User Interface Design"
  ];

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
              <span className="dot"></span> Home
            </Link>
            
            <a 
              href="#overview" 
              className={`nav-item ${activeNav === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveNav('overview')}
            >
              <span className="dot"></span> Overview
            </a>

            <a 
              href="#showcase" 
              className={`nav-item ${activeNav === 'showcase' ? 'active' : ''}`}
              onClick={() => setActiveNav('showcase')}
            >
              <span className="dot"></span> Showcase
            </a>

            <a 
              href="#collaboration" 
              className={`nav-item ${activeNav === 'collaboration' ? 'active' : ''}`}
              onClick={() => setActiveNav('collaboration')}
            >
              <span className="dot"></span> Collaboration
            </a>

            <a 
              href="#gallery" 
              className={`nav-item ${activeNav === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveNav('gallery')}
            >
              <span className="dot"></span> Gallery
            </a>
          </nav>
        </div>

        <div className="header-right">
          <div 
            className={`lang-toggle ${lang === 'en' ? 'en' : ''}`}
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
          >
            <div className="toggle-pill"></div>
            <span className={`lang-opt opt-en ${lang === 'en' ? 'active' : ''}`}>EN</span>
            <span className={`lang-opt opt-id ${lang === 'id' ? 'active' : ''}`}>ID</span>
          </div>

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
            <span>{project.category || 'Case'}</span>
          </div>

          <h1 className="detail-main-title">{project.title}</h1>
        </header>

        <section className="detail-hero-media-wrapper">
          <div className="hero-top-left-tab">
            <span className="tab-dot"></span>
            <span className="tab-text">
              {project.buildTime ? `Built in ${project.buildTime}` : 'Built in 7 weeks'}
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
            <img src={project.heroImage || project.image} alt={project.title} />
          </div>
        </section>

        <section className="detail-below-hero-section">
          <div className="services-top-bar">
            <div className="service-col-main">
              <div className="meta-label-with-dot">
                <span className="pink-dot"></span>
                <span className="font-bold">Services</span>
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
                <span className="meta-info-label">Client</span>
                <span className="meta-info-value">{project.client}</span>
              </div>

              <div className="meta-info-block">
                <span className="meta-info-label">Website</span>
                <a href={project.link} target="_blank" rel="noreferrer" className="meta-info-link">
                  {project.link.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>

            <div className="info-narrative-right" id="overview">
              <h2 className="narrative-lead-heading">
                {leadParagraph}
              </h2>

              <div className="narrative-body-text">
                {para1 && <p>{para1}</p>}
                {para2 && <p>{para2}</p>}
                {para3 && <p>{para3}</p>}
              </div>
            </div>
          </div>
        </section>

        {project.galleryImages && project.galleryImages.length > 0 && (
          <section className="detail-dual-gallery">
            {project.galleryImages.slice(0, 2).map((imgUrl, i) => (
              <div key={i} className="gallery-card-item">
                <img src={imgUrl} alt={`${project.title} screenshot ${i + 1}`} />
              </div>
            ))}
          </section>
        )}

        <section className="detail-info-block-section" id="showcase">
          <h2 className="block-main-title">
            {project.section1Title || "Showcasing creative courses in an engaging way"}
          </h2>
          <div className="block-two-cols-text">
            <p>
              {project.section1Text1 || "Our partnership was fueled by a mutual ambition to revolutionize education. Our strategy began with an immersive exploration of core values and goals."}
            </p>
            <p>
              {project.section1Text2 || "Recognizing the importance of autonomy in the creative process, we chose modern tools to empower teams visually, fostering flexibility in ongoing evolution."}
            </p>
          </div>
        </section>

        <section className="detail-banner-image-box">
          <img 
            src={project.largeBannerImage || project.heroImage || project.image} 
            alt={project.title} 
          />
        </section>

        <section className="detail-info-block-section" id="collaboration">
          <h2 className="block-main-title">
            {project.section2Title || "Collaboration fueled by creativity"}
          </h2>
          <div className="block-two-cols-text">
            <p>
              {project.section2Text1 || "Collaboration with the core team was essential. Together, we harnessed the full potential of creative education and scalable digital frameworks."}
            </p>
            <p>
              {project.section2Text2 || "Talented creators played a crucial role, building captivating visuals and engaging content that elevated the platform's overall reach."}
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
                  <img src={imgUrl} alt={`Gallery slide ${idx + 1}`} />
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

      </div>

      <RelatedProjects />
      <Footer />
    </main>
  );
}