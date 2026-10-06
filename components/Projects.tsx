"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { projectsData } from "@/data/projectsData";

export default function RelatedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const CARD_STEP = 316;
  const maxIndex = projectsData.length - 1;
  const DRAG_THRESHOLD = 20;

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleMouseDown = (clientX: number) => {
    setIsMouseDown(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (clientX: number) => {
    if (!isMouseDown) return;
    const diff = clientX - startX;
    if (!isDragging && Math.abs(diff) > DRAG_THRESHOLD) {
      setIsDragging(true);
    }
    if (isDragging) {
      setDragOffset(diff);
    }
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;
    if (isDragging) {
      if (dragOffset < -70 && currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1);
      } else if (dragOffset > 70 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
    setIsMouseDown(false);
    setIsDragging(false);
    setDragOffset(0);
  };

  if (!isMounted) return null;

  const translateX = -(currentIndex * CARD_STEP) + dragOffset;

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        <div className="portfolio-tab">
          <div className="portfolio-tab-corner tab-corner-left"></div>
          <div className="portfolio-tab-body">
            <span className="subheading-dot"></span>
            <span className="subheading-text">Related projects</span>
          </div>
          <div className="portfolio-tab-corner tab-corner-right"></div>
        </div>

        <div className="portfolio-box">
          <div
            className={`portfolio-carousel-wrapper ${isDragging ? "is-grabbing" : ""}`}
            onMouseDown={(e) => handleMouseDown(e.clientX)}
            onMouseMove={(e) => handleMouseMove(e.clientX)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={(e) => handleMouseDown(e.touches[0].clientX)}
            onTouchMove={(e) => handleMouseMove(e.touches[0].clientX)}
            onTouchEnd={handleMouseUp}
          >
            <div
              className={`portfolio-carousel-track ${isDragging ? "dragging" : ""}`}
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {projectsData.map((project) => (
                <div className="project-item" key={project.id}>
                  <article className="project-card">
                    <div className="card-media-wrapper">
                      <div className="card-media-inner">
                        <div className="card-hover-layer">
                          <div className="hover-info-top">
                            <span className="info-label">Used Tech / Tools</span>
                            <div className="tools-badge-list">
                              {project.tools.map((tool, idx) => (
                                <span className="tool-badge" key={idx}>
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="hover-info-bottom">
                            <div className="hover-time-wrap">
                              <span className="info-label">Category</span>
                              <div className="time-value">{project.buildTime || "Project"}</div>
                            </div>
                            
                            <div className="hover-action-wrap">
                              <Link
                                href={`/projects/${project.slug}`}
                                className="action-btn orange-btn"
                                onClick={(e) => {
                                  if (isDragging) e.preventDefault();
                                }}
                              >
                                <span>View Project</span>
                                <svg className="action-icon" viewBox="0 0 15 15" fill="none">
                                  <path d="M0.446016 13.2915L11.6135 2.50818L11.0001 1.87485C10.1611 2.4503 9.13533 2.71805 8.08262 2.63644L3.91788 2.41776L3.88743 0.691128L14.2601 1.23577L14.4424 11.5695L12.7135 11.4787L12.6425 7.44985C12.5647 6.35521 12.8803 5.29635 13.5319 4.46468L12.8922 3.80376L1.6991 14.5857L0.446016 13.2915Z" fill="currentColor"/>
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>

                        <a
                          href={project.link}
                          target={project.isExternalLink ? "_blank" : "_self"}
                          rel={project.isExternalLink ? "noopener noreferrer" : ""}
                          className="card-media-anchor"
                          onClick={(e) => {
                            if (isDragging) e.preventDefault();
                          }}
                        >
                          <img
                            src={project.image}
                            alt={project.client}
                            className="card-cover-image"
                            draggable={false}
                          />
                        </a>
                      </div>

                      {project.category && (
                        <div className="card-category-tag">
                          <span className="category-badge">{project.category}</span>
                        </div>
                      )}
                    </div>

                    <div className="card-body">
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="card-title">{project.title}</h3>
                      </Link>
                      <div className="card-client-name">{project.client}</div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="portfolio-footer-tab">
          <div className="footer-tab-corner footer-corner-left"></div>
          <div className="portfolio-controls-content">
            <Link href="/projects" className="all-projects-btn">
              <div className="btn-inner orange-bg">
                <div className="btn-icon-box">
                  <svg viewBox="0 0 24 23" fill="none">
                    <path d="M15.7196 11.9163C13.8735 11.9163 12.3279 13.3863 12.3279 15.2342V22.5H11.641V15.2342C11.641 13.3863 10.0954 11.9163 8.20639 11.9163H0.822021V11.2443H8.20639C10.0954 11.2023 11.641 9.73237 11.5981 7.88442V0.660645H12.3279V7.88442C12.3279 9.73237 13.8735 11.2023 15.7196 11.2023H23.1469V11.9163H15.7196Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="btn-text-box">
                  <span className="btn-label">Show all projects</span>
                </div>
              </div>
            </Link>

            <div className="carousel-nav-arrows">
              <button
                type="button"
                className={`nav-arrow prev-arrow ${currentIndex === 0 ? "disabled" : ""}`}
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                ←
              </button>
              <button
                type="button"
                className={`nav-arrow next-arrow ${currentIndex >= maxIndex ? "disabled" : ""}`}
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
              >
                →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}