export default function OnePageCheckoutPage() {
  // TODO: здесь будут вызовы endpoint'ов размещения заказа
  function handlePlaceOrder() {}

  return (
    <>
      <h1>Оформление заказа</h1>
      <button type="button" className="button-link" onClick={handlePlaceOrder}>
        Разместить заказ
      </button>
    </>
  )
}
