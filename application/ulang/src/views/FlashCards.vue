<template>
  <div class="flashCards">
    <div class="set">
      <div class="name">Set Name</div>
      <div class="progress">Progress: {{ index + 1 }} / {{ total }}</div>
    </div>
    <div class="scene">
      <div class="card" @click="toggleCard" v-bind:class="{isFlipped: flipped}">
        <div class="cardFace">{{ words[index].english }}</div>
        <div class="cardFace cardFaceBack">{{ words[index].translation }}</div>
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
export default {
  name: 'FlashCards',
  data() {
    return {
      words: [
        { english: 'helmet', translation: 'casque' },
        { english: 'egg', translation: 'oeuf' },
        { english: 'diamond', translation: 'diamant' },
        { english: 'dog', translation: 'chienne/chien' }
      ],
      index: 0,
      total: 0,
      flipped: false
    }
  },
  methods: {
    toggleCard: function() {
      this.flipped = !this.flipped;
    },
    nextCard: function() {
      if (!(this.index >= this.total - 1)) {
        this.index += 1;
      }
    },
    prevCard: function() {
      if (!(this.index == 0)) {
        this.index -= 1; 
      }
    },
  },
  created: function(){
    this.total = this.words.length;
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

.name {
  font-size: 16px;
  font-size: 4vw;
}

.progress {
  font-size: 16px;
  font-size: 2vw;
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
  transition: transform 0.5s;
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
