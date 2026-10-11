import { Link } from 'react-router'
import { config } from '../config.js'
import ProductImage from './ProductImage.jsx'

// Таблица позиций корзины с итогом.
// items: [{ id, name, price, quantity }]
// onRemove(id) — если передан, у каждой позиции появляется ссылка «Удалить»
export default function CartTable({ items, onRemove }) {
  const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0)

  return (
    <>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Товар</th>
              <th>Цена</th>
              <th>Кол-во</th>
              <th>Сумма</th>
              {onRemove && <th></th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="order-line-product">
                    <ProductImage name={item.name} className="cart-thumb" />
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </div>
                </td>
                <td>{item.price} {config.currency}</td>
                <td>{item.quantity}</td>
                <td><strong>{Number(item.price) * item.quantity} {config.currency}</strong></td>
                {onRemove && (
                  <td>
                    <button type="button" className="link-button" onClick={() => onRemove(item.id)}>
                      Удалить
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Итого: <strong>{total} {config.currency}</strong></p>
    </>
  )
}
