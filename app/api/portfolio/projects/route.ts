import {NextResponse} from 'next/server';
import {projectsData} from '@/data/projectsData';
import {baseUrl,supabaseHeaders} from '@/lib/portfolio-cms';
export const dynamic='force-dynamic';
export async function GET(){
  if(process.env.PORTFOLIO_CMS_ENABLED!=='true'||!process.env.SUPABASE_URL||!process.env.SUPABASE_PUBLISHABLE_KEY)
    return NextResponse.json({projects:projectsData,source:'static'},{headers:{'Cache-Control':'public, max-age=60'}});
  try{
    const r=await fetch(baseUrl()+'/rest/v1/portfolio_projects?select=id,data&status=eq.published&order=updated_at.desc',{
      headers:supabaseHeaders(),cache:'no-store'
    });
    if(!r.ok)throw Error('Database unavailable');
    const rows=await r.json() as {id:number;data:Record<string,unknown>}[];
    return NextResponse.json({projects:rows.map(row=>({...row.data,id:row.id})),source:'cms'},{headers:{'Cache-Control':'public, max-age=60'}});
  }catch{
    // Do not return legacy static records when CMS is active: they could include archived projects.
    return NextResponse.json({error:'Portfolio projects temporarily unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
