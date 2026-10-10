import { useEffect, useRef } from 'react'

// Модальное сообщение. showModal() сам затемняет фон (::backdrop)
// и делает остальную страницу некликабельной, пока диалог открыт.
export default function MessageBox({ open, title, message, buttonText = 'OK', onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    // onClose срабатывает и на кнопку, и на Esc
    <dialog ref={dialogRef} className="message-box" onClose={onClose}>
      {title && <h2>{title}</h2>}
      <p>{message}</p>
      <button type="button" autoFocus onClick={() => dialogRef.current.close()}>
        {buttonText}
      </button>
    </dialog>
  )
}
