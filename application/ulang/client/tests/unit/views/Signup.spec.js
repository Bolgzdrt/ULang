import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Signup from '@/views/Signup.vue'


describe('Sign Up Tests', () => {
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
    wrapper = shallowMount(Signup, {
      store,
      localVue
    })
  })

  it('should display all necessary fields to sign up', () => {
    expect(wrapper.find('#email').exists()).to.be.true
    expect(wrapper.find('#username').exists()).to.be.true
    expect(wrapper.find('#password').exists()).to.be.true
    expect(wrapper.find('#confirmPassword').exists()).to.be.true
    expect(wrapper.find('.language-selector').exists()).to.be.true
    expect(wrapper.find('button').exists()).to.be.true
  })

})
