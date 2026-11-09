'use client';

import {useEffect,useState} from 'react';
import type {Project} from '@/data/projectsData';
import './admin.css';

type Status='draft'|'published'|'archived';
type DbRow={id:number;slug:string;status:Status;data:Project;updated_at:string};
type ImageField='image'|'heroImage'|'logo'|'largeBannerImage';
const blank:Project={
 id:0,slug:'',title:'',client:'Independent Project',category:'Web Development',
 image:'',link:'',repoUrl:'',tools:[],buildTime:'2026',isExternalLink:true,
 services:{pills:[],list:[]},descriptionParagraphs:[],galleryImages:[],gridThumbnails:[],
 bottomGalleryImages:[],outcomeGallery:[],outcomeStats:[]
};
const splitLines=(value:string)=>value.split('\n').map(x=>x.trim()).filter(Boolean);
const list=(items?:string[])=>items?.join('\n')||'';
const toSlug=(s:string)=>s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,120);
const fileLabels:Record<ImageField,string>={image:'Card cover',heroImage:'Hero image',logo:'Project logo',largeBannerImage:'Large banner'};
function Input({label,value,onChange,placeholder,type='text'}:{label:string;value:string;onChange:(value:string)=>void;placeholder?:string;type?:string}){
 return <label className="rc-field"><span>{label}</span><input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>;
}
function Lines({label,value,onChange,rows=4}:{label:string;value:string;onChange:(value:string)=>void;rows?:number}){
 return <label className="rc-field"><span>{label}</span><textarea rows={rows} value={value} onChange={e=>onChange(e.target.value)}/></label>;
}
export default function RaffliAdmin(){
 const [authenticated,setAuthenticated]=useState(false);
 const [checking,setChecking]=useState(true);
 const [credentials,setCredentials]=useState({username:'',password:''});
 const [records,setRecords]=useState<DbRow[]>([]);
 const [selected,setSelected]=useState<number|null>(null);
 const [draft,setDraft]=useState<Project>({...blank});
 const [status,setStatus]=useState<Status>('draft');
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState('');
 const [error,setError]=useState('');
 const [tab,setTab]=useState<'editor'|'preview'>('editor');
 const [advanced,setAdvanced]=useState(false);
 const [slugCustomized,setSlugCustomized]=useState(false);
 const update=(field:keyof Project,value:unknown)=>setDraft(old=>({...old,[field]:value}));
 async function load(){
  const r=await fetch('/api/admin/projects',{cache:'no-store'});
  if(r.status===401){setAuthenticated(false);return;}
  if(!r.ok)throw Error('Gagal membaca proyek');
  const data=await r.json() as {projects:DbRow[]};
  setRecords(data.projects);
 }
 useEffect(()=>{
  let mounted=true;
  (async()=>{
   try{
    const r=await fetch('/api/admin/session',{cache:'no-store'});
    if(mounted&&r.ok){setAuthenticated(true);await load();}
   }catch{}finally{if(mounted)setChecking(false);}
  })();
  return()=>{mounted=false};
 },[]);
 async function login(e:React.FormEvent){
  e.preventDefault();setBusy(true);setError('');
  try{
   const r=await fetch('/api/admin/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(credentials)});
   const data=await r.json();
   if(!r.ok)throw Error(data.error||'Login gagal');
   setAuthenticated(true);setCredentials({username:'',password:''});await load();
  }catch(e){setError(e instanceof Error?e.message:'Login gagal');}finally{setBusy(false);}
 }
 async function logout(){await fetch('/api/admin/session',{method:'DELETE'});setAuthenticated(false);setRecords([]);setSelected(null);setDraft({...blank});}
 function edit(row:DbRow){setSlugCustomized(true);setSelected(row.id);setDraft({...blank,...row.data,id:row.id});setStatus(row.status);setNotice('');setError('');setTab('editor');window.scrollTo({top:0,behavior:'smooth'});}
 function create(){setSlugCustomized(false);setSelected(null);setDraft({...blank,services:{pills:[],list:[]}});setStatus('draft');setNotice('');setError('');setTab('editor');}
 async function save(){
  setBusy(true);setError('');setNotice('');
  try{
   const payload={...(selected!==null?{id:selected}:{}),data:{...draft,slug:draft.slug||toSlug(draft.title)},status};
   const r=await fetch('/api/admin/projects',{method:selected===null?'POST':'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   const data=await r.json();if(!r.ok)throw Error(data.error||'Gagal menyimpan');
   await load();edit(data.project as DbRow);setNotice('Proyek disimpan sebagai commit GitHub. Agar muncul di publik, pilih Published dan aktifkan CMS setelah konfigurasi.');
  }catch(e){setError(e instanceof Error?e.message:'Gagal menyimpan');}finally{setBusy(false);}
 }
 async function remove(){
  if(selected===null||!window.confirm('Hapus proyek dari galeri? Riwayat datanya tetap bisa dipulihkan melalui GitHub commits.'))return;
  setBusy(true);setError('');
  try{
   const r=await fetch('/api/admin/projects?id='+selected,{method:'DELETE'});
   if(!r.ok)throw Error('Gagal menghapus proyek');
   create();await load();setNotice('Proyek disembunyikan dari galeri; riwayatnya tetap tersedia di GitHub.');
  }catch(e){setError(e instanceof Error?e.message:'Gagal menghapus');}finally{setBusy(false);}
 }
 async function importLegacy(){
  if(!window.confirm('Impor proyek dari projectsData.ts? Proyek dengan slug yang sudah ada tidak akan ditimpa.'))return;
  setBusy(true);setError('');
  try{
   const r=await fetch('/api/admin/import',{method:'POST'});
   const data=await r.json();
   if(!r.ok)throw Error(data.error||'Impor gagal');
   await load();setNotice(data.imported+' proyek lama berhasil diimpor; '+data.total+' proyek tersedia di data sumber.');
  }catch(e){setError(e instanceof Error?e.message:'Impor gagal');}finally{setBusy(false);}
 }
 async function upload(field:ImageField,file?:File){
  if(!file)return;
  setBusy(true);setError('');
  try{
   const fd=new FormData();fd.append('file',file);
   const r=await fetch('/api/admin/upload',{method:'POST',body:fd});
   const data=await r.json();
   if(!r.ok)throw Error(data.error||'Upload gagal');
   update(field,data.url);setNotice('Gambar berhasil di-commit ke GitHub. Simpan proyek; gambar akan tersedia setelah deployment selesai.');
  }catch(e){setError(e instanceof Error?e.message:'Upload gagal');}finally{setBusy(false);}
 }
 async function uploadGallery(file?:File){
  if(!file)return;
  setBusy(true);setError('');
  try{
   const fd=new FormData();fd.append('file',file);
   const r=await fetch('/api/admin/upload',{method:'POST',body:fd});
   const data=await r.json();if(!r.ok)throw Error(data.error||'Upload gagal');
   update('galleryImages',[...(draft.galleryImages||[]),data.url]);setNotice('Gambar galeri di-commit ke GitHub. Simpan proyek; gambar akan tersedia setelah deployment selesai.');
  }catch(e){setError(e instanceof Error?e.message:'Upload gagal');}finally{setBusy(false);}
 }
 if(checking)return <main className="rc-root"><div className="rc-login"><strong>RAFFLI / CMS</strong><p>Checking access...</p></div></main>;
 if(!authenticated)return <main className="rc-root"><div className="rc-login">
  <span>PRIVATE WORKSPACE / OWNER ACCESS</span><h1>Raffli<span>.</span>CMS</h1>
  <p>Panel ini tidak terhubung ke navigasi publik. Hanya pemilik akun admin yang berwenang dapat mengelola proyek.</p>
  <form onSubmit={login}>
   <Input label="Username admin" value={credentials.username} onChange={username=>setCredentials(p=>({...p,username}))} />
   <Input label="Password" type="password" value={credentials.password} onChange={password=>setCredentials(p=>({...p,password}))}/>
   {error&&<p role="alert" className="rc-error">{error}</p>}
   <button type="submit" disabled={busy}>{busy?'Memverifikasi...':'Sign in →'}</button>
  </form>
  <a href="/">← Back to portfolio</a>
 </div></main>;
 return <main className="rc-root">
  <header className="rc-top">
   <div><span>PRIVATE CONTENT MANAGEMENT</span><h1>Raffli<span>.</span>CMS</h1></div>
   <nav><a href="/projects" target="_blank" rel="noreferrer">Public portfolio ↗</a><button type="button" onClick={logout}>Sign out</button></nav>
  </header>
  <div className="rc-layout">
   <aside className="rc-sidebar">
    <div className="rc-sidebar-title"><span>YOUR PROJECTS</span><button type="button" onClick={create}>+ New</button></div>
    <button className={'rc-entry '+(selected===null?'active':'')} onClick={create}><strong>+ Create a new project</strong><small>Start from a blank project</small></button>
    {records.map(row=><button type="button" className={'rc-entry '+(row.id===selected?'active':'')} key={row.id} onClick={()=>edit(row)}>
      <strong>{row.data?.title||row.slug}</strong><small>{row.status.toUpperCase()} · {row.slug}</small>
    </button>)}
    <div className="rc-import"><p>Existing projects still live in <code>projectsData.ts</code> until imported.</p><button type="button" disabled={busy} onClick={importLegacy}>Import existing projects</button></div>
   </aside>
   <div className="rc-editor">
    <div className="rc-editor-heading">
     <div><small>{selected===null?'NEW PROJECT':'EDIT PROJECT / #'+selected}</small><h2>{draft.title||'Untitled project'}<span>.</span></h2></div>
     <div className="rc-buttons">
      <button type="button" onClick={()=>setTab('editor')} className={tab==='editor'?'on':''}>Editor</button>
      <button type="button" onClick={()=>setTab('preview')} className={tab==='preview'?'on':''}>Preview</button>
     </div>
    </div>
    {error&&<div role="alert" className="rc-error">{error}</div>}
    {notice&&<div role="status" className="rc-success">{notice}</div>}
    {tab==='preview'?<div className="rc-preview">
      {draft.heroImage||draft.image?<img src={draft.heroImage||draft.image} alt="Project preview"/>:<div className="rc-preview-blank">IMAGE PREVIEW</div>}
      <span>{draft.category} / {draft.buildTime}</span><h2>{draft.title||'Untitled project'}</h2>
      <p>{draft.summaryQuote||'No project summary yet.'}</p><h3>Overview</h3>
      {draft.descriptionParagraphs?.map((p,i)=><p key={i}>{p}</p>)}
      <p>Preview only. Not visible to the public until published.</p>
     </div>:<>
     <section className="rc-panel"><h3>01 / Project identity</h3>
      <div className="rc-form-grid">
       <Input label="Project title *" value={draft.title} onChange={v=>setDraft(old=>({...old,title:v,...(!slugCustomized?{slug:toSlug(v)}:{})}))}/>
       <Input label="Slug * (URL identifier)" value={draft.slug} onChange={v=>{setSlugCustomized(true);update('slug',toSlug(v));}}/>
       <Input label="Client / Organization *" value={draft.client} onChange={v=>update('client',v)}/>
       <Input label="Category *" value={draft.category} onChange={v=>update('category',v)}/>
       <Input label="Build time / Year" value={draft.buildTime} onChange={v=>update('buildTime',v)}/>
       <label className="rc-field"><span>Publication status</span><select value={status} onChange={e=>setStatus(e.target.value as Status)}><option value="draft">Draft — private</option><option value="published">Published — public</option><option value="archived">Archived — hidden</option></select></label>
       <Input label="Live project URL *" value={draft.link} onChange={v=>update('link',v)} placeholder="https://..."/>
       <Input label="Source code URL" value={draft.repoUrl||''} onChange={v=>update('repoUrl',v)} placeholder="https://github.com/..."/>
      </div>
      <label className="rc-check"><input type="checkbox" checked={!!draft.isExternalLink} onChange={e=>update('isExternalLink',e.target.checked)}/> Open external link in a new tab</label>
      <Lines label="Technology stack (one per line)" value={list(draft.tools)} onChange={v=>update('tools',splitLines(v))} rows={3}/>
     </section>
     <section className="rc-panel"><h3>02 / Visual assets</h3>
      <p>Uploaded images are committed to the GitHub repository. Existing <code>/img/...</code> links remain supported.</p>
      <div className="rc-form-grid">{(Object.keys(fileLabels) as ImageField[]).map(field=><div key={field} className="rc-upload">
       <Input label={fileLabels[field]} value={draft[field]||''} onChange={v=>update(field,v)} placeholder="/img/cover.png or https://..."/>
       <label><span>Upload {fileLabels[field]}</span><input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e=>{void upload(field,e.currentTarget.files?.[0]);e.currentTarget.value='';}}/></label>
       {draft[field]&&<img src={draft[field]} alt={fileLabels[field]+' preview'}/>}
      </div>)}</div>
      <Lines label="Gallery image URLs (one per line)" value={list(draft.galleryImages)} onChange={v=>update('galleryImages',splitLines(v))}/>
      <label className="rc-upload-extra">Upload image to gallery<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e=>{void uploadGallery(e.currentTarget.files?.[0]);e.currentTarget.value='';}}/></label>
      <div className="rc-form-grid">
       <Lines label="Grid thumbnail URLs" value={list(draft.gridThumbnails)} onChange={v=>update('gridThumbnails',splitLines(v))}/>
       <Lines label="Bottom gallery URLs" value={list(draft.bottomGalleryImages)} onChange={v=>update('bottomGalleryImages',splitLines(v))}/>
       <Lines label="Outcome gallery URLs" value={list(draft.outcomeGallery)} onChange={v=>update('outcomeGallery',splitLines(v))}/>
      </div>
     </section>
     <section className="rc-panel"><h3>03 / Case study & storytelling</h3>
      <Lines label="Short quote / project summary" value={draft.summaryQuote||''} onChange={v=>update('summaryQuote',v)} rows={2}/>
      <Lines label="Overview paragraphs (separate using a blank line)" value={(draft.descriptionParagraphs||[]).join('\n\n')} onChange={v=>update('descriptionParagraphs',v.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean))} rows={7}/>
      <div className="rc-form-grid">
       <Lines label="Service tags (one per line)" value={list(draft.services?.pills)} onChange={v=>update('services',{...draft.services,pills:splitLines(v)})}/>
       <Lines label="Services (one per line)" value={list(draft.services?.list)} onChange={v=>update('services',{...draft.services,list:splitLines(v)})}/>
      </div>
      {(['section1','section2'] as const).map(section=><div key={section} className="rc-subpanel">
       <Input label={section==='section1'?'Section 1 title':'Section 2 title'} value={draft[`${section}Title`]||''} onChange={v=>update(`${section}Title` as keyof Project,v)}/>
       <div className="rc-form-grid">
        <Lines label="Paragraph 1" value={draft[`${section}Text1`]||''} onChange={v=>update(`${section}Text1` as keyof Project,v)}/>
        <Lines label="Paragraph 2" value={draft[`${section}Text2`]||''} onChange={v=>update(`${section}Text2` as keyof Project,v)}/>
       </div>
      </div>)}
      <Input label="Outcome section title" value={draft.outcomeTitle||''} onChange={v=>update('outcomeTitle',v)}/>
      <Lines label="Outcome description" value={draft.outcomeText||''} onChange={v=>update('outcomeText',v)}/>
      <Lines label="Outcome statistics (one per line, FORMAT: Label | Value)" value={(draft.outcomeStats||[]).map(x=>x.label+' | '+x.value).join('\n')} onChange={v=>update('outcomeStats',splitLines(v).map(line=>{const [label,...other]=line.split('|');return {label:label.trim(),value:other.join('|').trim()};}))}/>
     </section>
     <section className="rc-panel">
      <button type="button" className="rc-advanced-toggle" onClick={()=>setAdvanced(p=>!p)}>{advanced?'Hide':'Show'} full project JSON (advanced)</button>
      {advanced&&<textarea className="rc-advanced-json" spellCheck={false} rows={14} value={JSON.stringify(draft,null,2)} readOnly aria-label="Read-only project JSON"/>}
     </section>
     </>}
    <div className="rc-savebar">
     {selected!==null&&<button type="button" disabled={busy} className="danger" onClick={remove}>Delete project</button>}
     <span>{status.toUpperCase()}</span>
     <button type="button" className="rc-save" disabled={busy||!draft.title||!draft.slug||!draft.client||!draft.category||!draft.link} onClick={save}>{busy?'Saving...':selected===null?'Create project →':'Save changes →'}</button>
    </div>
   </div>
  </div>
 </main>;
}
