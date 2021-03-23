<template>
  <div class="conjugation">
    <BackButton :fromRoute="fromRoute" />
    <div v-if="!done">
      <div style="padding-bottom: 30px;"><SetProg :curr="index + 1" :total="conjList.length" :setName="setName" /></div>
      <TableInputCard :conjObj="conjList[index]" @nextCard="nextCard"/>
    </div>
    <div class="conjugationResult" v-if="done">
      <div>
        <p class="title">Results:</p>
        <p class="percent">{{ resPercent }}% correct</p>
      </div>
      <div class="resultList">
        <div class="conj" v-for="conj in conjList" :key="conj._id">
          <p>{{ conj.conjugation[conj.selected] }} ({{ conj.word }}):</p>
          <p :class="conj.correct == true?'correct':'incorrect'">{{ conj.correct == true?"Correct" : "Incorrect" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import SetProg from '@/components/SetProg.vue'
import TableInputCard from '@/components/TableInputCard.vue'
import { getWordsInSet, getSetById } from '@/services/setService'
import { getConjugation } from '@/services/wordService'

export default {
  name: 'Conjugation',
  components: { BackButton, SetProg, TableInputCard },
  props: ['id'],
  data() {
    return {
      wordList: [{english: ''}],
      conjList: [],
      setName: '',
      index: 0,
      resultModal: false,
      done: false,
      resPercent: '',
      fromRoute: ''
    }
  },
  methods: {
    nextCard(correct) {
      if (this.index < this.conjList.length) {
        if (correct) {
          this.conjList[this.index].correct = true
        }
        this.index += 1
      }
      if (this.index >= this.conjList.length) {
        this.done = true
        var correctTally = 0
        this.conjList.forEach(element => {
          if (element.correct) {
            correctTally += 1
          }
        })
        this.resPercent = ((correctTally/this.conjList.length) * 100).toFixed(0)
      }
    }
  },
  created: function(){
    if (!this.id) {
      this.$router.push({name: "ConjugationSettings"})
    }
    getWordsInSet(this.id).then(({words}) => {
      this.wordList = words
      this.wordList.forEach((element) => {
        element.conjugationIds.forEach((conjId) => {
          if(conjId){
            getConjugation(conjId).then(conj => {
              const countOfKeys = Object.keys(conj.conjugation).length - 1
              const options = Object.keys(conj.conjugation).filter(key => key != 'title')
              this.conjList.push({
                word: element.word,
                conjugation: conj.conjugation,
                selected: options[Math.floor(Math.random()*countOfKeys)],
                correct: false
              })
            })
          }
        })
      })
    })
    getSetById(this.id).then(({set}) => {
      this.setName = set.name
    })
    
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from
    })
  }
}
</script>

<style scoped>
.conjugation {
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.conjugationResult {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  height: 25em;
  width: 40em;
}

.title {
  font-size: 3em;
}

.percent {
  font-size: 2em;
}

.resultList {
  height: fit-content;
  max-height: 14em;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.conj > p {
  display: inline-block;
  font-size: 1.5em;
}

.correct, 
.incorrect {
  padding-left: 10px;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
  padding-right: 31px;
}
/* ::-webkit-scrollbar-track {
  background: #f1f1f1;
} */
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
