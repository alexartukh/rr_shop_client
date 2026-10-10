import { useEffect, useState } from 'react'
import { CartContext } from './CartContext.js'

const STORAGE_KEY = 'cart'

// Читаем корзину из localStorage (если там мусор — начинаем с пустой)
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export default function CartProvider({ children }) {
  // Позиции корзины: [{ id, name, price, quantity }, ...]
  const [items, setItems] = useState(loadCart)

  // При каждом изменении корзины сохраняем её
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Добавить товар (если уже есть — увеличить количество)
  function addItem(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, quantity },
      ]
    })
  }

  // Установить количество (0 и меньше — удалить позицию)
  function setQuantity(id, quantity) {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    )
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clear() {
    setItems([])
  }

  // Производные значения не храним, а вычисляем
  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0)

  const value = { items, count, total, addItem, setQuantity, removeItem, clear }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
