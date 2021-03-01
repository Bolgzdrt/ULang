<template>
  <div id="userSearch">
    <div id="searchContainer">
      <input type="text" class="search" placeholder="Search for users">
      <div class="searchButton">
        <Search />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/assets/svgs/search.vue'

export default {
  name: 'UserSearch',
  components: {
    Search
  }
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

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
}

.search {
  width: 100%;
  height: 100%;
  border: 1px inset black;
  border-right: none;
  padding: 0.25em;
  font-size: 1em;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
}

.searchButton {
  width: 40px;
  height: 100%;
  cursor: pointer;
  background: #fff;
  border: 1px inset black;
  border-left: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.searchButton #searchIcon {
  height: 24px;
  width: 24px;
  fill: #000;
  stroke: #000;
}
</style>
