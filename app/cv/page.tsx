'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cvEducation, cvProfiles, cvRoles, type CVEntry, type CVLang, type CVPages, type CVRole, type DualText } from '@/data/cvProfiles';
import './cv.css';

type CVTemplate = 'modern-it' | 'modern-general' | 'harvard-it' | 'harvard-general';
const cvTemplates: { id: CVTemplate; idLabel: string; enLabel: string }[] = [
  { id:'modern-it', idLabel:'Modern – IT', enLabel:'Modern – IT' },
  { id:'modern-general', idLabel:'Modern – Umum', enLabel:'Modern – General' },
  { id:'harvard-it', idLabel:'Harvard – IT', enLabel:'Harvard – IT' },
  { id:'harvard-general', idLabel:'Harvard – Umum', enLabel:'Harvard – General' }
];
const local = (s: DualText, lang: CVLang) => s[lang];
const labels = {
  id:{
    preview:'Curriculum Vitae',
    choose:'POSISI CV',
    templates:'VERSI',
    pages:'PANJANG CV',
    lang:'BAHASA',
    page1:'1 halaman',
    page2:'2 halaman',
    print:'Simpan PDF / Unduh CV',
    back:'Kembali ke portofolio',
    about:'PROFIL PROFESIONAL',
    education:'PENDIDIKAN',
    experience:'PENGALAMAN RELEVAN',
    projects:'PROYEK',
    skills:'KETERAMPILAN',
    certifications:'SERTIFIKAT',
    graduation:'Lulusan 2026',
    gpa:'IPK',
    course:'Mata kuliah relevan',
    repo:'Repository',
    page:'HALAMAN',

  },
  en:{
    preview:'Curriculum Vitae',
    choose:'TARGET ROLE',
    templates:'VERSION',
    pages:'RESUME LENGTH',
    lang:'LANGUAGE',
    page1:'1 page',
    page2:'2 pages',
    print:'Save PDF / Download CV',
    back:'Back to portfolio',
    about:'PROFESSIONAL PROFILE',
    education:'EDUCATION',
    experience:'RELEVANT EXPERIENCE',
    projects:'PROJECTS',
    skills:'SKILLS',
    certifications:'CERTIFICATES',
    graduation:'Graduated 2026',
    gpa:'GPA',
    course:'Relevant coursework',
    repo:'Repository',
    page:'PAGE',

  }
};

function Section({ title, children, className='' }:{ title:string; children:ReactNode; className?:string }){
  return <section className={'cvr-section '+className}><h2>{title}</h2>{children}</section>;
}
function EntryCard({ value, lang, showLink=false }:{value:CVEntry;lang:CVLang;showLink?:boolean}){
  return <div className="cvr-entry">
    <div className="cvr-entry-heading">
      <strong>{local(value.title, lang)}</strong>
      <time>{value.period}</time>
    </div>
    <p className="cvr-entry-org">{value.organization}</p>
    <ul className="cvr-bullets">{value.bullets.slice(0,3).map((line,i)=><li key={i}>{local(line,lang)}</li>)}</ul>
    {showLink&&value.url&&<a className="cvr-entry-link" href={value.url} target="_blank" rel="noreferrer">{value.url.replace('https://','')}</a>}
  </div>;
}
function Education({lang}:{lang:CVLang}){
  const s=labels[lang];
  return <Section title={s.education} className="cvr-education">
    <div className="cvr-entry-heading"><strong>{local(cvEducation.institution,lang)}</strong><time>{cvEducation.period}</time></div>
    <p>{local(cvEducation.degree,lang)} · {s.gpa} {lang==='id'?'3,66 / 4,00':'3.66 / 4.00'} · {s.graduation}</p>
    <p className="cvr-subtle"><strong>{s.course}: </strong>{local(cvEducation.courses,lang)}</p>
  </Section>;
}
function Skills({role,lang}:{role:CVRole;lang:CVLang}){
  return <Section title={labels[lang].skills} className="cvr-skills">
    {cvProfiles[role].skills.map((v,i)=><div className="cvr-skill-row" key={i}>
      <strong>{local(v.label,lang)}</strong>
      <span aria-hidden="true">:</span>
      <span>{typeof v.value==='string'?v.value:local(v.value,lang)}</span>
    </div>)}
  </Section>;
}

