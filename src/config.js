export const config = {
  currency: 'USD',
  // Адрес Rails API. Подставляется при сборке (npm run dev / npm run build)
  // из переменной VITE_API_URL: файл .env.local или настройки хостинга.
  // Без переменной — адрес виртуалки для локальной разработки.
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://192.168.33.10:3000',
}
