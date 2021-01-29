<template>
  <nav v-bind:class="getClass()">
    <span @click="logoClick" id="logo-container">
      <Logo id="logo" />
    </span>
    <div v-if="userId" class="nav-items">
      <Plus />
      <!-- add down arrow. Also need to get SVGs for flags cus emojis don't work on windows 😑 -->
      <div>🇫🇷</div>
      <div @click="onNameClick" id="user-container">
        <NameCircle initials="CJ" />
        <div class="nav-drop-down" v-if="clicked">
          <router-link :to="{ name: 'Profile', params: { id: userId } }"
            >Profile</router-link
          >
          <router-link :to="{ name: 'Settings' }">Settings</router-link>
          <p @click="triggerLogout">Logout</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '@/assets/svgs/logo.vue'
import Plus from '@/assets/svgs/plus.vue'
import NameCircle from '@/components/NameCircle.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    Plus,
    NameCircle,
    Logo
  },
  props: ['userId'],
  data() {
    return {
      clicked: false
    }
  },
  methods: {
    ...mapMutations('auth', ['logout']),
    getClass() {
      return {
        'logged-in-nav': this.userId,
        'logged-out-nav': !this.userId
      }
    },
    onNameClick(e) {
      this.clicked = !this.clicked
    },
    triggerLogout() {
      this.logout()
      this.$router.push({ name: 'Welcome' })
      this.$emit('logout')
    },
    logoClick() {
      if (this.userId) {
        if (this.$route.name !== 'Home') {
          this.$router.push({ name: 'Home' })
        }
      } else {
        if (this.$route.name !== 'Welcome') {
          this.$router.push({ name: 'Welcome' })
        }
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/utils.css';
nav {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background: var(--purple);
  position: fixed;
  top: 0;
  z-index: 100;
}

#logo-container {
  height: 100%;
}

#logo {
  height: 100%;
  cursor: pointer;
}

.logged-out-nav {
  justify-content: center;
}

.logged-in-nav {
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2vw;
}

nav h1 {
  color: var(--white);
}

nav .nav-items {
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#user-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  height: 100%;
}

.nav-drop-down {
  position: absolute;
  bottom: -100px;
  right: 0px;
  width: 150px;
  height: 100px;
  border: 1px solid black;
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}

.nav-drop-down a:hover,
.nav-drop-down p:hover {
  background: #ccc;
}

.nav-drop-down a,
.nav-drop-down p {
  width: 100%;
  height: 100%;
  line-height: 2rem;
  font-size: 1rem;
  text-align: left;
  text-decoration: none;
  color: #2c3e50;
}
</style>
