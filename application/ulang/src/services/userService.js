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
    return { users: [] }
  }
}

export const getQuickSets = async (userId, language) => {
  const res = await axios.get(`user/getQuickSets/${userId}/${language}`)
  return res.data
}

export const addQuickSet = async (userId, setId) => {
  const res = await axios.post(`user/addQuickSet`, {
    userId,
    setId
  })
  return res.data
}

export const removeQuickSet = async (userId, setId) => {
  const res = await axios.post(`user/removeQuickSet`, {
    userId,
    setId
  })
  return res.data
}

/**
 * @param {string} followUserId - the id of the user to be followed
 * @param {string} userId - the id of the logged in user
 */
export const followUser = async (followUserId, userId) => {
  const res = await axios.post('user/followUser', {
    userId,
    followUserId,
  })
  return res.data
}

export const unfollowUser = async (unfollowUserId, userId) => {
  const res = await axios.post('user/unfollowUser', {
    userId,
    unfollowUserId
  })
}

export const getFollowing = async (userId) => {
  const res = await axios.get(`user/getFollowing/${userId}`)
  return res.data
}

export const getFollowingInfo = async (userId) => {
  const res = await axios.get(`user/getFollowingInfo/${userId}`)
  return res.data
}

export const addSet = async (userId, setId) => {
  const res = await axios.post( `user/addSet` , {
    userId,
    setId
  })
  return res.data
}

export const removeSet = async (userId, setId) => {
  const res = await axios.post( `user/removeSet` , {
    userId,
    setId
  })
  return res.data
}