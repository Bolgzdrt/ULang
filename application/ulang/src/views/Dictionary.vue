<template>
  <div class="dictionary">
    <div class="set-box">
      <div class="wordList">
        <div class="wordListHeader">
          <ClickToEdit class="titleP" :value="setName" @input="updateSetName" />
        </div>
        <!--<div class="filterField">
        <input type="text" id="filter" placeholder="Filter words..." onfocus="this.placeholder=''" onblur="this.placeholder='Filter words...'" v-model="filter" value="" @input="filterList" class="inputField"><br>
        </div>-->
        <div class="rowContainer">
          <div class="row" v-for="word in setWords" :key="word._id">
            <div class="dots-dropdown">
              <div class="dots" ></div>
              <div class="dropdown" id="dropdown">
                <router-link :to="{ name: 'Word', params: {id: word._id} }">Edit</router-link>
                <a href="#" @click="remove(word._id)">Remove</a>
              </div>
            </div>
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
        <button class="add-words" name="add-words-button" @click="addWords"
        v-bind:style="this.dictionary.length===0 ? 'opacity:50%;' : 'opacity:100%'">Add Words</button>
        <button class="new-word" @click="newWords">New Word</button>
      </div>
    </div>
    <div class="add-words-box" id="add-words-box">
      <div class="wordList">
        <div class="wordListHeader">
          <p class="titleP">{{addWordsMessage}}</p>
        </div>
        <!--<div class="filterField">
        <input type="text" id="filter" placeholder="Filter words..." onfocus="this.placeholder=''" onblur="this.placeholder='Filter words...'" v-model="filter" value="" @input="filterList" class="inputField"><br>
        </div>-->
        <div class="rowContainer">
          <div class="row" v-for="word in dictionary" :key="word._id">
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
        <button class="add-words" id="add-button" @click="add">Add</button>
        <button calss="new-word" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWordsInSet, getSetById, updateSet } from '@/services/setService'
import { getWords } from '@/services/wordService'
import ClickToEdit from '../components/ClickToEdit'

export default {
  name: 'Dictionary',
  components: { ClickToEdit },
  props: ['id', 'setId'],
  data() {
    return {
      setName: '',
      setWords: [],
      dictionary: [],
      addWordsMessage: ''
    }
  },
  created() {
    getWordsInSet(this.setId).then((data) => {
      this.setWords = data.words
      getWords(this.getUserId(), this.getLanguage()).then((data) =>{
        var dictionaryWords = data.words;
        for(var i =0; i < this.setWords.length; i++){
          var index = dictionaryWords.findIndex(word => word._id === this.setWords[i]._id)
          dictionaryWords.splice(index,1);
        }
        this.dictionary = dictionaryWords.map(word => ({ ...word, selected: false }));
      })
    })
    getSetById(this.setId).then((data) => {
      this.setName = data.set.name
    })
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
    ...mapGetters('settings', ['getLanguage']),
    addWords(){
      if(this.dictionary.length <= 0)
        return;     
      var addWordsBox = document.getElementById("add-words-box");
      addWordsBox.style.display = "flex";
    },
    newWords(){
      this.$router.push({name: 'CreateWord'});
    },
    add(){
      const requestPayload = {
        name: this.setName,
        description: this.description,
        ownerId: this.getUserId(),
        quickAccess: this.quickAccess,
        language: this.getLanguage()
      };

      var currentWords = this.setWords.map(a => a._id);

      var addedWords = this.dictionary.reduce((acc, curr) => {
        if (curr.selected) {
          return [...acc, curr]
        } else {
          return acc
        }
      },
      []
      );
      var addedWordsIds = addedWords.map(a => a._id);
      requestPayload["words"] = currentWords.concat(addedWordsIds);

      updateSet(this.setId, requestPayload);
      for(var i = 0; i < addedWords.length; i++){
        this.setWords.push(addedWords[i]);
        var index = this.dictionary.findIndex(word => word._id === addedWords[i]._id);
        this.dictionary.splice(index,1);
      }

      if(this.dictionary.length === 0)
        {
          var addWordsBox = document.getElementById("add-words-box");
        addWordsBox.style.display = "";
        }
    },
    cancel(){
      /* uncheck all words */
      var addWordsBox = document.getElementById("add-words-box");
      addWordsBox.style.display = "";
    },
    remove(wordId){
      const requestPayload = {
        name: this.setName,
        description: this.description,
        ownerId: this.getUserId(),
        quickAccess: this.quickAccess,
        language: this.getLanguage()
      };
      var index = this.setWords.findIndex(setWord => setWord._id === wordId);
      this.dictionary.push(this.setWords[index]);
      this.setWords.splice(index,1);
      requestPayload["words"] = this.setWords;
      updateSet(this.setId, requestPayload);
    },
    updateSetName(input){
      const requestPayload = {
        name: input,
        description: this.description,
        ownerId: this.getUserId(),
        quickAccess: this.quickAccess,
        language: this.getLanguage(),
        words: this.setWords
      };
      
      updateSet(this.setId, requestPayload);
    }
  }
  
}
</script>

<style scoped>
@import '../assets/styles/utils.css';

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

.dots-dropdown{
  position: relative;
  display: inline-block;
}

.dots{
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.dots:after{
  content: '\2807';
  font-size: inherit;
}

.dots .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s
}

.dropdown{
  display: none;
  position: absolute;
  background-color: var(--white);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown a {
  color: var(--black);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {
  background-color: #ddd;
}

.dots-dropdown:hover .dropdown {
  display: block;
}

@-webkit-keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
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
  display: inline-block;
}

.add-words:hover {
  background: #5b49d0;
}

.new-word {
  background: #eee;
  margin-right: 1em;
  display: inline-block;
}

.new-word:hover {
  background: #d9d9d9;
}

.add-words-box {
  display: none;
  flex-direction: column;
  background-color: var(--white);
  width: 100%;
  padding: 2%;
}

.buttonBox {
  display: flex;
  padding: 2%;
}
</style>
