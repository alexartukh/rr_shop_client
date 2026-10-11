import { useLocation } from 'react-router'
import CartTable from '../components/CartTable.jsx'

export default function ThankYouPage() {
  // Номер заказа и его позиции передаёт OnePageCheckoutPage при переходе сюда
  // (корзина к этому моменту уже очищена)
  const { orderId, items } = useLocation().state ?? {}

  return (
    <>
      <h1>Спасибо за заказ!</h1>
      {orderId && <p>Номер вашего заказа: {orderId}</p>}
      {items?.length > 0 && <CartTable items={items} />}
    </>
  )
}
