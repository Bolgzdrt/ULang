<template>
  <div class="learn">
    <BackButton :fromRoute="fromRoute" />
    <div v-if="!done">
      <div style="padding-bottom: 30px;"><SetProg :curr="index + 1" :total="total" :setName="setName" /></div>
      <InputCard :word="wordList[index].english" :translation="wordList[index].word" @nextCard="nextCard"/>
    </div>
    <div class="learnResult" v-if="done">
      <div>
        <p class="title">Results:</p>
        <p class="percent">{{ resPercent }}% correct</p>
      </div>
      <div class="resultList">
        <div class="word" v-for="word in wordList" :key="word._id">
          <p>{{ word.english }}/{{ word.word }}:</p>
          <p :class="word.correct == true?'correct':'incorrect'">{{ word.correct == true?"Correct" : "Incorrect" }}</p>
        </div>
      </div>
    </div>
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
      wordList: [{english: ''}],
      setName: '',
      index: 0,
      total: 0,
      resultModal: false,
      done: false,
      resPercent: '',
      fromRoute: ''
    }
  },
  methods: {
    nextCard(correct) {
      if (this.index < this.total - 1) {
        if (correct) {
          this.wordList[this.index].correct = true
        }
        this.index += 1
      } else {
        this.done = true
        var correctTally = 0
        this.wordList.forEach(element => {
          if (element.correct) {
            correctTally += 1
          }
        })
        this.resPercent = ((correctTally/this.total) * 100).toFixed(0)
      }
    }
  },
  created: function(){
    if (!this.id) {
      this.$router.push({name: "LearnSettings"})
    }
    getWordsInSet(this.id).then(({words}) => {
      this.wordList = words.map(word => ({ ...word, correct: false }))
      this.total = this.wordList.length;
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
.learn {
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.learnResult {
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

.word > p {
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
