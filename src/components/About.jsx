import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, GraduationCap, HeartPulse, Shirt } from 'lucide-react';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const textMaskRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const btnRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const { t, dir, content } = useLang();

  const { pillars: tabsData, staff, uniform } = content;

  const staffIcons = [Shield, GraduationCap, Award, HeartPulse];

 useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. دخول العنوان
      gsap.fromTo(headerRef.current.children, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. دخول النص العملاق
      gsap.fromTo(textMaskRef.current,
        { opacity: 0, scale: 1.1, filter: "blur(20px)", y: 50 },
        {
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)", 
          y: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: textMaskRef.current,
            start: "top 80%",
          }
        }
      );

      // 3. تأثير البارالاكس المستمر (Scrub) للصورة
      gsap.to(textMaskRef.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: textMaskRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // 4. دخول التبويبات (تم التعديل هنا لتجنب اختفائها)
      gsap.fromTo(tabsRef.current.children, 
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 85%",
          }
        }
      );

      // 5. دخول الزر السفلي
      gsap.fromTo(btnRef.current, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 95%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

    
  // أنيميشن تغيير المحتوى عند النقر
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: true }
      );
    });
    return () => ctx.revert();
  }, [activeTab, dir]);

  return (
    <section ref={sectionRef} dir={dir} className="py-24 md:py-32 bg-white font-cairo overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* العنوان العلوي */}
        <div ref={headerRef} className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('about.title')}</h2>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
            {t('about.lead')}
          </p>
        </div>

        {/* النص العملاق مع صورة داخلية (Wordmark) */}
        <div className="w-full flex justify-center mb-16 md:mb-20 overflow-hidden relative">
          <h1
            ref={textMaskRef}
            className="text-[18vw] md:text-[16vw] font-black uppercase leading-none tracking-tighter text-center select-none"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&w=2000")',
              backgroundPosition: '50% 0%',
              backgroundSize: 'cover',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            VIGILANCE
          </h1>
        </div>

        {/* شريط التبويبات المتناسق */}
        <div ref={tabsRef} className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mb-12 w-full px-4">
          {tabsData.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm md:text-base font-bold rounded-sm transition-all duration-300 border whitespace-nowrap flex-shrink-0 ${
                activeTab === index 
                  ? 'bg-[#0a1526] text-white border-[#0a1526] shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900' 
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* محتوى التبويب (مع key لإجبار التحديث) */}
        <div className="max-w-3xl w-full text-center mb-12 min-h-[100px] flex items-center justify-center px-4">
          <p 
            key={`${activeTab}-${dir}`} // هذا السطر هو الحل الجذري لاختفاء النص
            ref={contentRef} 
            className="text-slate-600 text-base md:text-lg leading-relaxed font-medium"
          >
            {tabsData[activeTab]?.desc}
          </p>
        </div>

        {/* زر الإجراء */}
        <div ref={btnRef}>
          <a 
            href="#services" 
            className="inline-flex items-center justify-center px-10 py-3.5 border-2 border-slate-900 text-slate-900 font-bold uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-colors duration-300 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1"
          >
            {t('about.more')}
          </a>
        </div>

        {/* ============ التفاصيل الإضافية ============ */}
        <div className="w-full mt-20 md:mt-28 space-y-20 md:space-y-28">

          {/* من هم موظفونا */}
          <div>
            <div className="text-center mb-10 md:mb-14">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('about.staffTitle')}</h3>
              <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
                {t('about.staffLead')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {staff.map((item, i) => {
                const Icon = staffIcons[i % staffIcons.length];
                return (
                  <div key={item.title} className="group relative bg-white border border-slate-200 rounded-sm p-6 md:p-7 transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                    <span className="absolute top-0 end-0 w-10 h-[3px] bg-amber-500 transition-all duration-500 group-hover:w-full"></span>
                    <Icon className="w-8 h-8 text-[#0a1526] mb-5" strokeWidth={1.5} />
                    <h4 className="text-base md:text-lg font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* اللباس الرسمي */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden flex flex-col lg:flex-row items-stretch group">
            
            {/* صورة الزي */}
            <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto relative overflow-hidden">
              <img 
                src="/6140a93d-2584-4ba5-93e6-aee4393cd2c2_result.webp" 
                alt={t('about.altUniform')} 
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* تدرج لوني خفيف فوق الصورة للموبايل */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1526]/60 to-transparent lg:hidden"></div>
            </div>
            
            {/* محتوى الزي */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-[#0a1526] text-white">
              {/* تأثير إضاءة خلفي خفيف */}
              <div className="absolute -top-16 -end-16 w-64 h-64 bg-slate-700/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-sm bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Shirt className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{uniform.title}</h3>
                </div>
                
                <p className="text-white/80 text-base leading-loose mb-10 max-w-lg">
                  {uniform.desc}
                </p>
                
                {/* زر الانتقال لصفحة الزي */}
                <div>
                  <Link
                    to="/suit"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#0a1526] font-bold text-sm transition-all duration-300 rounded-sm hover:bg-slate-200 shadow-[0_5px_15px_rgba(255,255,255,0.1)] hover:-translate-y-1"
                  >
                    {t('about.uniformCta')}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ms-3 ${dir === 'ltr' ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
