'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../app/styles/experience.css';

const experienceData = [
  {
    id: "01",
    year: "September 2023",
    category: "Akademik",
    title: "D3 Teknik Komputer",
    company: "Politeknik Negeri Sriwijaya",
    desc: "Memulai perjalanan akademik tingkat perguruan tinggi di jurusan Teknik Komputer Polsri.",
  },
  {
    id: "02",
    year: "Oktober 2023",
    category: "Graphic Design",
    title: "Graphic Designer",
    company: "Youth Ranger Indonesia Regional Sumsel",
    desc: "Bergabung dan mengelola kebutuhan desain visual serta konten promosi digital organisasi.",
  },
  {
    id: "03",
    year: "2024",
    category: "Kompetisi",
    title: "Finalis Web Design at IT Fest",
    company: "HMJ MI POLSRI",
    desc: "Mengikuti kompetisi web design dan berhasil melaju ke babak finalis.",
  },
  {
    id: "04",
    year: "2024",
    category: "Kompetisi Nasional",
    title: "Finalis KMIPN VI Jakarta",
    company: "Politeknik Negeri Jakarta",
    desc: "Menjadi finalis dalam ajang Kompetisi Mahasiswa Informatika Politeknik Nasional ke-6 di Jakarta.",
  },
  {
    id: "05",
    year: "2024",
    category: "Full Stack",
    title: "Junior Full Stack Developer",
    company: "Youth Ranger Indonesia Regional Sumsel",
    desc: "Mengembangkan dan mengelola sistem aplikasi web internal organisasi.",
  },
  {
    id: "06",
    year: "2024",
    category: "Volunteer",
    title: "Volunteer Web Divisi",
    company: "VALTER V (Festival Multimedia & Komputer)",
    desc: "Bertanggung jawab dalam pembuatan dan pengujian situs web festival multimedia.",
  },
  {
    id: "07",
    year: "Februari 2025",
    category: "Pembicara",
    title: "Speaker Study Jam: Basic CSS Animation",
    company: "GDSC POLSRI",
    desc: "Menjadi narasumber membagikan materi manipulasi animasi CSS modern untuk anggota komunitas.",
  },
  {
    id: "08",
    year: "2025",
    category: "Kompetisi Nasional",
    title: "Peserta & Pengembang Proyek KMIPN VII",
    company: "KMIPN VII Padang",
    desc: "Mengembangkan proyek rangkap solusi digital terpadu untuk ajang KMIPN ke-7 di Padang.",
  },
  {
    id: "09",
    year: "2025",
    category: "Human Resources",
    title: "Ketua Human Resource",
    company: "Youth Ranger Indonesia District Sumatera 2",
    desc: "Successfully continued and implemented 7 legacy Human Resources programs from previous administrations.",
  },
  {
    id: "10",
    year: "2025",
    category: "Pengabdian",
    title: "Research Contributor – Digital Marketing & Web Dev",
    company: "Pengabdian Dosen Politeknik Negeri Sriwijaya",
    desc: "Mengembangkan website branding UMKM Kemplang Bakar Harun serta membantu penerapan strategi digital marketing.",
  },
  {
    id: "11",
    year: "2025",
    category: "Magang",
    title: "Web Developer Intern (Fullstack)",
    company: "Divisi Humas",
    desc: "Membangun dan mengelola modul pembuatan artikel situs web informasi publik perusahaan.",
  },
  {
    id: "12",
    year: "2025",
    category: "Graphic Design",
    title: "Graphic Designer",
    company: "Duta Potensi Pemuda Indonesia",
    desc: "Merancang identitas visual digital dan materi branding organisasi nasional.",
  },
  {
    id: "13",
    year: "2026",
    category: "Graphic Design",
    title: "Graphic Designer",
    company: "Youth Ranger Indonesia Pusat",
    desc: "Bertanggung jawab merancang media publikasi visual tingkat nasional di YRI Pusat.",
  },
  {
    id: "14",
    year: "2026",
    category: "Data Analysis",
    title: "Global Electronics Retailer Analysis",
    company: "Independent Project Data Analytics",
    desc: "Proyek analisis data end-to-end multi-tabel mengolah penjualan global, profitabilitas produk, dan segmentasi RFM menggunakan Python.",
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="exp-scroll-container" id="experience" style={{ height: '300vh' }}>
      <div className="exp-sticky-viewport">
        
        <motion.div className="exp-huge-bg-text" style={{ x: bgTextX }}>
          VOIR, PARCOURS & EXPERIENCES.
        </motion.div>

        <div className="exp-fixed-header">
          <h2 className="exp-title">Perjalanan & Pengalaman</h2>
          <p className="exp-subtitle">Eksplorasi langkah demi langkah dari awal hingga sekarang.</p>
        </div>

        <motion.div className="exp-horizontal-track" style={{ x: xTransform }}>
          <div className="exp-track-spacer"></div>

          {experienceData.map((item) => (
            <div key={item.id} className="exp-card-wrapper">
              <div className="exp-card">
                <div className="exp-card-header">
                  <span className="exp-year">{item.year}</span>
                  <span className={`exp-badge badge-${item.category.toLowerCase().replace(/[^a-z]/g, '')}`}>
                    {item.category}
                  </span>
                </div>
                
                <h3 className="exp-role">{item.title}</h3>
                <h4 className="exp-company">{item.company}</h4>
                <p className="exp-desc">{item.desc}</p>
                
                <div className="exp-card-number">{item.id}</div>
              </div>
            </div>
          ))}

          <div className="exp-track-spacer"></div>
        </motion.div>

      </div>
    </section>
  );
}