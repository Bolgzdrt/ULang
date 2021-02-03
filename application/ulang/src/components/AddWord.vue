<template>
  <div class="addWord">
    <h1>Add a new word</h1>
    <div class="field">
      <input type="text" id="english" placeholder="Enter a word..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter a word...'" v-model="english"><br>
      <label for="english">English Word</label>
    </div>
    <div class="field">
      <input type="text" id="translation" placeholder="Enter word's translation..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter word\'s translation...'" v-model="translation"><br>
      <label for="translation">Translation</label>
    </div>
    <div class="field">
      <input type="text" id="description" placeholder="Enter a description..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter a description...'" v-model="description"><br>
      <label for="description">Description</label>
    </div>
    <button class="submitButton" @click="submit">Submit</button>
  </div>
</template>

<script>
import { createWord } from '@/services/wordService'
import { mapGetters } from 'vuex'

export default {
  name: 'AddWord',
  data() {
    return {
      english: '',
      translation: '',
      description: '',
      annotherWordModal: false
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
    submit() {
      const word = {
        english: this.english,
        word: this.translation,
        description: this.description,
        ownerId: this.getUserId(),
        language: 'FR'
      };
      createWord(word).then(data => {
        this.annotherWordModal = !this.annotherWordModal;
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>
.addWord {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 3%;
}

.addWord > div {
  margin: 1% 0% 1% 0%;
}

h1 {
  margin-bottom: 1%;
}

.field {
  display: inline-block;
}

label {
  float: left;
}

input {
  width: 200%;
  border: 0px solid #000000;
  border-bottom-width: 1px;
  background-color: transparent;
  font-size: 125%;
  outline: none;
}

input::placeholder {
  font-size: 0.75em;
}

.submitButton {
  margin-top: 1%;
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
</style>
