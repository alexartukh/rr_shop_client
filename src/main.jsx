import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import CartProvider from './context/CartProvider.jsx'
import MessageProvider from './context/MessageProvider.jsx'
import ImageServiceProvider from './context/ImageServiceProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <MessageProvider>
            <ImageServiceProvider>
              <App />
            </ImageServiceProvider>
          </MessageProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
