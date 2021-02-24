<template>
  <div class="learn">
    <BackButton :fromRoute="fromRoute" />
    <SetProg :curr="index + 1" :total="total" :setName="setName" />
    <InputCard :word="wordList[index].english" :translation="wordList[index].translation" />
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import SetProg from '@/components/SetProg.vue'
import InputCard from '@/components/InputCard.vue'
import { getWordsInSet, getSetById } from '@/services/setService'

export default {
  name: 'Learn',
  components: { BackButton, SetProg, InputCard },
  props: ['id'],
  data() {
    return {
      wordList: [
        { english: 'helmet', translation: 'casque' },
        { english: 'egg', translation: 'oeuf' },
        { english: 'diamond', translation: 'diamant' },
        { english: 'dog', translation: 'chienne/chien' }
      ],
      setName: '',
      index: 0,
      total: 0,
      fromRoute: ''
    }
  },
  methods: {
    
  },
  created: function(){
    if (!this.id) {
      this.$router.push({name: "LearnSettings"})
    }
    getWordsInSet(this.id).then(({words}) => {
      this.wordList = words.map(word => {({ ...word, correct: false })})
    })
    getSetById(this.id).then(({set}) => {
      this.setName = set.name
    })
    this.total = this.wordList.length;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from
    })
  }
}
</script>

<style scoped>
.learn {
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
