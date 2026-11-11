# React + Vite

## SEO

- `seo.config.mjs` هو المصدر الوحيد لعناوين الصفحات ووصفها و`canonical` وخريطة الموقع.
- `npm run build` يبني الموقع ويولّد `dist/sitemap.xml` و`dist/robots.txt`.
- `npm run prerender` يحوّل كل مسار إلى صفحة HTML مستقلة داخل `dist` (يتطلب Chrome/Chromium).
- `npm run verify:seo` يتحقق من العناوين والوصف و`canonical` و`JSON-LD` وخريطة الموقع.
- لإضافة صفحة جديدة: أضفها إلى `PAGES` في `seo.config.mjs` ثم أضف المسار في `src/App.jsx`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
