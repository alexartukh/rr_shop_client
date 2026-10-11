import { config } from '../config.js'
import { useAdminData } from '../hooks/useAdminData.js'

// Все товары: [{ id, name, description, price, created_at, updated_at }]
export default function AdminItems() {
  const { data: items, error } = useAdminData('/api/v1/admin/items')

  return (
    <section>
      <h2>Товары</h2>
      {error && <p>Не удалось загрузить: {error}</p>}
      {!error && items === null && <p>Загрузка...</p>}
      {items && (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Цена</th>
                <th>Создан</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price} {config.currency}</td>
                  <td>{new Date(item.created_at).toLocaleDateString('ru-RU')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
