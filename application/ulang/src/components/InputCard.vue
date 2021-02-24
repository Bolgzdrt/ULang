<template>
  <div class="inputCard">
    <div class="word">
      <p>{{ this.word }}</p>
    </div>
    <div class="entry">
      <input class="textBox" type="text" placeholder="Enter translation here..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter translation here...'" v-model="input">
      <AccentButtons @buttonClicked="appendChar" />
    </div>
    <button class="submitButton" @click="correctCheck">Submit</button>
  </div>
</template>

<script>
import AccentButtons from '@/components/AccentButtons.vue'

export default {
  name: 'InputCard',
  components: { AccentButtons },
  props: ['word', 'translation'],
  data() {
    return {
      input: '',
      correct: false
    }
  },
  methods: {
    appendChar(char){
      this.input += char;
    },
    correctCheck() {
      if (this.input) {
        if (this.input === this.translation) {
          console.log("correct")
        }
      } else {
        console.log('incorrect')
      }
    }
  }
}
</script>

<style scoped>
.inputCard {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  height: 35em;
  width: 50em;
}

.word > p {
  font-size: 4em;
}

.textBox {
  width: 20em;
  border: 0px solid #000000;
  border-bottom-width: 1px;
  background-color: transparent;
  font-size: 2em;
  outline: none;
  margin-bottom: 20px;
}

button {
  height: 43px;
  width: 145px;
  border-radius: 5px;
  font-size: 120%;
  transition: 0.1s;
  outline: none;
  border: none;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.3));
}
button:hover {
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
  cursor: pointer;
}

.submitButton {
  background: var(--purple);
  color: white;
}

.submitButton:hover {
  background: #5b49d0;
}
</style>
