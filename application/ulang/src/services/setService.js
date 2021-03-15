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

export const getSetById = async (setId) => {
  const res = await axios.get(`set/getSet/${setId}`)
  return res.data
}

export const getMostRecentSets = async (userId, language) => {
  const res = await axios.get(`set/getMostRecentSets/${userId}/${language}`)
  return res.data
}