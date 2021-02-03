import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'productionURL'
    : `http://localhost:8081`

export const createWord = async (wordObject) => {
  const res = await axios.post(`${baseUrl}/word/createWord`, wordObject)
  return res.data
}
