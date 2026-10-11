import { config } from '../config.js'

// Картинка товара. Её генерирует сервер магазина (сам ходит в сервис картинок).
// URLSearchParams кодирует пробелы и спецсимволы в названии.
// name — текст для генерации, template — шаблон картинки сервиса
export default function ProductImage({ name, template = '100', alt = name, className }) {
  const params = new URLSearchParams({ t: name, template })

  return (
    <img
      src={`${config.apiUrl}/api/v1/image?${params}`}
      alt={alt}
      className={className}
      // Сервер не отдал картинку — показываем заглушку (один раз, без зацикливания)
      onError={(e) => {
        if (!e.currentTarget.src.endsWith('/placeholder.svg')) e.currentTarget.src = '/placeholder.svg'
      }}
    />
  )
}
