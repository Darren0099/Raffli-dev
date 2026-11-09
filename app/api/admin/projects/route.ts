import { NextRequest, NextResponse } from 'next/server';
import {allowedOrigin,baseUrl,requireAdmin,supabaseHeaders,unauthorized,withSession} from '@/lib/portfolio-cms';
import type { Project } from '@/data/projectsData';

function validProject(data: unknown): data is Project {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const x=data as Record<string,unknown>;
  return typeof x.slug==='string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x.slug) && x.slug.length<=120 &&
    typeof x.title==='string' && x.title.length>0 && x.title.length<=180 &&
    typeof x.client==='string' && typeof x.category==='string' &&
    typeof x.image==='string' && typeof x.link==='string' &&
    typeof x.buildTime==='string' && Array.isArray(x.tools) && x.tools.every(y=>typeof y==='string') &&
    JSON.stringify(x).length<=100000;
}
function safeUrl(value: string) {
  if (!value) return true;
  try {return ['https:','http:'].includes(new URL(value).protocol);}catch{return false;}
}
function validateLinks(project: Project) {
  return [project.link,project.repoUrl||''].every(safeUrl) &&
    [project.image,project.logo||'',project.heroImage||'',project.largeBannerImage||'',...(project.galleryImages||[]),...(project.gridThumbnails||[]),...(project.bottomGalleryImages||[]),...(project.outcomeGallery||[])].every(v=>!v || v.startsWith('/') || safeUrl(v));
}
const jsonHeaders={'Content-Type':'application/json','Prefer':'return=representation'};
async function query(path: string, method: string, token: string, body?:unknown) {
  return fetch(baseUrl()+'/rest/v1/portfolio_projects'+path, {method, headers:{...supabaseHeaders(token),...jsonHeaders},body:body===undefined?undefined:JSON.stringify(body),cache:'no-store'});
}
export async function GET(req: NextRequest) {
  const s=await requireAdmin(req);if(!s)return unauthorized();
  try {
    const r=await query('?select=id,slug,status,data,updated_at&order=updated_at.desc','GET',s.token);
    if(!r.ok)return NextResponse.json({error:'Unable to load projects'},{status:502});
    return withSession(NextResponse.json({projects:await r.json()}),s);
  }catch{return NextResponse.json({error:'Database unavailable'},{status:502});}
}
export async function POST(req: NextRequest) {
  if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
  const s=await requireAdmin(req);if(!s)return unauthorized();
  let payload:{data?:unknown;status?:unknown};
  try{payload=await req.json();}catch{return NextResponse.json({error:'Invalid JSON'},{status:400});}
  if(!validProject(payload.data)||!validateLinks(payload.data)||!['draft','published','archived'].includes(String(payload.status)))return NextResponse.json({error:'Invalid project fields'},{status:400});
  const {id,...data}=payload.data;
  try{
    const r=await query('','POST',s.token,{slug:data.slug,status:payload.status,data});
    if(!r.ok)return NextResponse.json({error:r.status===409?'Slug already exists':'Could not create project'},{status:r.status===409?409:502});
    return withSession(NextResponse.json({project:(await r.json())[0]},{status:201}),s);
  }catch{return NextResponse.json({error:'Database unavailable'},{status:502});}
}
export async function PATCH(req: NextRequest) {
  if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
  const s=await requireAdmin(req);if(!s)return unauthorized();
  let payload:{id?:unknown;data?:unknown;status?:unknown};
  try{payload=await req.json();}catch{return NextResponse.json({error:'Invalid JSON'},{status:400});}
  if(!Number.isSafeInteger(payload.id)||Number(payload.id)<1||!validProject(payload.data)||!validateLinks(payload.data)||!['draft','published','archived'].includes(String(payload.status)))return NextResponse.json({error:'Invalid project fields'},{status:400});
  const {id,...data}=payload.data;
  try{
    const r=await query('?id=eq.'+Number(payload.id),'PATCH',s.token,{slug:data.slug,status:payload.status,data,updated_at:new Date().toISOString()});
    if(!r.ok)return NextResponse.json({error:r.status===409?'Slug already exists':'Could not update project'},{status:r.status===409?409:502});
    const items=await r.json();
    if(!items.length)return NextResponse.json({error:'Not found'},{status:404});
    return withSession(NextResponse.json({project:items[0]}),s);
  }catch{return NextResponse.json({error:'Database unavailable'},{status:502});}
}
export async function DELETE(req: NextRequest) {
  if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
  const s=await requireAdmin(req);if(!s)return unauthorized();
  const id=Number(req.nextUrl.searchParams.get('id'));
  if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:'Invalid ID'},{status:400});
  try{
    const r=await query('?id=eq.'+id,'DELETE',s.token);
    if(!r.ok)return NextResponse.json({error:'Delete failed'},{status:502});
    return withSession(NextResponse.json({ok:true}),s);
  }catch{return NextResponse.json({error:'Database unavailable'},{status:502});}
}
