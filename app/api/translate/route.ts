import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const translationCache = new Map<string, string>();
const MAX_CACHE_SIZE = 600;

async function translateIndonesianToEnglish(input: string): Promise<string> {
  const text = input.trim();
  if (!text) return input;
  const cached = translationCache.get(text);
  if (cached) return cached;

  // A DeepL API key is recommended for reliable production translation.
  // Without one, the public Google Translate endpoint is used as a best-effort fallback.
  let translated: string | undefined;
  if (process.env.DEEPL_API_KEY) {
    try {
      const body = new URLSearchParams({ text, target_lang: 'EN' });
      const response = await fetch(process.env.DEEPL_API_URL || 'https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`DeepL responded ${response.status}`);
      const result = await response.json() as { translations?: { text: string }[] };
      translated = result.translations?.[0]?.text;
    } catch (error) {
      console.error('DeepL translation unavailable:', error);
    }
  }

  if (!translated) {
    try {
      const url = new URL('https://translate.googleapis.com/translate_a/single');
      url.search = new URLSearchParams({ client: 'gtx', sl: 'auto', tl: 'en', dt: 't', q: text }).toString();
      const response = await fetch(url, { signal: AbortSignal.timeout(9000), next: { revalidate: 86400 } });
      if (!response.ok) throw new Error(`Translation service responded ${response.status}`);
      const result = await response.json() as [Array<[string]>];
      translated = result?.[0]?.map((segment) => segment[0]).join('');
    } catch (error) {
      console.error('Public translation unavailable:', error);
    }
  }

  const result = translated?.trim() || input;
  if (translationCache.size >= MAX_CACHE_SIZE) translationCache.clear();
  translationCache.set(text, result);
  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { texts?: unknown; to?: string };
    const texts = body.texts;
    if (body.to !== 'en' || !Array.isArray(texts) || texts.length > 50 ||
      !texts.every((text) => typeof text === 'string' && text.length <= 2000) ||
      texts.reduce<number>((sum, text) => sum + (text as string).length, 0) > 18000) {
      return NextResponse.json({ error: 'Invalid translation request' }, { status: 400 });
    }
    const translations: string[] = new Array(texts.length);
    let cursor = 0;
    await Promise.all(Array.from({ length: Math.min(4, texts.length) }, async () => {
      while (cursor < texts.length) {
        const index = cursor++;
        translations[index] = await translateIndonesianToEnglish(texts[index]);
      }
    }));
    return NextResponse.json({ translations }, { headers: { 'Cache-Control': 'private, max-age=600' } });
  } catch {
    return NextResponse.json({ error: 'Translation unavailable' }, { status: 503 });
  }
}
