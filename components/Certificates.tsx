'use client';

import { useState } from 'react';
import { initialCertificates } from '@/data/certificates';
import { useLanguage } from './LanguageProvider';
import { useLocalizedStrings } from '@/hooks/useLocalizedProjects';

const categories = [
  { value: 'all', id: 'Semua Sertifikat', en: 'All Certificates' },
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

export default function Certificates() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const localizedDescriptions = useLocalizedStrings(initialCertificates.map((cert) => cert.description));

  const filteredCertificates = initialCertificates.filter(
    (cert) => selectedCategory === 'all' || cert.category === selectedCategory
  );

  return (
    <section className="certificates-section" id="certificates">
      <div className="cert-section-inner">
        <div className="cert-header">
          <div className="cert-header-left">
            <div className="cert-eyebrow">
              <i className="fa-solid fa-award" aria-hidden="true"></i>
              <span>CERTIFICATIONS &amp; CREDENTIALS</span>
            </div>
            <h2 className="cert-title">
              {lang === 'id' ? 'Lisensi & Sertifikasi' : 'Licenses & Certifications'}
            </h2>
            <p className="cert-desc">
              {lang === 'id'
                ? 'Pembelajaran, sertifikasi, dan pengalaman profesional di bidang pengembangan web, data, jaringan, keamanan, organisasi, dan desain.'
                : 'Selected learning credentials and professional experience across web development, data, networking, security, leadership, and design.'}
            </p>
          </div>
          <div className="cert-filter-wrapper">
            <label htmlFor="cert-filter-select">
              {lang === 'id' ? 'Kategori' : 'Category'}
            </label>
            <div className="cert-select-container">
              <select
                id="cert-filter-select"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category[lang]}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        {filteredCertificates.length ? (
          <div className="cert-grid">
            {filteredCertificates.map((cert) => {
              const originalIndex = initialCertificates.findIndex((item) => item.id === cert.id);
              const showImage = Boolean(cert.imageUrl && !failedImages[cert.id]);
              return (
                <article className="cert-card" key={cert.id}>
                  <div className="cert-card-top">
                    <span className="cert-card-number">{String(originalIndex + 1).padStart(2, '0')}</span>
                    <span className="cert-card-issuer">{cert.pill}</span>
                  </div>

                  <div className="cert-card-visual">
                    {showImage ? (
                      <img
                        className="cert-card-image"
                        src={cert.imageUrl}
                        alt={`Badge atau sertifikat ${cert.title} dari ${cert.pill}`}
                        loading="lazy"
                        onError={() => setFailedImages((prev) => ({ ...prev, [cert.id]: true }))}
                      />
                    ) : (
                      <div className="cert-card-placeholder" aria-label={lang === 'id' ? 'Gambar sertifikat belum tersedia' : 'Certificate image unavailable'}>
                        <i className="fa-regular fa-file-lines" aria-hidden="true"></i>
                        <span>{cert.pill}</span>
                      </div>
                    )}
                  </div>

                  <div className="cert-card-details">
                    <p className="cert-card-category">{cert.categoryLabel}{cert.issuedAt ? ` · ${new Date(cert.issuedAt + 'T12:00:00').getFullYear()}` : ''}</p>
                    <h3>{cert.title}</h3>
                    <p className="cert-card-subtitle">{cert.pill}</p>
                    <p className="cert-card-description">
                      {localizedDescriptions[originalIndex] || cert.description}
                    </p>
                    {cert.issuedAt && (
                      <p className="cert-card-date">
                        {lang === 'id' ? 'Diterbitkan' : 'Issued'}:{' '}
                        {new Date(cert.issuedAt + 'T12:00:00').toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                  </div>

                  <div className="cert-card-footer">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${cert.linkType === 'issuer' ? 'Informasi badge' : 'Detail sertifikat'}: ${cert.title}`}
                    >
                      <span>
                        {cert.linkType === 'issuer'
                          ? (lang === 'id' ? 'Tentang badge' : 'About badge')
                          : (lang === 'id' ? 'Lihat detail' : 'View details')}
                      </span>
                      <span className="cert-link-icon"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="cert-empty-state">
            {lang === 'id' ? 'Belum ada sertifikat di kategori ini.' : 'No certificates found in this category.'}
          </div>
        )}
      </div>
    </section>
  );
}
