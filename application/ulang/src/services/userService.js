import axios from '@/axios'

export const getUserInfo = async (userId) => {
  const res = await axios.get(`user/getUserInfo/${userId}`)
  return res.data
}

export const getUserLanguages = async (userId) => {
  const res = await axios.get(`user/getUserLanguages/${userId}`)
  return res.data
}

export const addLanguageToUser = async ({ userId, language }) => {
  const res = await axios.post(`user/addLanguagesToUser/${userId}`, {
    languagesToAdd: [language]
  })
  return res.data
}

export const updateUser = async (userId, updatePayload) => {
  const res = await axios.put(`user/updateUserInfo/${userId}`, updatePayload)
  return res.data
}

export const changeEmail = async (userId, emailUpdatePayload) => {
  const res = await axios.put(`user/changeEmail/${userId}`, emailUpdatePayload)
  return res.data
}

export const changePassword = async (userId, passwordUpdatePayload) => {
  const res = await axios.put(
    `user/changePassword/${userId}`,
    passwordUpdatePayload
  )
  return res.data
}

export const deleteAccount = async (userId, password) => {
  const res = await axios.delete(`user/deleteAccount/${userId}`, { data: { password } })
  return res.data
}

export const searchNames = async (query) => {
  if (query) {
    const res = await axios.get(`user/searchNames/${query}`)
    return res.data
  } else {
    return []
  }
}