// Only verified issue years are displayed; undated credentials remain undated.
const confirmedCertificateYears: [string,string][] = [
  ['CSS Essentials — Cisco Networking Academy','2026'],
  ['Data Analytics Essentials — Cisco Networking Academy','2026'],
  ['IT Customer Support Basics — Cisco Networking Academy','2026'],
  ['Belajar Back-End Pemula dengan JavaScript — Dicoding','2024'],
  ['Belajar Dasar Pemrograman JavaScript — Dicoding','2024'],
  ['HR Value Chain — MySkill x Deloitte','2023']
];
function certificateWithDate(value:string){
  const embeddedYear=value.match(/\((20\d{2})\)$/)?.[1];
  return {
    name:value.replace(/\s*\(20\d{2}\)$/,''),
    year:embeddedYear??confirmedCertificateYears.find(([name])=>name===value)?.[1]
  };
}
function Certifications({role,lang,limit=3}:{role:CVRole;lang:CVLang;limit?:number}){
  return <Section title={labels[lang].certifications} className="cvr-certifications">
    {cvProfiles[role].certificates.slice(0,limit).map((v,i)=>{
      const cert=certificateWithDate(v);
      return <div className="cvr-cert-row" key={i}>
        <span>{cert.name}</span>
        {cert.year&&<time dateTime={cert.year}>{cert.year}</time>}
      </div>;
    })}
  </Section>;
}
function Profile({role,lang}:{role:CVRole;lang:CVLang}){
  return <Section title={labels[lang].about} className="cvr-summary"><p>{local(cvProfiles[role].summary,lang)}</p></Section>;
}
function Header({role,lang,compact=false}:{role:CVRole;lang:CVLang;compact?:boolean}){
  return <header className={'cvr-resume-header '+(compact?'cvr-resume-header-small':'')}>
    <h1>AL-MAN RAFFLI SAPUTRA</h1>
    <p className="cvr-resume-role">{local(cvProfiles[role].headline,lang)}</p>
    {!compact&&<p className="cvr-contacts">
      <span>Palembang, Sumatera Selatan</span><span>·</span>
      <a href="mailto:almanraffli1@gmail.com">almanraffli1@gmail.com</a><span>·</span>
      <a href="tel:+6282183945815">+62 821-8394-5815</a><span>·</span>
      <a href="https://www.linkedin.com/in/al-man-raffli" target="_blank" rel="noreferrer">linkedin.com/in/al-man-raffli</a><span>·</span>
      <a href="https://github.com/Darren0099" target="_blank" rel="noreferrer">github.com/Darren0099</a>
    </p>}
  </header>;
}
function PageCard({children,page,pages,lang,styleClass}:{children:ReactNode;page:number;pages:CVPages;lang:CVLang;styleClass:string}){
  return <article className={'cvr-paper '+styleClass} aria-label={(lang==='id'?'Halaman ':'Page ')+page}>
    <div className="cvr-page-body">{children}</div>
    {pages===2&&<footer className="cvr-page-footer" aria-label={(lang==='id'?'Halaman ':'Page ')+page+' / '+pages}>{page}/{pages}</footer>}
  </article>;
}
function Resume({role,lang,template,pages}:{role:CVRole;lang:CVLang;template:CVTemplate;pages:CVPages}){
  const s=labels[lang],d=cvProfiles[role],isModern=template.startsWith('modern'),isIT=template.endsWith('it');
  const styleClass=(isModern?'cvr-modern':'cvr-harvard')+' '+(pages===1?'cvr-compact':'cvr-expanded');
  const experience=(count:number)=><Section title={s.experience} className="cvr-experience">
    {d.experience.slice(0,count).map((v,i)=><EntryCard key={i} value={v} lang={lang}/>)}
  </Section>;
  const projects=(start:number,count:number)=><Section title={s.projects} className="cvr-projects">
    {d.projects.slice(start,start+count).map((v,i)=><EntryCard key={start+i} value={v} lang={lang} showLink={pages===2}/>)}
  </Section>;
  if(pages===1){
    return <div className="cvr-sheets">
      <PageCard page={1} pages={1} lang={lang} styleClass={styleClass}>
        <Header role={role} lang={lang}/>
        <Profile role={role} lang={lang}/>
        <Education lang={lang}/>
        {experience(2)}
        {projects(0,2)}
        <Skills role={role} lang={lang}/>
        <Certifications role={role} lang={lang}/>
      </PageCard>
    </div>;
  }
  return <div className="cvr-sheets">
    <PageCard page={1} pages={2} lang={lang} styleClass={styleClass}>
      <Header role={role} lang={lang}/>
      <Profile role={role} lang={lang}/>
      <Education lang={lang}/>
      {experience(3)}
      {projects(0,1)}
    </PageCard>
    <PageCard page={2} pages={2} lang={lang} styleClass={styleClass}>
      {isIT?<>{projects(1,2)}<Skills role={role} lang={lang}/></>:<><Skills role={role} lang={lang}/>{projects(1,2)}</>}
      <Certifications role={role} lang={lang}/>
    </PageCard>
  </div>;
}

