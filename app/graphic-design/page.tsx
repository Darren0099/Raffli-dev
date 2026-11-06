'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageToggle from '@/components/LanguageToggle';
import './graphic-design.css';

type WorkFilter = 'all' | 'social' | 'event' | 'post';
const works: Array<{ id: string; category: Exclude<WorkFilter,'all'>; index: string; title: string; subtitle: string; link: string; symbol: string }> = [
  { id: 'regional', category: 'social', index: '01', title: 'Youth Ranger Sumsel', subtitle: 'Social media & visual identity', link: 'https://www.instagram.com/youthranger.sumsel/', symbol: 'Y' },
  { id: 'impactify', category: 'event', index: '02', title: 'Impactify / Summit of Stars', subtitle: 'National event campaigns', link: 'https://www.instagram.com/impactify.yrisumsel/', symbol: 'S✳S' },
  { id: 'post-a', category: 'post', index: '03', title: 'Selected Instagram Post 01', subtitle: 'Original publication', link: 'https://www.instagram.com/p/DfHwQoeogar/', symbol: '01' },
  { id: 'post-b', category: 'post', index: '04', title: 'Selected Instagram Post 02', subtitle: 'Original publication', link: 'https://www.instagram.com/p/DPvGQa4E2Pq/', symbol: '02' },
];
const posts = [
  { code: 'DfHwQoeogar', index: '01', url: 'https://www.instagram.com/p/DfHwQoeogar/' },
  { code: 'DPvGQa4E2Pq', index: '02', url: 'https://www.instagram.com/p/DPvGQa4E2Pq/' },
];

