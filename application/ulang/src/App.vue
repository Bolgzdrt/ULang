<template>
  <div id="app">
    <Navbar />
    <section class="main-container">
      <Sidebar v-if="userId" />
      <router-view class="defaultPage" :key="$route.fullPath" />
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    userId() {
      return this.$store.getters['auth/getUserId']
    }
  }
}
</script>

<style>
@import "assets/styles/utils.css";

#app {
  font-family: 'Roboto', 'Avenir', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--default-font);
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-container {
  margin-top: 50px;
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
}

.defaultPage {
  background-color: #eee;
  width: 100%;
  height: 100%;
}
</style>
