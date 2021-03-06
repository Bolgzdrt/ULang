import axios from '@/axios'

export const createWord = async (wordObject) => {
  const res = await axios.post(`word/createWord`, wordObject)
  return res.data
}

export const getWords = async (userId, language) => {
  const res = await axios.get(`word/getWords/${userId}/${language}`)
  return res.data
}

export const getConjugation = async (conjId) => {
  const res = await axios.get(`word/getConjugation/${conjId}`)
  return res.data
}