import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import CartProvider from './context/CartProvider.jsx'
import MessageProvider from './context/MessageProvider.jsx'
import ImageServiceProvider from './context/ImageServiceProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <MessageProvider>
          <ImageServiceProvider>
            <App />
          </ImageServiceProvider>
        </MessageProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
