import {NextRequest,NextResponse} from 'next/server';
import {cvRoles,type CVPages,type CVLang,type CVRole} from '@/data/cvProfiles';
import {generateCvPdf,type CVPdfMode,type CVPdfTemplate} from '@/lib/cvPdf';

// Serve an actual PDF file with attachment headers. No print dialog,
// screenshot-based image or third-party conversion service is involved.
export const runtime='nodejs';
export const dynamic='force-dynamic';
const templates:CVPdfTemplate[]=['harvard-it','harvard-general','modern-it','modern-general'];
export function GET(req:NextRequest){
  const q=req.nextUrl.searchParams;
  const role=q.get('role')??'general';
  const lang=q.get('lang')??'id';
  const template=q.get('template')??'harvard-it';
  const pages=q.get('pages')??'2';
  const mode=q.get('mode')??'cv';
  if(!cvRoles.includes(role as CVRole) ||
    (lang!=='id'&&lang!=='en')||
    !templates.includes(template as CVPdfTemplate)||
    (pages!=='1'&&pages!=='2')||
    (mode!=='cv'&&mode!=='resume')){
    return NextResponse.json({error:'Invalid PDF export options'},{
      status:400,headers:{'Cache-Control':'no-store'}});
  }
  const choice={
    role:role as CVRole,lang:lang as CVLang,template:template as CVPdfTemplate,
    pages:Number(pages) as CVPages,mode:mode as CVPdfMode,
  };
  try{
    const bytes=generateCvPdf(choice);
    const safeName='Al-Man-Raffli-Saputra_'+(mode==='resume'?'Resume':'CV')+
      '_'+role.toUpperCase()+'_'+lang.toUpperCase()+'_'+
      (mode==='resume'?'1':pages)+'Page.pdf';
    return new NextResponse(bytes.buffer as ArrayBuffer,{
      headers:{
        'Content-Type':'application/pdf',
        'Content-Disposition':'attachment; filename="'+safeName+'"',
        'Content-Length':String(bytes.byteLength),
        'Cache-Control':'no-store',
        'X-Content-Type-Options':'nosniff',
      },
    });
  }catch(error){
    return NextResponse.json({
      error:error instanceof Error?error.message:'Could not generate PDF',
    },{status:422,headers:{'Cache-Control':'no-store'}});
  }
}
