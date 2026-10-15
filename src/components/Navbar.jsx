import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { useLang } from '../i18n/useLang';

function LangToggle() {
  const { lang, setLang } = useLang();
  const options = [
    { code: 'ar', label: 'AR' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div
      dir="ltr"
      role="group"
      aria-label="Language / اللغة"
      className="flex items-center rounded-full border border-white/15 bg-white/5 overflow-hidden shrink-0"
    >
      <span className="pl-2.5 flex items-center text-white/50">
        <Globe className="w-3.5 h-3.5" />
      </span>
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLang(opt.code)}
          aria-pressed={lang === opt.code}
          className={`min-w-11 h-11 lg:min-w-0 lg:h-9 px-3 text-xs font-bold tracking-wider transition-colors sm:px-3.5 ${
            lang === opt.code
              ? 'bg-amber-500 text-[#0a192f]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLang();
  const { pathname, hash } = useLocation();

  // تغيير خلفية الناف بار عند النزول للأسفل
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home'), kind: 'page' },
    { to: '/about', label: t('nav.about'), kind: 'page' },
    { to: '/#services', label: t('nav.services'), kind: 'section' },
    { to: '/suit', label: t('nav.uniform'), kind: 'page' },
    { to: '/contact', label: t('nav.contact'), kind: 'page' },
  ];

  const isActive = (link) =>
    link.kind === 'section' ? pathname === '/' && hash === '#services' : pathname === link.to;

  const desktopLink = (link) =>
    `px-4 py-2 text-sm font-bold transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-amber-400 after:transition-all duration-300 ${
      isActive(link)
        ? 'text-amber-400 after:w-3/4'
        : 'text-white/90 hover:text-amber-400 after:w-0 hover:after:w-3/4'
    }`;

  return (
    <header 
      className={`safe-top safe-inline fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 font-cairo ${
        isScrolled
          ? 'bg-[#0a192f]/95 backdrop-blur-md shadow-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      {/* 1. شريط التنقل الرئيسي (Main Navbar) */}
      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 flex items-center justify-between ${
        isScrolled ? 'h-20' : 'h-24'
      }`}>
        
        {/* الشعار */}
        <Link to="/" className="flex items-center group relative z-10 shrink-0" aria-label={t('nav.home')}>
          <div>
            <img 
              src="/RRvVSLogo_result.webp" 
              alt={t('nav.logoAlt')} 
              fetchPriority="high"
              decoding="async"
              className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'
              }`}
            />
          </div>
        </Link>

        {/* روابط التنقل (Desktop) */}
        <nav aria-label={t('nav.menu')} className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={isActive(link) ? 'page' : undefined}
              className={desktopLink(link)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* الأزرار: الهاتف + اللغة + طلب عرض سعر */}
        <div className="flex items-center gap-3 md:gap-4">
          <a
            aria-label={t('nav.call')}
            className="hidden sm:inline-flex w-11 h-11 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-amber-400 hover:border-amber-400/60 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>

          <LangToggle />

          <Link
            to="/contact"
            className="hidden md:inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-bold text-[#0a192f] bg-amber-500 hover:bg-white transition-colors rounded-sm shadow-lg shadow-amber-500/10"
          >
            {t('nav.quote')}
          </Link>

          {/* زر قائمة الموبايل */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t('nav.menu')}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden inline-flex h-11 w-11 -me-2 items-center justify-center text-white hover:text-amber-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* 3. قائمة الموبايل (Mobile Menu) */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#0a192f]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-y-auto overscroll-contain ${
        isMobileMenuOpen ? 'max-h-[calc(100svh-4rem)] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="safe-bottom flex flex-col px-4 pt-6 pb-10 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive(link) ? 'page' : undefined}
              className={`px-4 py-3 text-base font-bold hover:bg-white/5 rounded-sm border-s-2 transition-all ${
                isActive(link)
                  ? 'text-amber-400 border-amber-400'
                  : 'text-white/80 hover:text-amber-400 border-transparent hover:border-amber-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-3 mt-4 px-1">
            <a
              href="tel:+962772050091"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-sm border border-white/15 text-white/80 text-sm font-bold hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">077 205 0091</span>
            </a>
            <LangToggle />
          </div>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-3 px-4 py-3 text-center text-sm font-bold text-[#0a192f] bg-amber-500 hover:bg-amber-400 rounded-sm transition-colors"
          >
            {t('nav.quote')}
          </Link>
        </div>
      </div>
    </header>
  );
}
