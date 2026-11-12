type PlaceholderProps = {
 title: string;
 category?: string;
};

/**
 * Intentional editorial placeholder. No generated image, stock photo, or
 * screenshot is used until the owner supplies the actual project preview.
 */
export default function ProjectMediaPlaceholder({title,category}:PlaceholderProps) {
 const foodProject = title.toLowerCase().includes('dapur ummi kyana');
 return <div className="project-media-placeholder" role="img" aria-label={`Gambar pratinjau untuk ${title} belum ditambahkan`}>
    <div className="project-placeholder-top"><span>RAFFLI / SELECTED WORK</span><span>{category||'PROJECT'}</span></div>
    <div className="project-placeholder-center">
      <span className="project-placeholder-kicker">{foodProject?'DAPUR UMMI KYANA':'PROJECT PREVIEW'}</span>
      <strong>Preview<br/>menyusul<span className="project-placeholder-dot">.</span></strong>
      <span className="project-placeholder-line" aria-hidden="true"/>
    </div>
    <span className="project-placeholder-bottom">NO PREVIEW IMAGE ADDED YET <span aria-hidden="true">/ 2026</span></span>
 </div>;
}
