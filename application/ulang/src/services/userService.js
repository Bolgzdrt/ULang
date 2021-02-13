import axios from '@/axios'

export const getUserInfo = async (userId) => {
  const res = await axios.get(`user/getUserInfo/${userId}`)
  return res.data
}

export const getUserLanguages = async (userId) => {
  const res = await axios.get(`user/getUserLanguages/${userId}`)
  return res.data
}
