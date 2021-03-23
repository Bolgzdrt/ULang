<template>
  <div id="lang-selector">
    <div class="lang-container" @click="dropdownClick">
      <div id="outside-click-element" v-click-outside="hideDropdown">
        <FlagSVGs :language="language" height="16" />
        <div class="dropdown_arrow">
          <DropDown height="50" />
          <div class="lang-selector-dropdown" v-if="dropdownClicked">
            <!-- Languages and flags and stuff -->
            <div class="languages-list">
              <div
                class="language-item-container"
                @click="clickedLang(lang)"
                v-for="(lang, index) in languages"
                :key="index"
              >
                <div class="language-item">
                  <FlagSVGs :language="lang" height="16" />
                  <span>
                    {{ lang }}
                  </span>
                </div>
              </div>
              <div class="language-item-container" @click="newLanguage">
                <div class="language-item no-border add-language">
                  <svg
                    id="plus"
                    width="30"
                    height="30"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0703 18.75H21.25V12.9297C21.25 12.2422 20.6875 11.6797 20 11.6797C19.3125 11.6797 18.75 12.2422 18.75 12.9297V18.75H12.9297C12.2422 18.75 11.6797 19.2188 11.6797 20C11.6797 20.7812 12.2656 21.25 12.9297 21.25H18.75V27.0703C18.75 27.8125 19.2969 28.3203 20 28.3203C20.7031 28.3203 21.25 27.7578 21.25 27.0703V21.25H27.0703C27.7578 21.25 28.3203 20.6875 28.3203 20C28.3203 19.3125 27.7578 18.75 27.0703 18.75Z"
                      fill="#ccc"
                    />
                    <path
                      d="M20 5.9375C23.7578 5.9375 27.2891 7.39844 29.9453 10.0547C32.6016 12.7109 34.0625 16.2422 34.0625 20C34.0625 23.7578 32.6016 27.2891 29.9453 29.9453C27.2891 32.6016 23.7578 34.0625 20 34.0625C16.2422 34.0625 12.7109 32.6016 10.0547 29.9453C7.39844 27.2891 5.9375 23.7578 5.9375 20C5.9375 16.2422 7.39844 12.7109 10.0547 10.0547C12.7109 7.39844 16.2422 5.9375 20 5.9375ZM20 3.75C11.0234 3.75 3.75 11.0234 3.75 20C3.75 28.9766 11.0234 36.25 20 36.25C28.9766 36.25 36.25 28.9766 36.25 20C36.25 11.0234 28.9766 3.75 20 3.75Z"
                      fill="#ccc"
                    />
                  </svg>
                  <span>Add Language</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDown from '@/assets/svgs/dropdown.vue'
import FlagSVGs from '@/assets/svgs/flags/flagSVGs.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LanguageSelector',
  components: { DropDown, FlagSVGs },
  data() {
    return {
      flag: '',
      dropdownClicked: false,
      // studiedLanguages: [],
      // currentLanguage: 'french'
    }
  },
  computed: {
    language() {
      return this.$store.state.settings.language
    },
    languages() {
      return this.$store.state.settings.studiedLanguages
    }
  },
  methods: {
    ...mapActions('settings', ['getUserLanguages']),
    ...mapMutations('settings', ['setLanguage']),
    ...mapGetters('auth', ['getUserInfo']),
    ...mapGetters('settings', ['getLanguage', 'getLanguages']),
    dropdownClick() {
      this.dropdownClicked = !this.dropdownClicked
    },
    hideDropdown() {
      this.dropdownClicked = false
    },
    clickedLang(lang) {
      this.currentLanguage = lang
      this.setLanguage(lang)
      this.$emit('setLanguage')
    },
    getBorderClass(index) {
      return index === this.languages.length - 1
        ? 'language-item no-border'
        : 'language-item'
    },
    newLanguage() {
      this.$router.push({ name: 'AddLanguage' })
    }
  },
  created() {
    // TODO: See if this can be moved to App.vue or somewhere else just to initialize this data
    this.getUserLanguages(this.getUserInfo()?.userId)
      .then(() => {/* Got the languages to use in the computed properties */})
      .catch((err) => console.error(err))
  },
}
</script>

<style scoped>
@import '../assets/styles/utils.css';

#lang-selector {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.lang-container {
  height: 100%;
  cursor: pointer;
}

#outside-click-element {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown_arrow {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lang-selector-dropdown {
  position: absolute;
  top: 50px;
  right: 0px;
  width: 200px;
  background: var(--white);
  border: 1px solid var(--black);
  display: flex;
  justify-content: center;
}

.languages-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.language-item-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.language-item-container:hover {
  background-color: #e0e0e0;
}

.languages-list .language-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.25rem;
  border-bottom: 1px solid var(--gray);
  width: 90%;
  height: 100%;
  padding: 0.5rem 0 0.5rem 1rem;
}

.languages-list span {
  margin-left: 0.75rem;
  text-transform: capitalize;
}

.no-border {
  border: none !important;
}

.add-language {
  padding-left: calc(1rem - 5px) !important;
}

.add-language span {
  font-size: 1.1rem;
  margin-left: 0.5rem;
}
</style>
