import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useMessage } from '../hooks/useMessage.js'

export default function LoginPage() {
  const { user, login, register, logout } = useAuth()
  const showMessage = useMessage()
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)

  // Форма входа
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Форма регистрации
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regPasswordConfirmation, setRegPasswordConfirmation] = useState('')

  // Общее для обеих форм: отправка, приветствие, переход на главную
  function submit(e, request, title) {
    e.preventDefault()
    setSending(true)
    request()
      .then((me) => {
        showMessage(`Здравствуйте, ${me.first_name}!`, title)
        navigate('/account')
      })
      .catch((err) => showMessage(err.message, 'Ошибка'))
      .finally(() => setSending(false))
  }

  function handleLogin(e) {
    submit(e, () => login(email, password), 'Вы вошли')
  }

  function handleRegister(e) {
    if (regPassword !== regPasswordConfirmation) {
      e.preventDefault()
      showMessage('Пароли не совпадают', 'Ошибка')
      return
    }
    submit(
      e,
      () =>
        register({
          first_name: firstName,
          last_name: lastName,
          email: regEmail,
          password: regPassword,
          password_confirmation: regPasswordConfirmation,
        }),
      'Вы зарегистрированы',
    )
  }

  if (user) {
    return (
      <>
        <h1>Вход</h1>
        <p>Вы уже вошли как {user.email}</p>
        <button type="button" onClick={logout}>Выйти</button>
      </>
    )
  }

  return (
    <div className="login-columns">
      <section>
        <h1>Вход</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="button-link" disabled={sending}>
            Войти
          </button>
        </form>
      </section>

      <section>
        <h1>Регистрация</h1>
        <form className="login-form" onSubmit={handleRegister}>
          <label>
            Имя
            <input
              type="text"
              required
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Фамилия
            <input
              type="text"
              required
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
          </label>
          <label>
            Повтор пароля
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={regPasswordConfirmation}
              onChange={(e) => setRegPasswordConfirmation(e.target.value)}
            />
          </label>
          <button type="submit" className="button-link" disabled={sending}>
            Зарегистрироваться
          </button>
        </form>
      </section>
    </div>
  )
}
