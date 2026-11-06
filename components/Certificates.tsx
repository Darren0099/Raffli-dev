'use client';

import { useMemo, useState } from 'react';
import { initialCertificates, type Certificate } from '@/data/certificates';
import { useLanguage } from './LanguageProvider';

type IssuerKey =
  | 'cisco' | 'dicoding' | 'myskill' | 'dqlab' | 'yri' | 'csu'
  | 'credmark' | 'karirnex' | 'revou' | 'maryland' | 'pnj'
  | 'polsri' | 'gdsc';

type IssuerInfo = {
  name: string;
  signature: string;
  edition: string;
  monogram: string;
  motif: string;
};

const issuerInfo: Record<IssuerKey, IssuerInfo> = {
  cisco: { name: 'Cisco Networking Academy', signature: 'NETWORK / LEARN', edition: 'SIGNAL SERIES', monogram: 'C', motif: 'wave' },
  dicoding: { name: 'Dicoding Indonesia', signature: 'BUILD / CODE', edition: 'MODULE SERIES', monogram: 'D', motif: 'module' },
  myskill: { name: 'MySkill', signature: 'GROW / EXPLORE', edition: 'ORBIT SERIES', monogram: 'M', motif: 'orbit' },
  dqlab: { name: 'DQLab', signature: 'EXPLORE / DATA', edition: 'DATA SERIES', monogram: 'Q', motif: 'data' },
  yri: { name: 'Youth Ranger Indonesia', signature: 'PEOPLE / IMPACT', edition: 'IMPACT SERIES', monogram: 'Y', motif: 'rays' },
  csu: { name: 'Charles Sturt University', signature: 'SECURE / SYSTEM', edition: 'SYSTEM SERIES', monogram: 'S', motif: 'circuit' },
  credmark: { name: 'CredMark', signature: 'SKILL / PROOF', edition: 'SEAL SERIES', monogram: 'C', motif: 'seal' },
  karirnex: { name: 'KarirNex', signature: 'LEARN / APPLY', edition: 'GROWTH SERIES', monogram: 'K', motif: 'steps' },
  revou: { name: 'RevoU', signature: 'SHIFT / GROW', edition: 'SHIFT SERIES', monogram: 'R', motif: 'slice' },
  maryland: { name: 'University of Maryland', signature: 'THINK / CREATE', edition: 'ACADEMIC SERIES', monogram: 'U', motif: 'seal' },
  pnj: { name: 'Politeknik Negeri Jakarta', signature: 'MAKE / IMPACT', edition: 'ACHIEVEMENT SERIES', monogram: 'P', motif: 'module' },
  polsri: { name: 'HMJ Teknik Komputer Polsri', signature: 'BUILD / TOGETHER', edition: 'COMMUNITY SERIES', monogram: 'H', motif: 'steps' },
  gdsc: { name: 'Google Developer Student Clubs', signature: 'LEARN / BUILD', edition: 'DEVELOPER SERIES', monogram: 'G', motif: 'orbit' },
};

const issuerOrder: IssuerKey[] = [
  'cisco', 'dicoding', 'myskill', 'dqlab', 'yri', 'csu', 'credmark',
  'karirnex', 'revou', 'maryland', 'pnj', 'polsri', 'gdsc',
];

const categories = [
  { value: 'all', id: 'Semua bidang', en: 'All fields' },
  { value: 'webdev', id: 'Web Development', en: 'Web Development' },
  { value: 'frontend', id: 'Frontend Development', en: 'Frontend Development' },
  { value: 'data', id: 'Data & Analytics', en: 'Data & Analytics' },
  { value: 'network', id: 'Networking', en: 'Networking' },
  { value: 'it', id: 'IT Support', en: 'IT Support' },
  { value: 'cyber', id: 'Cyber Security', en: 'Cyber Security' },
  { value: 'cloud', id: 'Cloud Computing', en: 'Cloud Computing' },
  { value: 'hr', id: 'Human Resource', en: 'Human Resource' },
  { value: 'design', id: 'Graphic Design', en: 'Graphic Design' },
] as const;

