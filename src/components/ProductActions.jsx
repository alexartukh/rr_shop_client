import { useState } from 'react'
import { useCart } from '../hooks/useCart.js'
import { useMessage } from '../hooks/useMessage.js'

export default function ProductActions({ product }) {
  const { addItem } = useCart()
  const showMessage = useMessage()
  const [quantity, setQuantity] = useState(1)

  function handleAdd() {
    addItem(product, quantity)
    setQuantity(1)
    showMessage(`«${product.name}» (${quantity} шт.) добавлен в корзину`)
  }

  return (
    <div className="product-actions">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
        aria-label="Количество"
      />
      <button type="button" onClick={handleAdd}>Добавить</button>
    </div>
  )
}
