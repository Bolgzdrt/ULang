import Vue from 'vue'
import { getUserLanguages } from '@/services/userService'

const state = {
  language: ''
}

const getters = {
  getLanguage: () => state.language
}

// async
const actions = {
  getUserLanguages: async ({ commit }, userId) => {
    const res = await getUserLanguages(userId)
    return res.data
  }
}

// sync
const mutations = {
  setLanguage: (state, lang) => {
    state.language = lang
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
