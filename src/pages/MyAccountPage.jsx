import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router'
import { config } from '../config.js'
import { useAuth } from '../hooks/useAuth.js'
import { useMessage } from '../hooks/useMessage.js'
import ProductImage from '../components/ProductImage.jsx'

// Форма имени и фамилии. Рендерится только для вошедшего пользователя,
// поэтому начальные значения можно брать прямо из user
function ProfileForm({ user }) {
  const { updateProfile } = useAuth()
  const showMessage = useMessage()
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [sending, setSending] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    updateProfile({ first_name: firstName, last_name: lastName })
      .then(() => showMessage('Данные сохранены'))
      .catch((err) => showMessage(err.message, 'Ошибка'))
      .finally(() => setSending(false))
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Имя
        <input
          type="text"
          required
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Фамилия
        <input
          type="text"
          required
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <button type="submit" className="button-link" disabled={sending}>
        Сохранить
      </button>
    </form>
  )
}

export default function MyAccountPage() {
  const { user, checking, authFetch } = useAuth()
  const userId = user?.id
  // Заказы: [{ id, amount, created_at, items_count }, ...], новые сверху
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return
    authFetch('/api/v1/orders')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then(setOrders)
      .catch((err) => setError(err.message))
    // userId, а не user: после смены имени user меняется, а заказы перезагружать незачем
  }, [userId, authFetch])

  // Пока проверяем сохранённый токен — ещё не знаем, вошёл ли пользователь
  if (checking) return <p>Загрузка...</p>
  if (!user) return <Navigate to="/login" replace />

  return (
    <>
      <h1>Личный кабинет</h1>
      <p>{user.email}</p>

      <h2>Мои данные</h2>
      {/* Та же раскладка, что на странице товара: картинка слева, данные справа */}
      <div className="product-details">
        <div className="product-details-image">
          <ProductImage
            name={user.email}
            template="200"
            alt={`${user.first_name} ${user.last_name}`}
          />
        </div>
        <div className="product-details-info">
          <ProfileForm user={user} />
        </div>
      </div>

      <h2>Мои заказы</h2>
      {error && <p>Не удалось загрузить заказы: {error}</p>}
      {!error && orders === null && <p>Загрузка...</p>}
      {orders?.length === 0 && <p>Заказов пока нет</p>}
      {orders?.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr>
              <th></th>
              <th>№</th>
              <th>Дата</th>
              <th>Товаров</th>
              <th>Сумма</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <ProductImage
                    name={String(order.id)}
                    template="300"
                    alt={`Заказ №${order.id}`}
                    className="cart-thumb"
                  />
                </td>
                <td>{order.id}</td>
                <td>{new Date(order.created_at).toLocaleString('ru-RU')}</td>
                <td>{order.items_count}</td>
                <td>{order.amount} {config.currency}</td>
                <td><Link to={`/account/orders/${order.id}`}>Подробности</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
