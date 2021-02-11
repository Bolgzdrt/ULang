<template>
  <div id="lang-selector">
    <div class="lang-container" @click="dropdownClick">
      <FlagSVGs language="french" height="16" />
      <div class="dropdown_arrow">
        <DropDown height="50" />
        <div class="lang-selector-dropdown" v-if="dropdownClicked">
          <!-- Languages and flags and stuff -->
          <div class="languages-list">
            <div class="language-item" v-for="(lang, index) in studiedLanguages" :key="index">
              <FlagSVGs :language="lang" height="16" />
              <span>
                {{ lang.charAt(0).toUpperCase() + lang.slice(1)}}
              </span>
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

export default {
  name: 'LanguageSelector',
  components: { DropDown, FlagSVGs },
  data() {
    return {
      flag: '',
      language: '',
      dropdownClicked: false,
      studiedLanguages: []
    }
  },
  methods: {
    dropdownClick() {
      this.dropdownClicked = !this.dropdownClicked
    },
    hideDropdown() {
      this.dropdownClicked = false
    }
  },
  created() {
    // Get languages studyed
    // TEMP
    this.studiedLanguages = ['french', 'spanish']
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
  display: flex;
  cursor: pointer;
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
