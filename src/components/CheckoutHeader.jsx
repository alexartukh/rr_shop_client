import { Link } from 'react-router'

export default function CheckoutHeader() {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        
        <Link to="/category/main" className="nav-right">Вернуться к покупкам</Link>
      </nav>
    </header>
  )
}
