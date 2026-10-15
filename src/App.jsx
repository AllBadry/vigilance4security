import { lazy, Suspense, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Seo from './components/Seo';
import Home from './pages/Home';
import { useLang } from './i18n/useLang';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const Suit = lazy(() => import('./pages/suit'));
const ContactPage = lazy(() => import('./pages/Contact'));

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = 96;

function PageLoader() {
  const { t } = useLang();

  return (
    <div
      id="page-loader"
      role="status"
      aria-live="polite"
      className="w-full min-h-screen bg-[#050d1a] flex items-center justify-center"
    >
      <span className="sr-only">{t('common.loading')}</span>
      <span className="h-10 w-10 rounded-full border-2 border-amber-400/25 border-t-amber-400 animate-spin" />
    </div>
  );
}

function ScrollToTop({ lenisRef }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reset = () => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };

    reset();

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let attempts = 0;
      const timer = setInterval(() => {
        const el = document.getElementById(id);
        attempts += 1;
        if (el) {
          clearInterval(timer);
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -NAV_OFFSET, duration: 1 });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (attempts >= 6) {
          clearInterval(timer);
        }
      }, 100);

      return () => clearInterval(timer);
    }

    // بعد تحميل مكوّن الصفحة (lazy) نعيد التثبيت للأعلى لتفادي أي ScrollTrigger متأخر
    const settle = setTimeout(reset, 250);
    return () => clearTimeout(settle);
  }, [pathname, hash, lenisRef]);

  return null;
}

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop lenisRef={lenisRef} />
      <Seo />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/suit" element={<Suit />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
