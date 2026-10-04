"use client";

import React, { useState } from "react";

interface ProjectItem {
  id: number;
  title: string;
  client: string;
  category?: string;
  image: string;
  link: string;
  tools: string[];
  buildTime?: string;
  isExternalLink?: boolean;
}

// Judul project telah disingkat dengan gaya editorial headline
const projectsData: ProjectItem[] = [
    {
    id: 1,
    title: "Very Youthfull Profile Organization Website for Youth Ranger Indonesia Sumsel",
    client: "Youth Ranger Indonesia Sumsel",
    category: "Youth Organization",
    image: "/img/ca3.png",
    link: "https://youthrangerindonesiasumateraselatan.vercel.app/",
    tools: ["React JS", "Responsive UI", "Tailwind CSS", "e-Government"],
    buildTime: "YRI SUMSEL",
    isExternalLink: false,
  },
  {
    id: 2,
    title: "Next-gen e-Government platform for digital child & women protection",
    client: "AsaKita Protection",
    category: "e-Government",
    image: "/img/ca2.png",
    link: "https://km-7.vercel.app/",
    tools: ["React JS", "Responsive UI", "Tailwind CSS", "e-Government"],
    buildTime: "KMIPN VII",
    isExternalLink: false,
  },
  {
    id: 3,
    title: "RFM segmentation & profitability insights across 11k+ customers",
    client: "Global Retailer Analytics",
    category: "Data Analytics",
  image: "/img/ca5.png",
    link: "https://github.com/Darren0099/global-electronics-retailer-analysis",
    tools: ["Python", "Pandas", "RFM Analysis"],
    buildTime: "Repository",
    isExternalLink: true,
  },
  {
    id: 4,
    title: "Custom dynamic CMS portal powering state-owned enterprise news",
    client: "PLN Iconnet Portal",
    category: "Fullstack CMS",
    image: "/img/ca4.png",
    link: "https://plniconnetbangkabelitung.ct.ws/",
    tools: ["PHP", "MySQL", "CMS Dashboard"],
    buildTime: "Production",
    isExternalLink: true,
  },
  {
    id: 5,
    title: "Cohesive visual identity & digital branding for national youth orgs",
    client: "Youth Visual Identity",
    category: "Visual Identity",
    image: "/img/ca1.png",
    link: "https://www.instagram.com/youthranger.sumsel",
    tools: ["Canva", "Brand Identity", "Social Media Feed"],
    buildTime: "Branding",
    isExternalLink: true,
  },
];

