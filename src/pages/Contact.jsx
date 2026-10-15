import { useState } from 'react';
import { Phone, Mail, Send, Shield, Building, CheckCircle2, ChevronDown } from 'lucide-react';
import { useLang } from '../i18n/useLang';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, dir } = useLang();

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يتم ربط النموذج مع الباك إند (مثل EmailJS أو API خاص بك)
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main dir={dir} className="bg-[#f8fafc] font-cairo selection:bg-[#0a1526] selection:text-white min-h-[100svh]">
      
      {/* رأس الصفحة الغامق (Dark Header) لدعم الناف بار الشفاف */}
      <div className="bg-[#0a1526] pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* تأثيرات إضاءة خلفية */}
        <div className="absolute top-0 end-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 start-0 w-96 h-96 bg-slate-700/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/20 mb-6">
            <Shield className="w-4 h-4" />
            {t('contactPage.badge')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            {t('contactPage.title')}
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-base md:text-lg">
            {t('contactPage.lead')}
          </p>
        </div>
      </div>

      {/* قسم المحتوى الرئيسي (مرفوع قليلاً للأعلى ليغطي جزء من الرأس الغامق) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* العمود الأيمن: معلومات التواصل */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* بطاقة الإدارة العامة */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-[#0a1526]" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1526] mb-2">{t('contactPage.adminTitle')}</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t('contactPage.address')[0]}<br />
                {t('contactPage.address')[1]}<br />
                {t('contactPage.address')[2]}
              </p>
            </div>

            {/* بطاقة الهواتف */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-[#0a1526]" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1526] mb-4">{t('contactPage.phonesTitle')}</h3>
              <div className="space-y-4">
                <a href="tel:+962795602030" className="flex items-center gap-3 min-h-11 text-slate-600 hover:text-[#0a1526] font-medium transition-colors w-fit">
                  <span className="text-lg" dir="ltr">079 560 2030</span>
                  <span className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-500">{t('contactPage.labelAdmin')}</span>
                </a>
                <a href="tel:+962772050091" className="flex items-center gap-3 text-slate-600 hover:text-[#0a1526] font-medium transition-colors w-fit min-h-11">
                  <span className="text-lg" dir="ltr">077 205 0091</span>
                  <span className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-500">{t('contactPage.labelOps')}</span>
                </a>
              </div>
            </div>

            {/* بطاقة البريد الإلكتروني */}
            <div className="bg-[#0a1526] p-8 rounded-xl shadow-lg border border-[#1e293b] text-white">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('contactPage.emailTitle')}</h3>
              <div className="space-y-3">
                <a href="mailto:Info@vigilance4security.com" className="inline-flex items-center min-h-11 text-slate-300 hover:text-white transition-colors">
                  Info@vigilance4security.com
                </a>
                <a href="mailto:Operation@vigilance4security.com" className="inline-flex items-center min-h-11 text-slate-300 hover:text-white transition-colors">
                  Operation@vigilance4security.com
                </a>
                <a href="mailto:gm@vigilance4security.com" className="inline-flex items-center min-h-11 text-slate-300 hover:text-white transition-colors">
                  gm@vigilance4security.com
                </a>
              </div>
            </div>
            
          </div>

          {/* العمود الأيسر: نموذج التواصل المتقدم */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-100">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a1526] mb-3">{t('contactPage.formTitle')}</h2>
              <p className="text-slate-500">{t('contactPage.formLead')}</p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center flex flex-col items-center justify-center h-64 transition-all animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">{t('contactPage.successTitle')}</h3>
                <p className="text-emerald-700">{t('contactPage.successLead')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* الاسم الكامل */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-[#0a1526] mb-2">{t('contactPage.nameLabel')}</label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1526] focus:border-transparent transition-all"
                      placeholder={t('contactPage.namePlaceholder')}
                    />
                  </div>
                  {/* رقم الهاتف */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-[#0a1526] mb-2">{t('contactPage.phoneLabel')}</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      dir="ltr"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1526] focus:border-transparent transition-all text-start"
                      placeholder="+962 XXXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* البريد الإلكتروني */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-[#0a1526] mb-2">{t('contactPage.emailLabel')}</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1526] focus:border-transparent transition-all"
                      placeholder="name@company.com"
                    />
                  </div>
                  {/* اسم المنشأة */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-bold text-[#0a1526] mb-2">{t('contactPage.companyLabel')}</label>
                    <input 
                      type="text" 
                      id="company" 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1526] focus:border-transparent transition-all"
                      placeholder={t('contactPage.companyPlaceholder')}
                    />
                  </div>
                </div>

                {/* نوع الخدمة */}
                <div>
                  <label htmlFor="service" className="block text-sm font-bold text-[#0a1526] mb-2">{t('contactPage.serviceLabel')}</label>
                  <div className="relative">
                    <select 
                      id="service" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg ps-4 pe-11 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1526] focus:border-transparent transition-all appearance-none"
                    >
                      <option value="">{t('contactPage.servicePlaceholder')}</option>
                      <option value="facilities">{t('contactPage.serviceOptions')[0]}</option>
                      <option value="escort">{t('contactPage.serviceOptions')[1]}</option>
                      <option value="events">{t('contactPage.serviceOptions')[2]}</option>
                      <option value="cash">{t('contactPage.serviceOptions')[3]}</option>
                      <option value="consulting">{t('contactPage.serviceOptions')[4]}</option>
                      <option value="other">{t('contactPage.serviceOptions')[5]}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 -translate-y-1/2 end-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {/* الرسالة */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[#0a1526] mb-2">{t('contactPage.notesLabel')}</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1526] focus:border-transparent transition-all resize-none"
                    placeholder={t('contactPage.notesPlaceholder')}
                  ></textarea>
                </div>

                {/* ملاحظة السرية وزر الإرسال */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 max-w-sm">
                    <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                    {t('contactPage.securityNote')}
                  </p>
                  
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto bg-[#0a1526] hover:bg-[#1e293b] text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group"
                  >
                    <span>{t('contactPage.submit')}</span>
                    <Send className={`w-5 h-5 transition-transform ${dir === 'ltr' ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : 'group-hover:-translate-x-1 group-hover:-translate-y-1'}`} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}