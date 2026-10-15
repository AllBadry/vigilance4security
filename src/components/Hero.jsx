import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const paginationRef = useRef(null);
  const { t, dir } = useLang();

  const Chevron = dir === 'ltr' ? ChevronRight : ChevronLeft;
  const chevronHover = dir === 'ltr' ? 'group-hover:translate-x-2' : 'group-hover:-translate-x-2';

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(bgRef.current, 
        { scale: 1.1, filter: "blur(8px)" },
        { scale: 1, filter: "blur(0px)", duration: 2 }
      )
      .from(contentRef.current.children, {
        y: 30, opacity: 0, duration: 1, stagger: 0.2,
      }, "-=1.5")
      .from(paginationRef.current.children, {
        x: -20, opacity: 0, duration: 0.8, stagger: 0.15,
      }, "-=1.2");

      // Parallax Scroll
      gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} dir={dir} className="relative h-screen w-full overflow-hidden bg-[#0a192f] font-cairo">
      
      {/* 1. الخلفية */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
         <video 
          src="/gemini_generated_video_3765d11c.mp4" 
          autoPlay="true"
          muted="true"
          repeat="true"
          autoreplay="true"
          replay="true"
          loop="true"
          playsInline
          aria-label={t('hero.altVideo')}
          className="w-full h-full object-cover scale-105"
        />
        {/* تدرج لوني أزرق/كحلي عميق لدمج النصوص */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0f2027]/95 via-[#203a43]/70 to-[#2c5364]/20 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10" />
        
        {/* الدوائر الزخرفية (الرادار) في الخلفية */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden">
          <div className="w-[40vw] h-[40vw] rounded-full border-[1.5px] border-white/20 absolute -translate-x-1/4"></div>
          <div className="w-[65vw] h-[65vw] rounded-full border-[1.5px] border-white/10 absolute -translate-x-1/4"></div>
          <div className="w-[90vw] h-[90vw] rounded-full border border-white/5 absolute -translate-x-1/4"></div>
        </div>
      </div>

      {/* 2. المحتوى الرئيسي (النصوص والترقيم) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between pt-24">
        
        {/* القسم الأول: النصوص */}
        <div ref={contentRef} className="w-full md:w-[65%]">
          
          {/* شبكة النقاط الزخرفية (Dot Pattern) */}
          <div className="flex flex-wrap w-16 gap-1.5 mb-8 opacity-60">
             {[...Array(15)].map((_, i) => (
               <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
             ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.2] mb-6 tracking-tight drop-shadow-xl uppercase">
            {t('hero.title1')} <br />
            {t('hero.title2')} <span className="text-amber-400">{t('hero.titleAccent')}</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-300 max-w-xl mb-10 leading-relaxed font-medium">
            {t('hero.lead')}
          </p>

          <Link to="/about" className="group inline-flex items-center gap-2 text-white font-bold text-lg border-b border-white/40 pb-1 hover:border-amber-400 hover:text-amber-400 transition-all">
            {t('hero.cta')}
            <Chevron className={`w-5 h-5 ${chevronHover} transition-transform`} />
          </Link>
        </div>

        {/* القسم الثاني: مؤشر الصفحات (Pagination) */}
        <div ref={paginationRef} className="hidden md:flex flex-col items-end gap-6 relative ps-8">
          {/* الخط العمودي الرئيسي */}
          <div className="absolute top-0 bottom-0 start-0 w-[1px] bg-white/20"></div>
          
          {/* رقم 01 (النشط) */}
          <div className="relative flex items-center justify-end w-full cursor-pointer group">
            {/* خط التحديد بجانب الرقم النشط */}
            <div className="absolute -start-[2px] w-[3px] h-full bg-white"></div>
            <span className="text-5xl font-black text-white leading-none ps-6">01</span>
          </div>

          {/* رقم 02 */}
          <div className="relative flex items-center justify-end w-full cursor-pointer group hover:opacity-100 opacity-50 transition-opacity">
            <span className="text-2xl font-bold text-white ps-6">02</span>
          </div>

          {/* رقم 03 */}
          <div className="relative flex items-center justify-end w-full cursor-pointer group hover:opacity-100 opacity-50 transition-opacity">
            <span className="text-2xl font-bold text-white ps-6">03</span>
          </div>
        </div>

      </div>
      
    </section>
  );
}
