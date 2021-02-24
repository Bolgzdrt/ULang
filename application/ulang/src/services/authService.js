import axios from '@/axios'

export const login = async (username, password) => {
  const res = await axios.post('login', {
    username,
    password
  })
  const { user } = res.data
  return user
}

export const signup = async (payload) => {
  const res = await axios.post('signup', payload)
  const { userId } = res.data
  return { userId }
}
