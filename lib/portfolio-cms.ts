import { NextRequest, NextResponse } from 'next/server';

export const cmsConfigured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY && process.env.PORTFOLIO_ADMIN_USER_ID);
export const baseUrl = () => (process.env.SUPABASE_URL ?? '').replace(/\/$/, '');
const apiKey = () => process.env.SUPABASE_PUBLISHABLE_KEY ?? '';
export const accessCookie = 'raffli_admin_access';
export const refreshCookie = 'raffli_admin_refresh';
export function supabaseHeaders(jwt?: string): Record<string, string> {
  return { apikey: apiKey(), Authorization: 'Bearer ' + (jwt || apiKey()) };
}
export function allowedOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try { return new URL(origin).host === req.nextUrl.host; } catch { return false; }
}
function cookieSettings(maxAge: number) {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/', maxAge };
}
export function setSessionCookies(res: NextResponse, session: {access_token: string; refresh_token: string; expires_in?: number}) {
  res.cookies.set(accessCookie, session.access_token, cookieSettings(Math.min(session.expires_in || 3600, 3600)));
  res.cookies.set(refreshCookie, session.refresh_token, cookieSettings(60 * 60 * 24 * 30));
}
export function clearSessionCookies(res: NextResponse) {
  res.cookies.set(accessCookie, '', cookieSettings(0));
  res.cookies.set(refreshCookie, '', cookieSettings(0));
}
export type AdminIdentity = { id: string; email?: string };
export async function requireAdmin(req: NextRequest): Promise<{user: AdminIdentity; token: string; rotated?: {access_token:string; refresh_token:string; expires_in?:number}} | null> {
  if (!cmsConfigured()) return null;
  let token = req.cookies.get(accessCookie)?.value;
  let rotated: { access_token:string; refresh_token:string; expires_in?:number } | undefined;
  async function getUser(jwt: string) {
    try {
      const r = await fetch(baseUrl() + '/auth/v1/user', { headers: supabaseHeaders(jwt), cache: 'no-store' });
      return r.ok ? await r.json() as AdminIdentity : null;
    } catch { return null; }
  }
  let user = token ? await getUser(token) : null;
  if (!user) {
    const refresh = req.cookies.get(refreshCookie)?.value;
    if (!refresh) return null;
    try {
      const r = await fetch(baseUrl() + '/auth/v1/token?grant_type=refresh_token', {
        method:'POST', headers:{...supabaseHeaders(), 'Content-Type':'application/json'},
        body:JSON.stringify({refresh_token:refresh}), cache:'no-store'
      });
      if (!r.ok) return null;
      rotated = await r.json();
      token = rotated?.access_token;
      user = token ? await getUser(token) : null;
    } catch { return null; }
  }
  // Deny by default: a valid Supabase account is not sufficient to administer this portfolio.
  if (!user || !token || user.id !== process.env.PORTFOLIO_ADMIN_USER_ID) return null;
  return {user,token,rotated};
}
export function withSession(res: NextResponse, session: { rotated?: {access_token:string;refresh_token:string;expires_in?:number} }) {
  if (session.rotated) setSessionCookies(res,session.rotated);
  res.headers.set('Cache-Control','no-store');
  return res;
}
export const unauthorized = () => NextResponse.json({error:'Unauthorized'}, {status:401,headers:{'Cache-Control':'no-store'}});
export const cmsUnavailable = () => NextResponse.json({error:'CMS is not configured yet'}, {status:503});
