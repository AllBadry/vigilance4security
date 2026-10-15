import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  Shield, 
  Briefcase, 
  Lock, 
  ShieldAlert, 
  Globe 
} from 'lucide-react';
import { useLang } from '../i18n/useLang';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t, dir } = useLang();

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const scrolled = Math.abs(scrollLeft);
      const maxScroll = scrollWidth - clientWidth;
      const progress = (maxScroll > 0 ? scrolled / maxScroll : 0) * 100;
      setScrollProgress(progress);
    }
  };

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 350;
      sliderRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".sector-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sectorMeta = [
    {
      icon: <Building2 className="w-4 h-4" />,
      image: "/istockphoto-1508453163-612x612_result.webp",
      gradient: "from-blue-900/90 to-[#0a1526]/90"
    },
    {
      icon: <Shield className="w-4 h-4" />,
      image: "/Security Escort_result.webp",
      gradient: "from-teal-900/90 to-[#0a1526]/90"
    },
    {
      icon: <Briefcase className="w-4 h-4" />,
      image: "/6e4ba378-4f08-4fe7-be98-99aa4908b7ba_result.webp",
      gradient: "from-slate-800/90 to-[#0a1526]/90"
    },
    {
      icon: <Lock className="w-4 h-4" />,
      image: "/photo-1601597111158-2fceff292cdc_result.webp",
      gradient: "from-amber-900/90 to-[#0a1526]/90"
    },
    {
      icon: <ShieldAlert className="w-4 h-4" />,
      image: "/images (9)_result.webp",
      gradient: "from-red-900/90 to-[#0a1526]/90"
    },
    {
      icon: <Globe className="w-4 h-4" />,
      image: "/download_result.webp",
      gradient: "from-cyan-900/90 to-[#0a1526]/90"
    }
  ];

  const sectors = sectorMeta.map((meta, i) => ({
    ...meta,
    ...t('services.sectors')[i],
  }));

  return (
    <section ref={sectionRef} dir={dir} id="services" className="bg-[#0a1526] font-cairo pt-24 pb-12 overflow-hidden flex flex-col">
      
      {/* عنوان القسم */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center w-full">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-amber-500"></span>
          <span className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase">{t('services.kicker')}</span>
          <span className="w-8 h-[1px] bg-amber-500"></span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          {t('services.titleA')} <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-amber-600">{t('services.titleB')}</span>
        </h2>
      </div>

      <div className="w-full ps-4 pe-4 md:ps-12 lg:ps-24 mb-6">
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sectors.map((sector) => (
            <div 
              key={sector.title} 
              className="sector-card shrink-0 w-[280px] md:w-[340px] h-[400px] md:h-[500px] snap-center relative rounded-sm overflow-hidden group cursor-pointer"
            >
              <img 
                src={sector.image} 
                alt={sector.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${sector.gradient} opacity-90 group-hover:opacity-80 transition-opacity duration-500`}></div>
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{sector.title}</h3>
                  <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed max-w-[90%]">{sector.desc}</p>
                </div>
                
                <div className="flex items-center gap-3 text-white/90 border-t border-white/10 pt-4 mt-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                    {sector.icon}
                  </div>
                  <span className="text-xs md:text-sm font-bold tracking-wide text-amber-400">{sector.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full px-4 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="w-full md:w-1/3 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <div 
              className="absolute top-0 start-0 h-full bg-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollSlider('right')} aria-label="Next" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-[#0a1526] hover:bg-amber-500 transition-all">
              <ArrowRight className={`w-5 h-5 ${dir === 'ltr' ? '' : 'rotate-180'}`} />
            </button>
            <button onClick={() => scrollSlider('left')} aria-label="Previous" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-[#0a1526] hover:bg-amber-500 transition-all">
              <ArrowLeft className={`w-5 h-5 ${dir === 'ltr' ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
