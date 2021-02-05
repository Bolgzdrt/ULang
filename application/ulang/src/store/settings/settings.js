import Vue from 'vue'

const state = {
  language: ''
}

const getters = {
  getLanguage: () => state.language
}

// async
const actions = {}

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
