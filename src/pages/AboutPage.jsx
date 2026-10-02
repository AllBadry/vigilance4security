import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShieldCheck, Eye, Target, Gem, Radar, ChevronLeft, Phone, Mail, ArrowLeft,
} from 'lucide-react';
import {
  aboutHero, pillars, milestones, expertise, footage, contact,
} from '../data/about';
import '../styles/fonts.css';

gsap.registerPlugin(ScrollTrigger);

const pillarIcons = [ShieldCheck, Target, Eye, Gem, Radar];

function LazyClip({ src, poster, caption, credit }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const play = video.play();
            if (play && typeof play.catch === 'function') play.catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={wrapRef} className="group relative h-[320px] md:h-[420px] overflow-hidden rounded-sm bg-[#050d1a] border border-white/10">
      <video
        ref={videoRef}
        src={src}
        {...(poster ? { poster } : {})}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1200ms]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/25 to-transparent" />
      <figcaption className="absolute bottom-0 right-0 left-0 p-5 flex items-end justify-between gap-3">
        <span className="text-sm md:text-base font-bold text-white">{caption}</span>
        <span className="text-[10px] text-white/45 shrink-0">Pexels · {credit}</span>
      </figcaption>
    </figure>
  );
}

export default function AboutPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.ab-reveal').forEach((el) => {
          gsap.from(el, {
            y: 48,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        });

        const heroMedia = rootRef.current.querySelector('.ab-hero-media');
        if (heroMedia) {
          gsap.fromTo(
            heroMedia,
            { scale: 1.18, yPercent: 6 },
            {
              scale: 1,
              yPercent: 0,
              duration: 2.2,
              ease: 'power3.out',
            }
          );
          gsap.to(heroMedia, {
            yPercent: 16,
            ease: 'none',
            scrollTrigger: {
              trigger: '.ab-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        gsap.from('.ab-hero-copy > *', {
          y: 34,
          opacity: 0,
          duration: 1,
          stagger: 0.14,
          delay: 0.35,
          ease: 'power3.out',
        });

        const marks = gsap.utils.toArray('.ab-mark');
        marks.forEach((mark) => {
          gsap.to(mark, {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
              trigger: mark,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        });

        const panels = gsap.utils.toArray('.ab-panel');
        panels.forEach((panel) => {
          const img = panel.querySelector('.ab-panel-img');
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: -12, scale: 1.12 },
            {
              yPercent: 12,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
          gsap.from(panel.querySelector('.ab-panel-copy'), {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 75%' },
          });
        });

        const line = rootRef.current.querySelector('.ab-timeline-fill');
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              transformOrigin: 'top center',
              scrollTrigger: {
                trigger: '.ab-timeline',
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: 0.6,
              },
            }
          );
        }

        gsap.utils.toArray('.ab-mile').forEach((mile) => {
          gsap.from(mile, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: mile, start: 'top 88%' },
          });
        });

        gsap.utils.toArray('.ab-exp-img').forEach((img) => {
          gsap.from(img, {
            yPercent: 10,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        gsap.from('.ab-clips > *', {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ab-clips', start: 'top 82%' },
        });
      });
    }, rootRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} dir="rtl" className="font-cairo bg-[#050d1a] text-white overflow-x-clip">
      <section className="ab-hero v4s-noise relative h-screen w-full overflow-hidden bg-[#0a192f]">
        <div className="absolute inset-0 h-[120%] -top-[10%]">
          <div className="ab-hero-media h-full w-full">
            <video
              src={aboutHero.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-l from-[#0f2027]/95 via-[#203a43]/70 to-[#2c5364]/25 mix-blend-multiply" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden">
            <div className="w-[40vw] h-[40vw] rounded-full border-[1.5px] border-white/20 absolute -translate-x-1/4" />
            <div className="w-[65vw] h-[65vw] rounded-full border-[1.5px] border-white/10 absolute -translate-x-1/4" />
            <div className="w-[90vw] h-[90vw] rounded-full border border-white/5 absolute -translate-x-1/4" />
          </div>
        </div>

        <div className="ab-hero-copy relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-end pb-28 md:pb-32">
          <div className="flex flex-wrap w-16 gap-1.5 mb-8 opacity-60">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full" />
            ))}
          </div>
          <p className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase mb-5">
            {aboutHero.kicker}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black leading-[1.1] tracking-tight drop-shadow-xl uppercase max-w-4xl">
            {aboutHero.title} <span className="text-amber-400">{aboutHero.titleAccent}</span>
          </h1>
          <p className="mt-7 text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed font-medium">
            {aboutHero.lead}
          </p>
          <a href="#journey" className="group mt-10 inline-flex items-center gap-2 w-fit text-white font-bold text-lg border-b border-white/40 pb-1 hover:border-amber-400 hover:text-amber-400 transition-all">
            رحلتنا
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          </a>
        </div>
      </section>

      <section className="relative bg-[#0a1526] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="ab-mark v4s-wordmark v4s-clip-x text-center text-[16vw] md:text-[11vw] font-black uppercase leading-none tracking-tighter select-none"
            style={{ backgroundImage: 'url("https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&w=2000")' }}
          >
            VIGILANCE
          </h2>
          <div className="ab-reveal mt-14 grid gap-8 md:grid-cols-2">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i] || ShieldCheck;
              return (
                <article
                  key={pillar.title}
                  className="group relative p-7 md:p-8 rounded-sm border border-white/10 bg-white/[0.02] hover:border-amber-500/50 transition-colors duration-500"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{pillar.title}</h3>
                  </div>
                  <p className="text-slate-400 text-base leading-loose font-medium">{pillar.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="journey" className="relative bg-[#050d1a] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ab-reveal flex flex-col items-center text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-amber-500" />
              <span className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase">مسار المجموعة</span>
              <span className="w-8 h-[1px] bg-amber-500" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              من الفكرة إلى <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-amber-600">الحماية</span>
            </h2>
          </div>

          <div className="ab-timeline relative">
            <div className="absolute top-0 bottom-0 right-[22px] md:right-1/2 w-px bg-white/10 md:translate-x-px">
              <div className="ab-timeline-fill h-full w-full bg-gradient-to-b from-amber-400 to-amber-600" />
            </div>

            <div className="flex flex-col gap-12 md:gap-20">
              {milestones.map((mile, i) => (
                <div
                  key={mile.title}
                  className={`ab-mile relative flex md:gap-10 pe-14 md:pe-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute top-2 right-0 md:right-1/2 md:translate-x-1/2 w-11 h-11 rounded-full bg-[#050d1a] border border-amber-500/50 flex items-center justify-center shrink-0 z-10">
                    <span className="text-amber-400 text-sm font-black tabular-nums">
                      {mile.year ?? String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{mile.title}</h3>
                      <p className="text-slate-400 leading-loose font-medium">{mile.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a1526] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ab-reveal flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-amber-500" />
              <span className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase">خبراتنا</span>
              <span className="w-8 h-[1px] bg-amber-500" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              أين نضع <span className="text-amber-400">خبرتنا</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, i) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-sm h-[380px] border border-white/10 ${
                  i === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="ab-exp-img absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/55 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                  <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                    {item.status}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/75 text-sm md:text-base leading-relaxed font-medium max-w-[92%]">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#050d1a] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ab-reveal flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-amber-500" />
              <span className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase">من الميدان</span>
              <span className="w-8 h-[1px] bg-amber-500" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              حماية <span className="text-amber-400">بلا انقطاع</span>
            </h2>
          </div>

          <div className="ab-clips grid gap-6 sm:grid-cols-2">
            {footage.map((clip) => (
              <LazyClip key={clip.src} {...clip} />
            ))}
          </div>
          <p className="ab-reveal mt-8 text-center text-xs text-white/35">
            المقاطع التوضيحية من Pexels ولا تمثل عمليات فعلية للمجموعة.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a1526] py-24 md:py-28">
        <div className="ab-panel relative h-[220vh]">
          <div className="ab-panel-img sticky top-0 h-screen w-full">
            <img
              src="/Security Escort.jpg"
              alt="مرافقة أمنية"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1526] via-[#0a1526]/60 to-[#0a1526]/30" />
          </div>
          <div className="ab-panel-copy sticky top-0 h-screen w-full flex items-center justify-center px-4 -mt-screen">
            <div className="text-center max-w-3xl">
              <p className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase mb-6">خلاصة</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl">
                {pillars[0].desc}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#050d1a] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="ab-reveal text-2xl md:text-4xl font-black text-white mb-5">هل تبحث عن حماية متكاملة؟</h2>
          <p className="ab-reveal text-slate-400 mb-10 leading-loose font-medium">
            تواصل مع فريق غرفة العمليات المركزية مباشرة، أو اطلع على خدماتنا الكاملة.
          </p>
          <div className="ab-reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 text-[#0a192f] font-bold rounded-sm hover:bg-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              تواصل معنا
            </a>
            <a
              href={`mailto:${contact.emails[0]}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white font-bold rounded-sm hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              {contact.emails[0]}
            </a>
          </div>
          <Link
            to="/"
            className="ab-reveal group mt-12 inline-flex items-center gap-2 text-white/70 font-bold hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            العودة إلى الرئيسية
          </Link>
        </div>
      </section>
    </div>
  );
}