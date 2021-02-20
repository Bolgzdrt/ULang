<template>
  <div class="addWord">
    <div class="onlyWord">
      <div class="default">
        <p>Add a new word</p>
        <div class="field">
          <input type="text" id="english" placeholder="Enter a word..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter a word...'" v-model="english" class="wordInput"><br>
          <label for="english" class="required wordEntryLabel">English Word</label>
        </div>
        <div class="field">
          <input type="text" id="translation" placeholder="Enter the translation..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter the translation...'" v-model="translation" class="wordInput"><br>
          <label for="translation" class="required wordEntryLabel">Translation</label>
        </div>
        <div class="field">
          <input type="text" id="definition" placeholder="Enter a definition for your word..." onfocus="this.placeholder=''" onblur="this.placeholder='Enter a definition for your word...'" v-model="definition" class="wordInput"><br>
          <label for="definition" class="wordEntryLabel">Definition</label>
        </div>
        <div class="field">
          <select id="partOfSpeech" v-model="partOfSpeech">
            <option value="" disabled>--Select an option--</option>
            <option value="noun">Noun</option>
            <option value="verb" selected>Verb</option>
            <option value="adjective">Adjective</option>
            <option value="adverb">Adverb</option>
            <option value="pronoun">Pronoun</option>
            <option value="preposition">Preposition</option>
            <option value="conjunction">Conjunction</option>
            <option value="interjection">Interjection</option>
          </select><br>
          <label for="partOfSpeech" class="required wordEntryLabel">Part of speech</label>
        </div>
      </div>
      <div class="tables" v-if="partOfSpeech === 'verb'">
        <p class="verbTitle">Verb Tables</p>
        <div class="tableTitleLabel">
          <label for="tableName" class="tableTitleLabel">Title: </label>
          <input type="text" id="tableName" v-model="conjugationData[conjugationIndex].title" class="conjugationTableInput">
        </div>
        <table>
          <tr>
            <td><input id="tableTL" class="conjugationTableInput" type="text" v-model="conjugationData[conjugationIndex].tl"></td>
            <td><input id="tableTR" class="conjugationTableInput" type="text" v-model="conjugationData[conjugationIndex].tr"></td>
          </tr>
          <tr>
            <td><input id="tableML" class="conjugationTableInput" type="text" v-model="conjugationData[conjugationIndex].ml"></td>
            <td><input id="tableMR" class="conjugationTableInput" type="text" v-model="conjugationData[conjugationIndex].mr"></td>
          </tr>
          <tr>
            <td><input id="tableBL" class="conjugationTableInput" type="text" v-model="conjugationData[conjugationIndex].bl"></td>
            <td><input id="tableBR" class="conjugationTableInput" type="text" v-model="conjugationData[conjugationIndex].br"></td>
          </tr>
        </table>
        <div class="nav">
          <div class="tableChange" @click="backClick"><img src="@/assets/pngs/Vector.png" alt="previous"></div>
          <div class="tableChange" @click="nextClick"><img src="@/assets/pngs/Vector.png" alt="next" style="transform: rotate(180deg);"></div>
          </div>
      </div>
    </div>
    <div class="setList">
      <p class="titleP">Sets to add to</p>
      <div class="rowContainer">
        <div class="row" v-for="set in sets" :key="set._id">
          <input type="checkbox" value="set.selected" v-model="set.selected">
          <div class="name"><p>{{ set.name }}</p></div>
          <div class="length"><p>{{ set.words.length }} words</p></div>
          <div class="desc"><p>{{ set.description }}</p></div>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <button class="cancelButton" @click="cancel">Cancel</button>
      <button class="submitButton" @click="submit">Add</button>
    </div>
    <transition name="modalFade" v-if="anotherWordModal">
      <div class="modalBackdrop">
        <div class="modal">
          <p class="titleP">Add another word?</p>
          <div class="buttonBox">
            <button class="cancelButton" @click="cancel">No</button>
            <button class="submitButton" @click="clear">Yes</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createWord } from '@/services/wordService'
import { getSets } from '@/services/setService'
import { mapGetters } from 'vuex'

