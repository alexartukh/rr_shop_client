import { createContext } from 'react'

// «Канал», по которому данные о вошедшем пользователе идут от AuthProvider к компонентам.
export const AuthContext = createContext(null)