export default function RelatedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const CARD_STEP = 316; // Lebar Card (300px) + Gap (16px)
  const maxIndex = projectsData.length - 1;
  const DRAG_THRESHOLD = 20;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Drag & Drop Handlers
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

  const translateX = -(currentIndex * CARD_STEP) + dragOffset;

  return (
    <section className="portfolio-section">
      <div className="portfolio-container">
        
        {/* Tab Subheading Top-Left */}
        <div className="portfolio-tab">
          <div className="portfolio-tab-corner tab-corner-left"></div>
          <div className="portfolio-tab-body">
            <span className="subheading-dot"></span>
            <span className="subheading-text">Related projects</span>
          </div>
          <div className="portfolio-tab-corner tab-corner-right"></div>
        </div>

        {/* Box Utama */}
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
              style={{
                transform: `translateX(${translateX}px)`,
              }}
            >
              {projectsData.map((project) => (
                <div className="project-item" key={project.id}>
                  <article className="project-card">
                    <a
                      href={project.link}
                      target={project.isExternalLink ? "_blank" : "_self"}
                      rel={project.isExternalLink ? "noopener noreferrer" : ""}
                      className="card-overlay-link"
                      aria-label={`View ${project.client}`}
                      onClick={(e) => {
                        if (isDragging || Math.abs(dragOffset) > 10) {
                          e.preventDefault();
                        }
                      }}
                    />

                    {/* Media Gambar */}
                    <div className="card-media-wrapper">
                      <div className="card-media-inner">
                        
                        {/* Layer Hover Detail */}
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
                              <div className="action-btn orange-btn">
                                <span>View Project</span>
                                <svg
                                  className="action-icon"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0.446016 13.2915L11.6135 2.50818L11.0001 1.87485C10.1611 2.4503 9.13533 2.71805 8.08262 2.63644L3.91788 2.41776L3.88743 0.691128L14.2601 1.23577L14.4424 11.5695L12.7135 11.4787L12.6425 7.44985C12.5647 6.35521 12.8803 5.29635 13.5319 4.46468L12.8922 3.80376L1.6991 14.5857L0.446016 13.2915Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Image */}
                        <img
                          src={project.image}
                          alt={project.client}
                          className="card-cover-image"
                          draggable={false}
                        />
                      </div>

                      {/* Badge Tag Top-Right */}
                      {project.category && (
                        <div className="card-category-tag">
                          <span className="category-badge">{project.category}</span>
                          <div className="category-corner top-left">
                            <svg viewBox="0 0 26 26" fill="none">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M26 0H-18.0576V41.9707H-18.0572V2H8C16.8366 2 24 9.16344 24 18V41.9707H26V0Z"
                                fill="#141414"
                              />
                            </svg>
                          </div>
                          <div className="category-corner bottom-right">
                            <svg viewBox="0 0 26 26" fill="none">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M26 0H-18.0576V41.9707H-18.0572V2H8C16.8366 2 24 9.16344 24 18V41.9707H26V0Z"
                                fill="#141414"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Deskripsi Teks */}
                    <div className="card-body">
                      <h3 className="card-title">{project.title}</h3>
                      <div className="card-client-name">{project.client}</div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Control Navigasi Kanan Bawah */}
        <div className="portfolio-footer-tab">
          <div className="footer-tab-corner footer-corner-left"></div>
          
          <div className="portfolio-controls-content">
            <a href="/projects" className="all-projects-btn">
              <div className="btn-inner orange-bg">
                <div className="btn-icon-box">
                  <svg viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.7196 11.9163C13.8735 11.9163 12.3279 13.3863 12.3279 15.2342V22.5H11.641V15.2342C11.641 13.3863 10.0954 11.9163 8.20639 11.9163H0.822021V11.2443H8.20639C10.0954 11.2023 11.641 9.73237 11.5981 7.88442V0.660645H12.3279V7.88442C12.3279 9.73237 13.8735 11.2023 15.7196 11.2023H23.1469V11.9163H15.7196Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="btn-text-box">
                  <span className="btn-label">Show all projects</span>
                </div>
              </div>
            </a>

            <div className="carousel-nav-arrows">
              <button
                type="button"
                className={`nav-arrow prev-arrow ${currentIndex === 0 ? "disabled" : ""}`}
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.306828 8.34796L18.1265 8.32769C18.4155 8.32737 18.6495 8.09298 18.6494 7.80402V7.80402C18.6493 7.54607 18.4606 7.32932 18.2098 7.26876C17.1956 7.02383 16.2699 6.49123 15.5465 5.73061L12.1904 2.37452L13.5835 0.981431L21.9421 9.34008L13.6046 17.6776L12.2115 16.2844L15.4621 13.0338C16.1897 12.2239 17.1494 11.6646 18.2042 11.4279C18.4686 11.3686 18.6704 11.1426 18.6704 10.8717V10.8717C18.6704 10.5737 18.4289 10.3321 18.1308 10.3321L0.307074 10.3323L0.306828 8.34796Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={`nav-arrow next-arrow ${currentIndex >= maxIndex ? "disabled" : ""}`}
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                aria-label="Next slide"
              >
                <svg viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.306828 8.34796L18.1265 8.32769C18.4155 8.32737 18.6495 8.09298 18.6494 7.80402V7.80402C18.6493 7.54607 18.4606 7.32932 18.2098 7.26876C17.1956 7.02383 16.2699 6.49123 15.5465 5.73061L12.1904 2.37452L13.5835 0.981431L21.9421 9.34008L13.6046 17.6776L12.2115 16.2844L15.4621 13.0338C16.1897 12.2239 17.1494 11.6646 18.2042 11.4279C18.4686 11.3686 18.6704 11.1426 18.6704 10.8717V10.8717C18.6704 10.5737 18.4289 10.3321 18.1308 10.3321L0.307074 10.3323L0.306828 8.34796Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}