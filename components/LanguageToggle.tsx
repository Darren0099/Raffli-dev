'use client';

import { useLanguage } from './LanguageProvider';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      type="button"
      className={`lang-toggle ${lang === 'en' ? 'en' : ''}`}
      onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
      aria-label={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      title={lang === 'id' ? 'English' : 'Bahasa Indonesia'}
      style={{ cursor: 'pointer', border: 0 }}
    >
      <span className="toggle-pill" aria-hidden="true" />
      <span className={`lang-opt opt-en ${lang === 'en' ? 'active' : ''}`}>EN</span>
      <span className={`lang-opt opt-id ${lang === 'id' ? 'active' : ''}`}>ID</span>
    </button>
  );
}
