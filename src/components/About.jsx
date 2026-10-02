import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, GraduationCap, HeartPulse, Shirt, Building2, Car, Briefcase, Lock, ShieldAlert, Globe, BriefcaseBusiness } from 'lucide-react';
import { pillars as tabsData, staff, uniform, services } from '../data/about';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const textMaskRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const btnRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const staffIcons = [Shield, GraduationCap, Award, HeartPulse];
  const serviceIcons = [Building2, Car, BriefcaseBusiness, Lock, ShieldAlert, Globe];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. دخول العنوان (بانسيابية من الأسفل)
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // 2. دخول النص العملاق (ضبابي ويصبح واضحاً مع التصغير)
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

      // 3. تأثير البارالاكس المستمر (Scrub) للصورة داخل الحروف
      gsap.to(textMaskRef.current, {
        backgroundPosition: "50% 100%", // تحريك الصورة للأسفل
        ease: "none",
        scrollTrigger: {
          trigger: textMaskRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // نعومة التمرير
        }
      });

      // 4. دخول التبويبات (تأثير ارتدادي Spring)
      gsap.from(tabsRef.current.children, {
        y: 40,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 85%",
        }
      });

      // 5. دخول الزر السفلي
      gsap.from(btnRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 95%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // أنيميشن تغيير المحتوى عند النقر
  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { y: 20, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white font-cairo overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* العنوان العلوي */}
        <div ref={headerRef} className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            عن مجموعة اليقظة
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
            مجموعة اليقظة للأمن والحماية تقدم حلولاً أمنية مبتكرة ومستدامة لضمان سلامة استثماراتك.
          </p>
        </div>

        {/* النص العملاق مع صورة متحركة بداخله */}
        <div className="w-full flex justify-center mb-16 md:mb-20 overflow-hidden relative">
          <h1 
            ref={textMaskRef}
            className="text-[18vw] md:text-[16vw] font-black uppercase leading-none tracking-tighter text-center select-none"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&w=2000")',
              backgroundPosition: '50% 0%', // تبدأ من الأعلى
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

        {/* شريط التبويبات */}
        <div ref={tabsRef} className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12 max-w-4xl w-full">
          {tabsData.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm md:text-base font-bold rounded-sm transition-all duration-300 border ${
                activeTab === index 
                  ? 'bg-[#0a1526] text-white border-[#0a1526] shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900' 
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* محتوى التبويب */}
        <div className="max-w-3xl w-full text-center mb-12 min-h-[100px] flex items-center justify-center">
          <p ref={contentRef} className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            {tabsData[activeTab].desc}
          </p>
        </div>

        {/* زر الإجراء */}
        <div ref={btnRef}>
          <a 
            href="#services" 
            className="inline-flex items-center justify-center px-10 py-3.5 border-2 border-slate-900 text-slate-900 font-bold uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-colors duration-300 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1"
          >
            اكتشف المزيد
          </a>
        </div>

        {/* ============ التفاصيل الإضافية ============ */}
        <div className="w-full mt-20 md:mt-28 space-y-20 md:space-y-28">

          {/* من هم موظفونا */}
          <div>
            <div className="text-center mb-10 md:mb-14">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">من هم موظفونا</h3>
              <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
                لا نقدّم حلولاً تكنولوجية فقط — بل حراساً ورجال أمن مدربين ومؤهلين.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {staff.map((item, i) => {
                const Icon = staffIcons[i % staffIcons.length];
                return (
                  <div key={item.title} className="group relative bg-white border border-slate-200 rounded-sm p-6 md:p-7 transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                    <span className="absolute top-0 left-0 w-10 h-[3px] bg-amber-500 transition-all duration-500 group-hover:w-full"></span>
                    <Icon className="w-8 h-8 text-[#0a1526] mb-5" strokeWidth={1.5} />
                    <h4 className="text-base md:text-lg font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* اللباس الرسمي */}
          <div className="bg-[#0a1526] text-white rounded-sm p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
                <Shirt className="w-7 h-7 md:w-8 md:h-8 text-amber-500" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-4">{uniform.title}</h3>
                <p className="text-white/75 text-sm md:text-base leading-loose">{uniform.desc}</p>
              </div>
            </div>
          </div>

          {/* خدمات الشركة */}
          <div>
            <div className="text-center mb-10 md:mb-14">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">خدمات التي تقدمها الشركة</h3>
              <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
                تغطية متكاملة للمنشآت والمرافقة والتدريب ونقل الأموال والمناسبات.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {services.map((item, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];
                return (
                  <div key={item.title} className="flex items-start gap-4 bg-white border border-slate-200 rounded-sm p-6 transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_14px_30px_rgba(0,0,0,0.07)]">
                    <div className="shrink-0 w-11 h-11 rounded-sm bg-[#0a1526] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-500" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* زر العمل معنا */}
          <div className="border-2 border-slate-900 rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">تعمل معنا؟</h3>
              <p className="text-slate-600 text-sm md:text-base max-w-xl">
                نبحث عن أشخاص ملتزمين بالانضباط والجاهزية. أرسل سيرتك وبياناتك وسيتم التواصل معك مباشرة.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-9 py-4 bg-amber-500 hover:bg-[#0a1526] hover:text-white text-[#0a1526] font-bold text-sm tracking-widest uppercase transition-colors duration-300 rounded-sm shadow-lg shadow-amber-500/10"
            >
              <Briefcase className="w-4 h-4" />
              أرسل طلبك
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}