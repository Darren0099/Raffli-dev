'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { projectsData } from '@/data/projectsData';
import Footer from '@/components/footer';
import './projects-page.css';

export default function AllProjectsPage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const maxCarousel = Math.max(0, projectsData.length - 1);

  const nextCarousel = () => {
    if (carouselIndex < maxCarousel) setCarouselIndex((prev) => prev + 1);
  };

  const prevCarousel = () => {
    if (carouselIndex > 0) setCarouselIndex((prev) => prev - 1);
  };

  return (
    <main className="all-projects-container font-sans">
      
      <div className="all-projects-wrapper">
        <h1 className="all-projects-title">Projects</h1>

        {/* Grid Utama (3 Kartu per Baris) */}
        <div className="projects-main-grid">
          {projectsData.map((project) => (
            <article key={project.slug} className="project-card-item group">
              
              {/* Media Container */}
              <div className="project-media-box">
                <a href={project.link} target="_blank" rel="noreferrer" className="block w-full h-full">
                  <img src={project.image} alt={project.title} />
                </a>

                {/* Corner Path Tag (Bento Tag / Case Badge) */}
                {project.category && (
                  <div className="card-category-tag">
                    {/* Corner Path SVG Curve Left */}
                    <div className="category-corner top-left">
                      <svg viewBox="0 0 18 18" fill="none">
                        <path d="M18 18C18 8.05887 9.94113 0 0 0H18V18Z" fill="#111111" />
                      </svg>
                    </div>

                    <span className="category-badge">{project.category}</span>

                    {/* Corner Path SVG Curve Bottom */}
                    <div className="category-corner bottom-right">
                      <svg viewBox="0 0 18 18" fill="none">
                        <path d="M18 18C18 8.05887 9.94113 0 0 0H18V18Z" fill="#111111" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Glass Layer Overlay */}
                <div className="project-hover-glass">
                  <div>
                    <span className="glass-label">Used Tools</span>
                    <div className="glass-tools-list">
                      {project.tools?.map((tool, i) => (
                        <span key={i} className="glass-tool-item">{tool}</span>
                      ))}
                    </div>
                  </div>

                  <div className="glass-actions">
                    <Link href={`/projects/${project.slug}`} className="btn-view-detail">
                      View Detail
                    </Link>
                    <a href={project.link} target="_blank" rel="noreferrer" className="btn-live-link">
                      Live Link ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Info Judul & Klien */}
              <div className="project-info-box">
                <Link href={`/projects/${project.slug}`} className="project-item-title">
                  <h3>{project.title}</h3>
                </Link>
                <p className="project-item-client">{project.client}</p>
              </div>

            </article>
          ))}
        </div>

        {/* Section Slider: More Projects (Horizontal Scroll/Slide) */}
        <div className="more-projects-section">
          <div className="more-projects-header">
            <h2>More projects</h2>
            <div className="carousel-nav-buttons">
              <button 
                onClick={prevCarousel} 
                disabled={carouselIndex === 0} 
                className="nav-btn-circle"
                aria-label="Previous Project"
              >
                ←
              </button>
              <button 
                onClick={nextCarousel} 
                disabled={carouselIndex >= maxCarousel} 
                className="nav-btn-circle"
                aria-label="Next Project"
              >
                →
              </button>
            </div>
          </div>

          {/* Track Slider Horizontal */}
          <div className="more-projects-carousel-wrapper">
            <div 
              className="more-projects-carousel-track"
              style={{ transform: `translateX(-${carouselIndex * 310}px)` }}
            >
              {projectsData.map((project) => (
                <div key={project.slug} className="more-project-card">
                  <div className="more-project-media">
                    <img src={project.image} alt={project.title} />
                    <Link href={`/projects/${project.slug}`} className="more-project-overlay">
                      View Project ↗
                    </Link>
                  </div>
                  <h4 className="more-project-title">{project.title}</h4>
                  <span className="more-project-client">{project.client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}