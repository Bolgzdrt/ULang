import axios from '@/axios'

export const login = async (username, password) => {
  const res = await axios.post('login', {
    username,
    password
  })
  const { userId } = res.data
  return { userId }
}

export const signup = async (email, username, password) => {
  const res = await axios.post('signup', {
    email,
    username,
    password
  })
  const { userId } = res.data
  return { userId }
}
