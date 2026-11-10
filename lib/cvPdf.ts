/**
 * Dependency-free A4 PDF generator for Raffli CV Studio.
 *
 * Generates a real, downloadable, text-selectable PDF document (not a screenshot
 * and not a browser print dialog). It mirrors the content selection of /cv.
 * Uses PDF standard Type1 Helvetica fonts with WinAnsiEncoding for portability.
 */
import {
  cvEducation, cvProfiles,
  type CVEntry, type CVLang, type CVPages, type CVRole, type DualText,
} from '@/data/cvProfiles';

export type CVPdfTemplate = 'modern-it' | 'modern-general' | 'harvard-it' | 'harvard-general';
export type CVPdfMode = 'cv' | 'resume';
export type CVPdfOptions = {
  role: CVRole;
  lang: CVLang;
  template: CVPdfTemplate;
  pages: CVPages;
  mode: CVPdfMode;
};

type Face = 'regular' | 'bold' | 'italic';
type Color = 'black' | 'muted' | 'accent';
type PageResult = { operations: string; usedHeight: number };
type DocumentPage = (writer: PageWriter) => void;

const WIDTH = 595.276;
const HEIGHT = 841.89;
const MARGIN = 45.354; // 16 mm — matching the web preview
const RIGHT = WIDTH - MARGIN;
const CONTENT_WIDTH = RIGHT - MARGIN;
const LOWER_LIMIT = HEIGHT - 52;
const translate = (s: DualText, lang: CVLang) => s[lang];

const headings = {
  id: {
    about: 'PROFIL', education: 'PENDIDIKAN', experience: 'PENGALAMAN RELEVAN',
    projects: 'PROYEK', skills: 'KETERAMPILAN', certificates: 'SERTIFIKAT',
    course: 'Mata kuliah relevan', gpa: 'IPK', graduate: 'Lulusan 2026',
  },
  en: {
    about: 'PROFILE', education: 'EDUCATION', experience: 'RELEVANT EXPERIENCE',
    projects: 'PROJECTS', skills: 'SKILLS', certificates: 'CERTIFICATES',
    course: 'Relevant coursework', gpa: 'GPA', graduate: 'Graduated 2026',
  },
} as const;

const certificateYears: Record<string,string> = {
  'CSS Essentials — Cisco Networking Academy': '2026',
  'Data Analytics Essentials — Cisco Networking Academy': '2026',
  'IT Customer Support Basics — Cisco Networking Academy': '2026',
  'Belajar Back-End Pemula dengan JavaScript — Dicoding': '2024',
  'Belajar Dasar Pemrograman JavaScript — Dicoding': '2024',
  'HR Value Chain — MySkill x Deloitte': '2023',
  'Graphic Design: Brand Identity — MySkill': '2023',
  'UI/UX Design: Design System in UI Design — MySkill': '2023',
  'UI/UX Design: Wireframing in UI/UX Design — MySkill': '2023',
};

// WinAnsi supports Latin characters, Indonesian punctuation, and smart dashes.
// Unrepresentable symbols are replaced with readable ASCII equivalents.
const substitutions: Record<string,string> = {
  '\u2013': '\u0096', '\u2014': '\u0097', '\u2018': '\u0091',
  '\u2019': '\u0092', '\u201c': '\u0093', '\u201d': '\u0094',
  '\u2022': '\u0095', '\u2026': '\u0085', '\u20ac': '\u0080',
  '\u2122': '\u0099', '\u00a0': ' ', '\u2192': '->', '\u2190': '<-',
  '\u2265': '>=', '\u2264': '<=', '\u00d7': 'x', '\u2713': 'v',
  '\u200b': '', '\u200e': '', '\u200f': '', '\u00ad': '',
};
function winAnsi(value: string): string {
  let output = '';
  for (const char of value.normalize('NFC')) {
    const cp = char.codePointAt(0) ?? 0;
    if (Object.prototype.hasOwnProperty.call(substitutions, char)) {
      output += substitutions[char];
    } else if ((cp >= 32 && cp <= 126) || (cp >= 160 && cp <= 255)) {
      output += String.fromCharCode(cp);
    } else if (char === '\n' || char === '\r' || char === '\t') {
      output += ' ';
    } else if (cp >= 0x300 && cp <= 0x36f) {
      // Ignore a combining mark if it was supplied.
    } else {
      const normalized = char.normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
      output += /^[\x20-\x7e]+$/.test(normalized) ? normalized : '?';
    }
  }
  return output.replace(/\s+/g,' ').trim();
}
function escapedPdfString(value: string) {
  const encoded = winAnsi(value);
  let out = '';
  for (const ch of encoded) {
    const code = ch.charCodeAt(0);
    if (ch === '\\' || ch === '(' || ch === ')') out += '\\' + ch;
    else if (code < 32 || code >= 127) out += '\\' + code.toString(8).padStart(3,'0');
    else out += ch;
  }
  return out;
}

