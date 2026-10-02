import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      watermark: "AHMED",
      quote: "حلول أمنية استثنائية.",
      text: "نظام غرفة العمليات الذي وفرته مجموعة اليقظة يعتبر نقلة نوعية في تأمين منشآتنا. لقد تم تصميم الحلول خصيصاً لتلائم احتياجاتنا، مما جعل المراقبة أسهل وأكثر كفاءة.",
      name: "م. أحمد منصور",
      role: "العمليات، مجموعة اللوجستيات",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      watermark: "KHALID",
      quote: "احترافية وانضباط عسكري.",
      text: "خدمات المرافقة الخاصة من V4S توفر لي ولعائلتي راحة البال التامة أثناء تنقلاتي. طاقم مدرب على أعلى مستوى، وانضباط عسكري مبهر، مع احترام تام للسرية.",
      name: "د. خالد الرشيد",
      role: "رئيس مجلس إدارة",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      watermark: "SARAH",
      quote: "انخفاض الحوادث للصفر.",
      text: "منذ تركيب أنظمة المراقبة الذكية وربطها بغرفة عمليات اليقظة، انخفضت الحوادث الأمنية في سلسلتنا إلى الصفر. تقنيات حديثة جداً لا تضاهى في السوق المحلي.",
      name: "سارة العبدالله",
      role: "المدير التنفيذي، رويال",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      watermark: "OMAR",
      quote: "استجابة فورية وحاسمة.",
      text: "دوريات التدخل السريع التابعة لليقظة أثبتت جدارتها في أكثر من موقف. سرعة الاستجابة والتعامل الاحترافي مع الطوارئ يجعلهم الشريك الأمني الأول لنا.",
      name: "عمر الفاروق",
      role: "مدير أمن المنشآت",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  // دالة تحريك السلايدر
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 350; // عرض البطاقة التقريبي
      sliderRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. دخول الحاوية الداكنة الرئيسية
      gsap.from(containerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 2. دخول النصوص في الأعلى
      gsap.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // 3. دخول البطاقات بشكل متسلسل
      gsap.from(".testi-card", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#050d1a] font-cairo overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الحاوية الداكنة الرئيسية (كما في الصورة المرجعية) */}
        <div 
          ref={containerRef} 
          className="bg-[#0a1526] border border-white/5 rounded-3xl md:rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* تأثير إضاءة خلفية ناعم */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          {/* الجزء العلوي: العنوان وأزرار التنقل */}
          <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 relative z-10">
            
            {/* النصوص */}
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] tracking-tight uppercase">
                ماذا يقول <span className="text-amber-500">شركاء النجاح</span> <br />
                عن مجموعة اليقظة
              </h2>
              <p className="text-slate-400 mt-6 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                مجموعة اليقظة هي الشريك الأمني الموثوق لكبرى الشركات والمنشآت. نجمع بين الكفاءة البشرية وأحدث التقنيات لضمان حماية أصولك على مدار الساعة.
              </p>
            </div>

            {/* أزرار التنقل (تشبه النقاط في الصورة ولكن بأسهم عملية للتحكم) */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => scrollSlider('right')}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-amber-500 text-white hover:text-[#0a1526] transition-all border border-white/10"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollSlider('left')}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-amber-500 text-white hover:text-[#0a1526] transition-all border border-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* شريط البطاقات الأفقي (Carousel) */}
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 md:-mx-8 md:px-8 relative z-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((item) => (
              <div 
                key={item.id} 
                className="testi-card shrink-0 w-[300px] md:w-[380px] h-[400px] snap-start relative bg-gradient-to-br from-white to-slate-100 rounded-2xl overflow-hidden shadow-xl p-8 flex flex-col justify-between group"
              >
                {/* الكلمة المائية العملاقة في الخلفية (Watermark) */}
                <div className="absolute top-4 left-0 w-full text-center pointer-events-none overflow-hidden">
                  <span className="text-[6rem] font-black text-slate-900/5 leading-none uppercase tracking-tighter block group-hover:scale-110 transition-transform duration-700">
                    {item.watermark}
                  </span>
                </div>

                {/* المحتوى العلوي: الاقتباس */}
                <div className="relative z-10">
                  <Quote className="w-10 h-10 text-amber-500 mb-4 opacity-80" />
                  <h4 className="text-xl font-black text-slate-900 mb-3">{item.quote}</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {/* المحتوى السفلي: معلومات وصورة العميل */}
                <div className="relative z-10 flex items-center gap-4 mt-6 pt-6 border-t border-slate-200">
                  {/* حاوية الصورة لتبدو كأنها مقصوصة (Cutout style) */}
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{item.name}</h5>
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{item.role}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}