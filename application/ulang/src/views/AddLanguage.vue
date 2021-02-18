<template>
  <div id="add-language">
    <div class="add-language-container">
      <h1>Add Language</h1>
      <div class="language-selection-container">
        <!-- Why this is neeeded.. I do not know. But, unless it is loaded before the svg, the swedish flag alone will not appear on firefox. And only the Swedish flag. -->
        <Sweden height="0" style="display: none;" />
        <div :class="getLanguageClass(lang)" v-for="lang in languages" :key="lang.language" @click="radioButton(lang)">
          <div v-if="lang.existingLang" class="checkmark">
            <Checkmark />
          </div>
          <FlagSVGs :language="lang.language" height="54" />
          <p>{{ lang.language }}</p>
        </div>
      </div>
      <div class="buttons">
        <button class="btn cancel" @click="exit">Cancel</button>
        <button class="btn confirm" @click="confirm" :disabled="!langSelected">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
import FlagSVGs from '@/assets/svgs/flags/flagSVGs.vue'
import Sweden from '@/assets/svgs/flags/sweden.vue'
import Checkmark from '@/assets/svgs/checkmark.vue'
import { languageIds, languageCodes } from '@/utils/utils'
import { mapActions } from 'vuex'

export default {
  name: 'AddLanguage',
  components: { FlagSVGs, Sweden, Checkmark },
  data() {
    return {
      languages: [],
      langSelected: false,
      existingLangs: [],
      fromRoute: '',
    }
  },
  methods: {
    ...mapActions('settings', ['getUserLanguages']),
    radioButton({ language, selected }) {
      this.langSelected = true
      if (selected) {
        this.languages.forEach(lang => {
          if (lang.selected) {
            lang.selected = false
          }
        })
        this.langSelected = false
        return
      }

      this.languages.forEach(lang => {
        if (lang.selected) {
          lang.selected = false
        }
        if (lang.language === language) {
          lang.selected = true
        }
      })
    },
    getLanguageClass(lang) {
      return lang.selected
        ? 'language selected'
        : 'language'
    },
    confirm() {
      console.log('confirm')
    },
    exit() {
      if (this.fromRoute) {
        this.$router.push(this.fromRoute, () => { this.$router.push({ name: 'Home' })})
      } else {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from
    })
  },
  created() {
    this.getUserLanguages(this.$store.getters['auth/getUserId'])
      .then((res) => {
        // TODO: Change this when I get rid of the language ids
        this.languages = languageIds.map(lang => {
          return {
            language: languageCodes[lang],
            selected: false,
            existingLang: res.languages.includes(lang)
          }
        })
      })
      .catch(err => console.error(err))
  }
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
  position: relative;
  width: 15%;
  min-width: 150px;
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gray);
  border-bottom-width: 3px;
  border-radius: 10px;
  margin: 0 1rem 2rem 1rem;
  cursor: pointer;
}

.language p {
  margin-top: 0.75rem;
  font-size: 1.25rem;
  text-transform: capitalize;
}

.checkmark {
  position: absolute;
  top: 8px;
  right: 8px;
}

.buttons {
  width: 100%;
}

.btn {
  width: 17%;
  padding: 0.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  margin: 0 0.5rem;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.3));
  transition: 0.1s;
  cursor: pointer;
}

.btn:hover {
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
}

.cancel {
  background: #eee;
}

.confirm {
  background: var(--purple);
  color: var(--white);
}

.confirm:disabled {
  background-color: #8f86cf;
  cursor: auto;
}

.selected {
  background-color: rgb(188, 236, 255);
}
</style>
