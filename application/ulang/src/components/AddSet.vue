<template>
  <div class="addSet">
    <div class="default">
      <p class="titleP">Create a New Set</p>
      <div class="field">
        <input type="text" id="name" placeholder="Enter a name..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter a name...'" v-model="name" class="inputField"><br>
        <label for="name" class="required inputFieldLabel">Set Name</label>
      </div>
      <div class="field">
        <input type="text" id="description" placeholder="Enter a description..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter a description...'" v-model="description" class="inputField"><br>
        <label for="description" class="required inputFieldLabel">Set Description</label>
      </div>
      <div class="checkField">
        <bolt :selected="quickAcess" />
        <label for="">Add Set to Quick Access?</label>
        <input type="checkbox" value="quickAcess" v-model="quickAcess" class="checkBox">
      </div>
    </div>
    <div class="wordList">
      <div class="wordListHeader">
        <p class="titleP">Select words to include in set</p>
        <Tooltip text="Use the checkbox to select any words the set should include. New words can be created for the set after clicking the 'Create' button.">
          <div class="helpButton">?</div>
        </Tooltip>
      </div>
      <div class="filterField">
        <input type="text" id="filter" placeholder="Filter words..." onfocus="this.placeholder=''" onblur="this.placeholder='Filter words...'" v-model="filter" class="inputField"><br>
      </div>
      <div class="rowContainer">
        <div class="row" v-for="word in words" :key="word._id">
          <input type="checkbox" value="word.selected" v-model="word.selected">
          <div class="word"><p>{{ word.english }} / {{ word.word }}</p></div>
          <div class="definition"><p>{{ word.definition }}</p></div>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <button class="cancelButton" @click="cancel">Cancel</button>
      <button class="submitButton" @click="submit">Create</button>
    </div>
  </div>
</template>

<script>
import { createSet } from '@/services/setService'
import { mapGetters } from 'vuex'
import bolt from '@/assets/svgs/bolt.vue'
import Tooltip from '@/components/Tooltip.vue'

export default {
  name: 'AddSet',
  components: { bolt, Tooltip },
  props: ['fromRoute'],
  data() {
    return {
      name: '',
      description: '',
      quickAcess: false,
      filter: '',
      words: [
        {word: 'diamant', english: 'diamond', definition: 'hard gem', selected: false},
        {word: 'diamant', english: 'diamond', definition: 'hard gem', selected: false},
        {word: 'diamant', english: 'diamond', definition: 'hard gem', selected: false}
      ]
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
    submit() {
      
    },
    cancel() {
      if (this.fromRoute) {
        this.$router.push(this.fromRoute)
      } else  {
        this.$router.push({name: "Home"})
      }
    }
  }
}
</script>

<style scoped>
.addSet {
  display: grid;
  grid-template-rows: 2fr minmax(10%, 60%) 1fr;
  grid-template-columns: minmax(100%, 100%);
  gap: 3rem 0;
  padding: 3%;
  height: 100%;
}
.default {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.wordList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  max-height: 100%;
}

.titleP {
  font-size: 2em;
}

.field {
  display: inline-block;
  margin: 1% 0% 1% 0%;
  width: 50%;
}

.inputFieldLabel {
  float: left;
}

.tableTitleLabel {
  margin: 1% 0 2% 0;
}

.required:after {
  content:" *";
  color: red;
}

.inputField {
  width: 100%;
  border: 0px solid #000000;
  border-bottom-width: 1px;
  background-color: transparent;
  font-size: 125%;
  outline: none;
  text-indent: 4px;
}

.filterField {
  display: inline-block;
  margin: 1% 0% 1% 0%;
  width: 25%;
}

.inputField::placeholder {
  font-size: 0.75em;
}

.checkField {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1% 0% 1% 0%;
}

.checkBox {
  margin-left: 1em;
  position: relative;
  width: 1.3em;
  height: 1.3em;
  cursor: pointer;
}

.wordList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  max-height: 100%;
}

.wordListHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.wordListHeader > p {
  padding-right: 10px;
}

.helpButton {
  background: #e0e0e0;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.rowContainer {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.25em;
  border: 0px solid #ccc;
  border-bottom-width: 1px;
  width: 100%;
}

.row > input {
  margin-right: 2em;
  position: relative;
  width: 1.3em;
  height: 1.3em;
  cursor: pointer;
}

.row > div {
  text-align: left;
  margin: 1%;
}

.row > .word {
  width: 16em;
}

.row > .definition {
  width: 70%;
}

.desc p {
  text-overflow: ellipsis;
  overflow: hidden;
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
  margin-left: 1em;
}

.submitButton:hover {
  background: #5b49d0;
}

.cancelButton {
  background: #eee;
  margin-right: 1em;
}

.cancelButton:hover {
  background: #d9d9d9;
}
</style>
