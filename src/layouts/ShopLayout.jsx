import { Outlet } from 'react-router'
import ShopHeader from '../components/ShopHeader.jsx'
import Footer from '../components/Footer.jsx'

export default function ShopLayout() {
  return (
    <>
      <ShopHeader />
      
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
