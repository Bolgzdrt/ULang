import { getUserLanguages, addLanguageToUser } from '@/services/userService'

const state = {
  language: '',
  studiedLanguages: []
}

const getters = {
  getLanguage: () => {
    return state.language || localStorage.getItem('language')
  },
  getLanguages: () => state.studiedLanguages
}

// async
const actions = {
  getUserLanguages: async ({ commit }, userId) => {
    const res = await getUserLanguages(userId)
    commit('setLanguage', res.primaryLanguage)
    commit('setStudiedLanguages', res.languages)
    return res
  },
  addLanguage: async ({ commit }, payload) => {
    const res = await addLanguageToUser(payload)
    commit('addLanguage', payload.language)
    commit('setLanguage', payload.language)
    return res
  }
}

// sync
const mutations = {
  setLanguage: (state, lang) => {
    state.language = lang
    localStorage.setItem('language', lang)
  },
  setStudiedLanguages: (state, languages) => {
    state.studiedLanguages = languages
  },
  addLanguage: (state, lang) => {
    state.studiedLanguages.push(lang)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
