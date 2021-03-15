<template>
  <div class="dictionary">
    <div class="set-box">
      <header class="set-name"></header>
      <div class="wordList">
        <div class="wordListHeader">
          <p class="titleP">{{ setName }}</p>
          <Tooltip
            text="Use the checkbox to select any words the set should include. New words can be created for the set after clicking the 'Create' button."
          >
            <div class="helpButton">?</div>
          </Tooltip>
        </div>
        <!--<div class="filterField">
        <input type="text" id="filter" placeholder="Filter words..." onfocus="this.placeholder=''" onblur="this.placeholder='Filter words...'" v-model="filter" value="" @input="filterList" class="inputField"><br>
      </div>-->
        <div class="rowContainer">
          <div class="row" v-for="word in setWords" :key="word._id">
            <input
              type="checkbox"
              value="word.selected"
              v-model="word.selected"
            />
            <div class="word">
              <p>{{ word.english }} / {{ word.word }}</p>
            </div>
            <div class="definition">
              <p>{{ word.definition }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="buttonBox">
        <button class="add-words" @click="addWords">Add Words</button>
        <button class="new-word" @click="newWords">New Word</button>
      </div>
    </div>
    <div class="add-words-box"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWordsInSet, getSetById } from '@/services/setService'
import Tooltip from '@/components/Tooltip.vue'

export default {
  name: 'Dictionary',
  components: { Tooltip },
  props: ['id', 'setId'],
  data() {
    return {
      setName: '',
      setWords: [],
    }
  },
  created() {
    getWordsInSet(this.setId).then((data) => {
      this.setWords = data.words
    })
    getSetById(this.setId).then((data) => {
      this.setName = data.set.name
    })
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
    addWords() {},
    newWords() {},
  },
}
</script>

<style scoped>
.dictionary {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2%;
}

.titleP {
  font-size: 2em;
}

.set-box {
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  width: 100%;
  padding: 2%;
}
.filterField {
  display: inline-block;
  margin: 1% 0% 1% 0%;
  width: 25%;
}
.wordList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  max-height: 100%;
}
.tableTitleLabel {
  margin: 1% 0 2% 0;
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

.add-words {
  background: var(--purple);
  color: white;
  margin-left: 1em;
}

.add-words:hover {
  background: #5b49d0;
}

.new-word {
  background: #eee;
  margin-right: 1em;
}

.new-word:hover {
  background: #d9d9d9;
}
</style>
