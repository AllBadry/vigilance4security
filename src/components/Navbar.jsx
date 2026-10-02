import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // مراقبة التمرير لتغيير خلفية الناف بار
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'من نحن', href: '#about' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 font-cairo dir-rtl ${
        isScrolled 
          ? 'bg-[#0a192f]/95 backdrop-blur-md shadow-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      {/* 1. الشريط العلوي المصغر (Top Bar) */}
      <div className={`hidden md:block w-full border-b transition-all duration-500 ${
        isScrolled ? 'border-white/5 bg-white/5' : 'border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs font-semibold text-white/70">
          
          {/* الجانب الأيمن (معلومات الاتصال) */}
          <div className="flex items-center gap-6">
            <a href="tel:0772050091" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span className="tracking-wider">0772050091</span>
            </a>
            <span className="w-px h-4 bg-white/20"></span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              غرفة العمليات المركزية جاهزة
            </span>
          </div>

          {/* الجانب الأيسر (اللغة وروابط سريعة) */}
          <div className="flex items-center gap-6">
            <a href="#careers" className="hover:text-white transition-colors">الموارد البشرية</a>
            <a href="#investors" className="hover:text-white transition-colors">علاقات المستثمرين</a>
            <span className="w-px h-4 bg-white/20"></span>
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors group">
              <Globe className="w-3.5 h-3.5" />
              <span>AR</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. شريط التنقل الرئيسي (Main Navbar) */}
      {/* تم زيادة ارتفاع الناف بار h-20 و h-28 لاستيعاب الشعار الأكبر */}
      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 flex items-center justify-between ${
        isScrolled ? 'h-20' : 'h-28'
      }`}>
        
        {/* الشعار - تم حل مشكلة اللون الداكن وزيادة الحجم */}
        <a href="#home" className="flex items-center group relative z-10">
          <div>
            <img 
              src="./RRvVSLogo.png" 
              alt="اليقظة للأمن والحماية" 
              className={`object-contain transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'
              }`}
            />
          </div>
        </a>

        {/* روابط التنقل (Desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-bold text-white/90 hover:text-amber-400 transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-3/4 after:transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* زر الإجراء السريع للمكتب / الموبايل */}
        <div className="flex items-center gap-4">
          <a
            href="#request"
            className="hidden md:inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-[#0a192f] bg-amber-500 hover:bg-white transition-colors rounded-sm shadow-lg shadow-amber-500/10"
          >
            طلب عرض سعر
          </a>

          {/* زر قائمة الموبايل */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* 3. قائمة الموبايل (Mobile Menu) */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#0a192f]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col px-4 py-6 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-base font-bold text-white/80 hover:text-amber-400 hover:bg-white/5 rounded-sm border-r-2 border-transparent hover:border-amber-400 transition-all"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#request"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-4 py-3 text-center text-sm font-bold text-[#0a192f] bg-amber-500 hover:bg-amber-400 rounded-sm transition-colors"
          >
            طلب عرض سعر
          </a>
        </div>
      </div>
    </header>
  );
}