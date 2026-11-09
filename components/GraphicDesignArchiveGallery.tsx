'use client';

import { useState } from 'react';
import { designCollections, getPostUrl } from '@/data/graphicDesignArchive';
import './design-archive-gallery.css';

type Medium = 'feed' | 'poster' | 'lanyard' | 'apparel' | 'packaging';
type ViewMode = 'preview' | 'index';
type Props = {
  id: boolean;
  selectedCollection: string;
  onSelectCollection: (collectionId: string) => void;
};

const mediums: { key: Medium; no: string; titleId: string; titleEn: string; captionId: string; captionEn: string; art: string }[] = [
  { key: 'feed', no: '01', titleId: 'Feed Instagram', titleEn: 'Instagram feed', captionId: 'Karya terpublikasi', captionEn: 'Published work', art: 'IG' },
  { key: 'poster', no: '02', titleId: 'Poster', titleEn: 'Posters', captionId: 'Event dan promosi', captionEn: 'Events and promotions', art: 'P' },
  { key: 'lanyard', no: '03', titleId: 'Lanyard', titleEn: 'Lanyards', captionId: 'Identitas dan merchandise', captionEn: 'Identity and merchandise', art: 'L' },
  { key: 'apparel', no: '04', titleId: 'Baju', titleEn: 'Apparel', captionId: 'Desain pakaian', captionEn: 'Wearable design', art: 'A' },
  { key: 'packaging', no: '05', titleId: 'Kemasan', titleEn: 'Packaging', captionId: 'Produk dan kemasan', captionEn: 'Products and packaging', art: 'K' },
];
/** Other categories will gain real counts when their design files are added to the archive. */
const otherArchivedCounts: Record<Exclude<Medium, 'feed'>, number> = {
  poster: 0,
  lanyard: 0,
  apparel: 0,
  packaging: 0,
};

