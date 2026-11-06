'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageToggle from '@/components/LanguageToggle';
import './graphic-design.css';

type Filter = 'all' | 'identity' | 'event' | 'social';
type Campaign = {
  id: string;
  no: string;
  organization: string;
  title: string;
  category: Exclude<Filter, 'all'>;
  type: string;
  summaryId: string;
  summaryEn: string;
  link: string;
  sign: string;
};
const campaigns: Campaign[] = [
  {
    id: 'regional', no: '01', organization: 'Youth Ranger Indonesia · Sumatera Selatan',
    title: 'Youth Ranger Sumsel', category: 'identity', type: 'COMMUNITY / BRAND IDENTITY',
    summaryId: 'Identitas visual, desain feed, dan materi komunikasi untuk kegiatan regional Sumatera Selatan.',
    summaryEn: 'Visual identity, social posts and creative communication for the South Sumatra regional community.',
    link: 'https://www.instagram.com/youthranger.sumsel/', sign: 'Y'
  },
  {
    id: 'summit', no: '02', organization: 'Youth Ranger Indonesia · National Event',
    title: 'Summit of Stars I & II', category: 'event', type: 'NATIONAL EVENT / DESIGN LEAD',
    summaryId: 'Memimpin tim Graphic Design untuk materi visual dua edisi pertama Summit of Stars. Edisi ketiga (Impactify) tidak termasuk karya ini.',
    summaryEn: 'Led the graphic design team for the first two editions. The third edition (Impactify) is not included in this portfolio.',
    link: 'https://www.instagram.com/p/DQwJAO7CVAV/', sign: 'S✳S'
  },
  {
    id: 'fest', no: '03', organization: 'Youth Ranger Indonesia · Sumatera Selatan',
    title: 'YRI Fest × Expo', category: 'event', type: 'FIRST REGIONAL FLAGSHIP EVENT',
    summaryId: 'Kebutuhan visual untuk event utama pertama YRI Sumsel, YRI Fest x Expo.',
    summaryEn: 'Visual work for YRI Sumsel’s first flagship event, YRI Fest x Expo.',
    link: 'https://www.instagram.com/p/C9qxES0SP80/', sign: 'F×E'
  },
  {
    id: 'kingdom', no: '04', organization: 'International Kingdom Indonesia',
    title: 'International Kingdom', category: 'social', type: 'SOCIAL MEDIA / 3 FEED DESIGNS',
    summaryId: 'Tiga desain feed Instagram untuk International Kingdom Indonesia. Satu unggahan referensi tersedia di arsip.',
    summaryEn: 'Three Instagram feed designs for International Kingdom Indonesia. One referenced post is available in the archive.',
    link: 'https://www.instagram.com/p/DeHJDk_FKkt/', sign: 'IKI'
  },
  {
    id: 'youthopia', no: '05', organization: 'Duta Potensi Pemuda Indonesia',
    title: 'Youthopia Symposium', category: 'event', type: 'FLAGSHIP EVENT / VISUAL DESIGN',
    summaryId: 'Materi desain untuk acara utama Duta Potensi Pemuda Indonesia, Youthopia Symposium.',
    summaryEn: 'Visual design work for Duta Potensi Pemuda Indonesia’s flagship event, Youthopia Symposium.',
    link: 'https://www.instagram.com/p/DPvGQa4E2Pq/', sign: 'Y✳'
  }
];
type Post = { code: string; label: string; organizer: string; group: string; link: string };
const posts: Post[] = [
  { code: 'DQwJAO7CVAV', label: 'Summit of Stars', organizer: 'Youth Ranger Indonesia', group: 'SUMMIT I & II · REFERENCE', link: 'https://www.instagram.com/p/DQwJAO7CVAV/' },
  { code: 'C9qxES0SP80', label: 'YRI Fest × Expo', organizer: 'YRI Regional Sumsel', group: 'FLAGSHIP EVENT', link: 'https://www.instagram.com/p/C9qxES0SP80/' },
  { code: 'DeHJDk_FKkt', label: 'International Kingdom Indonesia', organizer: 'International Kingdom Indonesia', group: 'FEED 01 / 03', link: 'https://www.instagram.com/p/DeHJDk_FKkt/' },
  { code: 'DPvGQa4E2Pq', label: 'Youthopia Symposium', organizer: 'Duta Potensi Pemuda Indonesia', group: 'NATIONAL EVENT', link: 'https://www.instagram.com/p/DPvGQa4E2Pq/' },
  { code: 'DfHwQoeogar', label: 'Additional Selected Post', organizer: 'Previous portfolio reference', group: 'ORIGINAL PUBLICATION', link: 'https://www.instagram.com/p/DfHwQoeogar/' },
];
const ease = [0.22, 1, 0.36, 1] as const;
const reveal = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } };
const scrollViewport = { once: true, amount: 0.1 as const };

