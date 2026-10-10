import { Routes, Route } from 'react-router'

import ShopLayout from './layouts/ShopLayout.jsx'
import CheckoutLayout from './layouts/CheckoutLayout.jsx'

import HomePage from './pages/HomePage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import CartPage from './pages/CartPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      
      <Route element={<ShopLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category/main" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<CheckoutLayout />}>
        <Route path="cart" element={<CartPage />} />
      </Route>

    </Routes>
  )
}
