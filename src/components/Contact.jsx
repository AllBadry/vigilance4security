import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // أنيميشن ظهور النصوص (من اليمين)
      gsap.from(textRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // أنيميشن ظهور نموذج الاتصال (من اليسار/الأسفل)
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative w-full min-h-screen flex items-center font-cairo overflow-hidden pt-20 pb-20"
      dir="rtl"
    >
      {/* 1. صورة الخلفية (مبنى زجاجي ضخم يعكس فخامة المنشآت التي يتم حمايتها) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="./V4Sback.jpg" 
          alt="مبنى مؤسسي حديث" 
          className="w-full h-full object-cover scale-105"
        />
        {/* تدرج لوني داكن خفيف لضمان وضوح النصوص مع الحفاظ على إشراقة الصورة */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a]/80 via-[#050d1a]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[#050d1a]/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* 2. القسم الأيمن: النصوص (حسب التصميم المرجعي) */}
        <div ref={textRef} className="w-full lg:w-5/12 text-white">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight drop-shadow-xl">
            تواصل <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-amber-600">معنا</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
            نحن هنا لحماية أعمالك. فريق اليقظة يسعده الاستماع إليك وتقديم الاستشارات الأمنية المتكاملة لتلبية احتياجاتك.
          </p>
        </div>

        {/* 3. القسم الأيسر: نموذج التواصل (البطاقة البيضاء النظيفة) */}
        <div className="w-full lg:w-6/12 max-w-lg mx-auto lg:mx-0 lg:ml-auto">
          <div ref={formRef} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative">
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">أرسل استفسارك</h3>
            <p className="text-slate-500 text-sm mb-8">سيتواصل معك فريق العمليات في أقرب وقت ممكن.</p>

            <form className="flex flex-col gap-5">
              
              {/* حقل الاسم */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-sm font-bold ml-1">الاسم الكامل</label>
                <input 
                  type="text" 
                  placeholder="أدخل اسمك أو اسم منشأتك"
                  className="w-full bg-transparent border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400 text-sm"
                />
              </div>

              {/* حقل الإيميل / الهاتف */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-sm font-bold ml-1">البريد الإلكتروني أو الهاتف</label>
                <input 
                  type="text" 
                  placeholder="رقم للتواصل أو إيميلك المعتمد"
                  className="w-full bg-transparent border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400 text-sm text-right"
                />
              </div>

              {/* حقل الرسالة */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-sm font-bold ml-1">تفاصيل الطلب</label>
                <textarea 
                  rows="4"
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full bg-transparent border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400 text-sm resize-none"
                ></textarea>
              </div>

              {/* زر الإرسال */}
              <button 
                type="button" 
                className="group w-full flex items-center justify-center gap-3 bg-[#0a1526] hover:bg-amber-500 text-white hover:text-[#0a1526] font-bold text-base py-4 rounded-xl transition-all duration-300 mt-4 shadow-lg shadow-black/10"
              >
                <Send className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                إرسال الطلب
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}