export default function GraphicDesignPage() {
  const { lang } = useLanguage();
  const id = lang === 'id';
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');
  const [embedEnabled, setEmbedEnabled] = useState<Record<string, boolean>>(() => Object.fromEntries(posts.map((post) => [post.code, true])));
  const shown = filter === 'all' ? campaigns : campaigns.filter((item) => item.category === filter);
  const filters: Array<{ key: Filter; labelId: string; labelEn: string }> = [
    { key: 'all', labelId: 'Semua karya', labelEn: 'All work' },
    { key: 'identity', labelId: 'Identitas', labelEn: 'Identity' },
    { key: 'event', labelId: 'Event', labelEn: 'Events' },
    { key: 'social', labelId: 'Media sosial', labelEn: 'Social media' },
  ];
  const motionProps = reduced ? {} : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: scrollViewport, variants: reveal, transition: { duration: 0.75, ease } };
  return (
    <main className="graphic-archive">
      <header className="gd-navigation">
        <Link href="/" className="gd-brand" aria-label={id ? 'Kembali ke beranda' : 'Back home'}>R<span>.</span><small>DESIGN<br/>ARCHIVE</small></Link>
        <nav aria-label={id ? 'Navigasi halaman' : 'Page navigation'}>
          <a href="#gd-work">{id ? 'Karya' : 'Work'}</a>
          <a href="#gd-summit">Summit of Stars</a>
          <a href="#gd-posts">Instagram</a>
        </nav>
        <div className="gd-navigation-right"><LanguageToggle /><Link href="/projects">{id ? 'Proyek' : 'Projects'} ↗</Link></div>
      </header>

      <section className="gd-cover" aria-labelledby="gd-cover-title">
        <motion.div className="gd-cover-content" initial={reduced ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease }}>
          <span className="gd-eyebrow"><i/> GRAPHIC DESIGN / MULTI-BRAND ARCHIVE</span>
          <h1 id="gd-cover-title">VISUALS<br/><em>THAT</em><br/>MOVE<span>.</span></h1>
          <p>{id ? 'Satu arsip untuk identitas organisasi, desain feed, dan kampanye event nasional—dari Youth Ranger hingga International Kingdom dan Youthopia.' : 'One curated archive of community identity, feed design, and event campaigns—across Youth Ranger, International Kingdom and Youthopia.'}</p>
          <a className="gd-button-round" href="#gd-work">{id ? 'Lihat koleksi' : 'Explore collection'} <strong aria-hidden="true">↘</strong></a>
        </motion.div>
        <motion.div className="gd-cover-collage" initial={reduced ? false : { opacity: 0, rotate: 6, scale: 0.9 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 1.1, delay: 0.15, ease }} aria-hidden="true">
          <div className="gd-cover-poster gd-cover-poster-one"><span>YRI / REGIONAL</span><b>BE<br/>BOLD.</b><i/></div>
          <div className="gd-cover-poster gd-cover-poster-two"><span>INTERNATIONAL KINGDOM</span><b>IKI</b><small>FEED DESIGN / 003</small></div>
          <div className="gd-cover-poster gd-cover-poster-three"><span>SUMMIT OF STARS</span><div className="gd-modular-art"><i/><i/><i/><i/></div><b>CREATE<br/>IMPACT.</b></div>
          <strong className="gd-cover-spark">✳</strong>
        </motion.div>
        <div className="gd-cover-bottom"><span>AL-MAN RAFFLI SAPUTRA</span><span>3 ORGANIZATIONS / 5 SELECTED WORKSTREAMS</span><span>SCROLL DOWN ↓</span></div>
      </section>

      <section className="gd-manifesto">
        <motion.div {...motionProps}>
          <span className="gd-section-number">01 / THE CREATIVE PRACTICE</span>
          <div className="gd-manifesto-columns">
            <h2>{id ? 'Berbeda brand, ' : 'Different brands, '}<em>{id ? 'satu visi kreatif.' : 'one creative vision.'}</em></h2>
            <p>{id ? 'Setiap organisasi memiliki karakter sendiri. Desain yang baik membuat kampanye, acara, dan identitas mereka dikenali tanpa kehilangan kepribadiannya.' : 'Every organization has its own character. Good design makes its campaigns, events and identity recognizable without losing that personality.'}</p>
          </div>
        </motion.div>
        <div className="gd-manifesto-tags">
          {[
            ['03', id ? 'ORGANISASI' : 'ORGANIZATIONS', 'YRI · International Kingdom · Duta Potensi'],
            ['05', id ? 'KOLEKSI' : 'WORKSTREAMS', 'Identity · Events · Social'],
            ['02', 'SUMMIT OF STARS', id ? 'Edisi yang aku kerjakan' : 'Editions I contributed to'],
          ].map(([number, title, detail], i) => (
            <motion.div key={title} {...motionProps} transition={{ duration: .7, ease, delay: reduced ? 0 : i * .12 }}>
              <span>{number}</span><strong>{title}</strong><small>{detail}</small>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="gd-works" id="gd-work" aria-labelledby="gd-work-title">
        <motion.header className="gd-section-header" {...motionProps}>
          <div><span className="gd-section-number">02 / GRAPHIC DESIGN COLLECTION</span><h2 id="gd-work-title">Selected <em>work.</em></h2></div>
          <p>{id ? 'Lima kelompok karya, tiap penerbit dengan karakter visual sendiri. Klik kartu untuk membuka referensi aslinya.' : 'Five workstreams, each with a distinct visual identity. Open a card to view its source.'}</p>
        </motion.header>
        <div className="gd-filters" role="group" aria-label={id ? 'Filter karya' : 'Filter work'}>
          {filters.map((item) => (
            <button key={item.key} type="button" className={filter === item.key ? 'active' : ''} onClick={() => setFilter(item.key)} aria-pressed={filter === item.key}>
              {id ? item.labelId : item.labelEn}<sup>{item.key === 'all' ? campaigns.length : campaigns.filter((work) => work.category === item.key).length}</sup>
            </button>
          ))}
        </div>
        <motion.div className="gd-work-grid" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((work) => (
              <motion.a
                key={work.id}
                layout
                initial={reduced ? false : { opacity: 0, y: 28, scale: .97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, y: 15, scale: .97 }}
                transition={{ duration: .45, ease }}
                href={work.link} target="_blank" rel="noopener noreferrer"
                className={'gd-work-card gd-work-card-'+work.id}
                aria-label={work.title + ' / Instagram'}
              >
                <div className="gd-work-art" aria-hidden="true">
                  <span className="gd-work-gridlines"/><span className="gd-work-circle"/><span className="gd-work-square"/><span className="gd-work-ring"/>
                  <strong>{work.sign}</strong><small>{work.type}</small>
                </div>
                <div className="gd-work-caption">
                  <div><span>{work.no} / {String(campaigns.length).padStart(2,'0')} · {work.organization}</span><h3>{work.title}</h3><p>{id ? work.summaryId : work.summaryEn}</p></div>
                  <b aria-hidden="true">↗</b>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="gd-artwork-disclaimer">{id ? 'Artwork geometris adalah interpretasi visual baru untuk navigasi, bukan reproduksi desain Instagram. Karya asli ada pada unggahan yang ditautkan dan galeri di bawah.' : 'Geometric artworks are newly created navigation visuals, not reproductions of Instagram designs. Original posts are linked and embedded below.'}</p>
      </section>

      <section className="gd-summit" id="gd-summit" aria-labelledby="gd-summit-title">
        <motion.div {...motionProps}>
          <span className="gd-section-number">03 / EVENT CAMPAIGN SPOTLIGHT</span>
          <div className="gd-summit-heading">
            <h2 id="gd-summit-title">SUMMIT<br/>OF <em>STARS</em><sup>✳</sup></h2>
            <div><span>GRAPHIC DESIGN TEAM LEAD</span><p>{id ? 'Saya memimpin tim Graphic Design untuk dua edisi pertama Summit of Stars. Edisi ketiga, Impactify, bukan hasil desain saya dan tidak dimasukkan ke koleksi.' : 'I led the Graphic Design team for the first two Summit of Stars editions. The third edition, Impactify, was not my design work and is excluded.'}</p></div>
          </div>
        </motion.div>
        <div className="gd-summit-pair">
          {[1,2].map((edition) => (
            <motion.a key={edition} href={edition===1 ? 'https://www.instagram.com/impactify.yrisumsel/' : 'https://www.instagram.com/p/DQwJAO7CVAV/'} target="_blank" rel="noopener noreferrer"
              className={'gd-summit-edition '+(edition===1?'gd-summit-first':'gd-summit-second')}
              {...motionProps} transition={{ duration: .8, ease, delay: reduced ? 0 : (edition-1)*.15 }}>
              <span>YRI / SUMMIT OF STARS / ED. {String(edition).padStart(2,'0')}</span><i aria-hidden="true">{edition===1?'✳':'◉'}</i>
              <strong>{String(edition).padStart(2,'0')}<br/>S✳S</strong>
              <footer><span>{id ? 'Kampanye event nasional' : 'National event campaign'}</span><span>ORIGINAL SOURCE ↗</span></footer>
            </motion.a>
          ))}
        </div>
        <div className="gd-summit-end"><p>{id ? 'Referensi unggahan Summit of Stars tersedia di galeri Instagram. Tampilan kedua kartu ini merupakan artwork editorial baru.' : 'See the original Summit of Stars reference in the Instagram gallery. The cards here are original editorial artworks.'}</p><a href="https://www.instagram.com/p/DQwJAO7CVAV/" target="_blank" rel="noopener noreferrer">VIEW SUMMIT POST ↗</a></div>
      </section>

      <section className="gd-special" aria-labelledby="gd-special-title">
        <motion.div className="gd-section-header" {...motionProps}>
          <div><span className="gd-section-number">04 / BEYOND THE REGIONAL FEED</span><h2 id="gd-special-title">Beyond <em>YRI.</em></h2></div>
          <p>{id ? 'Dari tiga feed untuk International Kingdom sampai visual acara utama Youthopia Symposium.' : 'From three International Kingdom posts to visual work for Youthopia Symposium.'}</p>
        </motion.div>
        <div className="gd-special-grid">
          <motion.a {...motionProps} href="https://www.instagram.com/p/DeHJDk_FKkt/" target="_blank" rel="noopener noreferrer" className="gd-special-card gd-special-kingdom">
            <div className="gd-special-orbit" aria-hidden="true"><span>IK</span></div><div className="gd-special-top"><span>INTERNATIONAL KINGDOM INDONESIA</span><span>03 FEED DESIGNS</span></div>
            <div className="gd-special-bottom"><strong>INTERNATIONAL<br/>KINGDOM.</strong><span>SEE ORIGINAL POST ↗</span></div>
          </motion.a>
          <motion.a {...motionProps} href="https://www.instagram.com/p/DPvGQa4E2Pq/" target="_blank" rel="noopener noreferrer" className="gd-special-card gd-special-youthopia">
            <div className="gd-special-orbit" aria-hidden="true"><span>Y✳</span></div><div className="gd-special-top"><span>DUTA POTENSI PEMUDA INDONESIA</span><span>FLAGSHIP EVENT</span></div>
            <div className="gd-special-bottom"><strong>YOUTHOPIA<br/>SYMPOSIUM.</strong><span>SEE ORIGINAL POST ↗</span></div>
          </motion.a>
        </div>
      </section>

      <section className="gd-posts" id="gd-posts" aria-labelledby="gd-post-title">
        <motion.header className="gd-section-header" {...motionProps}>
          <div><span className="gd-section-number">05 / INSTAGRAM ORIGINALS</span><h2 id="gd-post-title">The real <em>posts.</em></h2></div>
          <p>{id ? 'Galeri postingan Instagram yang kamu kirim, beserta nama organisasi dan acara. Klik “Tampilkan unggahan” untuk memuat pratinjau asli.' : 'The original Instagram references you supplied, labeled by organization and event. Open previews to load the posts.'}</p>
        </motion.header>
        <div className="gd-post-grid">
          {posts.map((post,index) => (
            <motion.article key={post.code} className="gd-post-card" {...motionProps} transition={{ duration: .65, ease, delay: reduced ? 0 : (index % 2) * .12 }}>
              <div className="gd-post-label"><span>{post.organizer}</span><span>REF / {String(index+1).padStart(2,'0')}</span></div>
              <div className="gd-post-info"><span>{post.group}</span><h3>{post.label}</h3></div>
              {embedEnabled[post.code] ? (
                <iframe title={'Instagram: '+post.label} src={'https://www.instagram.com/p/'+post.code+'/embed/captioned/'} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/>
              ) : (
                <div className={'gd-post-art gd-post-art-'+String(index+1).padStart(2,'0')} aria-label={id ? 'Pratinjau belum dimuat' : 'Preview not loaded'}>
                  <i aria-hidden="true"/><strong aria-hidden="true">{String(index+1).padStart(2,'0')}</strong><span>INSTAGRAM / ORIGINAL POST</span>
                </div>
              )}
              <div className="gd-post-actions">
                <button type="button" aria-pressed={!!embedEnabled[post.code]} onClick={() => setEmbedEnabled((previous) => ({...previous,[post.code]:!previous[post.code]}))}>
                  {embedEnabled[post.code] ? (id?'Tutup pratinjau':'Hide preview') : (id?'Tampilkan unggahan':'Load original post')}
                </button>
                <a href={post.link} target="_blank" rel="noopener noreferrer">{id?'Buka Instagram':'Open Instagram'} ↗</a>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="gd-post-note">{id ? 'Instagram membatasi embed pada sebagian akun atau browser. Semua tautan asli tetap tersedia; hanya satu dari tiga feed International Kingdom yang sudah diberikan sebagai referensi.' : 'Instagram may restrict embeds in some browsers. All original links remain available; one of the three International Kingdom posts was supplied as a reference.'}</p>
      </section>

      <footer className="gd-finale">
        <strong className="gd-finale-star" aria-hidden="true">✳</strong>
        <motion.div {...motionProps}>
          <span className="gd-section-number">06 / NEXT CREATIVE CHAPTER</span>
          <h2>MORE THAN<br/><em>JUST A POST.</em></h2>
        </motion.div>
        <div className="gd-social-links">
          <a href="https://www.instagram.com/youthranger.sumsel/" target="_blank" rel="noopener noreferrer">@YOUTHRANGER.SUMSEL ↗</a>
          <a href="https://www.instagram.com/impactify.yrisumsel/" target="_blank" rel="noopener noreferrer">@IMPACTIFY.YRISUMSEL ↗</a>
          <a href="https://www.instagram.com/p/DeHJDk_FKkt/" target="_blank" rel="noopener noreferrer">INTERNATIONAL KINGDOM ↗</a>
          <a href="https://www.instagram.com/p/DPvGQa4E2Pq/" target="_blank" rel="noopener noreferrer">YOUTHOPIA ↗</a>
        </div>
        <div className="gd-footer-line"><Link href="/#experience">← {id?'Pengalaman':'Experience'}</Link><span>RAFFLI © 2026 / DESIGN ARCHIVE</span><Link href="/projects">{id?'Semua proyek':'All projects'} ↗</Link></div>
      </footer>
    </main>
  );
}
