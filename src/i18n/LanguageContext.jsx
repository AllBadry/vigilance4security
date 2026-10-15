import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './useLang';
import { translations } from './translations';
import { content } from '../data/about';

const STORAGE_KEY = 'v4s-lang';
const SUPPORTED = ['ar', 'en'];

const resolve = (dict, path) =>
  path.split('.').reduce((node, part) => (node == null ? node : node[part]), dict);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'ar';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : 'ar';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    root.classList.toggle('lang-en', lang === 'en');

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — ignore */
    }
  }, [lang, dir]);

  const setLang = useCallback((next) => {
    setLangState(SUPPORTED.includes(next) ? next : 'ar');
  }, []);

  const t = useCallback(
    (path, fallback) => {
      const value = resolve(translations[lang], path);
      if (value !== undefined) return value;
      const arValue = resolve(translations.ar, path);
      return arValue !== undefined ? arValue : fallback ?? path;
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      dir,
      setLang,
      t,
      isArabic: lang === 'ar',
      content: content[lang],
    }),
    [lang, dir, setLang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
