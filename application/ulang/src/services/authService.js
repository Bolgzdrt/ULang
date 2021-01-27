const axios = require('axios')

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'productionURL'
    : `http://localhost:8081`

export const login = async (email, password) => {
  const res = await axios.post(`${baseurl}/login`, {
    email,
    password
  })
  if (!res.data.success) {
    res.data.token
    // handle errors
    return res.data.errors
  } else {
    return res.data.token
  }
}

export const signup = async (email, username, password) => {
  const res = await axios.post(`${baseUrl}/signup`, {
    email,
    username,
    password
  })
  return res.data.token
}

export const logout = async (id) => {
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
