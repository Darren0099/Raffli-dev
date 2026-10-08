'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import '../app/styles/skills.css';

const skillsData = [
  {
    id: "01",
    title: "Web Developer",
    desc: "Membangun arsitektur web yang kokoh, cepat, dan terukur.",
    cursorText: "Code the Future",
    skills: ["PHP", "MySQL", "Git", "REST API"]
  },
  {
    id: "02",
    title: "FrontEnd Dev",
    desc: "Menciptakan antarmuka yang interaktif dan mulus.",
    cursorText: "Pixel Perfect",
    skills: ["React JS", "Next.js", "JavaScript", "HTML5", "CSS3"]
  },
  {
    id: "03",
    title: "Data Analysis",
    desc: "Mengubah data mentah menjadi wawasan bisnis yang tajam.",
    cursorText: "Clean your data",
    skills: ["Python", "Bahasa R", "Pandas", "Looker Studio", "Excel"]
  },
  {
    id: "04",
    title: "Graphic Design",
    desc: "Bercerita melalui visual, branding, dan desain UI/UX.",
    cursorText: "Lets Create Magic",
    skills: ["Figma", "Canva", "Photoshop", "Colorhunt", "Branding"]
  },
  {
    id: "05",
    title: "Human Resource",
    desc: "Menemukan dan mengelola talenta terbaik untuk tim.",
    cursorText: "People First",
    skills: ["CV Screening", "Interview", "Talent Management"]
  }
];

const SkillRow = ({ data, setCursorData }: { data: any, setCursorData: any }) => {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { margin: "-30% 0px -30% 0px" });

  return (
    <div 
      ref={rowRef}
      className="awwwards-row"
      onMouseEnter={() => setCursorData({ show: true, text: data.cursorText })}
      onMouseLeave={() => setCursorData({ show: false, text: "" })}
    >
      <div className="row-border-top"></div>
      <motion.div 
        className="row-header"
        animate={{ 
          x: isInView ? 40 : 0, 
          color: isInView ? "#121212" : "rgba(18, 18, 18, 0.15)" 
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
      >
        <span className="row-number">{data.id}</span>
        <h2 className="row-title">{data.title}</h2>
      </motion.div>

      <motion.div 
        className="row-content"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isInView ? "auto" : 0, 
          opacity: isInView ? 1 : 0,
          x: isInView ? 40 : 0 
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
      >
        <p className="row-desc">{data.desc}</p>
        <div className="row-skills-pills">
          {data.skills.map((skill: string, i: number) => (
            <span key={i} className="awwwards-pill">{skill}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function Skills({ t }: { t: any }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorData, setCursorData] = useState({ show: false, text: "" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="awwwards-skills-section" style={{ position: 'relative' }}>
      <div id="skills" style={{ position: 'absolute', top: 0, left: 0 }} />

      <motion.div 
        className="custom-floating-cursor"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: cursorData.show ? 1 : 0,
          scale: cursorData.show ? 1 : 0.5
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
      >
        {cursorData.text} <i className="fa-solid fa-arrow-right"></i>
      </motion.div>

      <div className="awwwards-skills-container">
        <div className="skills-section-header">
          <p className="section-subtitle">Expertise</p>
          <h2 className="section-maintitle">Spesialisasi & Peran</h2>
        </div>

        <div className="awwwards-list-wrapper">
          {skillsData.map((item) => (
            <SkillRow key={item.id} data={item} setCursorData={setCursorData} />
          ))}
        </div>
      </div>
    </section>
  );
}