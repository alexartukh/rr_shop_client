import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { config } from '../config.js'
import ProductActions from '../components/ProductActions.jsx'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${config.apiUrl}/api/v1/items/${id}`)
      .then((response) => {
        if (response.status === 404) return null
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Не удалось загрузить товар: {error}</p>
  if (!product) return <h1>Товар не найден</h1>

  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>{product.price} {config.currency}</strong></p>
      <ProductActions product={product} />
    </>
  )
}
