export const SITE_URL = 'https://vigilance4security.com';
export const SITE_NAME = {
  ar: 'مجموعة اليقظة للأمن والحماية',
  en: 'Vigilance For Security',
};
export const OG_LOCALE = { ar: 'ar_AR', en: 'en_US' };
export const OG_IMAGE = {
  url: '/RRvVSLogo.png',
  width: 2000,
  height: 2000,
  type: 'image/png',
  alt: {
    ar: 'شعار مجموعة اليقظة للأمن والحماية',
    en: 'Vigilance For Security logo',
  },
};
export const THEME_COLOR = '#0a1526';

export const PAGES = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    ar: {
      title: 'مجموعة اليقظة للأمن والحماية | حلول أمنية متكاملة في الأردن',
      description:
        'خدمات الأمن والحماية في الأردن: حماية المنشآت والمواقع، المرافقة الأمنية للشخصيات والوفود، نقل الأموال، تأمين الفعاليات، الاستشارات والتدريب الأمني المتخصص على مدار الساعة.',
    },
    en: {
      title: 'Vigilance For Security (V4S) | Integrated Security Solutions in Jordan',
      description:
        'Integrated security and protection services in Jordan: facility guarding, VIP security escort, cash transport, event security, consulting and specialized training — available around the clock.',
    },
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.8',
    ar: {
      title: 'من نحن | مجموعة اليقظة للأمن والحماية',
      description:
        'تعرّف على مجموعة اليقظة للأمن والحماية: فريق أمني مرخّص ومدرّب تقنياً وميدانياً، رؤيتنا وقيمنا، ومسيرتنا في تقديم حلول الحماية للمنشآت والأفراد في الأردن.',
    },
    en: {
      title: 'About Us | Vigilance For Security (V4S)',
      description:
        'Learn about Vigilance For Security: a licensed team trained both technically and in the field, our vision and values, and our record protecting facilities and people across Jordan.',
    },
  },
  {
    path: '/suit',
    changefreq: 'monthly',
    priority: '0.6',
    ar: {
      title: 'الزي الأمني الرسمي | مجموعة اليقظة للأمن والحماية',
      description:
        'تعرّف على الزي الأمني الرسمي المعتمد لرجال الأمن في مجموعة اليقظة: التصميم والمكونات والمواصفات التي تعكس الانضباط والاحترافية والجاهزية في الميدان.',
    },
    en: {
      title: 'Official Security Uniform | Vigilance For Security (V4S)',
      description:
        'Explore the official security uniform worn by Vigilance For Security personnel: design, components and specifications that reflect discipline, professionalism and field readiness.',
    },
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: '0.9',
    ar: {
      title: 'تواصل معنا وطلب عرض سعر | مجموعة اليقظة للأمن والحماية',
      description:
        'تواصل مع مجموعة اليقظة للأمن والحماية واطلب عرض سعر: أرقام الاتصال المباشر، البريد الإلكتروني، عنوان المقر الرئيسي في عمّان، ونموذج طلب الخدمة الأمنية.',
    },
    en: {
      title: 'Contact Us & Request a Quote | Vigilance For Security (V4S)',
      description:
        'Contact Vigilance For Security and request a quote: direct phone lines, email addresses, our headquarters in Amman, and a form to request a security service.',
    },
  },
];

export const canonicalFor = (path) => {
  const base = path === '/' ? '/' : `${path}/`;
  return `${SITE_URL}${base}`;
};

export const pageFor = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return PAGES.find((page) => page.path === clean) ?? PAGES[0];
};
