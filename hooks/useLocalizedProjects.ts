'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import type { Project } from '@/data/projectsData';

const FIELDS = [
  'title', 'summaryQuote', 'section1Title', 'section1Text1', 'section1Text2',
  'section2Title', 'section2Text1', 'section2Text2', 'outcomeTitle', 'outcomeText',
] as const;

async function translateTexts(texts: string[], signal: AbortSignal): Promise<string[]> {
  const response = await fetch('/api/translate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texts, to: 'en' }), signal,
  });
  if (!response.ok) throw new Error('Translation API unavailable');
  const result = await response.json() as { translations?: string[] };
  if (!result.translations || result.translations.length !== texts.length) throw new Error('Incomplete translation');
  return result.translations;
}

export function useLocalizedProject(project: Project) {
  const { lang } = useLanguage();
  const [translated, setTranslated] = useState<{ key: string; project: Project } | null>(null);
  const key = `${project.slug}:en`;

  useEffect(() => {
    if (lang !== 'en') return;
    const controller = new AbortController();
    const fields: string[] = [];
    const values: string[] = [];
    for (const field of FIELDS) {
      const value = project[field];
      if (value) { fields.push(field); values.push(value); }
    }
    const paragraphCount = project.descriptionParagraphs?.length || 0;
    const serviceCount = project.services?.list?.length || 0;
    const statsCount = project.outcomeStats?.length || 0;
    values.push(...(project.descriptionParagraphs || []));
    values.push(...(project.services?.list || []));
    values.push(...(project.outcomeStats || []).map((stat) => stat.label));

    translateTexts(values, controller.signal).then((result) => {
      const copy: Project = {
        ...project,
        services: project.services ? { ...project.services } : undefined,
        outcomeStats: project.outcomeStats?.map((stat) => ({ ...stat })),
      };
      let index = 0;
      for (const field of fields) {
        (copy as unknown as Record<string, unknown>)[field] = result[index++];
      }
      copy.descriptionParagraphs = result.slice(index, index + paragraphCount);
      index += paragraphCount;
      if (copy.services) copy.services.list = result.slice(index, index + serviceCount);
      index += serviceCount;
      if (copy.outcomeStats) copy.outcomeStats = copy.outcomeStats.map((stat, i) => ({
        ...stat, label: result[index + i],
      }));
      if (!controller.signal.aborted) setTranslated({ key, project: copy });
    }).catch((error) => { if (!controller.signal.aborted) console.error('Project translation:', error); });

    return () => controller.abort();
  }, [project, lang, key]);

  return lang === 'en' && translated?.key === key ? translated.project : project;
}

export function useLocalizedProjectTitles(projects: Project[]) {
  const { lang } = useLanguage();
  const [state, setState] = useState<{ lang: 'en'; titles: Record<string, string> } | null>(null);
  useEffect(() => {
    if (lang !== 'en') return;
    const controller = new AbortController();
    translateTexts(projects.map((project) => project.title), controller.signal)
      .then((titles) => {
        if (!controller.signal.aborted) {
          setState({ lang: 'en', titles: Object.fromEntries(projects.map((p, i) => [p.slug, titles[i]])) });
        }
      }).catch((error) => { if (!controller.signal.aborted) console.error('Project title translation:', error); });
    return () => controller.abort();
  }, [lang, projects]);
  return (slug: string, original: string) => lang === 'en' ? state?.titles[slug] || original : original;
}
