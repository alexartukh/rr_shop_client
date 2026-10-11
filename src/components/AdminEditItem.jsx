import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useMessage } from '../hooks/useMessage.js'

// Форма товара: без item.id — создание (POST), с id — редактирование (PATCH).
// Значения берутся из item один раз, поэтому при выборе другого товара
// компонент пересоздаётся через key
export default function AdminEditItem({ item, onSaved, onCancel }) {
  const isNew = !item.id
  const { authFetch } = useAuth()
  const showMessage = useMessage()
  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description ?? '')
  const [price, setPrice] = useState(item.price)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      const response = await authFetch(isNew ? '/api/v1/admin/items' : `/api/v1/admin/items/${item.id}`, {
        method: isNew ? 'POST' : 'PATCH',
        body: JSON.stringify({ item: { name, description, price } }),
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
      <h3>{isNew ? 'Новый товар' : `Товар #${item.id}`}</h3>
      <label>
        Название
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Описание
        <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Цена
        <input
          type="number"
          required
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <div className="cart-buttons">
        <button type="submit" className="button-link" disabled={sending}>Сохранить</button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  )
}
