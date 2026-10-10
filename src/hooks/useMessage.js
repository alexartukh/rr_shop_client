import { useContext } from 'react'
import { MessageContext } from '../context/MessageContext.js'

// Показ модального сообщения из любого компонента внутри <MessageProvider>
export function useMessage() {
  const showMessage = useContext(MessageContext)
  if (!showMessage) {
    throw new Error('useMessage() можно использовать только внутри <MessageProvider>')
  }
  return showMessage
}
