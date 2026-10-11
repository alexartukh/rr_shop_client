import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { config } from '../config.js'

// filter — подстрока, которая должна быть в названии товара (без учёта регистра).
// Пустой фильтр — показываем все товары
export default function ProductTiles({ filter = '' }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${config.apiUrl}/api/v1/items`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Не удалось загрузить товары: {error}</p>

  const query = filter.trim().toLowerCase()
  const visible = query
    ? products.filter((p) => p.name.toLowerCase().includes(query))
    : products

  if (visible.length === 0) return <p>Ничего не найдено</p>

  return (
    <div className="product-tiles">
      {visible.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-tile">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price} {config.currency}</p>
        </Link>
      ))}
    </div>
  )
}
