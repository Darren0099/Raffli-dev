import { NextRequest, NextResponse } from 'next/server';
import { baseUrl, cmsConfigured, supabaseHeaders, allowedOrigin, requireAdmin, withSession, unauthorized, cmsUnavailable, setSessionCookies, clearSessionCookies } from '@/lib/portfolio-cms';

export async function GET(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return unauthorized();
  return withSession(NextResponse.json({ authenticated:true, email:session.user.email }),session);
}
export async function POST(req: NextRequest) {
  if (!allowedOrigin(req)) return NextResponse.json({error:'Invalid origin'}, {status:403});
  if (!cmsConfigured()) return cmsUnavailable();
  let body: {email?:unknown;password?:unknown};
  try { body = await req.json(); } catch { return NextResponse.json({error:'Invalid payload'},{status:400}); }
  if (typeof body.email !== 'string' || typeof body.password !== 'string' || body.email.length > 250 || body.password.length > 512) {
    return NextResponse.json({error:'Invalid login'},{status:400});
  }
  try {
    const auth = await fetch(baseUrl()+'/auth/v1/token?grant_type=password',{
      method:'POST',headers:{...supabaseHeaders(),'Content-Type':'application/json'},
      body:JSON.stringify({email:body.email,password:body.password}),cache:'no-store'
    });
    if (!auth.ok) return NextResponse.json({error:'Email, password or admin permission is incorrect'},{status:401});
    const session = await auth.json() as {access_token:string;refresh_token:string;expires_in?:number};
    const userReq = await fetch(baseUrl()+'/auth/v1/user',{headers:supabaseHeaders(session.access_token),cache:'no-store'});
    if (!userReq.ok) return unauthorized();
    const user = await userReq.json() as {id:string;email?:string};
    if (user.id !== process.env.PORTFOLIO_ADMIN_USER_ID) return unauthorized();
    const res = NextResponse.json({authenticated:true,email:user.email});
    setSessionCookies(res,session);
    res.headers.set('Cache-Control','no-store');
    return res;
  } catch { return NextResponse.json({error:'Authentication service unavailable'}, {status:502}); }
}
export async function DELETE(req: NextRequest) {
  if (!allowedOrigin(req)) return NextResponse.json({error:'Invalid origin'}, {status:403});
  const res = NextResponse.json({ok:true}); clearSessionCookies(res); return res;
}
