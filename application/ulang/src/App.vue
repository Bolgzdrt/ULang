<template>
  <div id="app">
    <Navbar />
    <Sidebar v-bind:friends="friends"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      // friends place holder
      friends: [
        { name: 'Joe Schmo', pic: 'JS' },
        { name: 'Name Name', pic: 'NN' },
        { name: 'Place Holder', pic: 'PH' }
      ]
    }
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
  width: 100vw;
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