export default function GraphicDesignPage() {
  const { lang } = useLanguage();
  const id = lang === 'id';
  const [filter, setFilter] = useState<WorkFilter>('all');
  const [embed, setEmbed] = useState<Record<string, boolean>>({});
  const visible = filter === 'all' ? works : works.filter((item) => item.category === filter);
  const filters: Array<{ key: WorkFilter; id: string; en: string }> = [
    { key: 'all', id: 'Semua', en: 'All' },
    { key: 'social', id: 'Media Sosial', en: 'Social Media' },
    { key: 'event', id: 'Event', en: 'Events' },
    { key: 'post', id: 'Postingan', en: 'Posts' },
  ];
  return (
    <main className="graphic-archive">
      <header className="gd-navigation">
        <Link href="/" className="gd-brand" aria-label={id ? 'Kembali ke beranda' : 'Back to home'}>R<span>.</span><small>GRAPHIC<br/>ARCHIVE</small></Link>
        <nav aria-label={id ? 'Navigasi karya' : 'Work navigation'}>
          <a href="#gd-work">{id ? 'Karya' : 'Work'}</a>
          <a href="#gd-summit">Summit of Stars</a>
          <a href="#gd-posts">Instagram</a>
        </nav>
        <div className="gd-navigation-right"><LanguageToggle /><Link href="/#experience">{id ? 'Portofolio' : 'Portfolio'} ↗</Link></div>
      </header>

      <section className="gd-cover" aria-labelledby="gd-cover-title">
        <div className="gd-cover-content">
          <span className="gd-eyebrow"><i/> RAFFLI / CREATIVE PRACTICE</span>
          <h1 id="gd-cover-title">VISUALS<br/><em>THAT</em><br/>MOVE<span>.</span></h1>
          <p>{id ? 'Sebuah arsip desain: identitas komunitas, komunikasi media sosial, dan kampanye event nasional yang pernah saya kerjakan.' : 'A design archive spanning community identity, social media communication, and national event campaigns.'}</p>
          <a className="gd-button-round" href="#gd-work">{id ? 'Jelajahi karya' : 'Explore the work'} <strong aria-hidden="true">↘</strong></a>
        </div>
        <div className="gd-cover-collage" aria-hidden="true">
          <div className="gd-cover-poster gd-cover-poster-one"><span>RFL / 001</span><b>BE<br/>BOLD.</b><i/></div>
          <div className="gd-cover-poster gd-cover-poster-two"><span>YRI / NATIONAL</span><b>S✳S</b><small>SUMMIT OF STARS</small></div>
          <div className="gd-cover-poster gd-cover-poster-three"><span>VISUAL EXPLORATIONS</span><div className="gd-modular-art"><i/><i/><i/><i/></div><b>CREATE<br/>IMPACT.</b></div>
          <strong className="gd-cover-spark">✳</strong>
        </div>
        <div className="gd-cover-bottom"><span>AL-MAN RAFFLI SAPUTRA</span><span>GRAPHIC DESIGN / ART DIRECTION / CREATIVE COLLABORATION</span><span>SCROLL DOWN ↓</span></div>
      </section>

      <section className="gd-manifesto">
        <span className="gd-section-number">01 / THE APPROACH</span>
        <div className="gd-manifesto-columns">
          <h2>{id ? 'Desain bukan sekadar ' : 'Design is more than '}<em>{id ? 'dekorasi.' : 'decoration.'}</em></h2>
          <p>{id ? 'Bagaimana sebuah warna, susunan huruf, dan ritme komposisi bisa membuat orang mengenali suatu komunitas atau merasakan energi sebuah acara? Itulah yang ingin saya bangun lewat karya visual.' : 'Color, typography and composition can make a community recognizable and give an event its own energy. That is the purpose behind my visual work.'}</p>
        </div>
        <div className="gd-manifesto-tags">
          <div><span>01</span><strong>IDENTITY</strong><small>{id ? 'Visual system & branding' : 'Visual systems & branding'}</small></div>
          <div><span>02</span><strong>CAMPAIGNS</strong><small>Social / Digital / Editorial</small></div>
          <div><span>03</span><strong>EVENTS</strong><small>Creative direction & teams</small></div>
        </div>
      </section>

      <section className="gd-works" id="gd-work" aria-labelledby="gd-work-title">
        <header className="gd-section-header">
          <div><span className="gd-section-number">02 / SELECTED COLLECTION</span><h2 id="gd-work-title">Selected <em>work.</em></h2></div>
          <p>{id ? 'Kanal dan unggahan asli di balik karya. Pilih kategori untuk menjelajahi arsip.' : 'The channels and original posts behind the work. Explore the archive by category.'}</p>
        </header>
        <div className="gd-filters" role="group" aria-label={id ? 'Filter karya' : 'Filter work'}>
          {filters.map((item) => (
            <button key={item.key} type="button" className={filter === item.key ? 'active' : ''} onClick={() => setFilter(item.key)} aria-pressed={filter === item.key}>
              {id ? item.id : item.en}<sup>{item.key === 'all' ? works.length : works.filter((work) => work.category === item.key).length}</sup>
            </button>
          ))}
        </div>
        <div className="gd-work-grid">
          {visible.map((work) => (
            <a key={work.id} href={work.link} target="_blank" rel="noopener noreferrer" className={'gd-work-card gd-work-card-'+work.id} aria-label={work.title + ' / Instagram'}>
              <div className="gd-work-art" aria-hidden="true">
                <span className="gd-work-gridlines"/><span className="gd-work-circle"/><span className="gd-work-square"/><span className="gd-work-ring"/><strong>{work.symbol}</strong><small>RFL / {work.index} — VISUAL ARCHIVE</small>
              </div>
              <div className="gd-work-caption"><div><span>{work.index} / 04 · {work.category.toUpperCase()}</span><h3>{work.title}</h3><p>{work.subtitle}</p></div><b aria-hidden="true">↗</b></div>
            </a>
          ))}
        </div>
        <p className="gd-artwork-disclaimer">{id ? 'Artwork geometris pada kartu merupakan desain navigasi baru, bukan tangkapan layar postingan asli. Klik kartu untuk melihat sumbernya di Instagram.' : 'The geometric card art is new navigational artwork, not screenshots of original posts. Open each card for its Instagram source.'}</p>
      </section>

      <section className="gd-summit" id="gd-summit" aria-labelledby="gd-summit-title">
        <span className="gd-section-number">03 / NATIONAL EVENT CAMPAIGNS</span>
        <div className="gd-summit-heading"><h2 id="gd-summit-title">SUMMIT<br/>OF <em>STARS</em><sup>✳</sup></h2><div><span>GRAPHIC DESIGN TEAM LEAD</span><p>{id ? 'Saya memimpin pekerjaan tim Graphic Design untuk penyelenggaraan pertama dan kedua Summit of Stars, dua edisi event nasional Youth Ranger Indonesia.' : 'I led the Graphic Design team’s work for the first and second editions of Summit of Stars, Youth Ranger Indonesia’s national events.'}</p></div></div>
        <div className="gd-summit-pair">
          <a href="https://www.instagram.com/impactify.yrisumsel/" target="_blank" rel="noopener noreferrer" className="gd-summit-edition gd-summit-first"><span>YOUTH RANGER INDONESIA / ED. 01</span><i aria-hidden="true">✳</i><strong>01<br/>S✳S</strong><footer><span>{id ? 'Edisi nasional pertama' : 'First national edition'}</span><span>VIEW SOURCE ↗</span></footer></a>
          <a href="https://www.instagram.com/impactify.yrisumsel/" target="_blank" rel="noopener noreferrer" className="gd-summit-edition gd-summit-second"><span>YOUTH RANGER INDONESIA / ED. 02</span><i aria-hidden="true">◉</i><strong>02<br/>S✳S</strong><footer><span>{id ? 'Edisi nasional kedua' : 'Second national edition'}</span><span>VIEW SOURCE ↗</span></footer></a>
        </div>
        <div className="gd-summit-end"><p>{id ? 'Jelajahi materi publikasi dan dokumentasi yang tersedia melalui akun Impactify.' : 'Explore published event visuals and documentation on Impactify.'}</p><a href="https://www.instagram.com/impactify.yrisumsel/" target="_blank" rel="noopener noreferrer">INSTAGRAM @IMPACTIFY.YRISUMSEL ↗</a></div>
      </section>

      <section className="gd-posts" id="gd-posts" aria-labelledby="gd-post-title">
        <header className="gd-section-header"><div><span className="gd-section-number">04 / ORIGINAL POSTS</span><h2 id="gd-post-title">From feed<br/>to <em>portfolio.</em></h2></div><p>{id ? 'Dua unggahan yang kamu pilih. Muat pratinjau untuk melihat konten langsung dari Instagram.' : 'Two posts you selected. Load previews to see the original Instagram content.'}</p></header>
        <div className="gd-post-grid">
          {posts.map((post) => (
            <article className="gd-post-card" key={post.code}>
              <div className="gd-post-label"><span>INSTAGRAM / ORIGINAL</span><span>POST {post.index}</span></div>
              {embed[post.code] ? <iframe title={'Instagram post '+post.index} src={post.url + 'embed/'} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/> : <div className={'gd-post-art gd-post-art-'+post.index} aria-hidden="true"><i/><strong>{post.index}</strong><span>SELECTED / POST</span></div>}
              <div className="gd-post-actions"><button type="button" onClick={() => setEmbed((old) => ({...old, [post.code]: !old[post.code]}))}>{embed[post.code] ? (id ? 'Tutup pratinjau' : 'Close preview') : (id ? 'Muat pratinjau' : 'Load preview')}</button><a href={post.url} target="_blank" rel="noopener noreferrer">{id ? 'Buka unggahan' : 'Open post'} ↗</a></div>
            </article>
          ))}
        </div>
        <p className="gd-post-note">{id ? 'Penyematan tergantung pada izin Instagram. Gunakan tautan asli jika kontennya tidak bisa dimuat.' : 'Embedding depends on Instagram permissions. Use the original links when previews are unavailable.'}</p>
      </section>

      <footer className="gd-finale">
        <strong className="gd-finale-star" aria-hidden="true">✳</strong>
        <span className="gd-section-number">05 / KEEP MAKING</span>
        <h2>MORE THAN<br/><em>JUST A POST.</em></h2>
        <div className="gd-social-links"><a href="https://www.instagram.com/youthranger.sumsel/" target="_blank" rel="noopener noreferrer">@YOUTHRANGER.SUMSEL ↗</a><a href="https://www.instagram.com/impactify.yrisumsel/" target="_blank" rel="noopener noreferrer">@IMPACTIFY.YRISUMSEL ↗</a></div>
        <div className="gd-footer-line"><Link href="/#experience">← {id ? 'Pengalaman' : 'Experience'}</Link><span>RAFFLI © 2026 / DESIGN ARCHIVE</span><Link href="/projects">{id ? 'Semua proyek' : 'All projects'} ↗</Link></div>
      </footer>
    </main>
  );
}
