import { useState } from 'react';
import { Link } from 'react-router'; // أو 'react-router-dom' حسب إصدارك
import { Shield, CheckCircle2, Phone, FileText, BadgeInfo } from 'lucide-react';
import { useLang } from '../i18n/useLang';

export default function UniformShowcase() {
  const { t, dir } = useLang();

  // قائمة الصور المرجعية للزي الرسمي
  const images = [
    { id: 'full', src: '/fullbory_result.webp', ...t('suit.images')[0] },
    { id: 'chest', src: '/chest1_result.webp', ...t('suit.images')[1] },
    { id: 'shoulder', src: '/shoulder1_result.webp', ...t('suit.images')[2] },
    { id: 'cap', src: '/cap-real_result.webp', ...t('suit.images')[3] }
  ];

  // حالة لتتبع الصورة المعروضة حالياً (تبدأ بالصورة الكاملة)
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <main dir={dir} className="bg-[#f8fafc] font-cairo selection:bg-[#0f172a] selection:text-white min-h-[100svh] pb-20 md:pb-24">
      
      {/* 
        رأس الصفحة الغامق (Dark Header) 
        هنا سيظهر الناف بار الشفاف بشكل ممتاز لأن الخلفية أصبحت كحلية داكنة
      */}
      <div className="bg-[#0a1526] pt-32 pb-12 md:pt-40 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* شريط العنوان العلوي */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{t('suit.kicker')}</h2>
              <p className="text-slate-300 mt-3 flex items-center gap-2 text-sm sm:text-base">
                <Shield className="w-5 h-5" />
                {t('suit.subtitle')}
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="px-5 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg border border-white/20">
                {t('suit.badge')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* محتوى الصفحة الأساسي (الصور والتفاصيل) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* العمود الأيمن: معرض الصور */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* الصورة الرئيسية */}
            <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:h-[600px] rounded-2xl overflow-hidden bg-slate-200 shadow-inner border border-slate-200 group">
              <img 
                src={activeImage.src} 
                alt={activeImage.alt}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 start-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow-sm border border-slate-100 flex items-center gap-2">
                <BadgeInfo className="w-4 h-4 text-[#0f172a]" />
                <span className="text-xs font-bold text-[#0f172a]">{activeImage.title}</span>
              </div>
            </div>

            {/* المصغرات (Thumbnails) */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-slate-100 transition-all duration-300 ${
                    activeImage.id === img.id 
                      ? 'ring-2 ring-offset-2 ring-[#0f172a] shadow-md border-transparent' 
                      : 'border border-slate-200 hover:border-slate-400 hover:shadow-sm'
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* طبقة تظليل خفيفة للصور غير النشطة */}
                  <div className={`absolute inset-0 bg-[#0f172a]/10 transition-opacity ${activeImage.id === img.id ? 'opacity-0' : 'opacity-100'}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* العمود الأيسر: التفاصيل والمعلومات المؤسسية */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="mb-2">
              <span className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-2 block">
                {t('suit.eyebrow')}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] leading-tight mb-2">
                {t('suit.title')}
              </h1>
              <p className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-6 font-mono leading-relaxed">
                {t('suit.brandLine')}
              </p>
            </div>

            <div className="prose prose-slate mb-8 text-slate-600 leading-relaxed">
              <p>
                {t('suit.body')}
              </p>
            </div>

            {/* المواصفات الفنية */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-[#0f172a] mb-4 border-b border-slate-200 pb-2">
                {t('suit.specsTitle')}
              </h3>
              <ul className="space-y-4">
                {t('suit.specs').map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* أزرار الإجراءات (Corporate Call to Actions) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
              <Link
                to="/contact"
                className="flex-1 bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{t('suit.ctaPrimary')}</span>
              </Link>

              <Link
                to="/about"
                className="flex-1 bg-white hover:bg-slate-50 text-[#0f172a] border-2 border-[#0f172a] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                <span>{t('suit.ctaSecondary')}</span>
              </Link>
            </div>

            <p className="text-xs text-slate-400 mt-6 text-center sm:text-start flex items-center justify-center sm:justify-start gap-1">
              <Shield className="w-3.5 h-3.5" />
              {t('suit.note')}
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
