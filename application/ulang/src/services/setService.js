import axios from '@/axios'

export const getSets = async (userId, language) => {
  const res = await axios.get(`set/getSetsOfLang/${userId}/${language}`)
  return res.data
}