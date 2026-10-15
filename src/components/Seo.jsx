import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLang } from '../i18n/useLang';
import {
  SITE_NAME,
  SITE_URL,
  OG_IMAGE,
  OG_LOCALE,
  canonicalFor,
  pageFor,
} from '../../seo.config.mjs';

const HEAD_ATTR = {
  description: ['name', 'description'],
  robots: ['name', 'robots'],
  'og:title': ['property', 'og:title'],
  'og:description': ['property', 'og:description'],
  'og:url': ['property', 'og:url'],
  'og:type': ['property', 'og:type'],
  'og:site_name': ['property', 'og:site_name'],
  'og:locale': ['property', 'og:locale'],
  'og:image': ['property', 'og:image'],
  'og:image:secure_url': ['property', 'og:image:secure_url'],
  'og:image:type': ['property', 'og:image:type'],
  'og:image:width': ['property', 'og:image:width'],
  'og:image:height': ['property', 'og:image:height'],
  'og:image:alt': ['property', 'og:image:alt'],
  'twitter:card': ['name', 'twitter:card'],
  'twitter:title': ['name', 'twitter:title'],
  'twitter:description': ['name', 'twitter:description'],
  'twitter:image': ['name', 'twitter:image'],
  'twitter:image:alt': ['name', 'twitter:image:alt'],
};

function setMeta(key, content) {
  const [attr, value] = HEAD_ATTR[key];
  let tag = document.head.querySelector(`meta[${attr}="${value}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function Seo() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const page = pageFor(pathname);
    const copy = page[lang] ?? page.ar;
    const canonical = canonicalFor(page.path);
    const image = `${SITE_URL}${OG_IMAGE.url}`;
    const alt = OG_IMAGE.alt[lang] ?? OG_IMAGE.alt.ar;

    document.title = copy.title;
    setCanonical(canonical);
    setMeta('description', copy.description);
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('og:title', copy.title);
    setMeta('og:description', copy.description);
    setMeta('og:url', canonical);
    setMeta('og:type', 'website');
    setMeta('og:site_name', SITE_NAME[lang] ?? SITE_NAME.ar);
    setMeta('og:locale', OG_LOCALE[lang] ?? OG_LOCALE.ar);
    setMeta('og:image', image);
    setMeta('og:image:secure_url', image);
    setMeta('og:image:type', OG_IMAGE.type);
    setMeta('og:image:width', String(OG_IMAGE.width));
    setMeta('og:image:height', String(OG_IMAGE.height));
    setMeta('og:image:alt', alt);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', copy.title);
    setMeta('twitter:description', copy.description);
    setMeta('twitter:image', image);
    setMeta('twitter:image:alt', alt);
  }, [pathname, lang]);

  return null;
}
