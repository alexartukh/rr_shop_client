import { useState } from 'react'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ProductTiles from '../components/ProductTiles.jsx'

export default function CategoryPage() {
  const [filter, setFilter] = useState('')

  return (
    <>
      <h1>Все Товары</h1>
      <CategoryFilter value={filter} onChange={setFilter} />
      <ProductTiles filter={filter} />
    </>
  )
}
