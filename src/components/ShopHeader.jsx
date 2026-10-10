import { Link } from 'react-router'

export default function ShopHeader() {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        &nbsp;|&nbsp;
        <Link to="/category/main">Все товары</Link>
        
        <Link to="/cart" className="nav-right">Корзина</Link>
      </nav>
    </header>
  )
}
