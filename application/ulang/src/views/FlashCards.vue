<template>
  <div class="flashCards">
    <BackButton :fromRoute="fromRoute" />
    <SetProg v-bind:curr="index + 1" v-bind:total="total" v-bind:setName="setName"/>
    <div class="scene">
      <div class="card" @click="toggleCard" v-bind:class="{isFlipped: flipped}">
        <div class="cardFace">{{ words[index].given === "0"?words[index].english : words[index].word }}</div>
        <div class="cardFace cardFaceBack">{{ words[index].given === "0"?words[index].word : words[index].english }}</div>
      </div>
    </div>
    <div class="nav">
      <div class="cardChange leftButton" @click="prevCard"><img src="@/assets/pngs/Vector.png" alt="previous"></div>
      Click to flip
      <div class="cardChange rightButton" @click="nextCard"><img src="@/assets/pngs/Vector.png" alt="next" style="transform: rotate(180deg);"></div>
    </div>
  </div>
</template>

<script>
import SetProg from '@/components/SetProg.vue'
import BackButton from '@/components/BackButton.vue'
import { getWordsInSet, getSetById } from '@/services/setService'

export default {
  name: 'FlashCards',
  components: { BackButton, SetProg },
  props: ['id', 'setting', 'fromRoute'],
  data() {
    return {
      words: [{
        english: '',
        word: ''
      }],
      setName: '',
      index: 0,
      total: 0,
      flipped: false
    }
  },
  methods: {
    toggleCard() {
      this.flipped = !this.flipped;
    },
    nextCard() {
      if (!(this.index >= this.total - 1)) {
        if (this.flipped == true){
          this.toggleCard();
        }
        setTimeout(() => {
          this.index += 1;
        }, 100);
      }
    },
    prevCard() {
      if (!(this.index == 0)) {
        if (this.flipped == true){
          this.toggleCard();
        }
        setTimeout(() => {
          this.index -= 1;
        }, 100);
      }
    },
  },
  created() {
    if (!this.id) {
      this.$router.push({name: "FlashCardSettings"})
    }
    const settings = this.setting || 0
    getWordsInSet(this.id).then(({words}) => {
      this.words = words.map(word => { 
        let num
        if (settings == 2) {
          num = Math.round(Math.random())
        } else {
          num = settings
        }
        return {
          ...word, 
          given: num
        } 
      })
      this.total = this.words.length;
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
.flashCards {
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.nav {
  font-size: 16px;
  font-size: 2vw;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cardChange {
  width: 50px;
  height: 50px;
  background: #FFFFFF;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;
}

.cardChange:hover {
  transform: scale(1.1);
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
}

.leftButton {
  margin-right: 20px;
}

.rightButton {
  margin-left: 20px;
}

.scene {
  width: 50%;
  height: 50%;
  perspective: 1000px;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 0.25s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card.isFlipped {
  transform: rotateX(180deg);
}

.cardFace {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #FFFFFF;
  border-radius: 10px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  border: 2px solid #CCCCCC;
  font-size: 16px;
  font-size: 4vw;
  -webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.cardFaceBack {
  transform: rotateX(180deg);
}
</style>
