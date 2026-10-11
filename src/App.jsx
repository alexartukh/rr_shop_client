import { Routes, Route } from 'react-router'

import ShopLayout from './layouts/ShopLayout.jsx'
import CheckoutLayout from './layouts/CheckoutLayout.jsx'

import HomePage from './pages/HomePage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OnePageCheckoutPage from './pages/OnePageCheckoutPage.jsx'
import ThankYouPage from './pages/ThankYouPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import MyAccountPage from './pages/MyAccountPage.jsx'
import OrderDetailsPage from './pages/OrderDetailsPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

export default function App() {
  return (
    <Routes>
      
      <Route element={<ShopLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category/main" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="account" element={<MyAccountPage />} />
        <Route path="account/orders/:id" element={<OrderDetailsPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<CheckoutLayout />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<OnePageCheckoutPage />} />
        <Route path="thank-you" element={<ThankYouPage />} />
      </Route>

    </Routes>
  )
}
