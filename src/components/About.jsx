import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const textMaskRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const btnRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = [
    {
      title: "من نحن",
      desc: "مجموعة اليقظة (V4S) هي شركة رائدة في مجال تقديم الحلول الأمنية المتكاملة، نجمع بين الكفاءات البشرية عالية التدريب وأحدث التقنيات التكنولوجية لضمان حماية أصولك."
    },
    {
      title: "رؤيتنا",
      desc: "أن نكون الخيار الأول والمعيار الذهبي في قطاع الأمن والحماية على مستوى المنطقة، من خلال تقديم خدمات أمنية لا تقبل المساومة وتواكب تحديات المستقبل."
    },
    {
      title: "مهمتنا",
      desc: "توفير بيئة آمنة ومستقرة لعملائنا تمكنهم من التركيز على نمو أعمالهم، عبر تطبيق بروتوكولات أمنية صارمة واستجابة فورية لأي طوارئ."
    },
    {
      title: "القيم الجوهرية",
      desc: "الانضباط العسكري، السرية التامة، النزاهة، والابتكار التكنولوجي المستمر لضمان تفوقنا في تقديم الحماية."
    },
    {
      title: "غرفة العمليات",
      desc: "مركز تحكم وسيطرة مجهز بأحدث تقنيات الذكاء الاصطناعي والمراقبة، يعمل على مدار الساعة لضمان التنسيق والتدخل السريع لجميع فرقنا الميدانية."
    }
  ];

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

      </div>
    </section>
  );
}