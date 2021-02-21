<template>
  <div class="flashSetting">
    <div class="box">
      <p class="titleP">Flash Cards</p>
      <div class="field">
        <p>Set:</p>
        <select id="setSelect" v-model="setSelection" size="5">
          <option v-for="set in sets" v-bind:value="set._id" :key="set._id">
            {{ set.name }}
          </option>
        </select>
      </div>
      <div class="field">
        <p class="radioTitle">Face First Displayed:</p>
        <input type="radio" v-model="languageGiven" id="en" value="0" class="radioBtn">
        <label for="en" class="radioLabel">English</label>
        <input type="radio" v-model="languageGiven" id="fl" value="1" class="radioBtn">
        <label for="fl" class="radioLabel">{{ this.currentLanguage }}</label>
        <input type="radio" v-model="languageGiven" id="rand" value="2" class="radioBtn">
        <label for="rand" class="radioLabel">Random</label>
      </div>
      <div class="buttonBox">
        <router-link :to="{ name: 'FlashCards', params: { id: this.setSelection, setting: this.languageGiven } }"><button class="submitButton">Start</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSets } from '@/services/setService'

export default {
  name: 'FlashCardsSettings',
  data() {
    return {
      setSelection: '',
      languageGiven: '0',
      currentLanguage: 'French',
      sets: [
        {name: "test set", _id: "1"},
        {name: "another test test set", _id: "2"},
      ],
      fromRoute: ''
    }
  },
  methods: {
    ...mapGetters('settings', ['getLanguage']),
    ...mapGetters('auth', ['getUserId']),
    startStudy() {
      if (setsSelection) {
        this.$router.push({name: "FlashCards", params: { id: this.setSelection, setting: this.languageGiven }})
      }
    }
  },
  created() {
    getSets(this.getUserId(), "fr").then(({sets}) => {
      this.sets = sets
    })
    this.currentLanguage = this.getLanguage()
    this.currentLanguage = this.currentLanguage.charAt(0).toUpperCase() + this.currentLanguage.slice(1)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from
    })
  }
}
</script>

<style scoped>
.flashSetting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  height: 35em;
  width: 50em;
}

.titleP {
  font-size: 3em;
}

.field {
  font-size: 2em;
}

.selectDrop {
  height: 100px;
}

.field > select {
  width: 60%;
  border: 2px solid #000000;
  background-color: transparent;
  font-size: 1em;
  outline: none;
  border-radius: 5px;
}

.field > select:hover {
  cursor: pointer;
}

.radioTitle {
  margin-bottom: 10px;
}

.radioBtn {
  opacity: 0;
  position: fixed;
  width: 0;
  margin: 5px;
}

.radioLabel {
  height: 36px;
  width: 145px;
  border-radius: 5px;
  font-size: 0.7em;
  transition: 0.1s;
  outline: none;
  border: none;
  padding: 10px 20px;
  margin: 0 5px 0 5px;
  background-color: #ccc;
  color: black;
}

.radioLabel:hover {
  cursor: pointer;
}

.radioBtn:checked + label {
  background-color: var(--purple);
  color: white;
}

.buttonBox {
  margin-top: 20px;
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

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
  padding-right: 31px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>