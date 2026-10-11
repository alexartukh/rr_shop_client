import { useCallback, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { config } from '../config.js'

const STORAGE_KEY = 'authToken'

// Ответ API с ошибкой → понятное сообщение
async function errorMessage(response) {
  try {
    const data = await response.json()
    return data.errors?.join(', ') ?? data.error ?? `HTTP ${response.status}`
  } catch {
    return `HTTP ${response.status}`
  }
}

export default function AuthProvider({ children }) {
  // JWT вида «Bearer eyJ...» — ровно так, как его отдаёт API
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY))
  // Вошедший пользователь: { id, email, first_name, last_name, role } или null
  const [user, setUser] = useState(null)
  // true, пока при старте проверяем сохранённый токен
  const [checking, setChecking] = useState(() => localStorage.getItem(STORAGE_KEY) !== null)

  // Токен храним в localStorage, чтобы вход переживал перезагрузку страницы
  useEffect(() => {
    if (token) localStorage.setItem(STORAGE_KEY, token)
    else localStorage.removeItem(STORAGE_KEY)
  }, [token])

  // При старте: если токен сохранён — узнаём по нему, кто мы (он мог истечь)
  useEffect(() => {
    if (!checking) return
    fetch(`${config.apiUrl}/api/v1/me`, { headers: { Authorization: token } })
      .then((response) => (response.ok ? response.json() : null))
      .then((me) => {
        setUser(me)
        if (!me) setToken(null)
      })
      .catch(() => {}) // API недоступен — токен не трогаем, попробуем в следующий раз
      .finally(() => setChecking(false))
  }, [checking, token])

  // Общая часть входа и регистрации: токен в заголовке, пользователь в теле
  async function authenticate(path, userParams) {
    const response = await fetch(`${config.apiUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userParams }),
    })
    // Отладка: ответ сервера в консоль браузера
    console.log(`POST ${path} → ${response.status}`, {
      authorization: response.headers.get('Authorization'),
      body: await response.clone().text(),
    })
    if (!response.ok) throw new Error(await errorMessage(response))

    const data = await response.json()
    setToken(response.headers.get('Authorization'))
    setUser(data.user)
    return data.user
  }

  // Вход: login(email, password). При ошибке бросает Error с текстом от API
  function login(email, password) {
    return authenticate('/api/v1/users/sign_in', { email, password })
  }

  // Регистрация: register({ email, password, password_confirmation, first_name, last_name })
  function register(params) {
    return authenticate('/api/v1/users', params)
  }

  // Выход: отзываем токен на сервере и забываем его у себя
  async function logout() {
    if (token) {
      await fetch(`${config.apiUrl}/api/v1/users/sign_out`, {
        method: 'DELETE',
        headers: { Authorization: token },
      }).catch(() => {}) // даже если сервер недоступен — локально всё равно выходим
    }
    setToken(null)
    setUser(null)
  }

  // fetch к API с токеном: authFetch('/api/v1/orders')
  // useCallback — функция меняется только вместе с токеном,
  // поэтому её можно указывать в зависимостях useEffect
  const authFetch = useCallback(
    async (path, options = {}) => {
      const response = await fetch(`${config.apiUrl}${path}`, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options.headers, Authorization: token },
      })
      // Токен истёк или отозван — считаем, что пользователь вышел
      if (response.status === 401) {
        setToken(null)
        setUser(null)
      }
      return response
    },
    [token],
  )

  // Изменить имя и фамилию: updateProfile({ first_name, last_name })
  // При ошибке бросает Error с текстом от API
  async function updateProfile(params) {
    const response = await authFetch('/api/v1/me', {
      method: 'PATCH',
      body: JSON.stringify({ user: params }),
    })
    if (!response.ok) throw new Error(await errorMessage(response))

    const me = await response.json()
    setUser(me)
    return me
  }

  const value = {
    user,
    isLoggedIn: user !== null,
    checking,
    login,
    register,
    logout,
    updateProfile,
    authFetch,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
