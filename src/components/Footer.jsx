import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, ShieldCheck, UserCheck, ChevronLeft, ChevronRight, PhoneCall } from 'lucide-react';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const textRef = useRef(null);
  const contentRef = useRef(null);
  const { t, dir } = useLang();

  const Chevron = dir === 'ltr' ? ChevronRight : ChevronLeft;
  const chevronHover = dir === 'ltr' ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1';

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.from(contentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <footer ref={footerRef} dir={dir} className="relative w-full bg-[#050d1a] font-cairo pt-24 overflow-hidden border-t border-white/10">
      
      {/* 1. صورة الخلفية (مبنى مؤسسي) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/photo-1486406146926-c627a92ad1ab_result.webp" 
          alt={t('footer.altBuilding')} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover grayscale opacity-25"
        />
        {/* تدرج لوني لدمج المبنى بشكل درامي مع الخلفية */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/80 to-[#0a1526]/80"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2. محتوى الفوتر (Grid Layout) */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* العمود الأول: الشعار ونبذة */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-20 h-20 flex items-center justify-center p-1 ">
                <img src="/RRvVSLogo_result.webp" alt={t('footer.logoAlt')} loading="lazy" decoding="async" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white leading-none mb-1">{t('footer.brand')}</h3>
                <p className="text-xs text-amber-500 tracking-[0.2em] uppercase font-bold">{t('footer.brandLatin')}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              {t('footer.about')}
            </p>
            <div className="flex items-center gap-2 text-slate-300 text-sm bg-white/5 p-3 rounded-sm border border-white/10 w-fit">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span className="font-bold">{t('footer.licensed')}</span>
            </div>
          </div>

          {/* العمود الثاني: القيادة والإدارة */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-500" />
              {t('footer.management')}
            </h4>
            
            <div className="bg-[#0a1526]/80 backdrop-blur-sm p-5 rounded-sm border border-white/10 mb-4 hover:border-amber-500/50 transition-colors shadow-lg">
              <p className="text-slate-400 text-xs mb-1">{t('footer.generalManager')}</p>
              <h5 className="text-white font-bold text-base mb-3">{t('footer.generalManagerName')}</h5>
              
              <div className="flex items-center justify-start gap-2 text-amber-400">
                <Phone className="w-4 h-4" />
                <a href="tel:0795602030" className="inline-flex items-center min-h-11 hover:text-white transition-colors text-sm font-mono tracking-wider font-bold" dir="ltr">
                  079 560 2030
                </a>
              </div>
            </div>

            <a href="mailto:gm@vigilance4security.com" className="flex items-center gap-3 min-h-11 text-slate-300 hover:text-amber-400 transition-colors text-sm group mt-2">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs" dir="ltr">gm@vigilance4security.com</span>
            </a>
          </div>

          {/* العمود الثالث: الاتصال وغرفة العمليات */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-amber-500" />
              {t('footer.opsContact')}
            </h4>
            
            <div className="mb-6 bg-white/5 p-4 rounded-sm border border-white/10">
              <p className="text-slate-400 text-xs mb-2">{t('footer.directLine')}</p>
              
              <div className="flex justify-start mb-2">
                <a href="tel:+962772050091" className="inline-flex items-center min-h-11 text-xl font-bold text-white hover:text-amber-400 transition-colors font-mono tracking-wider" dir="ltr">
                  +962 7 7205 0091
                </a>
              </div>
              
              <span className="inline-block bg-red-500/10 text-red-400 text-xs font-bold px-2 py-1 rounded">
                {t('footer.opsDep')}
              </span>
            </div>

            <a href="mailto:Operation@vigilance4security.com" className="flex items-center gap-3 min-h-11 text-slate-300 hover:text-amber-400 transition-colors text-sm group">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-500 font-bold mb-0.5">{t('footer.opsDep')}</span>
                <span className="font-mono text-xs break-all" dir="ltr">Operation@vigilance4security.com</span>
              </div>
            </a>
            
            <a href="mailto:Info@vigilance4security.com" className="flex items-center gap-3 min-h-11 text-slate-300 hover:text-amber-400 transition-colors text-sm group mt-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs mb-0.5">{t('footer.generalInquiries')}</span>
                <span className="font-mono text-xs" dir="ltr">Info@vigilance4security.com</span>
              </div>
            </a>
          </div>

          {/* العمود الرابع: الموقع والروابط */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              {t('footer.headquarters')}
            </h4>
            <div className="bg-[#0a1526]/50 p-4 rounded-sm border border-white/5 mb-6">
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                {t('footer.address').map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </p>
            </div>
            
            <h4 className="text-white font-bold text-base mb-4">{t('footer.quickLinks')}</h4>
            <nav aria-label={t('footer.quickLinks')}>
              <ul className="space-y-3">
                {[
                  { to: '/', label: t('footer.linkHome') },
                  { to: '/about', label: t('footer.linkAbout') },
                  { to: '/#services', label: t('footer.linkServices') },
                  { to: '/suit', label: t('footer.linkUniform') },
                  { to: '/contact', label: t('footer.linkContact') },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="min-h-11 text-slate-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group w-fit"
                    >
                      <Chevron className={`w-4 h-4 ${chevronHover} transition-transform`} /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </div>

        {/* 3. شريط حقوق النشر */}
        <div className="pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest relative z-20">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>

      {/* 4. النص العملاق السينمائي في الخلفية السفلية */}
      <div className="absolute bottom-0 w-full flex justify-center pointer-events-none overflow-hidden z-10">
        <h1 
          ref={textRef}
          className="text-[28vw] md:text-[22vw] font-black text-white/[0.03] mix-blend-overlay leading-none select-none tracking-tighter"
          style={{ transform: 'translateY(20px)' }}
        >
          VIGILANCE
        </h1>
      </div>
      
    </footer>
  );
}
