import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);
  const { t, dir } = useLang();

  // حالات الفورم والرسائل المنبثقة
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorPopup, setErrorPopup] = useState({ isOpen: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // دالة الإرسال عبر Web3Forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // جمع البيانات من الفورم تلقائياً
    const formData = new FormData(e.target);
    
    // إضافة مفتاح الوصول الخاص بك
    formData.append("access_key", "4f91c05a-7e40-4986-a7ba-613c95776252");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true); 
        e.target.reset(); 
        setTimeout(() => setIsSubmitted(false), 5000); 
      } else {
        console.error("خطأ في الإرسال:", data);
        setErrorPopup({ isOpen: true, message: dir === 'ltr' ? "An error occurred during submission, please try again later." : "حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً." });
      }
    } catch (error) {
      console.error("خطأ في الاتصال:", error);
      setErrorPopup({ isOpen: true, message: dir === 'ltr' ? "Could not connect to the server, please check your internet connection." : "تعذر الاتصال بخوادم الإرسال، يرجى التأكد من اتصالك بالإنترنت." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative w-full min-h-[100svh] flex items-center font-cairo overflow-hidden pt-24 pb-20 sm:pt-20 sm:pb-20"
      dir={dir}
    >
      {/* صورة الخلفية */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/V4Sback_result.webp" 
          alt={t('contactSection.altBg')} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a]/80 via-[#050d1a]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[#050d1a]/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* القسم الأيمن: النصوص */}
        <div ref={textRef} className="w-full lg:w-5/12 text-white">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight drop-shadow-xl">
            {t('contactSection.titleA')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-amber-600">{t('contactSection.titleB')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
            {t('contactSection.lead')}
          </p>
        </div>

        {/* القسم الأيسر: نموذج التواصل */}
        <div className="w-full lg:w-6/12 max-w-lg mx-auto lg:mx-0 lg:me-auto">
          <div ref={formRef} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative">
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('contactSection.formTitle')}</h3>
            <p className="text-slate-500 text-sm mb-8">{t('contactSection.formLead')}</p>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center flex flex-col items-center justify-center h-64 transition-all animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                  {dir === 'ltr' ? 'Request Sent Successfully' : 'تم إرسال طلبك بنجاح'}
                </h3>
                <p className="text-emerald-700">
                  {dir === 'ltr' ? 'We will contact you as soon as possible.' : 'سنتواصل معك في أسرع وقت ممكن.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* حقل الاسم */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-slate-700 text-sm font-bold me-1">{t('contactSection.name')}</label>
                  <input 
                    type="text" 
                    id="name"
                    name="Full_Name"
                    required
                    placeholder={t('contactSection.namePlaceholder')}
                    className="w-full bg-transparent border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400 text-base md:text-sm"
                  />
                </div>

                {/* حقل الإيميل / الهاتف */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact_info" className="text-slate-700 text-sm font-bold me-1">{t('contactSection.contactField')}</label>
                  <input 
                    type="text"
                    id="contact_info"
                    name="Contact_Information"
                    required
                    placeholder={t('contactSection.contactPlaceholder')}
                    className={`w-full bg-transparent border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400 text-base md:text-sm ${dir === 'ltr' ? 'text-start' : 'text-end'}`}
                    dir="auto"
                  />
                </div>

                {/* حقل الرسالة */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message_details" className="text-slate-700 text-sm font-bold me-1">{t('contactSection.detailsField')}</label>
                  <textarea 
                    id="message_details"
                    name="Message_Details"
                    rows="4"
                    required
                    placeholder={t('contactSection.detailsPlaceholder')}
                    className="w-full bg-transparent border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400 text-base md:text-sm resize-none"
                  ></textarea>
                </div>

                {/* زر الإرسال */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-3 bg-[#0a1526] hover:bg-amber-500 text-white hover:text-[#0a1526] disabled:bg-slate-400 disabled:text-slate-200 font-bold text-base py-4 rounded-xl transition-all duration-300 mt-4 shadow-lg shadow-black/10"
                >
                  <Send className={`w-5 h-5 transition-transform ${isSubmitting ? 'animate-pulse' : dir === 'ltr' ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
                  {isSubmitting 
                    ? (dir === 'ltr' ? 'Sending...' : 'جاري الإرسال...') 
                    : t('contactSection.submit')}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>

      {/* بوب أب الأخطاء المخصص (Custom Error Modal) */}
      {errorPopup.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050d1a]/80 backdrop-blur-sm transition-all animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5 border border-red-100">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1526] mb-3">
                {dir === 'ltr' ? 'Sorry, submission failed' : 'عذراً، لم يتم الإرسال'}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {errorPopup.message}
              </p>
              <button
                onClick={() => setErrorPopup({ isOpen: false, message: '' })}
                className="w-full bg-[#0a1526] hover:bg-[#1e293b] text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                {dir === 'ltr' ? 'Okay, close' : 'حسناً، إغلاق'}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}