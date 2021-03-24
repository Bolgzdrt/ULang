import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CreateWord from '@/views/CreateWord.vue'
import AccentButtons from '@/components/AccentButtons.vue'

describe('Create Word Tests', () => {
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
    wrapper = shallowMount(CreateWord, {
      store,
      localVue,
      data() {
        return {
          partOfSpeech: 'verb',
          anotherWordModal: true,
          sets: [
            {__v:0,
              _id:"6036c52c407e5a46f053bac3",
              createdAt:"2021-02-24T21:29:16.001Z",
              description:"this is a test",
              language:"french",
              name:"Test Set 1",
              ownerId:"6036c51a407e5a46f053bac1",
              selected:false,
              updatedAt:"2021-03-02T02:22:06.313Z",
              words: ['1', '1', '1']},
            {__v:0,
              _id:"603d9c50dc152043e881b7b3",
              createdAt:"2021-03-02T02:00:48.216Z",
              description:"Set of words with conjugations",
              language:"french",
              name:"Conj Test",
              ownerId:"6036c51a407e5a46f053bac1",
              selected:false,
              updatedAt:"2021-03-02T02:21:04.769Z",
              words: ['1', '1', '1']},
            {__v:0,
              _id:"60526846d172892d6c888d3d",
              createdAt:"2021-03-17T20:36:22.892Z",
              description:"TESTTESTTEST",
              language:"french",
              name:"QuickAccess Test",
              ownerId:"6036c51a407e5a46f053bac1",
              selected:false,
              updatedAt:"2021-03-17T20:36:22.892Z",
              words: ['1', '1', '1']}
          ]
        }
      }
    })
  })

  it('should display all word options', () => {
    expect(wrapper.find('#english').exists()).to.be.true
    expect(wrapper.find('#translation').exists()).to.be.true
    expect(wrapper.findComponent(AccentButtons).exists()).to.be.true
    expect(wrapper.find('#definition').exists()).to.be.true
    expect(wrapper.find('#partOfSpeech').exists()).to.be.true
    expect(wrapper.find('.setList').exists()).to.be.true
    expect(wrapper.find('.cancelButton').exists()).to.be.true
    expect(wrapper.find('.submitButton').exists()).to.be.true
  })

  it('should display another word popup', () => {
    expect(wrapper.find('.modal').exists()).to.be.true
  })
  
  it('should display all available sets', () => {
    const set = wrapper.findAll('.setName')
    expect(set.at(0).text()).to.contain('Test Set 1')
    expect(set.at(1).text()).to.contain('Conj Test')
    expect(set.at(2).text()).to.contain('QuickAccess Test')
  })

  it('should display conjugation table', () => {
    expect(wrapper.find('.tables').exists()).to.be.true
  })
})