export default function GraphicDesignArchiveGallery({ id, selectedCollection, onSelectCollection }: Props) {
  const [medium, setMedium] = useState<Medium>('feed');
  const [view, setView] = useState<ViewMode>('preview');
  const [visibleCount, setVisibleCount] = useState(6);
  const [hiddenPreviews, setHiddenPreviews] = useState<Record<string, boolean>>({});
  const selected = designCollections.find((item) => item.id === selectedCollection) ?? designCollections[0];
  const total = selected.posts.length;
  const visible = selected.posts.slice(0, visibleCount);
  const chooseCollection = (collectionId: string) => {
    onSelectCollection(collectionId);
    setVisibleCount(6);
    setView('preview');
    setHiddenPreviews({});
  };
  // An Instagram post can appear in more than one collection. Count it only once in global totals.
  const feedCount = new Set(
    designCollections.flatMap((collection) => collection.posts.map((post) => getPostUrl(post)))
  ).size;
  const collectionEntries = designCollections.reduce((sum, collection) => sum + collection.posts.length, 0);
  const mediumCounts: Record<Medium, number> = { feed: feedCount, ...otherArchivedCounts };
  const archiveTotal = Object.values(mediumCounts).reduce((sum, count) => sum + count, 0);

  return (
    <section className="gd-archive-browser" id="gd-posts" aria-labelledby="gd-post-title">
      <div className="gd-archive-heading">
        <div>
          <span className="gd-section-number">06 / DESIGN ARCHIVE · BY MEDIUM</span>
          <h2 id="gd-post-title">{id ? 'Jelajahi ' : 'Explore the '}<em>{id ? 'karya.' : 'archive.'}</em></h2>
        </div>
        <p>{id ? 'Pilih jenis desain, lalu buka koleksi dari akun atau event terkait. Semua unggahan terhubung dengan sumber Instagram aslinya.' : 'Choose a design medium, then browse the related organization or event. Every post links back to its original Instagram publication.'}</p>
      </div>

      <div className="gd-archive-overview" aria-label={id ? 'Ringkasan jumlah karya yang sudah diarsipkan' : 'Summary of archived work counts'}>
        <div className="gd-archive-total">
          <span>{id ? 'TOTAL KARYA YANG SUDAH DIARSIPKAN' : 'TOTAL DOCUMENTED WORK'}</span>
          <strong>{archiveTotal.toLocaleString(id ? 'id-ID' : 'en-US')}<span aria-hidden="true">.</span></strong>
          <p>{id
            ? 'Jumlah karya yang tercatat di galeri saat ini. Untuk Instagram, setiap tautan unggahan dihitung satu kali, walaupun tampil di beberapa koleksi.'
            : 'The number of items currently documented in the gallery. An Instagram publication is counted once even if listed in multiple collections.'}</p>
        </div>
        <div className="gd-archive-breakdown">
          <div className="gd-archive-breakdown-top">
            <span>{id ? 'RINCIAN PER JENIS DESAIN' : 'BREAKDOWN BY DESIGN MEDIUM'}</span>
            <span>01—05 / ARCHIVE</span>
          </div>
          {mediums.map((item) => (
            <div className="gd-archive-breakdown-row" key={item.key}>
              <span>{id ? item.titleId : item.titleEn}</span>
              <strong>{mediumCounts[item.key].toLocaleString(id ? 'id-ID' : 'en-US')} <small>{item.key === 'feed' ? (id ? 'unggahan unik' : 'unique posts') : (id ? 'diarsipkan' : 'archived')}</small></strong>
            </div>
          ))}
          <p>{id
            ? `Ada ${collectionEntries} entri di seluruh koleksi Instagram, dengan ${collectionEntries - feedCount} entri berulang. Untuk Poster, Lanyard, Baju, dan Kemasan, angka 0 berarti file belum ditambahkan ke arsip—bukan belum pernah dibuat.`
            : `There are ${collectionEntries} entries across Instagram collections, including ${collectionEntries - feedCount} repeat entries. A zero for other media means files have not been added to this archive, not that no work was created.`}</p>
        </div>
      </div>

      <div className="gd-archive-media-grid" role="group" aria-label={id ? 'Pilih jenis desain' : 'Choose a design medium'}>
        {mediums.map((item) => (
          <button
            type="button"
            key={item.key}
            className={'gd-archive-medium gd-archive-medium--'+item.key+(medium === item.key ? ' is-active' : '')}
            aria-pressed={medium === item.key}
            onClick={() => setMedium(item.key)}
          >
            <span className="gd-archive-medium-head"><span>{item.no} / MEDIUM</span><span aria-hidden="true">↗</span></span>
            <span className="gd-archive-medium-art" aria-hidden="true">{item.art}</span>
            <span className="gd-archive-medium-title">{id ? item.titleId : item.titleEn}</span>
            <span className="gd-archive-medium-foot">
              <span>{id ? item.captionId : item.captionEn}</span>
              <b>{mediumCounts[item.key].toLocaleString(id ? 'id-ID' : 'en-US')} {item.key === 'feed' ? (id ? 'unggahan' : 'posts') : (id ? 'diarsipkan' : 'archived')}</b>
            </span>
          </button>
        ))}
      </div>

      {medium === 'feed' ? (
        <div className="gd-archive-feed">
          <div className="gd-archive-subhead">
            <div>
              <span className="gd-archive-kicker">INSTAGRAM / {id ? 'PILIH ORGANISASI' : 'SELECT ORGANIZATION'}</span>
              <h3>{id ? 'Feed dari berbagai akun.' : 'Feeds across organizations.'}</h3>
            </div>
            <p>{id ? 'Ini adalah kurasi tautan karya, bukan seluruh feed otomatis dari akun Instagram.' : 'These are manually curated publication links, not an automatic mirror of each Instagram account.'}</p>
          </div>
          <div className="gd-archive-account-grid" role="group" aria-label={id ? 'Pilih akun Instagram' : 'Choose an Instagram account'}>
            {designCollections.map((collection) => (
              <button
                type="button"
                key={collection.id}
                className={'gd-archive-account'+(selected.id === collection.id ? ' is-selected' : '')}
                aria-pressed={selected.id === collection.id}
                onClick={() => chooseCollection(collection.id)}
              >
                <span>{collection.name}</span>
                <small>{collection.handle}</small>
                <b>{String(collection.posts.length).padStart(2, '0')}</b>
              </button>
            ))}
          </div>

          <div className="gd-archive-selected-header">
            <div>
              <span className="gd-archive-kicker">PUBLISHED WORK / {String(total).padStart(2, '0')} POSTS</span>
              <h3>{selected.name}<span>.</span></h3>
              <p>{id ? selected.descriptionId : selected.descriptionEn}</p>
            </div>
            <a href={selected.profileUrl} target="_blank" rel="noopener noreferrer" className="gd-archive-profile-link">
              {id ? 'Profil Instagram' : 'Instagram profile'} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="gd-archive-viewbar">
            <div role="group" aria-label={id ? 'Mode galeri' : 'Gallery view mode'}>
              <button type="button" className={view === 'preview' ? 'is-active' : ''} aria-pressed={view === 'preview'} onClick={() => setView('preview')}>
                {id ? 'Pratinjau asli' : 'Original previews'}
              </button>
              <button type="button" className={view === 'index' ? 'is-active' : ''} aria-pressed={view === 'index'} onClick={() => setView('index')}>
                {id ? 'Lihat semua tautan' : 'All post links'}
              </button>
            </div>
            <span>{view === 'preview' ? Math.min(visibleCount, total) : total} / {total} {id ? 'unggahan' : 'posts'}</span>
          </div>

          {view === 'preview' ? (
            <>
              <div className="gd-archive-post-grid">
                {visible.map((post, index) => {
                  const url = getPostUrl(post);
                  const key = selected.id + '-' + post.shortcode;
                  return (
                    <article className="gd-archive-post" key={key}>
                      <header>
                        <span>{selected.handle}</span>
                        <strong>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</strong>
                      </header>
                      {hiddenPreviews[key] ? (
                        <div className="gd-archive-embed-placeholder">
                          <span>INSTAGRAM / {post.kind === 'reel' ? 'REEL' : 'POST'}</span>
                          <strong>{String(index + 1).padStart(2, '0')}</strong>
                          <p>{id ? 'Pratinjau disembunyikan.' : 'Preview hidden.'}</p>
                        </div>
                      ) : (
                        <div className="gd-archive-embed">
                          <iframe
                            title={selected.name + ' · Instagram post ' + (index + 1)}
                            src={url + 'embed/captioned/'}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        </div>
                      )}
                      <footer>
                        <button
                          type="button"
                          aria-pressed={!hiddenPreviews[key]}
                          onClick={() => setHiddenPreviews((old) => ({ ...old, [key]: !old[key] }))}
                        >
                          {hiddenPreviews[key] ? (id ? 'Tampilkan pratinjau' : 'Show preview') : (id ? 'Sembunyikan pratinjau' : 'Hide preview')}
                        </button>
                        <a href={url} target="_blank" rel="noopener noreferrer">{id ? 'Buka post' : 'Open post'} ↗</a>
                      </footer>
                    </article>
                  );
                })}
              </div>
              {visibleCount < total && (
                <div className="gd-archive-load-more">
                  <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + 6, total))}>
                    {id ? 'Muat 6 unggahan lagi' : 'Load 6 more posts'} <span aria-hidden="true">↓</span>
                  </button>
                  <small>{total - visible.length} {id ? 'unggahan tersisa' : 'remaining posts'}</small>
                </div>
              )}
            </>
          ) : (
            <div className="gd-archive-index-grid">
              {selected.posts.map((post, index) => (
                <a key={selected.id + '-' + post.shortcode} target="_blank" rel="noopener noreferrer" href={getPostUrl(post)} className="gd-archive-index-link">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{post.kind === 'reel' ? 'Instagram Reel' : 'Instagram Post'}</strong>
                  <small>{post.shortcode}</small>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          )}
          <p className="gd-archive-access-note">{id ? 'Pratinjau menggunakan embed resmi Instagram dan mungkin tidak tampil bila akun privat, embed dibatasi, atau browser memblokir konten pihak ketiga. Tombol “Buka post” tetap mengarah ke publikasi aslinya.' : 'Previews use Instagram embeds and may be restricted by privacy settings or third-party content blocking. “Open post” always links to its original publication.'}</p>
        </div>
      ) : (
        <div className="gd-archive-coming" role="status">
          <span className="gd-archive-kicker">{id ? 'KOLEKSI BERIKUTNYA' : 'UPCOMING COLLECTION'}</span>
          <div className="gd-archive-coming-art" aria-hidden="true">{mediums.find((item) => item.key === medium)?.art}</div>
          <div>
            <h3>{id ? mediums.find((item) => item.key === medium)?.titleId : mediums.find((item) => item.key === medium)?.titleEn}<span>.</span></h3>
            <p>{id ? 'Kategori ini sudah disiapkan. Desain aslinya akan ditambahkan setelah file karya tersedia, tanpa mengisi galeri dengan contoh yang bukan hasil desainmu.' : 'This category is ready. Original work will be added once design files are available—without substituting unrelated placeholder artworks.'}</p>
            <button type="button" onClick={() => setMedium('feed')}>{id ? 'Kembali ke Feed Instagram' : 'Back to Instagram feed'} ↗</button>
          </div>
        </div>
      )}
    </section>
  );
}
