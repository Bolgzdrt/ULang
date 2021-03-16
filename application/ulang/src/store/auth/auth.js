import Vue from 'vue'
import { login, signup } from '../../services/authService'
import {
  getUserInfo,
  updateUser,
  changeEmail,
  changePassword
} from '../../services/userService'

const state = {
  userId: '',
  username: '',
  email: '',
  firstName: '',
  lastName: '',
}

const getters = {
  getUserInfo: () => ({
    username: state.username || window.localStorage.getItem('username'),
    email: state.email || window.localStorage.getItem('email'),
    userId: state.userId || Vue.$cookies.get('userId'),
    firstName: state.firstName || window.localStorage.getItem('firstName'),
    lastName: state.lastName || window.localStorage.getItem('lastName'),
  }),
  getUserId: () => {
    return state.userId || Vue.$cookies.get('userId')
  }
}

// async
const actions = {
  login: async ({ commit }, password) => {
    const { _id, firstName, lastName, email } = await login(state.username, password)
    commit('setUserId', _id)
    commit('setEmail', email)
    commit('setName', { firstName, lastName })
    return
  },
  signUp: async ({ commit }, dependencies) => {
    const { password, primaryLanguage } = dependencies
    const { userId } = await signup({
      email: state.email,
      username: state.username,
      password,
      primaryLanguage
    })
    commit('setUserId', userId)
    return
  },
  getUserInfo: async ({}, userId) => {
    return await getUserInfo(userId)
  },
  updateUserInfo: async ({}, updates) => {
    const { userId, info } = updates
    const res = await updateUser(userId, info)
    return res.user
  },
  changeUserEmail: async ({ commit }, updates) => {
    const { userId, info } = updates
    const res = await changeEmail(userId, info)
    commit('setEmail', info.email)
    return res.user
  },
  changeUserPassword: async ({}, updates) => {
    const { userId, info } = updates
    const res = await changePassword(userId, info)
    return res.message
  }
}

// sync
const mutations = {
  /**
   * Possible improvement that can be made here is to attach a ttl to
   * each item that will allow to only get the item from local storage if
   * it's within the time to live time.
   */
  setEmail: (state, email) => {
    state.email = email
    window.localStorage.setItem('email', email)
  },
  setUsername: (state, username) => {
    state.username = username
    window.localStorage.setItem('username', username)
  },
  setUserId: (state, userId) => {
    state.userId = userId
    Vue.$cookies.set('userId', userId)
  },
  setName: (state, { firstName, lastName }) => {
    state.firstName = firstName || ''
    state.lastName = lastName || ''
    if (firstName)
      window.localStorage.setItem('firstName', firstName)
    if (lastName)
      window.localStorage.setItem('lastName', lastName)
  },
  logout: (state) => {
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('language')
    window.localStorage.removeItem('firstName')
    window.localStorage.removeItem('lastName')
    Vue.$cookies.remove('userId')
    state.userId = ''
    state.email = ''
    state.username = ''
    state.firstName = ''
    state.lastName = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
