<template>
  <div id="add-language">
    <div class="add-language-container">
      <h1>Add Language</h1>
      <div class="language-selection-container">
        <div class="language" v-for="lang in languages" :key="lang">
          <FlagSVGs :language="lang" height="54" />
          <p>{{ lang.charAt(0).toUpperCase() + lang.slice(1) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlagSVGs from '@/assets/svgs/flags/flagSVGs.vue'
import { languages } from '@/utils/utils'

export default {
  name: 'AddLanguage',
  components: { FlagSVGs },
  data() {
    return {
      languages
    }
  },
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

#add-language {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.add-language-container {
  width: 100%;
  height: 100%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

h1 {
  margin: 2rem 0;
  font-size: 2rem;
}

.language-selection-container {
  width: 80%;
  max-width: 80%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
}

.language {
  width: 15%;
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gray);
  border-bottom-width: 3px;
  border-radius: 10px;
  margin: 0 1rem 1rem 1rem;
  padding: 0 1.5rem;
  cursor: pointer;
}

.language p {
  margin-top: 0.75rem;
  font-size: 1.25rem;
}
</style>
