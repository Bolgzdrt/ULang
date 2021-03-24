import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Word from '@/views/Word.vue'
import Trash from '@/assets/svgs/trash.vue'

describe('Word Tests', () => {
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
    wrapper = shallowMount(Word, {
      store,
      localVue,
      propsData: { id: '123' },
      data() {
        return {
          wordInfo: {
            word: 'test',
            english: 'englishtest',
            partOfSpeech: 'partOfSpeech',
            notes: 'thisisanote',
            definition: 'defineme',
            ownerId: '123',
            conjugations: [],
          }
        }
      },
      methods: {
        getWordInfo() {
          // console.log('\n\n\n\n\n\nmocked test\n\n\n\n\n')
        },
        getUserID() {
          return '1234'
        },
        isCurrentUsersWord() {
          if (this.wordInfo.ownerId === "123") {
            return true
          } else {
            return false
          }
        }
      }
    })
  })

  it('should display all word data', () => {
    expect(wrapper.find('.title').text()).to.contain('test')
    expect(wrapper.find('.title').text()).to.contain('englishtest')
    expect(wrapper.find('.title').text()).to.contain('partOfSpeech')
    expect(wrapper.find('.wordDef').text()).to.contain('defineme')
    expect(wrapper.find('.wordNote').text()).to.contain('thisisanote')
  })

  // TODO: update for user's word edit capabilities
  it('should display Trash for own word', () => {
    expect(wrapper.findComponent(Trash).exists()).to.be.true
  })
})
