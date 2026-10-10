import { createContext } from 'react'

// «Канал», по которому функция showMessage идёт от MessageProvider к компонентам.
export const MessageContext = createContext(null)
