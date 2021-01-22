<template>
  <div id="welcome">
    <div class="content-container">
      <div class="menu">
        <p>Master a new language now.</p>
        <router-link id="signup" class="btn" :to="{ name: 'Signup' }">Get Started</router-link>
        <router-link :to="{ name: 'Login' }">Log In</router-link>
      </div>
      <div id="map" style="width: 40vw; height: 30vh; background: #000;"></div>
    </div>
    <div id="flags" style="width: 80%; height: 75px; background: #000;"></div>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
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
  justify-content: space-between;
  align-items: center;
  width: 85%;
}
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
