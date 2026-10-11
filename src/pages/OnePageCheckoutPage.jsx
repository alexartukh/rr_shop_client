import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'
import { useMessage } from '../hooks/useMessage.js'
import CheckoutInfo from '../components/CheckoutInfo.jsx'
import CartTable from '../components/CartTable.jsx'

export default function OnePageCheckoutPage() {
  const { user, authFetch } = useAuth()
  const { items, clear } = useCart()
  const showMessage = useMessage()
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)

  async function handlePlaceOrder() {
    if (!user) {
      showMessage('Чтобы разместить заказ, войдите или зарегистрируйтесь', 'Нужен вход')
      return
    }
    if (items.length === 0) {
      showMessage('Корзина пуста', 'Нечего заказывать')
      return
    }

    setSending(true)
    try {
      // Сервер сам посчитает сумму по ценам из базы — отправляем только id и количество
      const response = await authFetch('/api/v1/placeorder', {
        method: 'POST',
        body: JSON.stringify({
          items: items.map((i) => ({ item_id: i.id, quantity: i.quantity })),
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`)

      // Корзина сейчас очистится, поэтому её содержимое передаём на страницу благодарности
      clear()
      navigate('/thank-you', { replace: true, state: { orderId: data.id, items } })
    } catch (err) {
      showMessage(err.message, 'Не удалось разместить заказ')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <h1>Оформление заказа</h1>
      {items.length > 0 ? <CartTable items={items} /> : <p>Корзина пуста</p>}
      <CheckoutInfo />
      <button type="button" className="button-link" onClick={handlePlaceOrder} disabled={sending}>
        Разместить заказ
      </button>
    </>
  )
}
