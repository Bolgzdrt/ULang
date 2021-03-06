<template>
  <div id="word">
    <div class="container">

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
      word: {
        word: '',
        language: '',
        english: '',
        partOfSpeech: '',
        notes: '',
        definition: ''
      }
    }
  },
  methods: {
    async getWordInfo() {
      try {
        const res = await getWordById(this.id)
        console.log(res)
      } catch (err) {
        console.error(err.response.data.error)
      }
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
