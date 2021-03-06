<template>
  <div id="word">
    <div class="container">
      <h1>{{ wordInfo.word }}</h1>
    </div>
  </div>
</template>

<script>
import { getWordById } from '@/services/wordService'
export default {
  name: 'Word',
  props: ['id'],
  data() {
    return {
      wordInfo: {
        word: '',
        language: '',
        english: '',
        partOfSpeech: '',
        notes: '',
        definition: ''
      },
      conjugations: []
    }
  },
  methods: {
    getWordInfo() {
      getWordById(this.id).then(res => {
        ['word', 'english', 'partOfSpeech', 'description', 'notes'].forEach(info => {
          if (res.word[info]) {
            this.wordInfo[info] = res.word[info]
          }
        })
        this.conjugations = res.conjugations || null
      }).catch(err => {
        console.error(err.response.data.error)
      })
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
  background-color: var(--white);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
