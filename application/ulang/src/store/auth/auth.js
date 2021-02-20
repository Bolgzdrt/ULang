import Vue from 'vue'
import { login, signup } from '../../services/authService'
import { getUserInfo } from '../../services/userService'

const state = {
  userId: '',
  username: '',
  email: '',
}

const getters = {
  getUserInfo: () => ({
    username: state.username || window.localStorage.getItem('username'),
    email: state.email || window.localStorage.getItem('email'),
    userId: state.userId || Vue.$cookies.get('userId')
  }),
  getUserId: () => {
   return state.userId || Vue.$cookies.get('userId')
  },
}

// async
const actions = {
  login: async ({ commit }, password) => {
    const { userId } = await login(state.username, password)
    commit('setUserId', userId)
    return
  },
  signUp: async ({ commit }, dependencies) => {
    const { password, primaryLanguage } = dependencies
    const { userId } = await signup({ email: state.email, username: state.username, password, primaryLanguage })
    commit('setUserId', userId)
    return
  },
  getUserInfo: async ({}, userId) => {
    return await getUserInfo(userId)
  }
}

// sync
const mutations = {
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
  logout: (state) => {
    state.email = ''
    state.username = ''
    state.userId = ''
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('language')
    Vue.$cookies.remove('userId')
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
