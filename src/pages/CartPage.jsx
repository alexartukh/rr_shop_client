import { Link } from 'react-router'
import { config } from '../config.js'
import { useCart } from '../hooks/useCart.js'

export default function CartPage() {
  const { items, total, clear } = useCart()

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
            <Link to={`/product/${item.id}`}>{item.name}</Link> —{item.quantity} × {item.price} {config.currency}
            {' = '}
            <strong>{Number(item.price) * item.quantity} {config.currency}</strong>
          </li>
        ))}
      </ul>
      <p>Итого: <strong>{total} {config.currency}</strong></p>
      <div className="cart-buttons">
        <Link to="/checkout" className="button-link">Оформить заказ</Link>
        <button type="button" onClick={clear}>Очистить корзину</button>
      </div>
    </>
  )
}
