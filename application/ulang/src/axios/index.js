import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production'
  ? 'productionURL'
  : `http://localhost:8081`

export default axios.create({
  baseURL,
  withCredentials: true
})
