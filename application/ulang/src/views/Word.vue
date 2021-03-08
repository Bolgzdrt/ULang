<template>
  <div id="word">
    <div class="container">
      <p class="title">{{ wordInfo.word }} – {{ wordInfo.english }} ({{ wordInfo.partOfSpeech }})</p>
      <div v-if="wordInfo.definition && !editBools.definition" class="definition-container">
        <span class="definition">
          <p>Definition</p>
          <span class="editContainer" @click="toggleEdit('definition')">
            <Edit />
          </span>
        </span>
        <p>{{ wordInfo.definition }}</p>
      </div>
      <div v-else-if="!editBools.definition" class="definition-container">
        <span class="definition">
          <p>Definition</p>
          <span class="editContainer" @click="toggleEdit('definition')">
            <Edit />
          </span>
        </span>
      </div>
      <div v-if="editBools.definition" class="definition-container">
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
      },
      // These are what is being edited but if the edit is cancelled, the original is maintained
      editInputs: {
        word: '',
        english: '',
        partOfSpeech: '',
        notes: '',
        definition: '',
      },
      conjugations: []
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
        .catch(err => console.log(err.response.data.error))
    },
    cancelEdit(property) {
      this.editInputs[property] = this.wordInfo[property]
      this.toggleEdit(property)
    },
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

.definition-container {
  margin-top: 1.5em;
  padding-left: 2em;
  display: flex;
  flex-direction: column;
}

.definition-container .definition {
  display: flex;
}

.definition-container .definition p {
  padding-right: 0.25em;
}

.editContainer {
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editContainer #editIcon {
  width: 20px;
  height: 20px;
}

.definition-container p,
.definition-container label {
  font-size: 1.25em;
}

.definition-container input {
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
</style>
