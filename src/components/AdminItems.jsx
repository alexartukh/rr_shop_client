import { useState } from 'react'
import { config } from '../config.js'
import { useAdminData } from '../hooks/useAdminData.js'
import { useAuth } from '../hooks/useAuth.js'
import { useMessage } from '../hooks/useMessage.js'
import AdminEditItem from './AdminEditItem.jsx'
import ProductImage from './ProductImage.jsx'

// Заготовка для «Добавить»: без id, поэтому форма работает в режиме создания
const EMPTY_ITEM = { name: '', description: '', price: '' }

// Все товары: [{ id, name, description, price, created_at, updated_at }]
export default function AdminItems() {
  const { data: items, setData: setItems, error } = useAdminData('/api/v1/admin/items')
  const { authFetch } = useAuth()
  const showMessage = useMessage()
  // Товар, который сейчас редактируем (или null)
  const [editing, setEditing] = useState(null)

  // Сервер вернул сохранённую запись (новую или изменённую)
  function handleSaved(saved) {
    // Такой id уже есть — заменяем строку, нет — это новый, добавляем в конец
    setItems((prev) =>
      prev.some((i) => i.id === saved.id)
        ? prev.map((i) => (i.id === saved.id ? saved : i))
        : [...prev, saved],
    )
    setEditing(null)
  }

  async function handleDelete(item) {
    if (!window.confirm(`Удалить товар «${item.name}»?`)) return

    try {
      const response = await authFetch(`/api/v1/admin/items/${item.id}`, { method: 'DELETE' })
      if (!response.ok) {
        // 409 — товар есть в заказах, сервер его не удаляет
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error ?? `HTTP ${response.status}`)
      }
      setItems((prev) => prev.filter((i) => i.id !== item.id))
      if (editing?.id === item.id) setEditing(null)
    } catch (err) {
      showMessage(err.message, 'Не удалось удалить')
    }
  }

  return (
    <section>
      <h2>Товары</h2>
      {!editing && (
        <p>
          <button type="button" className="button-link" onClick={() => setEditing(EMPTY_ITEM)}>
            + Добавить товар
          </button>
        </p>
      )}
      {editing && (
        <AdminEditItem
          key={editing.id ?? 'new'}
          item={editing}
          onSaved={handleSaved}
          onCancel={() => setEditing(null)}
        />
      )}
      {error && <p>Не удалось загрузить: {error}</p>}
      {!error && items === null && <p>Загрузка...</p>}
      {items && (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Название</th>
                <th>Цена</th>
                <th>Создан</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={editing?.id === item.id ? 'selected' : undefined}>
                  <td><ProductImage name={item.name} className="cart-thumb" /></td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price} {config.currency}</td>
                  <td>{new Date(item.created_at).toLocaleDateString('ru-RU')}</td>
                  <td>
                    <button type="button" className="link-button" onClick={() => setEditing(item)}>
                      Изменить
                    </button>
                    &nbsp;
                    <button type="button" className="link-button" onClick={() => handleDelete(item)}>
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
