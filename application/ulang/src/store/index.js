import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth/auth'
import settingsModule from './settings/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      ...authModule
    },
    settings: {
      namespaced: true,
      ...settingsModule
    }
  },
})
