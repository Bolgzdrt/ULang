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
  try {
    const res = await axios.get(`word/getWord/${wordId}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}
