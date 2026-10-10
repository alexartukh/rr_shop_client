import { Outlet } from 'react-router'
import CheckoutHeader from '../components/CheckoutHeader.jsx'
import Footer from '../components/Footer.jsx'

export default function CheckoutLayout() {
  return (
    <>
      <CheckoutHeader />

      <main>
        <Outlet />
      </main>
      
      <Footer />
    </>
  )
}
