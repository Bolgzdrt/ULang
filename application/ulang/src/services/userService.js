import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'productionURL'
    : `http://localhost:8081`

export const getUserInfo = async (userId) => {
  const res = await axios.get(`${baseUrl}/user/getUserInfo/${userId}`)
  return res.data
}
