import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://demo7242716.mockable.io',
})

export default function getData() {
  return instance({ method: 'GET', url: '/products' })
}
