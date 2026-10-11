import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import AdminUsers from '../components/AdminUsers.jsx'
import AdminItems from '../components/AdminItems.jsx'

// Проверка роли здесь — только чтобы не показывать страницу лишним.
// Настоящую защиту админских данных делает сервер.
export default function AdminPage() {
  const { user, checking } = useAuth()

  if (checking) return <p>Загрузка...</p>
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'ADMIN') return <h1>Доступ запрещён</h1>

  return (
    <>
      <h1>Администрирование</h1>
      <div className="admin-columns">
        <AdminUsers />
        <AdminItems />
      </div>
    </>
  )
}
