import { useState } from 'react'
import { MessageContext } from './MessageContext.js'
import MessageBox from '../components/MessageBox.jsx'

export default function MessageProvider({ children }) {
  // Текущее сообщение: { message, title } или null, если диалог закрыт
  const [msg, setMsg] = useState(null)

  function showMessage(message, title) {
    setMsg({ message, title })
  }

  return (
    <MessageContext.Provider value={showMessage}>
      {children}
      <MessageBox
        open={msg !== null}
        title={msg?.title}
        message={msg?.message}
        onClose={() => setMsg(null)}
      />
    </MessageContext.Provider>
  )
}
