<template>
  <div id="userSearch">
    <div id="searchContainer">
      <input
        type="text"
        class="search"
        placeholder="Search for users"
        v-model="query"
        @focus="() => { focused = true }"
        @blur="() => { focused = false }"
      />
      <div class="searchButton">
        <Search />
      </div>
      <div v-if="focused" class="results-container">
        <ul :class="{ 'results-list': true, 'border': results.length }">
          <li class="result" v-for="result in results" :key="result._id">
            {{ formatResult(result) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import Search from '@/assets/svgs/search.vue'
import { searchNames } from '@/services/userService'

export default {
  name: 'UserSearch',
  components: {
    Search
  },
  data() {
    return {
      query: '',
      results: [],
      focused: false,
    }
  },
  watch: {
    query: debounce(function () {
      this.search()
    }, 1000)
  },
  methods: {
    search() {
      searchNames(this.query)
        .then((res) => {
          this.results = res.users
        })
        .catch((err) => console.error(err))
    },
    formatResult(res) {
      const { username, firstName, lastName } = res
      let resultStr = ''
      if (firstName) {
        resultStr += firstName
        if (lastName) {
          resultStr += ` ${lastName}`
        }
      } else if (lastName) {
        resultStr += lastName
      } else {
        // username required for an account so this is the fallback
        resultStr += username
      }
      return resultStr
    },
  }
}
</script>

<style scoped>
@import '../assets/styles/utils.css';

#userSearch {
  width: 40vw;
  max-width: 400px;
  min-width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
}

#searchContainer {
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.search {
  width: 100%;
  height: 100%;
  border: 1px inset var(--black);
  border-right: none;
  padding: 0.25em;
  font-size: 1em;
  font-family: 'Roboto', 'Avenir', Arial, sans-serif;
}

.searchButton {
  width: 40px;
  height: 100%;
  cursor: pointer;
  background-color: var(--white);
  border: 1px inset var(--black);
  border-left: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.searchButton #searchIcon {
  height: 1.5em;
  width: 1.5em;
  fill: var(--default-font);
  stroke: var(--default-font);
}

.results-container {
  width: 100%;
  max-height: 300px;
  background-color: var(--white);
  position: absolute;
  top: 100%;
  right: 0;
}

.border {
  border: 1px inset var(--black);
}

.results-list {
  width: 100%;
  height: 100%;
  text-align: left;
}

.result {
  list-style: none;
  line-height: 1.5em;
  font-size: 1.25em;
}
</style>
