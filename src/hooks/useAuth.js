import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'

// Доступ к входу/выходу и текущему пользователю из любого компонента внутри <AuthProvider>
export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error('useAuth() можно использовать только внутри <AuthProvider>')
  }
  return auth
}
