import { getUserLanguages } from '@/services/userService'

const state = {
  language: '',
  studiedLanguages: []
}

const getters = {
  getLanguage: () => state.language,
  getLanguages: () => state.studiedLanguages
}

// async
const actions = {
  getUserLanguages: async ({ commit }, userId) => {
    const res = await getUserLanguages(userId)
    commit('setLanguage', res.primaryLanguage)
    commit('setStudiedLanguages', res.languages)
    return res
  }
}

// sync
const mutations = {
  setLanguage: (state, lang) => {
    state.language = lang
  },
  setStudiedLanguages: (state, languages) => {
    state.studiedLanguages = languages
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
