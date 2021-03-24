import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'


describe('Home Tests', () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  let store, getters, wrapper

  beforeEach(() => {
    getters = {
      getUserId: () => '12345'
    }
    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          getters
        }
      }
    })
  })

  it('should not display recent activity if nothing in local storage', () => {
    wrapper = shallowMount(Home, {
      store,
      localVue,
      data() {
        return {
          hasRecentList: false
        }
      },
      methods: {
        retrieveInfo() {
          
        }
      }
    })
    expect(wrapper.find('.recentActRow').exists()).to.be.false
  })

  it('should display quick access instructions if no quick access list', () => {
    wrapper = shallowMount(Home, {
      store,
      localVue,
      data() {
        return {
          hasQuickAccess: false
        }
      },
      methods: {
        retrieveInfo() {

        }
      }
    })
    expect(wrapper.find('#quickAccessInstruct').exists()).to.be.true
  })

  it('should display create set link if no sets created', () => {
    wrapper = shallowMount(Home, {
      store,
      localVue,
      data() {
        return {
          hasSetList: false
        }
      },
      methods: {
        retrieveInfo() {

        }
      }
    })
    expect(wrapper.find('#createSetLink').exists()).to.be.true
  })

})
