# Shop Client (React)

Клиент тестового интернет-магазина: React 19 + Vite + React Router.
Данные берёт из Rails API (`shop-api`).

## Запуск локально

```bash
npm install
npm run dev
```

Адрес API задаётся переменной `VITE_API_URL` (см. `.env.example`).
Без неё используется `http://192.168.33.10:3000`. Чтобы задать свой адрес локально,
скопируйте `.env.example` в `.env.local` и поправьте значение.

> Переменные `VITE_*` подставляются **при сборке** прямо в код страницы:
> после изменения нужно пересобрать клиент, и секретов в них хранить нельзя.

## Размещение (Render)

**New → Static Site**, этот репозиторий:

- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Environment: `VITE_API_URL=https://<shop-api>.onrender.com`
- Redirects/Rewrites: `/*` → `/index.html`, действие **Rewrite**
  (иначе прямые ссылки вроде `/product/3` дадут 404). Для Netlify то же правило уже лежит в `public/_redirects`.

После размещения добавьте адрес клиента в переменную `CORS_ORIGINS` у `shop-api`.
