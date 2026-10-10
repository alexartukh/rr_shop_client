import { config } from '../config.js'
import { useCart } from '../hooks/useCart.js'

export default function CartPage() {
  const { items, total } = useCart()

  if (items.length === 0) {
    return (
      <>
        <h1>Корзина</h1>
        <p>Корзина пуста</p>
      </>
    )
  }

  return (
    <>
      <h1>Корзина</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.quantity} × {item.price} {config.currency}
            {' = '}
            <strong>{Number(item.price) * item.quantity} {config.currency}</strong>
          </li>
        ))}
      </ul>
      <p>Итого: <strong>{total} {config.currency}</strong></p>
    </>
  )
}
