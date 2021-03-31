<template>
  <div class="body">
    <div class="container">
      <div class="input-box" v-click-outside="hideSelection">
        <input type="text" @click="showSelection" @input="filterList" v-model="filter">
        <i class="arrow down"></i>
      </div>
      <div class="optionList" v-if="setList">
        <p class="option" v-for="option in slimList" v-bind:value="option._id" :key="option._id" @click="setSelect(option)">{{ option.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSelect',
  props: ['options'],
  data() {
    return {
      filter: '',
      setList: false,
      slimList: []
    }
  },
  methods: {
    // filters set list based on entered characters in input field
    filterList() {
      if (!this.filter) {
        this.slimList = this.options
        return
      }
      this.slimList = this.options.filter(set => set.name.toLowerCase().includes(this.filter.toLowerCase()))
    },
    // sets set as selected when clicked in drop down
    setSelect(set) {
      this.$emit('selected', set._id)
      this.filter = set.name
      this.setList = false
    },
    // displays set list when input field is clicked
    showSelection() {
      this.setList = true
      this.filter = ''
      this.filterList()
    },
    // hides set list when unfocused or set selected
    hideSelection(){
      this.setList = false
    }
  },
  created() {
    this.slimList = this.options
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

input {
  margin-top: 5px;
  width: 20em;
  border: 0px solid #000000;
  border-bottom-width: 1px;
  background-color: transparent;
  font-size: 100%;
  outline: none;
  text-align: center;
  height: 1.5em;
}

.optionList {
  position: absolute;
  width: 20em;
  height: fit-content;
  max-height: 8em;
  border: 1px solid black;
  background: var(--white);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  z-index: 1;
  top: 1.6em;
}

select:hover, .option:hover {
  cursor: pointer;
}

.option:hover {
  background-color: #f1f1f1;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
  padding-right: 31px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  z-index: -1;
  position: absolute;
  float: right;
  right: 2.7em;
  top: 1em;
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>