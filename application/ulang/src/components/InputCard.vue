<template>
  <div class="inputCard">
     <div class="word">
      <p class="word">Word</p>
     </div>
    <div class="entry">
      <input class="textBox" type="text" placeholder="Enter translation here..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter translation here...'" v-model="input">
      <AccentButtons @buttonClicked="appendChar" />
      <button class="submitButton">Submit</button>
    </div>
  </div>
</template>

<script>
import AccentButtons from '@/components/AccentButtons.vue'

export default {
  name: 'InputCard',
  components: { AccentButtons },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    appendChar(char){
      this.input += char;
    }
  }
}
</script>

<style scoped>
.inputCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 70%;
  height: 70%;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  border: 2px solid #CCC;
  background: white;
  text-align: center;
  margin: 20px 5px 20px 5px;
  font-size: 20px;
}

hr {
  width: 80%;
  justify-self: center;
}

div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.textBox {
  width: 80%;
  border: 0px solid #000000;
  border-bottom-width: 1px;
  background-color: transparent;
  font-size: 200%;
  outline: none;
}

.submitButton {
  height: 43px;
  width: 145px;
  border-radius: 5px;
  font-size: 120%;
  transition: 0.1s;
  outline: none;
  background: var(--purple);
  color: white;
  border: none;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.3));
}

.submitButton:hover {
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
  background: #5b49d0;
  cursor: pointer;
  text-shadow: 1px 1px black;
}

.word {
  font-size: 200%;
}
</style>
