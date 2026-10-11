import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { config } from '../config.js'
import { useAuth } from '../hooks/useAuth.js'
import ProductImage from '../components/ProductImage.jsx'

export default function OrderDetailsPage() {
  const { id } = useParams()
  const { user, checking, authFetch } = useAuth()
  const userId = user?.id
  // Заказ: { id, user_id, amount, created_at, items: [{ item_id, name, price, quantity }] }
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return
    // Сервер ищет только среди заказов текущего пользователя: чужой заказ → 404
    authFetch(`/api/v1/orders/${id}`)
      .then((response) => {
        if (response.status === 404) throw new Error('Заказ не найден')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then(setOrder)
      .catch((err) => setError(err.message))
  }, [id, userId, authFetch])

  if (checking) return <p>Загрузка...</p>
  if (!user) return <Navigate to="/login" replace />

  return (
    <>
      <p><Link to="/account">← Мои заказы</Link></p>
      <h1>Заказ №{id}</h1>

      {error && <p>{error}</p>}
      {!error && order === null && <p>Загрузка...</p>}
      {order && (
        <>
          <p>Дата: {new Date(order.created_at).toLocaleString('ru-RU')}</p>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Товар</th>
                  <th>Цена</th>
                  <th>Кол-во</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((line) => (
                  <tr key={line.item_id}>
                    <td>
                      <div className="order-line-product">
                        <ProductImage name={line.name} className="cart-thumb" />
                        <Link to={`/product/${line.item_id}`}>{line.name}</Link>
                      </div>
                    </td>
                    <td>{line.price} {config.currency}</td>
                    <td>{line.quantity}</td>
                    <td>{(Number(line.price) * line.quantity).toFixed(2)} {config.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Итого: <strong>{order.amount} {config.currency}</strong></p>
        </>
      )}
    </>
  )
}
