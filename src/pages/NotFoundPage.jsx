import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <>
      <h1>Страница не найдена</h1>
      <Link to="/">Вернуться в каталог</Link>
    </>
  )
}
