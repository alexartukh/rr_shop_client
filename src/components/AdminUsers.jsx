import { useAdminData } from '../hooks/useAdminData.js'

// Все пользователи: [{ id, email, first_name, last_name, role, orders_count, created_at, updated_at }]
export default function AdminUsers() {
  const { data: users, error } = useAdminData('/api/v1/admin/users')

  return (
    <section>
      <h2>Пользователи</h2>
      {error && <p>Не удалось загрузить: {error}</p>}
      {!error && users === null && <p>Загрузка...</p>}
      {users && (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Заказов</th>
                <th>Создан</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.orders_count}</td>
                  <td>{new Date(user.created_at).toLocaleDateString('ru-RU')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
