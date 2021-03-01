<template>
  <nav v-bind:class="getClass()">
    <span @click="logoClick" id="logo-container">
      <Logo id="logo" />
      <UserSearch />
    </span>
    <div v-if="userId" class="nav-items">
      <Plus />
      <LanguageSelector />
      <div @click="onNameClick" :class="{ 'name-clicked': clicked }" id="user-container">
        <span id="outside-element-click" v-click-outside="hideDropdown">
          <NameCircle :initials="initials" />
          <div class="nav-drop-down" v-if="clicked">
            <router-link :to="{ name: 'Profile', params: { id: userId } }">
              Profile
            </router-link>
            <router-link :to="{ name: 'Settings' }">Settings</router-link>
            <p @click="triggerLogout">Logout</p>
          </div>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '@/assets/svgs/logo.vue'
import Plus from '@/assets/svgs/plus.vue'
import NameCircle from '@/components/NameCircle.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import UserSearch from '@/components/UserSearch.vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getInitials } from '@/utils/utils'

export default {
  name: 'Navbar',
  components: {
    Plus,
    NameCircle,
    Logo,
    LanguageSelector,
    UserSearch,
  },
  data() {
    return {
      clicked: false,
    }
  },
  computed: {
    userId() {
      return this.getUserId()
    },
    initials() {
      return getInitials(this.getUserInfo())
    }
  },
  methods: {
    ...mapMutations('auth', ['logout']),
    ...mapActions('auth', ['getUserInfo']),
    ...mapGetters('auth', ['getUserInfo', 'getUserId']),
    getClass() {
      return {
        'logged-in-nav': this.userId,
        'logged-out-nav': !this.userId
      }
    },
    isClicked() {
      console.log('isclicked')
      return {
        'name-clicked': this.clicked
      }
    },
    onNameClick(e) {
      this.clicked = !this.clicked
    },
    triggerLogout() {
      this.logout()
      this.$router.push({ name: 'Welcome' })
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
    },
    hideDropdown() {
      this.clicked = false
    }
  },
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#logo {
  height: 100%;
  cursor: pointer;
}

#outside-element-click {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 0 3px;
}

.name-clicked {
  border-left: 1px solid var(--black);
  border-right: 1px solid var(--black);
  padding: 0 2px !important;
}

.nav-drop-down {
  position: absolute;
  bottom: -99px;
  right: -1px;
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
  font-size: 1.15rem;
  text-align: left;
  text-decoration: none;
  color: #2c3e50;
  padding: 0 0.5em;
}

.nav-drop-down a {
  border-bottom: 1px solid var(--gray);
}
</style>
