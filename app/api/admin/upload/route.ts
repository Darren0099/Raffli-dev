import {NextRequest,NextResponse} from 'next/server';
import {allowedOrigin,baseUrl,requireAdmin,supabaseHeaders,unauthorized,withSession} from '@/lib/portfolio-cms';
export async function POST(req:NextRequest){
  if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
  const s=await requireAdmin(req);if(!s)return unauthorized();
  let data:FormData;
  try{data=await req.formData();}catch{return NextResponse.json({error:'Invalid form'},{status:400});}
  const file=data.get('file');
  if(!(file instanceof File))return NextResponse.json({error:'No image file'},{status:400});
  const allowed:Record<string,string>={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'};
  if(!allowed[file.type]||file.size>6*1024*1024||!file.size)return NextResponse.json({error:'Only JPEG, PNG, WebP or AVIF images up to 6 MB'},{status:400});
  const key=s.user.id+'/'+crypto.randomUUID()+'.'+allowed[file.type];
  try{
    const r=await fetch(baseUrl()+'/storage/v1/object/portfolio-images/'+key,{
      method:'POST',headers:{...supabaseHeaders(s.token),'Content-Type':file.type,'x-upsert':'false'},
      body:await file.arrayBuffer(),cache:'no-store'
    });
    if(!r.ok)return NextResponse.json({error:'Upload rejected'},{status:502});
    const url=baseUrl()+'/storage/v1/object/public/portfolio-images/'+key;
    return withSession(NextResponse.json({url}),s);
  }catch{return NextResponse.json({error:'Storage unavailable'},{status:502});}
}
