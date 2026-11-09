import {NextRequest,NextResponse} from 'next/server';
import {projectsData} from '@/data/projectsData';
import {mutateCmsProjects} from '@/lib/github-portfolio-store';
import {allowedOrigin,requireAdmin,unauthorized} from '@/lib/portfolio-cms';
export const runtime='nodejs';
export async function POST(req:NextRequest){
 if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 if(!requireAdmin(req))return unauthorized();
 try{
  let imported=0;
  await mutateCmsProjects(rows=>{
   imported=0;
   const used=new Set(rows.map(r=>r.slug));
   const now=new Date().toISOString();
   const next=[...rows];
   for(const p of projectsData){
    if(used.has(p.slug))continue;
    // Reuse the old ID; URLs depend on slug, not integer IDs.
    const id=next.some(r=>r.id===p.id)?Math.max(999,...next.map(r=>r.id))+1:p.id;
    next.push({id,slug:p.slug,status:'published',data:{...p,id},created_at:now,updated_at:now});
    used.add(p.slug);imported++;
   }
   return next;
  },'cms(projects): import existing portfolio projects');
  return NextResponse.json({imported,total:projectsData.length},{headers:{'Cache-Control':'no-store'}});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Import failed'},{status:502});}
}
