import { createContext } from 'react'

// «Канал», по которому данные корзины идут от CartProvider к компонентам.
export const CartContext = createContext(null)
