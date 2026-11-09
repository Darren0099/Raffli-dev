import {NextRequest,NextResponse} from 'next/server';
import {allowedOrigin,requireAdmin,unauthorized} from '@/lib/portfolio-cms';
import {readCmsProjects,mutateCmsProjects,type CmsProjectRecord,type ProjectStatus} from '@/lib/github-portfolio-store';
import {projectsData,type Project} from '@/data/projectsData';
export const runtime='nodejs';
const allowedStatuses=['draft','published','archived'] as const;
const adminCache={'Cache-Control':'no-store'};
function reply(error:string,status=400){return NextResponse.json({error},{status,headers:adminCache});}
function validUrl(s:string){if(!s)return true;try{return ['https:','http:'].includes(new URL(s).protocol)}catch{return false}}
function validAsset(s:string){return !s||/^\/(?!\/)/.test(s)||validUrl(s)}
function validProject(value:unknown):value is Project{
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const p=value as Record<string,unknown>;
 if(typeof p.slug!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)||p.slug.length>120)return false;
 for(const f of ['title','client','category','image','link','buildTime']){
  if(typeof p[f]!=='string'||String(p[f]).length>3000)return false;
 }
 if(!p.title||!p.client||!p.category||!p.link||!validUrl(p.link as string))return false;
 if(p.repoUrl&&(!validUrl(p.repoUrl as string)))return false;
 if(!Array.isArray(p.tools)||p.tools.length>60||!p.tools.every(x=>typeof x==='string'&&x.length<=90))return false;
 for(const f of ['image','logo','heroImage','largeBannerImage']){
  if(p[f]!=null&&(typeof p[f]!=='string'||!validAsset(p[f] as string)))return false;
 }
 for(const f of ['galleryImages','gridThumbnails','bottomGalleryImages','outcomeGallery']){
  if(p[f]!=null&&(!Array.isArray(p[f])||p[f].length>60||!p[f].every((x:unknown)=>typeof x==='string'&&validAsset(x))))return false;
 }
 return JSON.stringify(p).length<=100_000;
}
function getStatus(status:unknown):ProjectStatus|null{
 return typeof status==='string'&&(allowedStatuses as readonly string[]).includes(status)?status as ProjectStatus:null;
}
function cleanData(project:Project,id:number):Project{return {...project,id};}
function storageError(e:unknown){
 const message=e instanceof Error?e.message:'GitHub service unavailable';
 return reply(message,/(403|401|permission|token|configure)/i.test(message)?503:502);
}
export async function GET(req:NextRequest){
 if(!requireAdmin(req))return unauthorized();
 try{
  const all=await readCmsProjects();
  return NextResponse.json({projects:all.filter(r=>r.status!=='deleted')},{headers:adminCache});
 }catch(e){return storageError(e);}
}
export async function POST(req:NextRequest){
 if(!allowedOrigin(req))return reply('Invalid origin',403);
 if(!requireAdmin(req))return unauthorized();
 let payload:{data?:unknown;status?:unknown};
 try{payload=await req.json();}catch{return reply('Invalid JSON');}
 if(!validProject(payload.data))return reply('Invalid project fields');
 const status=getStatus(payload.status);if(!status)return reply('Invalid project status');
 try{
  let inserted:CmsProjectRecord|undefined;
  await mutateCmsProjects(records=>{
   const slug=payload.data!.slug;
   if(records.some(r=>r.slug===slug)||projectsData.some(p=>p.slug===slug && !records.some(r=>r.slug===slug)))
    throw Error('Slug already exists; edit the existing project instead');
   const id=Math.max(999,...records.map(r=>r.id),...projectsData.map(p=>p.id))+1;
   const now=new Date().toISOString();
   inserted={id,slug,status,data:cleanData(payload.data as Project,id),created_at:now,updated_at:now};
   return [...records,inserted];
  },'cms(projects): create '+payload.data.slug);
  return NextResponse.json({project:inserted},{status:201,headers:adminCache});
 }catch(e){return storageError(e);}
}
export async function PATCH(req:NextRequest){
 if(!allowedOrigin(req))return reply('Invalid origin',403);
 if(!requireAdmin(req))return unauthorized();
 let payload:{id?:unknown;data?:unknown;status?:unknown};
 try{payload=await req.json();}catch{return reply('Invalid JSON');}
 if(!Number.isSafeInteger(payload.id)||Number(payload.id)<1||!validProject(payload.data))return reply('Invalid project fields');
 const status=getStatus(payload.status);if(!status)return reply('Invalid project status');
 try{
  let updated:CmsProjectRecord|undefined;
  await mutateCmsProjects(records=>{
   const original=records.find(r=>r.id===payload.id && r.status!=='deleted');
   if(!original)throw Error('Project not found');
   if(records.some(r=>r.id!==payload.id && r.slug===payload.data!.slug))throw Error('Slug already exists');
   if(projectsData.some(p=>p.slug===payload.data!.slug && p.slug!==original.slug))throw Error('Slug already exists in legacy projects');
   updated={...original,slug:payload.data!.slug,status,data:cleanData(payload.data as Project,original.id),updated_at:new Date().toISOString()};
   return records.map(r=>r.id===payload.id?updated!:r);
  },'cms(projects): update #'+payload.id);
  return NextResponse.json({project:updated},{headers:adminCache});
 }catch(e){return storageError(e);}
}
export async function DELETE(req:NextRequest){
 if(!allowedOrigin(req))return reply('Invalid origin',403);
 if(!requireAdmin(req))return unauthorized();
 const id=Number(req.nextUrl.searchParams.get('id'));
 if(!Number.isSafeInteger(id)||id<1)return reply('Invalid project ID');
 try{
  await mutateCmsProjects(records=>{
   if(!records.some(r=>r.id===id && r.status!=='deleted'))throw Error('Project not found');
   // Tombstone rather than remove: a legacy project must not reappear from the original array.
   return records.map(r=>r.id===id?{...r,status:'deleted' as const,updated_at:new Date().toISOString()}:r);
  },'cms(projects): delete #'+id);
  return NextResponse.json({ok:true},{headers:adminCache});
 }catch(e){return storageError(e);}
}
