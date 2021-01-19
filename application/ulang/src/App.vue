<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  /* import Roboto font from Google */
  font-family: /* Roboto, */ Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  /* I don't know if these work, but these are most of the main colors for the app */
  /* --purple: #7666D8;
  --white: #fff;
  --accent-red: #ff6663;
  --yellow: #faff00;
  --gray: #ccc; */
}
</style>
