<template>
  <div class="tableInputCard">
    <div class="table">
      <p>Word: {{ conjObj.word }}</p>
      <p>Table: {{ conjObj.conjugation.title }}</p>
      <table>
        <tr>
          <td>
            <p v-if="conjObj.selected === 'tl'">?</p>
            <p v-if="conjObj.selected !== 'tl'">{{ conjObj.conjugation.tl }}</p>
          </td>
          <td>
            <p v-if="conjObj.selected === 'tr'">?</p>
            <p v-if="conjObj.selected !== 'tr'">{{ conjObj.conjugation.tr }}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p v-if="conjObj.selected === 'ml'">?</p>
            <p v-if="conjObj.selected !== 'ml'">{{ conjObj.conjugation.ml }}</p>
          </td>
          <td>
            <p v-if="conjObj.selected === 'mr'">?</p>
            <p v-if="conjObj.selected !== 'mr'">{{ conjObj.conjugation.mr }}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p v-if="conjObj.selected === 'bl'">?</p>
            <p v-if="conjObj.selected !== 'bl'">{{ conjObj.conjugation.bl }}</p>
          </td>
          <td>
            <p v-if="conjObj.selected === 'br'">?</p>
            <p v-if="conjObj.selected !== 'br'">{{ conjObj.conjugation.br }}</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="entry">
      <input
        class="textBox"
        type="text"
        placeholder="Enter conjugation here..."
        onfocus="this.placeholder=''"
        onblur="this.placeholder='Enter translation here...'"
        v-model="input"
        @keyup.enter="correctCheck"
      />
      <AccentButtons @buttonClicked="appendChar" />
      <p class="error" v-if="entryErr">
        Please enter a conjugation for the ? cell
      </p>
    </div>
    <button class="submitButton" @click="correctCheck">Submit</button>
    <transition name="modalFade" v-if="resultModal">
      <div class="modalBackdrop">
        <div class="modal">
          <p class="correct" v-if="correct">Correct!</p>
          <div class="incorrect" v-if="!correct">
            <p class="result">Incorrect</p>
            <p>Correct answer:</p>
            <p v-if="conjObj.selected === 'tl'">{{ conjObj.conjugation.tl }}</p>
            <p v-if="conjObj.selected === 'tr'">{{ conjObj.conjugation.tr }}</p>
            <p v-if="conjObj.selected === 'ml'">{{ conjObj.conjugation.ml }}</p>
            <p v-if="conjObj.selected === 'mr'">{{ conjObj.conjugation.mr }}</p>
            <p v-if="conjObj.selected === 'bl'">{{ conjObj.conjugation.bl }}</p>
            <p v-if="conjObj.selected === 'br'">{{ conjObj.conjugation.br }}</p>
          </div>
          <div class="buttonBox">
            <button class="submitButton" @click="cont">Continue</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AccentButtons from '@/components/AccentButtons.vue'

export default {
  name: 'tableInputCard',
  components: { AccentButtons },
  props: {
    conjObj: {
      required: true,
      default: () => ({
        word: '',
        selected: '',
        correct: false,
        conjugation: {
          bl: '',
          br: '',
          ml: '',
          mr: '',
          tl: '',
          tr: ''
        }
      })
    }
  },
  data() {
    return {
      input: '',
      correct: false,
      entryErr: false,
      resultModal: false
    }
  },
  methods: {
    appendChar(char) {
      this.input += char
    },
    correctCheck() {
      if (this.input) {
        if (this.input === this.conjObj.conjugation[this.conjObj.selected]) {
          this.correct = true
        } else {
          this.correct = false
        }
        this.resultModal = true
        if (this.entryErr) {
          this.entryErr = false
        }
      } else {
        this.entryErr = true
      }
    },
    cont() {
      this.resultModal = false
      this.input = ''
      this.$emit('nextCard', this.correct)
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

.tableInputCard {
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

.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.5em;
}

table {
  margin-top: 15px;
  border-style: hidden;
  border-collapse: collapse;
  width: 100%;
}

td {
  padding: 0.75rem;
  border: 2px solid black;
}

.textBox {
  width: 20em;
  border: 0px solid var(--black);
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

.error {
  color: red;
  font-size: 2em;
  padding-top: 20px;
}

.modalBackdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  border-radius: 5px;
  width: 12em;
  min-width: 400px;
  height: 5em;
  min-height: 220px;
}

.modal > .buttonBox {
  margin-top: 20px;
}

.correct {
  font-size: 2em;
  color: green;
}

.incorrect {
  font-size: 2em;
}

.incorrect > .result {
  color: red;
}

/* Adding styles to accentButtons to make it centered below the input box */
.accentButtons {
  justify-content: center;
}
</style>
