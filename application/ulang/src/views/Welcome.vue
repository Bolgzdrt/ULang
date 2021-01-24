<template>
  <div id="welcome">
    <div class="content-container">
      <div class="menu">
        <p>Master a new language now.</p>
        <router-link id="signup" class="btn" :to="{ name: 'Signup' }">Get Started</router-link>
        <router-link :to="{ name: 'Login' }">Log In</router-link>
      </div>
      <div id="map">
        <World />
      </div>
    </div>
    <div id="flags">
      <span id="flag-container" v-for="(country, index) in countries" :key="index">
        <FlagIcon :src="require(`@/assets/pngs/flags_large/icons8-${country}-100.png`)" :alt="country" />
      </span>
    </div>
  </div>
</template>

<script>
import World from '@/assets/svgs/world.vue'
import FlagIcon from '@/components/FlagIcon.vue'

export default {
  name: 'Welcome',
  components: { World, FlagIcon },
  data() {
    return {
      countries: ['france', 'spain', 'germany', 'italy', 'portugal', 'switzerland', 'sweden', 'netherlands']
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

#welcome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.content-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 60%;
}

#map {
  height: 100%;
  width: 60%;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.menu p {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.menu a {
  text-decoration: none;
  color: #000;
  font-size: 1.1rem;
}

.btn {
  background: var(--purple);
  color: var(--white) !important;
  width: 50%;
  padding: 0.5rem;
  font-size: 1.25rem !important;
  border-radius: 50px;
  margin-bottom: 0.5rem;
}

#flags {
  width: 80%;
  height: 75px;
  display: flex;
  justify-content: space-between; 
}

#flag-container {
  margin: 0;
  padding: 0;
}
</style>
