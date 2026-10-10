import { useEffect, useState } from 'react'
import { ImageServiceContext } from './ImageServiceContext.js'
import { config } from '../config.js'

const { url, tokenPath, credentials } = config.imageService

// Один общий запрос токена на всё приложение
// (StrictMode в dev запускает эффекты дважды — второй POST не нужен)
let tokenPromise = null

function requestToken() {
  tokenPromise ??= fetch(`${url}${tokenPath}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    })
    .then((data) => {
      window.imageServiceToken = data.token
      console.log(window.imageServiceToken)
      return data.token
    })
    .catch((err) => {
      tokenPromise = null // чтобы можно было попробовать снова
      throw err
    })
  return tokenPromise
}

export default function ImageServiceProvider({ children }) {
  const [token, setToken] = useState(window.imageServiceToken ?? null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (token) return
    requestToken()
      .then(setToken)
      .catch((err) => setError(err.message))
  }, [token])

  // fetch к сервису картинок с подставленным токеном
  function imageFetch(path, options = {}) {
    return fetch(`${url}${path}`, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${window.imageServiceToken}` },
    })
  }

  const value = { token, ready: token !== null, error, imageFetch }

  return <ImageServiceContext.Provider value={value}>{children}</ImageServiceContext.Provider>
}
