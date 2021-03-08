<template>
  <div id="word">
    <div class="container">
      <p class="title">{{ wordInfo.word }} – {{ wordInfo.english }} ({{ wordInfo.partOfSpeech }})</p>
      <div v-if="!editBools.definition" class="attribute-container">
        <span class="attribute">
          <p>Definition</p>
          <span class="edit-container" @click="toggleEdit('definition')">
            <Edit />
          </span>
        </span>
        <p>{{ wordInfo.definition }}</p>
      </div>
      <div v-else class="attribute-container">
        <label for="def">Definition</label>
        <span class="edit-definition">
          <input type="text" name="def" id="def" v-model="editInputs.definition">
          <span class="confirm-container" @click="cancelEdit('definition')">
            <Cancel />
          </span>
          <span class="confirm-container" @click="confirmEdit('definition')">
            <Confirm />
          </span>
        </span>
      </div>
      <div v-if="!editBools.notes" class="attribute-container">
        <span class="attribute">
          <p>Notes</p>
          <span class="edit-container" @click="toggleEdit('notes')">
            <Edit />
          </span>
        </span>
        <p>{{ wordInfo.notes }}</p>
      </div>
      <div v-else class="attribute-container">
        <label for="notes">Notes</label>
        <span class="edit-notes">
          <textarea name="notes" id="notes" cols="50" rows="5" v-model="editInputs.notes" :placeholder="getPlaceHolder('Notes about')"></textarea>
          <span class="confirm-container" @click="cancelEdit('notes')">
            <Cancel />
          </span>
          <span class="confirm-container" @click="confirmEdit('notes')">
            <Confirm />
          </span>
        </span>
      </div>
      <div class="conjugation-container">
        <div class="table-title">
          <p>Present or something</p>
        </div>
        <div class="table">
          <table>
            <tr>
              <td>
                <p>idk</p>
              </td>
              <td>
                <p>idk</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>idk</p>
              </td>
              <td>
                <p>idk</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>idk</p>
              </td>
              <td>
                <p>idk</p>
              </td>
            </tr>
          </table>
          <div class="nav">
            <div class="tableChange" @click="backClick">
              <img src="@/assets/pngs/Vector.png" alt="previous" />
            </div>
            <div class="tableChange" @click="nextClick">
              <img
                src="@/assets/pngs/Vector.png"
                alt="next"
                style="transform: rotate(180deg);"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Edit from '@/assets/svgs/edit.vue'
import Confirm from '@/assets/svgs/confirm.vue'
import Cancel from '@/assets/svgs/cancel.vue'
import { getWordById, updateWord } from '@/services/wordService'

export default {
  name: 'Word',
  props: ['id'],
  components: { Edit, Confirm, Cancel },
  data() {
    return {
      wordInfo: {
        word: '',
        english: '',
        partOfSpeech: '',
        notes: '',
        definition: '',
      },
      editBools: {
        definition: false,
        notes: false,
      },
      // These are what is being edited but if the edit is cancelled, the original is maintained
      editInputs: {
        word: '',
        english: '',
        partOfSpeech: '',
        notes: '',
        definition: '',
      },
      conjugations: [],
      conjugationIndex: 0,
    }
  },
  methods: {
    getWordInfo() {
      getWordById(this.id).then(res => {
        ['word', 'english', 'partOfSpeech', 'description', 'notes', 'definition'].forEach(info => {
          if (res.word[info]) {
            this.wordInfo[info] = res.word[info]
            this.editInputs[info] = res.word[info]
          }
        })
        this.conjugations = res.conjugations || null
      }).catch(err => {
        console.error(err.response.data.error)
      })
    },
    toggleEdit(property) {
      this.editBools[property] = !this.editBools[property]
    },
    confirmEdit(property) {
      updateWord(this.id, { [property]: this.editInputs[property] })
        .then(() => {
          this.wordInfo[property] = this.editInputs[property]
          this.toggleEdit(property)
        })
        .catch(err => console.error(err.response.data.error))
    },
    cancelEdit(property) {
      this.editInputs[property] = this.wordInfo[property]
      this.toggleEdit(property)
    },
    getPlaceHolder(str) {
      return `${str} ${this.wordInfo.word.toLowerCase()}`
    }
  },
  mounted() {
    this.getWordInfo()
  }
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

#word {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.container {
  width: 100%;
  height: 100%;
  padding: 3rem;
  background-color: var(--white);
  text-align: left;
}

.title {
  font-size: 2em;
  text-align: left;
  padding-left: 1em;
  padding-bottom: 0.5em;
  border-bottom: 2px solid var(--gray);
}

.attribute-container {
  margin-top: 1.5em;
  padding-left: 2em;
  display: flex;
  flex-direction: column;
}

.attribute-container .attribute {
  display: flex;
}

.attribute-container .attribute p {
  padding-right: 0.25em;
}

.edit-container {
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.edit-container #editIcon {
  width: 20px;
  height: 20px;
}

.attribute-container p,
.attribute-container label {
  font-size: 1.25em;
}

.attribute-container input {
  padding: 0.25em 0.5em;
  width: 50%;
  font-size: 1em;
}

.edit-definition {
  display: flex;
}

.confirm-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 0.5em;
  cursor: pointer;
}

#notes {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  padding: 0.25em 0.5em;
  font-size: 1em;
}

.edit-notes {
  display: flex;
  align-items: flex-start;
}

.conjugation-container {
  width: 100%;
  height: 400px;
  background-color: #e0e0e0;
  margin-top: 1.5rem;
  padding: 0 2rem;
}

.table-title {
  width: 100%;
  text-align: center;
  padding-top: 2rem;
  font-size: 1.5em;
}

.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2em;
  margin-top: 1em;
}

table {
  border-style: hidden;
  border-collapse: collapse;
  width: 75%;
}

td {
  padding: 0.75rem;
  border: 2px solid black;
  min-width: 200px;
  text-align: center;
}

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 15%;
  margin: 1rem;
}

.tableChange {
  width: 2.25rem;
  height: 2.25rem;
  background: var(--white);
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
</style>
