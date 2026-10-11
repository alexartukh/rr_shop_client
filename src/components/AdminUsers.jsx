import { useState } from 'react'
import { useAdminData } from '../hooks/useAdminData.js'
import { useAuth } from '../hooks/useAuth.js'
import { useMessage } from '../hooks/useMessage.js'
import AdminEditUser from './AdminEditUser.jsx'
import ProductImage from './ProductImage.jsx'

// Заготовка для «Добавить»: без id, поэтому форма работает в режиме создания
const EMPTY_USER = { first_name: '', last_name: '', email: '', role: 'USER' }

// Все пользователи: [{ id, email, first_name, last_name, role, orders_count, created_at, updated_at }]
export default function AdminUsers() {
  const { data: users, setData: setUsers, error } = useAdminData('/api/v1/admin/users')
  const { authFetch } = useAuth()
  const showMessage = useMessage()
  // Пользователь, которого сейчас редактируем (или null)
  const [editing, setEditing] = useState(null)

  // Сервер вернул сохранённую запись (новую или изменённую)
  function handleSaved(saved) {
    // Такой id уже есть — заменяем строку, нет — это новый, добавляем в конец
    setUsers((prev) =>
      prev.some((u) => u.id === saved.id)
        ? prev.map((u) => (u.id === saved.id ? saved : u))
        : [...prev, saved],
    )
    setEditing(null)
  }

  async function handleDelete(user) {
    if (!window.confirm(`Удалить пользователя ${user.email}?`)) return

    try {
      const response = await authFetch(`/api/v1/admin/users/${user.id}`, { method: 'DELETE' })
      if (!response.ok) {
        // 422 — нельзя удалить себя, 409 — у пользователя есть заказы
        const data = await response.json().catch(() => ({}))
        throw new Error(data.errors?.join(', ') ?? data.error ?? `HTTP ${response.status}`)
      }
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
      if (editing?.id === user.id) setEditing(null)
    } catch (err) {
      showMessage(err.message, 'Не удалось удалить')
    }
  }

  return (
    <section>
      <h2>Пользователи</h2>
      {!editing && (
        <p>
          <button type="button" className="button-link" onClick={() => setEditing(EMPTY_USER)}>
            + Добавить пользователя
          </button>
        </p>
      )}
      {editing && (
        <AdminEditUser
          key={editing.id ?? 'new'}
          user={editing}
          onSaved={handleSaved}
          onCancel={() => setEditing(null)}
        />
      )}
      {error && <p>Не удалось загрузить: {error}</p>}
      {!error && users === null && <p>Загрузка...</p>}
      {users && (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Заказов</th>
                <th>Создан</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={editing?.id === user.id ? 'selected' : undefined}>
                  <td>
                    <ProductImage
                      name={user.email}
                      template="200"
                      alt={`${user.first_name} ${user.last_name}`}
                      className="cart-thumb"
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.orders_count}</td>
                  <td>{new Date(user.created_at).toLocaleDateString('ru-RU')}</td>
                  <td>
                    <button type="button" className="link-button" onClick={() => setEditing(user)}>
                      Изменить
                    </button>
                    &nbsp;
                    <button type="button" className="link-button" onClick={() => handleDelete(user)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
