import Vue from 'vue'
import { login, signup } from '../../services/authService'
import { getUserInfo } from '../../services/userService'

const state = {
  token: '',
  userId: '',
  username: '',
  email: '',
}

const getters = {
  getUserInfo: () => ({
    username: state.username || localStorage.getItem('username'),
    email: state.email || localStorage.getItem('email'),
    userId: state.userId || Vue.$cookies.get('userId')
  }),
  getUserId: () => {
   return state.userId || Vue.$cookies.get('userId')
  },
  getToken: () => ({
    token: state.token || Vue.$cookies.get('token')
  }),
}

// async
const actions = {
  login: async ({ commit }, password) => {
    const { token, userId } = await login(state.username, password)
    commit('setToken', token)
    commit('setUserId', userId)
    return
  },
  signUp: async ({ commit }, password) => {
    const { token, userId } = await signup(state.email, state.username, password)
    commit('setToken', token)
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
    localStorage.setItem('email', email)
  },
  setUsername: (state, username) => {
    state.username = username
    localStorage.setItem('username', username)
  },
  setUserId: (state, userId) => {
    state.userId = userId
    Vue.$cookies.set('userId', userId)
  },
  setToken: (state, token) => {
    state.token = token
    Vue.$cookies.set('token', token)
  },
  logout: (state) => {
    state.email = ''
    state.username = ''
    state.userId = ''
    state.token = ''
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    Vue.$cookies.remove('userId')
    Vue.$cookies.remove('token')
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
