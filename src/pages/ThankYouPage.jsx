import { useLocation } from 'react-router'

export default function ThankYouPage() {
  // Номер заказа передаёт OnePageCheckoutPage при переходе сюда
  const orderId = useLocation().state?.orderId

  return (
    <>
      <h1>Спасибо за заказ!</h1>
      {orderId && <p>Номер вашего заказа: {orderId}</p>}
    </>
  )
}
