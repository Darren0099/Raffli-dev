export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <div className="small-badge">
          <i className="fa-solid fa-code"></i> PORTFOLIO SHOWCASE
        </div>
        <h2 className="projects-title">Proyek Unggulan</h2>
        <p className="projects-desc">
          Kumpulan karya terbaik yang mengintegrasikan Frontend Web Development, platform e-Government, analisis data mendalam, hingga perancangan identitas visual nasional.
        </p>
      </div>

      <div className="bento-grid">
        <a href="https://km-7.vercel.app/" target="_blank" rel="noopener noreferrer" className="bento-card card-main">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="AsaKita Web App" className="bento-bg" />
          <div className="card-content-wrap">
            <div className="card-tag">e-Government • React JS</div>
            <h3>AsaKita – Digital Protection Platform</h3>
            <p>Aplikasi web interaktif perlindungan perempuan &amp; anak dengan fitur konseling, edukasi hukum, dan pelaporan darurat (KMIPN VII).</p>
            
            <div className="card-skills-pills">
              <span className="skill-pill">REACT JS</span>
              <span className="skill-pill">RESPONSIVE UI</span>
              <span className="skill-pill">TAILWIND CSS</span>
              <span className="skill-pill">E-GOVERNMENT</span>
            </div>
          </div>
          <div className="corner-cutout">
            <div className="arrow-btn">
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </div>
          </div>
        </a>

        <div className="bento-stacked-column">
          <a href="https://github.com/Darren0099/global-electronics-retailer-analysis" target="_blank" rel="noopener noreferrer" className="bento-card card-stacked">
            <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" alt="Global Electronics Retailer" className="bento-bg" />
            <div className="card-content-wrap">
              <div className="card-tag">Data Analytics • Python</div>
              <h3>Global Electronics Retailer Analysis</h3>
              <p>Analisis multi-tabel 11.887 pelanggan, konversi USD, &amp; RFM.</p>
              
              <div className="card-skills-pills">
                <span className="skill-pill">PYTHON</span>
                <span className="skill-pill">PANDAS</span>
                <span className="skill-pill">RFM ANALYSIS</span>
              </div>
            </div>
            <div className="corner-cutout">
              <div className="arrow-btn">
                <i className="fa-brands fa-github"></i>
              </div>
            </div>
          </a>

          <a href="https://plniconnetbangkabelitung.ct.ws/" target="_blank" rel="noopener noreferrer" className="bento-card card-stacked">
            <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop" alt="PLN Iconnet Portal" className="bento-bg" />
            <div className="card-content-wrap">
              <div className="card-tag">Fullstack CMS • PHP</div>
              <h3>Portal Artikel PLN Iconnet</h3>
              <p>Situs publikasi berita &amp; artikel CMS resmi PLN Iconnet.</p>
              
              <div className="card-skills-pills">
                <span className="skill-pill">PHP</span>
                <span className="skill-pill">MYSQL</span>
                <span className="skill-pill">CMS DASHBOARD</span>
              </div>
            </div>
            <div className="corner-cutout">
              <div className="arrow-btn">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </div>
            </div>
          </a>
        </div>

        <div className="bento-card card-design-23">
          <div className="top-left-badge-cutout">
            <span>Visual Identity</span>
          </div>
          
          <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop" alt="Graphic Design Portfolio" className="bento-bg" />
          <div className="card-content-wrap">
            <div className="card-tag">Graphic Design &amp; Visual Identity</div>
            <h3>National &amp; Regional Youth Visual Identity</h3>
            <p>Perancangan identitas visual, feed media sosial Instagram, serta materi branding acara kepemudaan (YRI Sumsel, DPPI, &amp; YRI Summit).</p>

            <div className="card-skills-pills">
              <span className="skill-pill">CANVA</span>
              <span className="skill-pill">BRAND IDENTITY</span>
              <span className="skill-pill">SOCIAL MEDIA FEED</span>
            </div>
            
            <div className="design-links-wrap">
              <a href="https://www.instagram.com/youthranger.sumsel" target="_blank" rel="noopener noreferrer" className="design-sublink">
                <i className="fa-brands fa-instagram"></i> YRI Sumsel
              </a>
              <a href="https://www.instagram.com/dutapotensi.id" target="_blank" rel="noopener noreferrer" className="design-sublink">
                <i className="fa-brands fa-instagram"></i> DPPI
              </a>
              <a href="https://www.instagram.com/summitofstarsyri" target="_blank" rel="noopener noreferrer" className="design-sublink">
                <i className="fa-brands fa-instagram"></i> YRI Summit
              </a>
            </div>
          </div>
        </div>

        <div className="bento-text-callout">
          <h3 className="callout-heading">
            Ready to help you with my experience.
          </h3>
          
          <div className="callout-action">
            <a href="#projects" className="view-more-link">
              Want More? <span className="highlight-animated">Explore Here</span>
              <span className="arrow-animated">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}