export default {
  name: 'AddWord',
  props: ['fromRoute'],
  data() {
    return {
      english: '',
      translation: '',
      definition: '',
      partOfSpeech: '',
      tableTitle: '',
      conjugationData: [{ title: '', tl: '', ml: '', bl: '', tr: '', mr: '', bl: '' }],
      conjugationIndex: 0,
      sets: [],
      anotherWordModal: false,
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
    submit() {
      const requestPayload = {
        english: this.english,
        word: this.translation,
        description: this.definition,
        partOfSpeech: this.partOfSpeech,
        ownerId: this.getUserId(),
        conjugationData: this.conjugationData,
        language: 'fr'
      };
      const setIds = this.sets.reduce((acc, curr) => {
        
        if (curr.selected) {
          return [...acc, curr._id]
        } else {
          return acc
        }
      },
      []
      );
      requestPayload["setIds"] = setIds
      createWord(requestPayload).then(data => {
        this.anotherWordModal = true;
      }).catch(err => {
        console.log(err);
      });
      this.anotherWordModal = true
    },
    nextClick() {
      if (this.conjugationIndex === this.conjugationData.length -1) {
        // going with topleft, middleleft, etc. cus they don't always mean the same thing from language to langauge.
        this.conjugationData.push({ title: '', tl: '', ml: '', bl: '', tr: '', mr: '', bl: '' })
        this.conjugationIndex++
      } else {
        this.conjugationIndex++
      }
    },
    backClick() {
      if (this.conjugationIndex > 0) {
        this.conjugationIndex--
      }
    },
    // TODO: do this
    cancel() {
      // this should return the user to the page they came from, not sure how yet
      if (this.fromRoute) {
        this.$router.push(this.fromRoute)
      } else  {
        this.$router.push({name: "Home"})
      }
    },
    clear() {
      this.english = ''
      this.translation = ''
      this.definition = ''
      this.partOfSpeech = ''
      this.tableTitle = ''
      this.conjugationData = [{ title: '', tl: '', ml: '', bl: '', tr: '', mr: '', bl: '' }]
      this.conjugationIndex = 0
      this.anotherWordModal = false
      let i = 0
      for (i = 0; i < this.sets.length; i++) {
        this.sets[i].selected = false
      }
    }
  },
  created() {
    getSets(this.getUserId(), "FR").then(({sets}) => {
      this.sets = sets.map(set => ({ ...set, selected: false }))
    })
  },
}
</script>

<style scoped>
.addWord {
  display: grid;
  grid-template-rows: 2fr minmax(10%, 60%) 1fr;
  grid-template-columns: minmax(100%, 100%);
  gap: 3rem 0;
  padding: 3%;
  height: 100%;
}

.onlyWord {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  width: 100%;
}

.default {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
}

.tables {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0% 0% 0% 3%;
  background-color: #eee;
}

.setList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  max-height: 100%;
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
}

.row > div {
  text-align: left;
  margin: 1%;
}

.row > .name {
  width: 8em;
}

.row > .length {
  width: 8em;
}

.row > .desc {
  width: 70%;
}

.desc p {
  text-overflow: ellipsis;
  overflow: hidden;
}

.titleP {
  margin-bottom: 1%;
  font-size: 2em;
}

.field {
  display: inline-block;
  margin: 1% 0% 1% 0%;
  width: 100%;
}

.wordEntryLabel {
  float: left;
}

.tableTitleLabel {
  margin: 1% 0 2% 0;
}

.required:after {
    content:" *";
    color: red;
  }

.wordInput {
  width: 100%;
  border: 0px solid #000000;
  border-bottom-width: 1px;
  background-color: transparent;
  font-size: 125%;
  outline: none;
  text-indent: 4px;
}

.wordInput::placeholder {
  font-size: 0.75em;
}

.conjugationTableInput {
  border: 0px solid #000000;
  font-size: 100%;
  outline: none;
  text-align: center;
  padding: 5px;
}

table {
  border-style: hidden;
  border-collapse: collapse;
  width: 70%;
}

td {
  padding: 0.5rem;
  border: 1px solid black
}

select {
  width: 100%;
  border: 0px solid #000000;
  border-bottom-width: 1px;
  background-color: transparent;
  font-size: 125%;
  outline: none;
}

select:hover {
  cursor: pointer;
}

.verbTitle {
  margin: 1%;
  font-size: 1.5em;
}

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 15%;
  margin: 1%;
}

.tableChange {
  width: 2em;
  height: 2em;
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
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  border-radius: 5px;
  width: 25%;
  min-width: 350px;
  height: 15%;
  min-height: 150px;
}
</style>
