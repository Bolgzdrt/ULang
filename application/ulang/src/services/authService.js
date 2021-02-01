import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'productionURL'
    : `http://localhost:8081`

export const login = async (username, password) => {
  const res = await axios.post(`${baseUrl}/login`, {
    username,
    password
  })
  const { token, userId } = res.data
  return { token, userId }
}

export const signup = async (email, username, password) => {
  const res = await axios.post(`${baseUrl}/signup`, {
    email,
    username,
    password
  })
  const { token, userId } = res.data
  return { token, userId }
}

export const logout = async () => {
  try {
    const res = await axios.get(`${baseUrl}/logout/:id`)
    if (res.data.success) {
      return true
    } else {
      console.error(res.data.errors)
      return false
    }
  } catch (err) {
    console.error(err)
  }
}
