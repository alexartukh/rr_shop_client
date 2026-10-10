export const config = {
  currency: 'USD',
  apiUrl: 'http://192.168.33.10:3000',

  // Сервис генерации картинок
  imageService: {
    url: 'http://127.0.0.1:5555',
    tokenPath: '/login',
    credentials: {
      login: 'alex',
      password: '123',
    },
  },
}