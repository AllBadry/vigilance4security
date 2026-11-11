export const SITE_URL = 'https://vigilance4security.com';
export const SITE_NAME = {
  ar: 'شركة اليقظة للأمن والحماية',
  en: 'Vigilance Security Company',
};
export const SITE_SHORT_NAME = { ar: 'اليقظة', en: 'V4S' };
export const OG_LOCALE = { ar: 'ar_AR', en: 'en_US' };
export const CONTACT = {
  phone: '+962795602030',
  opsPhone: '+962772050091',
  email: 'Info@vigilance4security.com',
  opsEmail: 'Operation@vigilance4security.com',
  address: {
    street: 'شارع المدينة المنورة',
    city: 'عمّان',
    country: 'JO',
  },
};
export const OG_IMAGE = {
  url: '/RRvVSLogo_result.webp',
  width: 2000,
  height: 2000,
  type: 'image/webp',
  alt: {
    ar: 'شعار شركة اليقظة للأمن والحماية',
    en: 'Vigilance Security Company logo',
  },
};
export const THEME_COLOR = '#0a1526';

export const PAGES = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    pageType: 'WebPage',
    label: { ar: 'الرئيسية', en: 'Home' },
    ar: {
      title: 'شركة اليقظة للأمن والحماية | حلول أمنية متكاملة في الأردن',
      description:
        'خدمات الأمن والحماية في الأردن: حماية المنشآت والمواقع، المرافقة الأمنية للشخصيات والوفود، نقل الأموال، تأمين الفعاليات، الاستشارات والتدريب الأمني المتخصص على مدار الساعة.',
    },
    en: {
      title: 'Vigilance Security Company (V4S) | Integrated Security Solutions in Jordan',
      description:
        'Integrated security and protection services in Jordan: facility guarding, VIP security escort, cash transport, event security, consulting and specialized training — available around the clock.',
    },
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.8',
    pageType: 'AboutPage',
    label: { ar: 'من نحن', en: 'About Us' },
    ar: {
      title: 'من نحن | شركة اليقظة للأمن والحماية',
      description:
        'تعرّف على شركة اليقظة للأمن والحماية: فريق أمني مرخّص ومدرّب تقنياً وميدانياً، رؤيتنا وقيمنا، ومسيرتنا في تقديم حلول الحماية للمنشآت والأفراد في الأردن.',
    },
    en: {
      title: 'About Us | Vigilance Security Company (V4S)',
      description:
        'Learn about Vigilance Security Company: a licensed team trained both technically and in the field, our vision and values, and our record protecting facilities and people across Jordan.',
    },
  },
  {
    path: '/suit',
    changefreq: 'monthly',
    priority: '0.6',
    pageType: 'WebPage',
    label: { ar: 'الزي الرسمي', en: 'Official Uniform' },
    ar: {
      title: 'الزي الأمني الرسمي | شركة اليقظة للأمن والحماية',
      description:
        'تعرّف على الزي الأمني الرسمي المعتمد لرجال الأمن في شركة اليقظة: التصميم والمكونات والمواصفات التي تعكس الانضباط والاحترافية والجاهزية في الميدان.',
    },
    en: {
      title: 'Official Security Uniform | Vigilance Security Company (V4S)',
      description:
        'Explore the official security uniform worn by Vigilance Security Company personnel: design, components and specifications that reflect discipline, professionalism and field readiness.',
    },
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: '0.9',
    pageType: 'ContactPage',
    label: { ar: 'تواصل معنا', en: 'Contact Us' },
    ar: {
      title: 'تواصل معنا وطلب عرض سعر | شركة اليقظة للأمن والحماية',
      description:
        'تواصل مع شركة اليقظة للأمن والحماية واطلب عرض سعر: أرقام الاتصال المباشر، البريد الإلكتروني، عنوان المقر الرئيسي في عمّان، ونموذج طلب الخدمة الأمنية.',
    },
    en: {
      title: 'Contact Us & Request a Quote | Vigilance Security Company (V4S)',
      description:
        'Contact Vigilance Security Company and request a quote: direct phone lines, email addresses, our headquarters in Amman, and a form to request a security service.',
    },
  },
];

export const canonicalFor = (path) => {
  const base = path === '/' ? '/' : `${path}/`;
  return `${SITE_URL}${base}`;
};

export const normalizePath = (pathname) => pathname.replace(/\/+$/, '') || '/';

export const isKnownPath = (pathname) =>
  PAGES.some((page) => page.path === normalizePath(pathname));

export const pageFor = (pathname) =>
  PAGES.find((page) => page.path === normalizePath(pathname)) ?? PAGES[0];
