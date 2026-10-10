import { useState } from 'react'
import { useCart } from '../hooks/useCart.js'

export default function ProductActions({ product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  function handleAdd() {
    addItem(product, quantity)
    setQuantity(1)
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
