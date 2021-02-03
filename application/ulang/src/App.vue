<template>
  <div id="app">
    <Navbar :userId="userId" @logout="() => userId = ''" />
    <div class="main-container">
      <Sidebar v-if="userId" :friends="friends" />
      <router-view class="defaultPage" :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { mapGetters } from 'vuex'

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
      ],
      userId: 'sadf'
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserId'])
  // },
  // updated() {
  //   if (!['Welcome', 'Login', 'Signup'].includes(this.$route.name)) {
  //     this.userId = this.getUserId()
  //   }
  // },
  // mounted() {
  //   this.userId = this.getUserId()
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Avenir, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
