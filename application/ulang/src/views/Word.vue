<template>
  <div id="word">
    <div class="container">
      <p class="title">
        {{ wordInfo.word }} – {{ wordInfo.english }} ({{
          wordInfo.partOfSpeech
        }})
      </p>
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
          <input
            type="text"
            name="def"
            id="def"
            v-model="editInputs.definition"
          />
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
          <textarea
            name="notes"
            id="notes"
            cols="50"
            rows="5"
            v-model="editInputs.notes"
            :placeholder="getPlaceHolder('Notes about')"
          ></textarea>
          <span class="confirm-container" @click="cancelEdit('notes')">
            <Cancel />
          </span>
          <span class="confirm-container" @click="confirmEdit('notes')">
            <Confirm />
          </span>
        </span>
      </div>
      <div v-if="wordInfo.conjugations.length" class="conjugation-container">
        <div class="table-title">
          <p v-if="!editBools.conjugation">
            {{ wordInfo.conjugations[conjugationIndex].title }}
          </p>
          <input
            type="text"
            name="title"
            id="title"
            v-if="editBools.conjugation"
            v-model="editInputs.conjugations[conjugationIndex].title"
          />
        </div>
        <span @click="toggleEdit('conjugation')" id="conjugationEdit">
          <Edit />
        </span>
        <div class="table">
          <table>
            <tr>
              <td>
                <p v-if="!editBools.conjugation">
                  {{ wordInfo.conjugations[conjugationIndex].tl }}
                </p>
                <input
                  type="text"
                  name="tl"
                  id="tl"
                  v-if="editBools.conjugation"
                  v-model="editInputs.conjugations[conjugationIndex].tl"
                />
              </td>
              <td>
                <p v-if="!editBools.conjugation">
                  {{ wordInfo.conjugations[conjugationIndex].tr }}
                </p>
                <input
                  type="text"
                  name="tr"
                  id="tr"
                  v-if="editBools.conjugation"
                  v-model="editInputs.conjugations[conjugationIndex].tr"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p v-if="!editBools.conjugation">
                  {{ wordInfo.conjugations[conjugationIndex].ml }}
                </p>
                <input
                  type="text"
                  name="ml"
                  id="ml"
                  v-if="editBools.conjugation"
                  v-model="editInputs.conjugations[conjugationIndex].ml"
                />
              </td>
              <td>
                <p v-if="!editBools.conjugation">
                  {{ wordInfo.conjugations[conjugationIndex].mr }}
                </p>
                <input
                  type="text"
                  name="mr"
                  id="mr"
                  v-if="editBools.conjugation"
                  v-model="editInputs.conjugations[conjugationIndex].mr"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p v-if="!editBools.conjugation">
                  {{ wordInfo.conjugations[conjugationIndex].bl }}
                </p>
                <input
                  type="text"
                  name="bl"
                  id="bl"
                  v-if="editBools.conjugation"
                  v-model="editInputs.conjugations[conjugationIndex].bl"
                />
              </td>
              <td>
                <p v-if="!editBools.conjugation">
                  {{ wordInfo.conjugations[conjugationIndex].br }}
                </p>
                <input
                  type="text"
                  name="br"
                  id="br"
                  v-if="editBools.conjugation"
                  v-model="editInputs.conjugations[conjugationIndex].br"
                />
              </td>
            </tr>
          </table>

          <div v-if="!editBools.conjugation" class="nav">
            <div class="tableChange" @click="backClick">
              <img src="@/assets/pngs/Vector.png" alt="previous" />
            </div>
            <!-- TODO: When next clicked when there are no more tables, add another -->
            <div class="tableChange" @click="nextClick">
              <img
                src="@/assets/pngs/Vector.png"
                alt="next"
                style="transform: rotate(180deg);"
              />
            </div>
          </div>
          <div v-if="editBools.conjugation" class="nav">
            <span
              class="confirm-container conjugation-edit-icon"
              @click="cancelConjugationEdit"
            >
              <Cancel :height="32" :width="32" />
            </span>
            <span
              class="confirm-container conjugation-edit-icon"
              @click="confirmConjugationEdit"
            >
              <Confirm :height="36" :width="36" />
            </span>
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
import {
  getWordById,
  updateWord,
  updateConjugation,
} from '@/services/wordService'

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
        conjugations: [],
      },
      editBools: {
        definition: false,
        notes: false,
        conjugation: false,
      },
      // These are what is being edited but if the edit is cancelled, the original is maintained
      editInputs: {
        word: '',
        english: '',
        partOfSpeech: '',
        notes: '',
        definition: '',
        conjugations: [],
      },
      conjugationIndex: 0,
    }
  },
  methods: {
    getWordInfo() {
      getWordById(this.id)
        .then((res) => {
          ;[
            'word',
            'english',
            'partOfSpeech',
            'description',
            'notes',
            'definition',
          ].forEach((info) => {
            if (res.word[info]) {
              this.wordInfo[info] = res.word[info]
              this.editInputs[info] = res.word[info]
            }
          })
          this.wordInfo.conjugations = res.conjugations || null
          this.editInputs.conjugations = res.conjugations
        })
        .catch((err) => {
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
        .catch((err) => console.error(err.response.data.error))
    },
    cancelEdit(property) {
      this.editInputs[property] = this.wordInfo[property]
      this.toggleEdit(property)
    },
    confirmConjugationEdit() {
      updateConjugation(
        this.wordInfo.conjugations[this.conjugationIndex]._id,
        this.editInputs.conjugations[this.conjugationIndex]
      )
        .then(() => {
          this.wordInfo.conjugations[
            this.conjugationIndex
          ] = this.editInputs.conjugations[this.conjugationIndex]
          this.toggleEdit('conjugation')
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    cancelConjugationEdit() {
      this.editInputs.conjugations[
        this.conjugationIndex
      ] = this.wordInfo.conjugations[this.conjugationIndex]
      this.toggleEdit('conjugation')
    },
    getPlaceHolder(str) {
      return `${str} ${this.wordInfo.word.toLowerCase()}`
    },
    backClick() {
      if (this.wordInfo.conjugations - 1 >= 0) {
        this.conjugationIndex--
      }
    },
    nextClick() {
      if (this.conjugationIndex + 1 < this.wordInfo.conjugations.length) {
        this.conjugationIndex++
      } else {
        // Switch into edit mode and add a new table
        // this.toggleEdit('conjugation')
        // this.conjugationIndex++
      }
    },
  },
  mounted() {
    this.getWordInfo()
  },
}
</script>

<style scoped>
@import '../assets/styles/utils.css';

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
  font-size: 2.25em;
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
  font-size: 1.5em;
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
  position: relative;
}

.table-title {
  width: 100%;
  text-align: center;
  padding-top: 2rem;
}

.table-title p {
  font-size: 1.5em;
  margin-bottom: 2rem;
}

.table-title input {
  padding: 0.25rem 0.5rem;
  font-size: 1.25rem;
  margin-bottom: 1.55rem;
}

#conjugationEdit {
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 2rem; */
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

.table p {
  font-size: 2em;
}

.table input {
  padding: 0.25rem 0.5rem;
  font-size: 1.35rem;
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

.conjugation-edit-icon #confirmIcon > svg {
  width: 32px;
  height: 32px;
}
</style>
