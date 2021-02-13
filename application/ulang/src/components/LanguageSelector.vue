<template>
  <div id="lang-selector">
    <div class="lang-container" @click="dropdownClick">
      <div id="outside-click-element" v-click-outside="hideDropdown">
        <FlagSVGs :language="languageCodes[primaryLanguage]" height="16" />
        <div class="dropdown_arrow">
          <DropDown height="50" />
          <div class="lang-selector-dropdown" v-if="dropdownClicked">
            <!-- Languages and flags and stuff -->
            <div class="languages-list">
              <div
                class="language-item"
                @click="clickedLang(lang)"
                v-for="(lang, index) in studiedLanguages"
                :key="index"
              >
                <FlagSVGs :language="lang" height="16" />
                <span>
                  {{ lang.charAt(0).toUpperCase() + lang.slice(1) }}
                </span>
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
import { languageCodes } from '@/utils/utils'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LanguageSelector',
  components: { DropDown, FlagSVGs },
  data() {
    return {
      flag: '',
      language: '',
      dropdownClicked: false,
      studiedLanguages: [],
      primaryLanguage: 'fr',
      languageCodes
    }
  },
  methods: {
    dropdownClick() {
      this.dropdownClicked = !this.dropdownClicked
    },
    hideDropdown() {
      this.dropdownClicked = false
    },
    clickedLang(lang) {
      console.log(lang)
    },
    ...mapActions('settings', ['getUserLanguages']),
    ...mapGetters('auth', ['getUserInfo'])
  },
  created() {
    // Get languages studyed
    // TEMP
    this.studiedLanguages = ['french', 'spanish']
    this.getUserLanguages(this.getUserInfo()?.userId)
      .then((res) => {
        this.studiedLanguages = res.languages.map(lang => languageCodes[lang])
        this.primaryLanguage = res.primaryLanguage
      })
      .catch((err) => console.error(err))
  }
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
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.languages-list .language-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.25rem;
  border-bottom: 1px solid var(--gray);
  width: 100%;
  height: 100%;
  padding: 0.5rem 0 0.5rem 1rem;
}

.languages-list span {
  margin-left: 0.75rem;
}

.language-item:last-of-type {
  border-bottom: none;
}
</style>
