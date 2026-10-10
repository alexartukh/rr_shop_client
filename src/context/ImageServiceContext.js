import { createContext } from 'react'

// «Канал», по которому доступ к сервису картинок идёт от ImageServiceProvider к компонентам.
export const ImageServiceContext = createContext(null)
