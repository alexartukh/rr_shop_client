import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useMessage } from '../hooks/useMessage.js'

// Форма пользователя: без user.id — создание (POST), с id — редактирование (PATCH).
// Значения берутся из user один раз, поэтому при выборе другого пользователя
// компонент пересоздаётся через key
export default function AdminEditUser({ user, onSaved, onCancel }) {
  const isNew = !user.id
  const { authFetch } = useAuth()
  const showMessage = useMessage()
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState(user.role)
  // Пароль задаётся только при создании, при редактировании сервер его не принимает
  const [password, setPassword] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      const params = { first_name: firstName, last_name: lastName, email, role }
      if (isNew) params.password = password

      const response = await authFetch(isNew ? '/api/v1/admin/users' : `/api/v1/admin/users/${user.id}`, {
        method: isNew ? 'POST' : 'PATCH',
        body: JSON.stringify({ user: params }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.errors?.join(', ') ?? data.error ?? `HTTP ${response.status}`)
      }
      onSaved(data)
    } catch (err) {
      showMessage(err.message, 'Не удалось сохранить')
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="login-form admin-edit" onSubmit={handleSubmit}>
      <h3>{isNew ? 'Новый пользователь' : `Пользователь #${user.id}`}</h3>
      <label>
        Имя
        <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Фамилия
        <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <label>
        Email
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      {isNew && (
        <label>
          Пароль
          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      )}
      <label>
        Роль
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </label>
      <div className="cart-buttons">
        <button type="submit" className="button-link" disabled={sending}>Сохранить</button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  )
}
