import axios from '@/axios'

export const getSets = async (userId, language) => {
  const res = await axios.get(`set/getSetsOfLang/${userId}/${language}`)
  return res.data
}

export const getSetsWithVerbs = async (userId, language) => {
  const res = await axios.get(`set/getSetsWithVerbs/${userId}/${language}`)
  return res.data
}

export const createSet = async (setObject) => {
  const res = await axios.post(`set/createSet`, setObject)
  return res.data
}

export const getWordsInSet = async (userId) => {
  const res = await axios.get(`set/getWordsInSet/${userId}`)
  return res.data
}

export const getSetById = async (userId) => {
  const res = await axios.get(`set/getSet/${userId}`)
  return res.data
}