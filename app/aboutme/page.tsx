'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageToggle from '@/components/LanguageToggle';
import './aboutme.css';

type Copy = { id: string; en: string };
type Tech = { name: string; icon: string };
type Story = {
  index: string;
  year: string;
  name: string;
  role: Copy;
  description: Copy;
  proof: string;
  photo: string | null;
  logo?: string;
  caption?: Copy;
  milestones?: { year: string; role: Copy }[];
};

const copy = (id: string, en: string): Copy => ({ id, en });
const techGroups: { title: Copy; tools: Tech[] }[] = [
  {
    title: copy('Web & antarmuka', 'Web & interface'),
    tools: [
      { name:'React', icon:'react/react-original.svg' },
      { name:'Next.js', icon:'nextjs/nextjs-original.svg' },
      { name:'TypeScript', icon:'typescript/typescript-original.svg' },
      { name:'SvelteKit', icon:'svelte/svelte-original.svg' },
      { name:'JavaScript', icon:'javascript/javascript-original.svg' },
      { name:'HTML5', icon:'html5/html5-original.svg' },
      { name:'CSS3', icon:'css3/css3-original.svg' }
    ]
  },
  {
    title: copy('Data & aplikasi', 'Data & applications'),
    tools: [
      { name:'Python', icon:'python/python-original.svg' },
      { name:'Pandas', icon:'pandas/pandas-original.svg' },
      { name:'PHP', icon:'php/php-original.svg' },
      { name:'MySQL', icon:'mysql/mysql-original.svg' },
      { name:'PostgreSQL', icon:'postgresql/postgresql-original.svg' }
    ]
  },
  {
    title: copy('Alat kreatif & kerja', 'Creative & working tools'),
    tools: [
      { name:'Figma', icon:'figma/figma-original.svg' },
      { name:'Canva', icon:'canva/canva-original.svg' },
      { name:'Git', icon:'git/git-original.svg' },
      { name:'VS Code', icon:'vscode/vscode-original.svg' }
    ]
  }
];

