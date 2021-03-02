<template>
  <div id="userSearch">
    <div id="searchContainer">
      <div class="searchButton">
        <Search />
      </div>
      <input
        type="text"
        class="search"
        placeholder="Search for users"
        v-model="query"
        @focus="() => { focused = true }"
        @blur="() => { focused = false }"
      />
      <div v-if="focused" class="backdrop">
        <div class="results-container">
          <ul class="results-list">
            <li class="result" v-for="result in results" :key="result._id">
              {{ formatResult(result) }}
              <span v-if="result.firstName || result.lastName">({{ result.username }})</span>
            </li>
          </ul>
        </div>
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
        resultStr += `lastName`
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
  width: 100vw;
  max-width: 300px;
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
  border: none;
  border-radius: 0 20px 20px 0;
  padding: 0.25em;
  font-size: 1em;
  font-family: 'Roboto', 'Avenir', Arial, sans-serif;
  outline: none;
}

.searchButton {
  width: 40px;
  height: 100%;
  background-color: var(--white);
  border-radius: 20px 0 0 20px;
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

.backdrop {
  width: 104%;
  padding-top: 45px;
  position: absolute;
  top: -5px;
  right: -2%;
  background: #fff;
  border-radius: 18px;
  z-index: -1;
}

.results-container {
  width: 100%;
  max-height: 300px;
  background-color: var(--white);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.3);
}

.results-list {
  width: 100%;
  height: 100%;
  text-align: left;
  padding-bottom: 0.5em;
  padding-top: 0.25em;
}

.result {
  list-style: none;
  line-height: 1.5em;
  font-size: 1.25em;
  padding: 0 0.5em;
  cursor: pointer;
  border-radius: 20px;
  margin: 0 0.25em;
}

.result:hover {
  background: var(--gray);
}

.result:not(:last-of-type) {
  margin-bottom: 0.25em;
}

.result span {
  font-size: 0.75em;
}
</style>
