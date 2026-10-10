import { useContext } from 'react'
import { CartContext } from '../context/CartContext.js'

// Доступ к корзине из любого компонента внутри <CartProvider>
export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) {
    throw new Error('useCart() можно использовать только внутри <CartProvider>')
  }
  return cart
}