function getIssuerKey(cert: Certificate): IssuerKey {
  const name = cert.pill.toLowerCase();
  if (name.includes('cisco')) return 'cisco';
  if (name.includes('dicoding')) return 'dicoding';
  if (name.includes('myskill')) return 'myskill';
  if (name.includes('dqlab')) return 'dqlab';
  if (name.includes('youth ranger')) return 'yri';
  if (name.includes('charles sturt') || name.includes('it masters')) return 'csu';
  if (name.includes('credmark')) return 'credmark';
  if (name.includes('karirnex')) return 'karirnex';
  if (name.includes('revou')) return 'revou';
  if (name.includes('maryland')) return 'maryland';
  if (name.includes('negeri jakarta')) return 'pnj';
  if (name.includes('polsri')) return 'polsri';
  return 'gdsc';
}

function readableDate(date: string, lang: 'id' | 'en') {
  return new Date(date + 'T12:00:00').toLocaleDateString(
    lang === 'id' ? 'id-ID' : 'en-US',
    { year: 'numeric', month: 'short' }
  );
}

export default function Certificates() {
  const { lang } = useLanguage();
  const [selectedIssuer, setSelectedIssuer] = useState<IssuerKey | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const certificates = useMemo(() => {
    return initialCertificates
      .map((cert, originalIndex) => ({ cert, originalIndex, issuer: getIssuerKey(cert) }))
      .sort((left, right) => {
        const difference = issuerOrder.indexOf(left.issuer) - issuerOrder.indexOf(right.issuer);
        return difference || left.originalIndex - right.originalIndex;
      });
  }, []);

  const filtered = certificates.filter(({ cert, issuer }) =>
    (selectedIssuer === 'all' || issuer === selectedIssuer) &&
    (selectedCategory === 'all' || cert.category === selectedCategory)
  );

  const availableIssuers = issuerOrder.filter((issuer) => certificates.some((item) => item.issuer === issuer));
  const visibleCards = filtered.slice(0, visibleCount);
  const remainingCount = Math.max(0, filtered.length - visibleCards.length);

  return (
    <section className="credentials-section" id="certificates">
      <div className="credentials-inner">
        <header className="credentials-heading">
          <div className="credentials-heading-copy">
            <p className="credentials-overline">
              <span className="credentials-overline-mark" aria-hidden="true">✳</span>
              {lang === 'id' ? 'ARSIP KREDENSIAL / 001—033' : 'CREDENTIAL ARCHIVE / 001—033'}
            </p>
            <h2>{lang === 'id' ? 'Beyond the' : 'Beyond the'} <em>certificate.</em></h2>
            <p className="credentials-heading-caption">
              {lang === 'id' ? 'Satu koleksi. Banyak perjalanan belajar.' : 'One collection. Many learning journeys.'}
            </p>
          </div>
          <div className="credentials-total" aria-label={lang === 'id' ? 'Jumlah karya dan sertifikat' : 'Total credentials and recognitions'}>
            <strong>{String(initialCertificates.length).padStart(2, '0')}</strong>
            <span>{lang === 'id' ? 'KREDENSIAL &\nPENGHARGAAN' : 'CREDENTIALS &\nRECOGNITIONS'}</span>
          </div>
        </header>

        <div className="credentials-toolbar">
          <div className="credentials-toolbar-index">
            <span className="credentials-index-dot" aria-hidden="true"></span>
            {lang === 'id' ? 'KOLEKSI TERPILIH' : 'THE COLLECTION'}
            <span className="credentials-toolbar-count">({filtered.length.toString().padStart(2, '0')})</span>
          </div>
          <div className="credentials-filters">
            <label className="credentials-filter">
              <span>{lang === 'id' ? 'Penerbit' : 'Issuer'}</span>
              <select
                value={selectedIssuer}
                onChange={(event) => {
                  setSelectedIssuer(event.target.value as IssuerKey | 'all');
                  setVisibleCount(6);
                }}
              >
                <option value="all">{lang === 'id' ? 'Semua penerbit' : 'All issuers'}</option>
                {availableIssuers.map((issuer) => (
                  <option key={issuer} value={issuer}>{issuerInfo[issuer].name}</option>
                ))}
              </select>
              <span className="credentials-filter-chevron" aria-hidden="true">⌄</span>
            </label>
            <label className="credentials-filter">
              <span>{lang === 'id' ? 'Bidang' : 'Field'}</span>
              <select value={selectedCategory} onChange={(event) => {
                setSelectedCategory(event.target.value);
                setVisibleCount(6);
              }}>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>{category[lang]}</option>
                ))}
              </select>
              <span className="credentials-filter-chevron" aria-hidden="true">⌄</span>
            </label>
          </div>
        </div>

        {filtered.length ? (
          <>
            <div className="credentials-grid">
              {visibleCards.map(({ cert, issuer, originalIndex }, displayIndex) => {
              const info = issuerInfo[issuer];
              const paddedNumber = String(displayIndex + 1).padStart(2, '0');
              const compactTitle = cert.title.length > 58
                ? 'credentials-card-title--compact'
                : cert.title.length > 34 ? 'credentials-card-title--long' : '';

              return (
                <a
                  key={cert.id}
                  className={`credentials-card credentials-card--${issuer}`}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-motif={info.motif}
                  aria-label={`${cert.title} — ${cert.pill}. ${cert.linkType === 'issuer'
                    ? (lang === 'id' ? 'Info badge dari penerbit' : 'Issuer badge information')
                    : (lang === 'id' ? 'Lihat sertifikat' : 'View credential')}`}
                >
                  <div className="credentials-card-top">
                    <span className="credentials-card-issuer">{info.name}</span>
                    <span className="credentials-card-no">{paddedNumber} / {String(initialCertificates.length).padStart(2, '0')}</span>
                  </div>

                  <div className="credentials-art" aria-hidden="true">
                    <span className="credentials-art-grid"></span>
                    <span className="credentials-art-shape credentials-art-shape--one"></span>
                    <span className="credentials-art-shape credentials-art-shape--two"></span>
                    <span className="credentials-art-shape credentials-art-shape--three"></span>
                    <span className="credentials-art-monogram">{info.monogram}</span>
                    <span className="credentials-art-mini">{info.signature}</span>
                  </div>

                  <div className="credentials-card-body">
                    <span className="credentials-card-edition">{info.edition}<span className="credentials-card-edition-line"></span>{cert.issuedAt ? readableDate(cert.issuedAt, lang) : 'PORTFOLIO'}</span>
                    <h3 className={`credentials-card-title ${compactTitle}`}>{cert.title}</h3>
                  </div>

                  <div className="credentials-card-bottom">
                    <div>
                      <span className="credentials-card-category">{cert.categoryLabel}</span>
                      <span className="credentials-card-code">RFL / {String(originalIndex + 1).padStart(3, '0')}</span>
                    </div>
                    <span className="credentials-card-action" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 19 19 5M8 5h11v11"/>
                      </svg>
                    </span>
                  </div>
                </a>
              );
              })}
            </div>
            {filtered.length > 6 && (
              <div className="credentials-pagination">
                <p aria-live="polite">
                  {lang === 'id' ? 'Menampilkan' : 'Showing'}{' '}
                  <strong>{visibleCards.length}</strong> {lang === 'id' ? 'dari' : 'of'}{' '}
                  <strong>{filtered.length}</strong> {lang === 'id' ? 'sertifikat' : 'credentials'}
                </p>
                {remainingCount > 0 ? (
                  <button
                    type="button"
                    className="credentials-show-more"
                    onClick={() => setVisibleCount((count) => count + 6)}
                  >
                    <span>
                      {lang === 'id' ? 'Tampilkan' : 'Show'} {Math.min(6, remainingCount)} {lang === 'id' ? 'lagi' : 'more'}
                      <small>{remainingCount} {lang === 'id' ? 'tersisa' : 'remaining'}</small>
                    </span>
                    <span className="credentials-show-more-icon" aria-hidden="true">+</span>
                  </button>
                ) : (
                  <button type="button" className="credentials-show-more" onClick={() => setVisibleCount(6)}>
                    <span>{lang === 'id' ? 'Tampilkan lebih sedikit' : 'Show fewer'}</span>
                    <span className="credentials-show-more-icon" aria-hidden="true">−</span>
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="credentials-empty">
            <span aria-hidden="true">∅</span>
            <p>{lang === 'id' ? 'Tidak ada sertifikat untuk kombinasi filter ini.' : 'No credentials match these filters.'}</p>
            <button type="button" onClick={() => { setSelectedIssuer('all'); setSelectedCategory('all'); }}>
              {lang === 'id' ? 'Atur ulang filter' : 'Reset filters'}
            </button>
          </div>
        )}

        <footer className="credentials-outro">
          <span>RAFFLI / CREDENTIAL ARCHIVE</span>
          <span>{lang === 'id' ? 'TERUS BELAJAR. TERUS MEMBUAT.' : 'KEEP LEARNING. KEEP BUILDING.'}</span>
        </footer>
      </div>
    </section>
  );
}
