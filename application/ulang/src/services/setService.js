import axios from '@/axios'

export const getSets = async (userId, language) => {
  const res = await axios.get(`set/getSetsOfLang/${userId}/${language}`)
  return res.data
}

export const createSet = async (setObject) => {
  const res = await axios.post(`set/createSet`, setObject)
  return res.data
}

export const getWordsInSet = async (userId, language) => {
  const res = await axios.get(`set/getWordsInSet/${userId}`)
  return res.data
}