const stories: Story[] = [
  {
    index:'01', year:'2023 — 2026', name:'Youth Ranger Indonesia',
    role:copy('3 tingkat kepengurusan — Regional, Distrik, dan Pusat', '3 organizational levels — Regional, District, and National'),
    description:copy(
      'Mulai aktif di Regional Sumatera Selatan pada 2023, lalu dipercaya memimpin HR Distrik Sumatera 2 pada 2025. Tahun 2026 aku melanjutkan kontribusi sebagai Graphic Designer divisi Operation YRI Pusat. Foto ini adalah dokumentasi saat menghadiri Sumsel Community Festival edisi kedua yang diselenggarakan Dispora Palembang.',
      'I joined the South Sumatra regional team in 2023, became HR lead for Sumatera 2 District in 2025, and continued as a Graphic Designer in the national Operations division in 2026. This photo documents my participation in the second Sumsel Community Festival organized by Dispora Palembang.'
    ),
    milestones:[
      {year:'2023',role:copy('Regional Sumatera Selatan — Graphic Design & pengembangan regional','South Sumatra Regional — Graphic Design & regional development')},
      {year:'2025',role:copy('Ketua HR Distrik Sumatera 2 — koordinasi 7 program HR','Head of HR, Sumatera 2 District — coordinated 7 HR programs')},
      {year:'2026',role:copy('YRI Pusat — Graphic Design, Divisi Operation','National YRI — Graphic Design, Operations Division')}
    ],
    proof:'https://www.instagram.com/youthranger.sumsel/',
    photo:'/aboutme/yri-festival.png',
    caption:copy('Sumsel Community Festival II · Dispora Palembang','Sumsel Community Festival II · Dispora Palembang'),
    logo:'/graphic-design/logos/yri-sumsel-original.png'
  },
  {
    index:'02', year:'2024 — 2025', name:'KMIPN VI & VII',
    role:copy('Finalis KMIPN VI di Jakarta · Proyek KMIPN VII di Padang','KMIPN VI finalist in Jakarta · KMIPN VII project in Padang'),
    description:copy(
      'Aku mewakili tim POLSRI dalam final KMIPN VI kategori e-Government melalui proyek Palembang Go Vacation di Politeknik Negeri Jakarta. Pada KMIPN VII di Padang, tim kami mengembangkan AsaKita, tetapi tidak mencapai babak final. Dua pengalaman yang tetap berarti buatku.',
      'I represented the POLSRI team in the KMIPN VI e-Government finals with Palembang Go Vacation at Jakarta State Polytechnic. For KMIPN VII in Padang, our team developed AsaKita but did not advance to the finals. Both were meaningful learning experiences.'
    ),
    proof:'https://github.com/Darren0099/KMIPN6-EGOVERNEMNT',
    photo:'/aboutme/kmipn-vi.jpg',
    caption:copy('Dokumentasi final KMIPN VI · Politeknik Negeri Jakarta','KMIPN VI final documentation · Jakarta State Polytechnic')
  },
  {
    index:'03', year:'2025', name:'PLN Icon Plus',
    role:copy('Magang Humas & Pengembangan Website · Sumbagsel Palembang','Public Relations & Web Development Intern · Sumbagsel Palembang'),
    description:copy(
      'Selama magang di PLN Icon Plus SBU Sumbagsel, Palembang, aku membantu kegiatan komunikasi perusahaan sekaligus mengembangkan sistem pengelolaan artikel berbasis PHP/MySQL. Foto ini diambil bersama rekan-rekan magang dalam kegiatan ICONNET.',
      'During my internship at PLN Icon Plus SBU Sumbagsel in Palembang, I supported corporate communications and developed a PHP/MySQL article management system. This photo was taken with fellow interns at an ICONNET event.'
    ),
    proof:'https://github.com/Darren0099/plniconnetbangkabelitung',
    photo:'/aboutme/pln-iconplus.jpg',
    caption:copy('Bersama rekan magang · ICONNET Sumbagsel','With fellow interns · ICONNET Sumbagsel')
  },
  {
    index:'04', year:'2025 — 2026', name:'Duta Potensi Pemuda Indonesia',
    role:copy('Graphic Designer · Youthopia Symposium, Jakarta','Graphic Designer · Youthopia Symposium, Jakarta'),
    description:copy(
      'Aku terlibat dalam desain komunikasi visual Youthopia Symposium bersama Duta Potensi Pemuda Indonesia. Foto di depan Mahkamah Konstitusi Jakarta ini menjadi bagian dari dokumentasi kegiatan dan kunjungan kelembagaan bersama tim.',
      'I worked on visual communications for Youthopia Symposium with Duta Potensi Pemuda Indonesia. This photo in front of the Constitutional Court in Jakarta documents an activity and institutional visit with the team.'
    ),
    proof:'https://www.instagram.com/p/DN-IlgoABI3/',
    photo:'/aboutme/dppi-youthopia.png',
    caption:copy('Kegiatan Youthopia Symposium · Jakarta','Youthopia Symposium activity · Jakarta')
  },
  {
    index:'05', year:'2024 — 2025', name:'GDSC POLSRI',
    role:copy('Frontend community · Study Jam speaker', 'Frontend community · Study Jam speaker'),
    description:copy(
      'Aktif belajar bersama komunitas developer dan berbagi materi Basic CSS Animation dalam sesi Study Jam pada Februari 2025.',
      'Learned alongside the developer community and delivered a Basic CSS Animation study jam in February 2025.'
    ),
    proof:'https://github.com/Darren0099',
    photo:null
  },
  {
    index:'06', year:'2025', name:'Pengabdian Masyarakat POLSRI',
    role:copy('Kontributor website & digitalisasi UMKM', 'Community web & SME digitalization contributor'),
    description:copy(
      'Berkolaborasi dalam pembuatan website untuk mendukung promosi dan pemesanan produk UMKM lokal, termasuk proyek Dapur Ummi Kyana.',
      'Collaborated on websites supporting local SMEs with online product promotion and ordering, including Dapur Ummi Kyana.'
    ),
    proof:'https://github.com/Darren0099/DapurUmmikyanaPalembang',
    photo:null
  }
];

const ease = [0.22, 1, 0.36, 1] as const;
const motionViewport = { once: true, amount: 0.13 };
const iconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

