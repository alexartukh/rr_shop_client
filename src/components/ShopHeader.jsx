import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

export default function ShopHeader() {
  const { user, logout } = useAuth()

  return (
    <header>
      <nav>
        {user && (
          <>
            <Link to="/account">Добро пожаловать, {user.first_name} {user.last_name}</Link>
            &nbsp;|&nbsp;
            <button type="button" className="link-button" onClick={logout}>Выйти</button>
            &nbsp;|&nbsp;
            {user.role === 'ADMIN' && (
              <>
                <Link to="/admin"><b>Администрирование</b></Link>
                &nbsp;|&nbsp;
              </>
            )}
          </>
        )}

        <Link to="/">Главная</Link>
        &nbsp;|&nbsp;
        {!user && (
          <>
            <Link to="/login">Вход / Регистрация</Link>
            &nbsp;|&nbsp;
          </>
        )}
        <Link to="/category/main">Все товары</Link>

        <Link to="/cart" className="nav-right">Корзина</Link>
      </nav>
    </header>
  )
}
