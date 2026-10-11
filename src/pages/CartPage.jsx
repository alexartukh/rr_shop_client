import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import CartTable from '../components/CartTable.jsx'

export default function CartPage() {
  const { items, clear, removeItem } = useCart()

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
      <CartTable items={items} onRemove={removeItem} />
      <div className="cart-buttons">
        <Link to="/checkout" className="button-link">Оформить заказ</Link>
        <button type="button" onClick={clear}>Очистить корзину</button>
      </div>
    </>
  )
}
