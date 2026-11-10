import {NextResponse} from 'next/server';
import {projectsData,type Project} from '@/data/projectsData';
import {githubCmsConfigured,readCmsProjects} from '@/lib/github-portfolio-store';
export const runtime='nodejs';
export const dynamic='force-dynamic';
// Keep the curated design archive first and approved imagery consistent even
// if project copy is managed through the GitHub CMS.
function prioritizeProjects(items:Project[]):Project[]{
 const fixed=items.map((item)=>{
  const legacy=projectsData.find(p=>p.slug===item.slug);
  if(!legacy)return item;
  if(item.slug==='mobius')return {...item,image:legacy.image,heroImage:legacy.heroImage,largeBannerImage:legacy.largeBannerImage,galleryImages:legacy.galleryImages,gridThumbnails:legacy.gridThumbnails,bottomGalleryImages:legacy.bottomGalleryImages,outcomeGallery:legacy.outcomeGallery};
  if(item.slug==='palembang-go-vacation')return {...item,image:legacy.image};
  return item;
 });
 return fixed.sort((a,b)=>Number(b.slug==='youth-visual-identity')-Number(a.slug==='youth-visual-identity'));
}
export async function GET(){
 const headers={'Cache-Control':'public, max-age=30, s-maxage=30'};
 if(process.env.PORTFOLIO_CMS_ENABLED!=='true'){
  return NextResponse.json({projects:prioritizeProjects(projectsData),source:'static'},{headers});
 }
 if(!githubCmsConfigured()){
  return NextResponse.json({error:'CMS storage not configured'},{status:503,headers:{'Cache-Control':'no-store'}});
 }
 try{
  const rows=await readCmsProjects();
  // CMS records (including archived/deleted) override legacy data by slug.
  const overridden=new Set(rows.map(r=>r.slug));
  const legacy=projectsData.filter(p=>!overridden.has(p.slug));
  const published:Project[]=rows.filter(r=>r.status==='published').map(r=>({...r.data,id:r.id}));
  return NextResponse.json({projects:prioritizeProjects([...published,...legacy]),source:'github'},{headers});
 }catch{
  // Fail closed. Never restore legacy entries that an admin has hidden in CMS.
  return NextResponse.json({error:'Portfolio projects temporarily unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});
 }
}
