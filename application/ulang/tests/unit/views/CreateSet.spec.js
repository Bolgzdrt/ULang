import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CreateSet from '@/views/CreateSet.vue'
import AddSet from '@/components/AddSet.vue'

describe('Create Set Tests', () => {
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
    wrapper = shallowMount(CreateSet, {
      store,
      localVue
    })
  })

  it('should display Add Set component', () => {
    expect(wrapper.findComponent(AddSet).exists()).to.be.true
  })
})

describe('Add Set Tests', () => {
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
    wrapper = shallowMount(AddSet, {
      store,
      localVue,
      data() {
        return {
          addWordModal: true,
          filteredWords: [
            {__v:0,
            _id:"6036c57a407e5a46f053bac4",
            conjugationIds:[],
            createdAt:"2021-02-24T21:30:34.169Z",
            english:"helmet",
            language:"french",
            ownerId:"6036c51a407e5a46f053bac1",
            partOfSpeech:"noun",
            selected:false,
            updatedAt:"2021-02-24T21:30:34.169Z",
            word:"casque"},
            {__v:0,
            _id:"6036c5b8407e5a46f053bac6",
            conjugationIds:[],
            createdAt:"2021-02-24T21:31:36.079Z",
            english:"diamond",
            language:"french",
            ownerId:"6036c51a407e5a46f053bac1",
            partOfSpeech:"noun",
            selected:false,
            updatedAt:"2021-02-24T21:31:36.079Z",
            word:"diamant"},
            {__v:0,
              _id:"603d9f7ddc152043e881b7b5",
              conjugationIds:[],
              createdAt:"2021-03-02T02:14:21.260Z",
              english:"ironic",
              language:"french",
              ownerId:"6036c51a407e5a46f053bac1",
              partOfSpeech:"verb",
              selected:false,
              updatedAt:"2021-03-02T02:14:21.260Z",
              word:"ironique"},
            {__v:0,
              _id:"603d9fe9dc152043e881b7b7",
              conjugationIds:[],
              createdAt:"2021-03-02T02:16:09.589Z",
              english:"strange",
              language:"french",
              ownerId:"6036c51a407e5a46f053bac1",
              partOfSpeech:"verb",
              selected:false,
              updatedAt:"2021-03-02T02:16:09.589Z",
              word:"drôle"}
          ]
        }
      }
    })
  })

  it('should display all set options', () => {
    expect(wrapper.find('#setName').exists()).to.be.true
    expect(wrapper.find('#description').exists()).to.be.true
    expect(wrapper.find('.checkField').exists()).to.be.true
    expect(wrapper.find('#filter').exists()).to.be.true
    expect(wrapper.find('.cancelButton').exists()).to.be.true
    expect(wrapper.find('.submitButton').exists()).to.be.true
  })

  it('should display add words popup', () => {
    expect(wrapper.find('.modal').exists()).to.be.true
  })
  
  it('should display all available words', () => {
    const word = wrapper.findAll('.transWord')
    expect(word.at(0).text()).to.contain('casque')
    expect(word.at(1).text()).to.contain('diamond')
    expect(word.at(2).text()).to.contain('ironique')
    expect(word.at(3).text()).to.contain('drôle')
  })

})