const uppercaseWidths: Record<string,number> = {
  A:667,B:667,C:722,D:722,E:667,F:611,G:778,H:722,I:278,J:500,
  K:667,L:556,M:833,N:722,O:778,P:667,Q:778,R:722,S:667,T:611,
  U:722,V:667,W:944,X:667,Y:667,Z:611,
};
const lowercaseWidths: Record<string,number> = {
  a:556,b:556,c:500,d:556,e:556,f:278,g:556,h:556,i:222,j:222,k:500,
  l:222,m:833,n:556,o:556,p:556,q:556,r:333,s:500,t:278,
  u:556,v:500,w:722,x:500,y:500,z:500,
};
function glyphWidth(char: string): number {
  if (char === ' ') return 278;
  if (char >= '0' && char <= '9') return 556;
  if (uppercaseWidths[char]) return uppercaseWidths[char];
  if (lowercaseWidths[char]) return lowercaseWidths[char];
  if ('.,:;!|il'.includes(char)) return 260;
  if ('-_/\\'.includes(char)) return 325;
  if ('()[]{}'.includes(char)) return 333;
  return 500;
}
function textWidth(text: string, size: number, face: Face = 'regular') {
  const factor = face === 'bold' ? 1.04 : 1;
  return [...winAnsi(text)].reduce((sum,ch)=>sum+glyphWidth(ch),0) * size * factor / 1000;
}
function splitToLines(text: string, maxWidth: number, size: number, face: Face): string[] {
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  if (!words.length) return [];
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? current+' '+word : word;
    if (textWidth(candidate,size,face) <= maxWidth) {
      current = candidate;
      continue;
    }
    if (current) { lines.push(current); current = ''; }
    if (textWidth(word,size,face) <= maxWidth) {
      current = word;
      continue;
    }
    // A long URL must be broken without overrunning the printable page.
    let fragment = '';
    for (const c of word) {
      if (fragment && textWidth(fragment+c,size,face)>maxWidth) {
        lines.push(fragment);
        fragment = '';
      }
      fragment+=c;
    }
    current=fragment;
  }
  if (current) lines.push(current);
  return lines;
}
function fmt(n:number){return Number(n.toFixed(3)).toString();}

