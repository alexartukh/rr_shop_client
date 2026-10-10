import { useContext } from 'react'
import { ImageServiceContext } from '../context/ImageServiceContext.js'

// Доступ к сервису картинок из любого компонента внутри <ImageServiceProvider>
export function useImageService() {
  const service = useContext(ImageServiceContext)
  if (!service) {
    throw new Error('useImageService() можно использовать только внутри <ImageServiceProvider>')
  }
  return service
}
