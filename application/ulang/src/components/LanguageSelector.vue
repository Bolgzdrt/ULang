<template>
  <div id="lang-selector">
    <FlagSVGs language="french" height="16" />
  <div class="dropdown_arrow" @click="dropdownClick">
      <DropDown height="50" />
      <div class="lang-selector-dropdown" v-if="dropdownClicked">

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
      dropdownClicked: false
    }
  },
  methods: {
    dropdownClick() {
      this.dropdownClicked = !this.dropdownClicked
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

#lang-selector {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.dropdown_arrow {
  height: 100%;
  cursor: pointer;
  position: relative;
}

.lang-selector-dropdown {
  position: absolute;
  top: 50px;
  right: 0px;
  height: 50px;
  width: 150px;
  background: var(--white);
  border: 1px solid var(--black);
}
</style>
