import {NextRequest,NextResponse} from 'next/server';
import {allowedOrigin,authConfigured,clearSession,createSession, isLocked, loginKey,
 recordFailure,recordSuccess,requireAdmin,setSession,unauthorized,unavailable,verifyCredentials} from '@/lib/portfolio-cms';
export const runtime='nodejs';
export async function GET(req:NextRequest){
 if(!requireAdmin(req))return unauthorized();
 return NextResponse.json({authenticated:true,username:process.env.CMS_ADMIN_USERNAME},{headers:{'Cache-Control':'no-store'}});
}
export async function POST(req:NextRequest){
 if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 if(!authConfigured())return unavailable();
 const key=loginKey(req);
 if(isLocked(key))return NextResponse.json({error:'Too many attempts; try again later'},{status:429});
 let payload:{username?:unknown;password?:unknown};
 try{payload=await req.json();}catch{return NextResponse.json({error:'Invalid JSON'},{status:400});}
 if(typeof payload.username!=='string'||typeof payload.password!=='string'||
  !verifyCredentials(payload.username,payload.password)){
  recordFailure(key);
  return NextResponse.json({error:'Invalid username or password'},{status:401});
 }
 recordSuccess(key);
 return setSession(NextResponse.json({authenticated:true,username:payload.username}));
}
export async function DELETE(req:NextRequest){
 if(!allowedOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 return clearSession(NextResponse.json({ok:true}));
}
