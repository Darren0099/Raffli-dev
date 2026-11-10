import {NextRequest,NextResponse} from 'next/server';
import {allowedOrigin,requireAdmin,unauthorized} from '@/lib/portfolio-cms';
import {uploadProjectImage} from '@/lib/github-portfolio-store';
export const runtime='nodejs';
export async function POST(req:NextRequest){
 if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 if(!requireAdmin(req))return unauthorized();
 let form:FormData;
 try{form=await req.formData()}catch{return NextResponse.json({error:'Invalid upload form'},{status:400})}
 const file=form.get('file');
 if(!(file instanceof File))return NextResponse.json({error:'Missing file'},{status:400});
 if(file.size>2_500_000)return NextResponse.json({error:'File is over 2.5 MB; compress it first'},{status:413});
 try{return NextResponse.json({url:await uploadProjectImage(file)},{headers:{'Cache-Control':'no-store'}})}
 catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Upload failed'},{status:502})}
}