class PageWriter {
  y = MARGIN+11;
  operations: string[] = [];
  constructor(readonly scale: number, readonly modern: boolean, readonly isSecondPage: boolean) {}
  size(value:number){return value*this.scale;}
  draw(text:string,x:number,baselineFromTop:number,size:number,face:Face='regular',color:Color='black') {
    const normalized=escapedPdfString(text);
    if (!normalized) return;
    const rgb = color==='accent' && this.modern ? '.84 .26 .07' :
      color==='muted' ? '.28 .30 .34' : '0 0 0';
    const f = face==='bold'?'F2':face==='italic'?'F3':'F1';
    this.operations.push('BT /'+f+' '+fmt(size)+' Tf '+rgb+' rg 1 0 0 1 '+
      fmt(x)+' '+fmt(HEIGHT-baselineFromTop)+' Tm ('+normalized+') Tj ET');
  }
  rule(y:number){
    this.operations.push('.72 .72 .72 RG .5 w '+
      fmt(MARGIN)+' '+fmt(HEIGHT-y)+' m '+fmt(RIGHT)+' '+fmt(HEIGHT-y)+' l S');
  }
  lines(text:string,size:number,opts:{
    face?:Face; color?:Color; indent?:number; width?:number; leading?:number;
  }={}){
    const face=opts.face??'regular';
    const x=MARGIN+(opts.indent??0)*this.scale;
    const w=opts.width??RIGHT-x;
    const actualSize=this.size(size);
    const lines=splitToLines(text,w,actualSize,face);
    const leading=this.size(opts.leading??size*1.39);
    for (const line of lines) {
      this.draw(line,x,this.y,actualSize,face,opts.color);
      this.y+=leading;
    }
    return lines.length;
  }
  gap(n:number){this.y+=this.size(n);}
  section(title:string) {
    this.gap(3);
    this.lines(title,10.5,{face:'bold',leading:14});
    this.rule(this.y-4*this.scale);
    this.gap(4);
  }
  header(role:CVRole,lang:CVLang){
    const d=cvProfiles[role];
    this.lines('AL-MAN RAFFLI SAPUTRA',18.1,{face:'bold',leading:22});
    this.lines(translate(d.headline,lang),10.6,{face:'bold',leading:15});
    const contacts=[
      'Palembang, Sumatera Selatan  |  almanraffli1@gmail.com  |  +62 821-8394-5815',
      'linkedin.com/in/al-man-raffli  |  github.com/Darren0099',
    ];
    for (const item of contacts) this.lines(item,8.8,{color:'muted',leading:12});
    this.gap(3);
    this.rule(this.y);
    this.gap(17);
  }
  profile(role:CVRole,lang:CVLang){
    this.section(headings[lang].about);
    this.lines(translate(cvProfiles[role].summary,lang),9.75,{leading:13.65});
    this.gap(10);
  }
  education(lang:CVLang){
    const heading=headings[lang];
    this.section(heading.education);
    this.lines(translate(cvEducation.institution,lang)+'  |  '+cvEducation.period,10.0,{face:'bold',leading:14});
    this.lines(translate(cvEducation.degree,lang)+'  |  '+heading.gpa+' '+
      (lang==='id'?'3,66 / 4,00':'3.66 / 4.00')+'  |  '+heading.graduate,
      9.35,{leading:13});
    this.lines(heading.course+': '+translate(cvEducation.courses,lang),9.0,{leading:12.5,color:'muted'});
    this.gap(10);
  }
  entry(value:CVEntry,lang:CVLang,bulletLimit:number,showLink:boolean){
    const title=translate(value.title,lang);
    const size=this.size(10.0);
    const maxTitleWidth=CONTENT_WIDTH-this.size(123);
    const titleLines=splitToLines(title,maxTitleWidth,size,'bold');
    if (titleLines.length===0) return;
    for (let i=0;i<titleLines.length;i++){
      this.draw(titleLines[i],MARGIN,this.y,size,'bold');
      if (i===0) {
        const period=value.period;
        const periodX=RIGHT-textWidth(period,this.size(8.8));
        this.draw(period,Math.max(MARGIN+maxTitleWidth,periodX),this.y,this.size(8.8),'regular','muted');
      }
      this.y+=this.size(12.9);
    }
    this.lines(value.organization,9.15,{face:'italic',leading:12.5,color:'muted'});
    this.gap(3);
    for (const bullet of value.bullets.slice(0,bulletLimit)) {
      const bulletSize=this.size(9.25);
      const bulletIndent=this.size(14);
      this.draw('-',MARGIN+this.size(2),this.y,bulletSize);
      const lines=splitToLines(translate(bullet,lang),CONTENT_WIDTH-bulletIndent,bulletSize,'regular');
      for (const line of lines) {
        this.draw(line,MARGIN+bulletIndent,this.y,bulletSize);
        this.y+=this.size(12.65);
      }
      this.gap(2.2);
    }
    if (showLink && value.url) {
      this.lines(value.url.replace(/^https?:\/\//,''),8.1,{color:'muted',leading:11});
    }
    this.gap(8);
  }
  experiences(role:CVRole,lang:CVLang,count:number,bulletLimit=3){
    this.section(headings[lang].experience);
    cvProfiles[role].experience.slice(0,count).forEach(e=>this.entry(e,lang,bulletLimit,false));
    this.gap(2);
  }
  projects(role:CVRole,lang:CVLang,count:number,bulletLimit=3,showLinks=false){
    this.section(headings[lang].projects);
    cvProfiles[role].projects.slice(0,count).forEach(e=>this.entry(e,lang,bulletLimit,showLinks));
    this.gap(2);
  }
  skills(role:CVRole,lang:CVLang){
    this.section(headings[lang].skills);
    for(const skill of cvProfiles[role].skills){
      const label=translate(skill.label,lang);
      const value=typeof skill.value==='string'?skill.value:translate(skill.value,lang);
      // Keep each label beside its value when possible, but wrap long skill lists safely.
      const leftWidth=this.size(170);
      const left=splitToLines(label+':',leftWidth,this.size(9.15),'bold');
      const right=splitToLines(value,CONTENT_WIDTH-leftWidth-this.size(4),this.size(9.15),'regular');
      const rowSize=Math.max(left.length,right.length,1);
      for(let i=0;i<rowSize;i++){
        if (left[i]) this.draw(left[i],MARGIN,this.y,this.size(9.15),'bold');
        if (right[i]) this.draw(right[i],MARGIN+leftWidth+this.size(4),this.y,this.size(9.15));
        this.y+=this.size(12.55);
      }
      this.gap(2);
    }
    this.gap(9);
  }
  certificates(role:CVRole,lang:CVLang,limit:number){
    this.section(headings[lang].certificates);
    for(const raw of cvProfiles[role].certificates.slice(0,limit)){
      const year=raw.match(/\((20\d{2})\)$/)?.[1]??certificateYears[raw];
      const name=raw.replace(/\s*\(20\d{2}\)$/,'');
      const nameLines=splitToLines(name,CONTENT_WIDTH-this.size(38),this.size(9.05),'regular');
      for(let i=0;i<nameLines.length;i++){
        this.draw(nameLines[i],MARGIN,this.y,this.size(9.05));
        if(i===0 && year) {
          this.draw(year,RIGHT-this.size(28),this.y,this.size(8.7),'regular','muted');
        }
        this.y+=this.size(12.65);
      }
      this.gap(3);
    }
  }
  footer(number:number,total:number){
    const label=number+'/'+total;
    this.draw(label,RIGHT-textWidth(label,this.size(9),'regular'),HEIGHT-26,
      this.size(9),'regular','muted');
  }
  result(): PageResult{return {operations:this.operations.join('\n'),usedHeight:this.y};}
}

function pagePlans(options:CVPdfOptions):DocumentPage[]{
  const {role,lang,template,mode,pages}=options;
  const isIT=template.endsWith('it');
  const skillsFirst=role==='web'||role==='data';
  if (mode==='resume') {
    return [w=>{
      w.header(role,lang);
      w.profile(role,lang);
      if(skillsFirst)w.skills(role,lang);
      w.experiences(role,lang,2,2);
      if(!skillsFirst)w.skills(role,lang);
      w.projects(role,lang,1,2,false);
      w.education(lang);
      w.certificates(role,lang,2);
    }];
  }
  if(pages===1){
    return [w=>{
      w.header(role,lang);
      w.profile(role,lang);
      w.education(lang);
      w.experiences(role,lang,2,2);
      w.projects(role,lang,1,2,false);
      w.skills(role,lang);
      w.certificates(role,lang,2);
    }];
  }
  return [
    w=>{
      w.header(role,lang);
      w.profile(role,lang);
      w.education(lang);
      w.experiences(role,lang,3,3);
    },
    w=>{
      if(isIT){w.projects(role,lang,2,3,true);w.skills(role,lang);}
      else{w.skills(role,lang);w.projects(role,lang,2,3,true);}
      w.certificates(role,lang,role==='design'?4:3);
    },
  ];
}
function fittedPages(options:CVPdfOptions):PageResult[]{
  const plans=pagePlans(options);
  const modern=options.template.startsWith('modern');
  for(let s=1;s>=0.74;s-=0.02){
    const pages=plans.map((plan,index)=>{
      const writer=new PageWriter(s,modern,index>0);
      plan(writer);
      if(plans.length===2)writer.footer(index+1,2);
      return writer.result();
    });
    if(pages.every(p=>p.usedHeight<=LOWER_LIMIT))return pages;
  }
  throw new Error('Dokumen terlalu panjang untuk format A4. Silakan pilih versi 2 halaman atau kurangi konten.');
}

// Standard PDF objects and byte-accurate cross-reference table.
function assemblePdf(pages:PageResult[],options:CVPdfOptions):Uint8Array{
  const objects:string[]=[''];
  const add=(value:string)=>{objects.push(value);return objects.length-1;};
  const catalogId=add('');
  const pagesId=add('');
  const regularId=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const boldId=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const italicId=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');
  const pageIds:number[]=[];
  for(const page of pages){
    const data=page.operations+'\n';
    const streamId=add('<< /Length '+data.length+' >>\nstream\n'+data+'endstream');
    const pageId=add('<< /Type /Page /Parent '+pagesId+' 0 R /MediaBox [0 0 '+fmt(WIDTH)+' '+fmt(HEIGHT)+
      '] /Resources << /Font << /F1 '+regularId+' 0 R /F2 '+boldId+' 0 R /F3 '+italicId+
      ' 0 R >> >> /Contents '+streamId+' 0 R >>');
    pageIds.push(pageId);
  }
  const metadataId=add('<< /Title (Al-Man Raffli Saputra - '+
    (options.mode==='resume'?'Resume':'CV')+') /Author (Al-Man Raffli Saputra) '+
    '/Creator (Raffli CV Studio) >>');
  objects[catalogId]='<< /Type /Catalog /Pages '+pagesId+' 0 R >>';
  objects[pagesId]='<< /Type /Pages /Kids ['+pageIds.map(id=>id+' 0 R').join(' ')+
    '] /Count '+pages.length+' >>';
  let binary='%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const offsets:number[]=[0];
  for(let i=1;i<objects.length;i++){
    offsets.push(binary.length);
    binary+=i+' 0 obj\n'+objects[i]+'\nendobj\n';
  }
  const xrefOffset=binary.length;
  binary+='xref\n0 '+objects.length+'\n0000000000 65535 f \n';
  for(let i=1;i<objects.length;i++){
    binary+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
  }
  binary+='trailer\n<< /Size '+objects.length+' /Root '+catalogId+
    ' 0 R /Info '+metadataId+' 0 R >>\nstartxref\n'+xrefOffset+'\n%%EOF\n';
  const bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i)&255;
  return bytes;
}
export function generateCvPdf(options:CVPdfOptions){
  return assemblePdf(fittedPages(options),options);
}
export function downloadCvPdf(options:CVPdfOptions){
  const bytes=generateCvPdf(options);
  const blob=new Blob([bytes.buffer as ArrayBuffer],{type:'application/pdf'});
  const fileName=[
    'Al-Man-Raffli-Saputra',
    options.mode==='resume'?'Resume':'CV',
    options.role.toUpperCase(),
    options.lang.toUpperCase(),
    (options.mode==='resume'?1:options.pages)+'Page',
  ].join('_')+'.pdf';
  const url=URL.createObjectURL(blob);
  const anchor=document.createElement('a');
  anchor.href=url;
  anchor.download=fileName;
  anchor.style.display='none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Keep the object URL alive long enough for browsers to start the download.
  window.setTimeout(()=>URL.revokeObjectURL(url),10_000);
}
