import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { config } from '../config.js'

export default function ProductTiles() {
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

  return (
    <div className="product-tiles">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-tile">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price} {config.currency}</p>
        </Link>
      ))}
    </div>
  )
}
