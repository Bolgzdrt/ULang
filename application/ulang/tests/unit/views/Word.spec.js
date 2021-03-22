import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Word from '@/views/Word.vue'

describe('Word Tests', () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  let store, getters

  beforeEach(() => {
    getters = {
      getUserId: () => '123'
    }
    store = new Vuex.Store({
      modules: {
        auth: {
          getters
        }
      }
    })
  })

  it('should mount', () => {
    const id = '12345'
    const wrapper = shallowMount(Word, {
      store,
      localVue,
      propsData: { id },
      data() {
        return {
          wordInfo: {
            word: 'test',
            english: 'englishtest',
            partOfSpeech: '',
            notes: '',
            definition: '',
            ownerId: '',
            conjugations: [],
          }
        }
      },
      methods: {
        getWordInfo() {
          // console.log('\n\n\n\n\n\nmocked test\n\n\n\n\n')
        },
        getUserID() {
          return '123'
        }
      }
    })
    expect(wrapper.find('.title').text()).to.contain('test')
    expect(wrapper.find('.title').text()).to.contain('englishtest')
  })
})
