import {createHash, createHmac, randomBytes, scryptSync, timingSafeEqual} from 'node:crypto';
import {NextRequest,NextResponse} from 'next/server';

// Credentials exist ONLY in Vercel environment variables. No default admin credentials.
const COOKIE='raffli_cms_session';
const SESSION_TTL=4*60*60;
function hash(s:string){return createHash('sha256').update(s).digest();}
function constantEqual(a:string,b:string){return timingSafeEqual(hash(a),hash(b));}
function secret(){return process.env.CMS_SESSION_SECRET||'';}
function pwdConfig(){return process.env.CMS_ADMIN_PASSWORD_HASH||'';}
export function authConfigured(){
 return !!(process.env.CMS_ADMIN_USERNAME && /^[a-f0-9]{32}:[a-f0-9]{128}$/i.test(pwdConfig()) && secret().length>=32);
}
export function cmsConfigured(){return authConfigured() && Boolean(process.env.GITHUB_TOKEN);}
export function verifyCredentials(username:string,password:string){
 if(!authConfigured()||username.length>150||password.length>512||password.length<1)return false;
 const [salt,expected]=pwdConfig().split(':');
 const candidate=scryptSync(password,salt,64);
 const correct=Buffer.from(expected,'hex');
 return constantEqual(username,process.env.CMS_ADMIN_USERNAME||'') &&
        candidate.length===correct.length && timingSafeEqual(candidate,correct);
}
function sign(exp:string,nonce:string){
 return createHmac('sha256',secret()).update('raffli-cms-v1:'+exp+':'+nonce+':'+pwdConfig()).digest('hex');
}
export function createSession(){
 const exp=String(Math.floor(Date.now()/1000)+SESSION_TTL);
 const nonce=randomBytes(18).toString('hex');
 return exp+'.'+nonce+'.'+sign(exp,nonce);
}
export function validSession(raw:string|undefined){
 if(!authConfigured()||!raw||raw.length>256)return false;
 const parts=raw.split('.');
 if(parts.length!==3)return false;
 const [exp,nonce,mac]=parts;
 if(!/^\d{10,11}$/.test(exp)||!/^[a-f0-9]{36}$/.test(nonce)||!/^[a-f0-9]{64}$/.test(mac))return false;
 if(Number(exp)<=Date.now()/1000 || Number(exp)>Date.now()/1000+SESSION_TTL+60)return false;
 return constantEqual(mac,sign(exp,nonce));
}
function cookieOpts(maxAge:number){
 return {httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict' as const,path:'/',maxAge};
}
export function setSession(res:NextResponse){
 res.cookies.set(COOKIE,createSession(),cookieOpts(SESSION_TTL));
 res.headers.set('Cache-Control','no-store');
 return res;
}
export function clearSession(res:NextResponse){
 res.cookies.set(COOKIE,'',cookieOpts(0));
 res.headers.set('Cache-Control','no-store');
 return res;
}
export function requireAdmin(req:NextRequest){return validSession(req.cookies.get(COOKIE)?.value);}
export function allowedOrigin(req:NextRequest){
 // A strict Origin check supplements SameSite cookies for all changing actions.
 const origin=req.headers.get('origin');
 if(!origin||origin==='null')return false;
 try{const u=new URL(origin);return u.protocol===req.nextUrl.protocol && u.host===req.nextUrl.host;}catch{return false;}
}
export function unauthorized(){return NextResponse.json({error:'Unauthorized'},{status:401,headers:{'Cache-Control':'no-store'}});}
export function unavailable(){return NextResponse.json({error:'CMS is not configured. Set credentials and GitHub token in Vercel.'},{status:503,headers:{'Cache-Control':'no-store'}});}
// Best-effort per-instance delay; use Vercel WAF rate-limiting for distributed protection.
const attempts=new Map<string,{count:number;until:number}>();
export function loginKey(req:NextRequest){return req.headers.get('x-real-ip')||req.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';}
export function isLocked(k:string){
 const a=attempts.get(k);if(!a)return false;if(a.until<Date.now()){attempts.delete(k);return false;}return a.count>=5;
}
export function recordFailure(k:string){
 const a=attempts.get(k)||{count:0,until:Date.now()+10*60_000};
 if(a.until<Date.now()){a.count=0;a.until=Date.now()+10*60_000;}
 a.count++;attempts.set(k,a);
 if(attempts.size>2500){const oldest=attempts.keys().next().value;if(oldest)attempts.delete(oldest);}
}
export function recordSuccess(k:string){attempts.delete(k);}
