import axios from '@/axios'

export const createWord = async (wordObject) => {
  const res = await axios.post(`word/createWord`, wordObject)
  return res.data
}

export const getWords = async (userId, language) => {
  const res = await axios.get(`word/getWords/${userId}/${language}`)
  return res.data
}

export const getWordById = async (wordId) => {
  const res = await axios.get(`word/getWord/${wordId}`)
  return res.data
}

export const getConjugation = async (conjId) => {
  const res = await axios.get(`word/getConjugation/${conjId}`)
  return res.data
}

export const updateWord = async (wordId, updates) => {
  const res = await axios.put(`word/updateWord/${wordId}`, updates)
  return res.data
}

export const updateConjugation = async (conjugationId, updates) => {
  const res = await axios.put(`word/updateConjugation/${conjugationId}`, updates)
  return res.data
}

export const createConjugationForWord = async (wordId, conjugationData) => {
  const res = await axios.post(`word/createConjugationForWord/${wordId}`, conjugationData)
  return res.data
}

export const deleteWord = async (wordId) => {
  const res = await axios.delete(`word/deleteWord/${wordId}`)
  return res.data
}