export default function CVPage(){
  const [role,setRole]=useState<CVRole>('general');
  const [lang,setLang]=useState<CVLang>('id');
  const [template,setTemplate]=useState<CVTemplate>('harvard-it');
  const [pages,setPages]=useState<CVPages>(2);
  const [initialized,setInitialized]=useState(false);
  useEffect(()=>{
    const p=new URLSearchParams(window.location.search);
    const r=p.get('role'),l=p.get('lang'),temp=p.get('template'),count=p.get('pages');
    if(r&&cvRoles.includes(r as CVRole))setRole(r as CVRole);
    if(l==='id'||l==='en')setLang(l);
    if(temp&&cvTemplates.some(v=>v.id===temp))setTemplate(temp as CVTemplate);
    if(count==='1'||count==='2')setPages(Number(count) as CVPages);
    setInitialized(true);
  },[]);
  useEffect(()=>{
    if(!initialized)return;
    const p=new URLSearchParams({role,template,pages:String(pages),lang});
    window.history.replaceState(null,'','/cv?'+p.toString());
    document.title='CV '+cvProfiles[role].label[lang]+' | Al-Man Raffli Saputra';
  },[initialized,role,lang,template,pages]);
  const s=labels[lang];
  return <main className="cvr-app">
    <aside className="cvr-controls" aria-label={s.preview}>
      <div className="cvr-topline">
        <a href="/" className="cvr-back">← {s.back}</a>
      </div>
      <div className="cvr-title-row">
        <h2>{s.preview}</h2>
      </div>
      <div className="cvr-control-group">
        <div className="cvr-picker">
          <strong>{s.choose}</strong>
          <div className="cvr-option-row">
            {cvRoles.map(r=><button key={r} type="button" aria-pressed={role===r} className={role===r?'active':''} onClick={()=>setRole(r)}>{local(cvProfiles[r].label,lang)}</button>)}
          </div>
        </div>
        <div className="cvr-options-layout">
          <div className="cvr-picker">
            <strong>{s.templates}</strong>
            <div className="cvr-option-row">
              {cvTemplates.map(v=><button key={v.id} type="button" aria-pressed={template===v.id} className={template===v.id?'active':''} onClick={()=>setTemplate(v.id)}>{lang==='id'?v.idLabel:v.enLabel}</button>)}
            </div>
          </div>
          <div className="cvr-picker">
            <strong>{s.pages}</strong>
            <div className="cvr-option-row">
              <button type="button" aria-pressed={pages===1} className={pages===1?'active':''} onClick={()=>setPages(1)}>{s.page1}</button>
              <button type="button" aria-pressed={pages===2} className={pages===2?'active':''} onClick={()=>setPages(2)}>{s.page2}</button>
            </div>
          </div>
          <div className="cvr-picker">
            <strong>{s.lang}</strong>
            <div className="cvr-option-row">
              <button type="button" aria-pressed={lang==='id'} className={lang==='id'?'active':''} onClick={()=>setLang('id')}>ID</button>
              <button type="button" aria-pressed={lang==='en'} className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button>
            </div>
          </div>
        </div>
        <button type="button" className="cvr-print" onClick={()=>window.print()}>
          <span aria-hidden="true">↓</span> {s.print}
        </button>
      </div>
    </aside>
    <section className="cvr-preview" aria-label="CV Preview">
      <Resume role={role} lang={lang} template={template} pages={pages}/>
    </section>
  </main>;
}
