import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.SERVER_URL
  : `http://localhost:8081`

export default axios.create({
  baseURL,
  withCredentials: true
})
