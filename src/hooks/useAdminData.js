import { useEffect, useState } from 'react'
import { useAuth } from './useAuth.js'

// Загрузка данных админского API: const { data, setData, error } = useAdminData('/api/v1/admin/items')
// data === null, пока идёт загрузка. setData — чтобы обновить строку после редактирования
export function useAdminData(path) {
  const { authFetch } = useAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    authFetch(path)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then(setData)
      .catch((err) => setError(err.message))
  }, [path, authFetch])

  return { data, setData, error }
}
