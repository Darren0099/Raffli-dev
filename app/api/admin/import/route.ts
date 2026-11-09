import {NextRequest,NextResponse} from 'next/server';
import {projectsData} from '@/data/projectsData';
import {allowedOrigin,baseUrl,requireAdmin,supabaseHeaders,unauthorized,withSession} from '@/lib/portfolio-cms';
// Manual, authenticated, idempotent import. Never runs automatically on deployments.
export async function POST(req:NextRequest){
 if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 const s=await requireAdmin(req);if(!s)return unauthorized();
 try {
  const pre=await fetch(baseUrl()+'/rest/v1/portfolio_projects?select=slug',{headers:supabaseHeaders(s.token),cache:'no-store'});
  if(!pre.ok)return NextResponse.json({error:'Unable to verify existing projects'},{status:502});
  const existing=new Set((await pre.json() as {slug:string}[]).map(x=>x.slug));
  const added=projectsData.filter(p=>!existing.has(p.slug));
  if(!added.length)return withSession(NextResponse.json({imported:0,total:projectsData.length}),s);
  const payload=added.map(p=>{const {id,...data}=p;return {slug:p.slug,status:'published',data};});
  const r=await fetch(baseUrl()+'/rest/v1/portfolio_projects',{
   method:'POST',headers:{...supabaseHeaders(s.token),'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify(payload),cache:'no-store'
  });
  if(!r.ok)return NextResponse.json({error:'Import failed'},{status:502});
  return withSession(NextResponse.json({imported:added.length,total:projectsData.length}),s);
 }catch{return NextResponse.json({error:'Database unavailable'},{status:502});}
}