export default function AboutMePage() {
  const { lang } = useLanguage();
  const isId = lang === 'id';
  const reduced = useReducedMotion();
  const tx = (item: Copy) => item[lang];
  const appear = reduced ? {} : {
    initial:{ opacity:0, y:42 },
    whileInView:{ opacity:1, y:0 },
    viewport:motionViewport,
    transition:{ duration:0.68, ease }
  };
  const heroAppear = (delay:number) => reduced ? {} : {
    initial:{ opacity:0, y:44 },
    animate:{ opacity:1, y:0 },
    transition:{ duration:0.9, delay, ease }
  };

  return (
    <main className="am-page">
      <header className="am-nav">
        <Link href="/" className="am-logo" aria-label={isId?'Kembali ke beranda':'Back to home'}>R<span>.</span><small>ABOUT<br/>ME</small></Link>
        <nav aria-label={isId?'Navigasi About Me':'About Me navigation'}>
          <a href="#am-story">{isId?'Cerita':'Story'}</a>
          <a href="#am-school">{isId?'Kuliah':'Education'}</a>
          <a href="#am-tools">Tools</a>
          <a href="#am-journey">{isId?'Pengalaman':'Experience'}</a>
        </nav>
        <div className="am-nav-end">
          <LanguageToggle />
          <a className="am-nav-cta" href="#am-contact">{isId?'Kontak':'Contact'} <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="am-hero" id="am-home">
        <div className="am-hero-content">
          <motion.div {...heroAppear(0.08)} className="am-hero-topline">
            <span className="am-signal"><i/> {isId?'HALO, SENANG KENALAN!':'HEY, NICE TO MEET YOU!'}</span>
            <span>PALEMBANG · INDONESIA</span>
          </motion.div>
          <motion.div {...heroAppear(0.18)} className="am-hero-heading">
            <div className="am-handwritten">{isId?'Kenalan dulu, yuk!':'Let me introduce myself!'}</div>
            <h1>HEY!<br/>I&apos;M <em>RAFFLI</em><span className="am-exclamation">!</span></h1>
            <div className="am-hero-highlight">{isId?'BOLEH PANGGIL AKU DARREN JUGA.':'YOU CAN CALL ME DARREN, TOO.'}</div>
          </motion.div>
          <motion.p {...heroAppear(0.3)} className="am-hero-intro">
            {isId
              ? 'Al-Man Raffli Saputra. Aku suka merancang sesuatu yang bukan cuma terlihat bagus, tapi juga berfungsi: website, dashboard, ide visual, sampai program organisasi.'
              : "I'm Al-Man Raffli Saputra. I love making things that don't just look good, but work too: websites, dashboards, visual ideas, and community programs."}
          </motion.p>
          <motion.div {...heroAppear(0.42)} className="am-hero-actions">
            <a href="#am-story" className="am-pill-main">{isId?'Kenalan lebih jauh':'Get to know me'} <span>↘</span></a>
            <a href="https://rafflidev.my.id/cv" className="am-pill-outline" target="_blank" rel="noopener noreferrer">MY CV ↗</a>
          </motion.div>
        </div>
        <motion.div className="am-hero-photo" {...(reduced?{}:{
          initial:{opacity:0,scale:.84,rotate:8},
          animate:{opacity:1,scale:1,rotate:0},
          transition:{duration:1.1,delay:.22,ease}
        })}>
          <div className="am-photo-splash" aria-hidden="true"/>
          <div className="am-photo-frame">
            <img src="/img/im1.png" alt="Foto Al-Man Raffli Saputra dari portofolio" />
          </div>
          <span className="am-photo-label">CREATIVE<br/>× CODE</span>
          <span className="am-sticker am-sticker-one">100%<br/>CURIOUS</span>
          <span className="am-sticker am-sticker-two">✳</span>
          <svg className="am-doodle" viewBox="0 0 160 100" fill="none" aria-hidden="true"><path d="M7 44C50 5 81 22 105 49M105 49L89 34M105 49L87 60" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.div>
        <div className="am-hero-bottom">
          <span>AL-MAN RAFFLI SAPUTRA / PERSONAL NOTES</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <div className="am-running-line" aria-hidden="true">
        <div>BUILD THINGS WITH PURPOSE ✳ BE CURIOUS ✳ KEEP LEARNING ✳ DESIGN THE DETAILS ✳ BUILD THINGS WITH PURPOSE ✳ BE CURIOUS ✳ KEEP LEARNING ✳ DESIGN THE DETAILS ✳</div>
      </div>

      <section id="am-story" className="am-intro">
        <motion.div {...appear} className="am-section-kicker"><b>01</b> / THE PERSON BEHIND THE PIXELS</motion.div>
        <div className="am-intro-grid">
          <motion.h2 {...appear}>{isId?'Bukan cuma':'More than'}<br/><em>{isId?'ngoding.':'writing code.'}</em><span className="am-star" aria-hidden="true">✳</span></motion.h2>
          <motion.div {...appear} className="am-intro-copy">
            <span className="am-note-label">A LITTLE ABOUT ME ↘</span>
            <p>{isId
              ? 'Aku Raffli—atau Darren kalau lebih gampang diingat. Lulusan D3 Teknik Komputer yang senang mengeksplorasi dunia web, data, dan desain. Dari kelas, kepanitiaan, sampai pengalaman magang, aku belajar kalau teknologi akan lebih berarti ketika bisa membantu orang lain.'
              : "I'm Raffli—or Darren, if that's easier to remember. A Computer Engineering diploma graduate who loves exploring web, data, and design. From campus projects to internships and organizations, I learned that technology matters most when it helps people."}</p>
            <p>{isId
              ? 'Di luar layar laptop, aku cukup aktif di komunitas pemuda dan kegiatan kampus. Kadang memimpin tim, kadang mengerjakan visual, kadang menyusun website. Intinya, aku suka ikut membuat sesuatu benar-benar terjadi.'
              : 'Away from my laptop, I stay involved in youth communities and campus activities—sometimes leading a team, sometimes creating visuals, sometimes shipping a website. I enjoy helping ideas become real.'}</p>
            <a href="#am-journey" className="am-text-link">{isId?'Lihat cerita kegiatanku':'See what I have been involved in'} <span>↗</span></a>
          </motion.div>
        </div>
        <div className="am-facts">
          {[
            ['3.66','GPA / 4.00'],
            ['2026',isId?'LULUS D3':'DIPLOMA GRADUATE'],
            ['07',isId?'PROGRAM HR DIKOORDINASIKAN':'HR PROGRAMS COORDINATED'],
            ['02',isId?'PROYEK KMIPN VI & VII':'KMIPN VI & VII PROJECTS']
          ].map(([number,label],i)=>(
            <motion.div {...appear} transition={reduced?undefined:{duration:.65,delay:i*.07,ease}} className="am-fact" key={label}>
              <strong>{number}</strong><span>{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="am-education" id="am-school">
        <motion.div {...appear} className="am-section-kicker"><b>02</b> / WHERE IT STARTED</motion.div>
        <div className="am-school-layout">
          <motion.div {...appear} className="am-school-title">
            <span className="am-school-side-note">{isId?'TEMPAT BELAJAR, BEREKSPERIMEN, DAN BERTUMBUH':'A PLACE TO LEARN, EXPERIMENT AND GROW'}</span>
            <h2>{isId?'DARI':'FROM'}<br/><em>KAMPUS</em><br/>{isId?'KE KARYA.':'TO CREATING.'}</h2>
          </motion.div>
          <motion.div {...appear} className="am-school-card">
            <div className="am-school-card-head">
              <img src="/aboutme/polsri-logo.png" alt="Logo Politeknik Negeri Sriwijaya" loading="lazy" />
              <span>POLITEKNIK NEGERI SRIWIJAYA<br/><small>PALEMBANG, INDONESIA</small></span>
            </div>
            <div className="am-school-card-body">
              <span>{isId?'PROGRAM STUDI':'MAJOR'}</span>
              <h3>{isId?'D3 Teknik Komputer':'Diploma III Computer Engineering'}</h3>
              <div className="am-school-bottom"><div><span>{isId?'PERIODE':'YEARS'}</span><strong>2023—2026</strong></div><div><span>GPA / IPK</span><strong>3.66<small> / 4.00</small></strong></div></div>
            </div>
            <strong className="am-school-decoration">POL<br/>SRI<span>✳</span></strong>
          </motion.div>
        </div>
      </section>

      <section className="am-toolkit" id="am-tools">
        <motion.div {...appear} className="am-section-kicker"><b>03</b> / THINGS I WORK WITH</motion.div>
        <motion.div {...appear} className="am-toolkit-heading">
          <h2>MY <em>TOOLBOX.</em></h2>
          <p>{isId?'Beda proyek, beda alat. Ini beberapa yang sering aku pakai untuk membangun, menganalisis, dan mendesain.':'Different projects call for different tools. Here are a few I use to build, analyze, and design.'}</p>
        </motion.div>
        <div className="am-tool-groups">
          {techGroups.map((group,i)=>(
            <motion.div {...appear} transition={reduced?undefined:{duration:.65,delay:i*.07,ease}} className="am-tool-group" key={group.title.en}>
              <div className="am-tool-group-head"><span>0{i+1} / {tx(group.title)}</span><span>↗</span></div>
              <div className="am-tool-grid">
                {group.tools.map(tool=>(
                  <div className="am-tool" key={tool.name} title={tool.name}>
                    <div className="am-tool-icon"><img loading="lazy" src={iconBase+tool.icon} alt="" aria-hidden="true"/></div>
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="am-journey" id="am-journey">
        <motion.div {...appear} className="am-section-kicker"><b>04</b> / LIFE OUTSIDE THE CLASSROOM</motion.div>
        <motion.div {...appear} className="am-journey-heading">
          <h2>{isId?'AKU SUKA':'ALWAYS'}<br/><em>{isId?'IKUT GERAK.':'IN MOTION.'}</em></h2>
          <p>{isId
            ? 'Buatku, pengalaman bukan cuma daftar jabatan. Ada orang, kerja tim, eksperimen, dan cerita di balik setiap kegiatan.'
            : "For me, experience isn't a list of job titles. It's people, teamwork, experiments, and stories behind every project."}</p>
        </motion.div>
        <div className="am-story-grid">
          {stories.map((story,i)=>(
            <motion.article className="am-story-card" key={story.index}
              {...appear} transition={reduced?undefined:{duration:.72,delay:(i%2)*.08,ease}}>
              <div className={'am-story-media am-story-media-'+(i%4+1)}>
                {story.photo ? (
                  <figure className="am-activity-photo">
                    <img src={story.photo} loading="lazy" alt={story.name+' — '+(story.caption?tx(story.caption):'dokumentasi kegiatan')} />
                    {story.caption&&<figcaption className="am-activity-caption">{tx(story.caption)}</figcaption>}
                  </figure>
                ) : (
                  <div className="am-photo-placeholder">
                    <span className="am-photo-placeholder-top">{story.index} / DOCUMENTATION</span>
                    <strong aria-hidden="true">{story.index}</strong>
                    <div className="am-photo-pending"><span aria-hidden="true">▣</span>{isId?'Foto kegiatan menyusul':'Activity photo coming soon'}</div>
                  </div>
                )}
                {story.logo&&<img className="am-story-logo" src={story.logo} alt="Logo organisasi" loading="lazy"/>}
              </div>
              <div className="am-story-info">
                <div className="am-story-meta"><span>{story.year}</span><span>{story.index} / 06</span></div>
                <h3>{story.name}</h3>
                <h4>{tx(story.role)}</h4>
                <p>{tx(story.description)}</p>
                {story.milestones&&<div className="am-yri-milestones" aria-label={isId?'Perjalanan 3 tingkatan YRI':'Three stages at YRI'}>
                  {story.milestones.map((level)=><div className="am-yri-milestone" key={level.year}>
                    <strong>{level.year}</strong><span>{tx(level.role)}</span>
                  </div>)}
                </div>}
                <a href={story.proof} target="_blank" rel="noopener noreferrer">{isId?'Lihat kegiatan / proyek':'View activity / project'} <span aria-hidden="true">↗</span></a>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div {...appear} className="am-gallery-note"><span>✳</span><p>{isId
          ? 'Foto dokumentasi YRI, KMIPN VI, PLN Icon Plus, dan Youthopia sudah ditambahkan. Foto GDSC dan pengabdian masyarakat akan diisi saat dokumentasinya tersedia.'
          : 'Real photos now document YRI, KMIPN VI, PLN Icon Plus, and Youthopia. GDSC and community project cards will be updated when documentation is available.'}</p></motion.div>
      </section>

      <section className="am-outro" id="am-contact">
        <motion.div {...appear} className="am-outro-top"><span>05 / LET&apos;S CONNECT</span><span>RAFFLI × NEXT IDEA</span></motion.div>
        <motion.h2 {...appear}>{isId?'AYO BIKIN':'LET’S MAKE'}<br/><em>{isId?'SESUATU':'SOMETHING'}</em><br/>{isId?'BERARTI!':'HAPPEN!'}</motion.h2>
        <motion.div {...appear} className="am-outro-actions">
          <a className="am-outro-email" href="mailto:almanraffli1@gmail.com">{isId?'Kirim email':'Email me'} <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/in/al-man-raffli" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
          <a href="https://github.com/Darren0099" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
          <Link href="/" className="am-outro-back">{isId?'Kembali ke portofolio':'Back to portfolio'} ↗</Link>
        </motion.div>
        <div className="am-outro-footer"><span>AL-MAN RAFFLI SAPUTRA © 2026</span><span>MADE WITH CURIOSITY ✳</span></div>
        <span className="am-outro-sticker" aria-hidden="true">↗</span>
      </section>
    </main>
  );
}
