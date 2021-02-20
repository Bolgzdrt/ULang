<template>
  <div class="sidebar">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <hr>
    <div class="pageLinks">
      <router-link :to="{ name: 'FlashCards' }">Flash Cards</router-link>
      <router-link :to="{ name: 'Vocabulary' }">Vocabulary</router-link>
      <router-link :to="{ name: 'Conjugations' }">Conjugations</router-link>
      <router-link :to="{ name: 'Pronunciations' }">Pronunciations</router-link>
    </div>
    <hr>
    <div class="pageLinks">
      <router-link :to="{ name: 'CreateSet' }">New Set</router-link>
      <router-link :to="{ name: 'CreateWord' }">New Word</router-link>
    </div>
    <hr>
    <a href="#">Friends</a>
    <div class="friendLink"> 
        <a href="#" v-for="friend in friends" :key="friend.id">
          <div class="user">
            <NameCircle :initials="friend.pic" />
            <div class="name">{{ friend.name }}</div>
          </div>
        </a>
        <a href="#" class="viewAll">View All Friends</a>
    </div>
    <div id="ppLink">
      <a href="#">Privacy Policy</a>
    </div>
  </div>
</template>

<script>
import NameCircle from '@/components/NameCircle.vue'

export default {
  name: "Sidebar",
  props: ['friends'],
  components: {
    NameCircle
  },
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  text-align: left;
  height: 100%;
  width: 240px;
  min-width: 240px;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  box-shadow: 4px 0px 8px rgb(0, 0, 0, 0.5);
  font-size: 22px;
  padding-top: 40px;
}

a {
  margin: 6px 8px 6px 48px;
  text-decoration: none;
  color: black;
  display: block;
}

a:hover {
  color: #9e9e9e;
}

.friendLink{
  font-size: 18px;
}

hr {
  width: 80%;
  align-self: center;
  margin: 20px 0px 20px 0px;
}

#ppLink {
  position: absolute;
  bottom: 18px;
  color: #999999;
  text-decoration: underline;
  font-size: 16px;
  margin: 0px 0px 0px 0px;
  text-align: center;
  width: 100%;
}

#ppLink a{
  color: #999999;
  text-decoration: underline;
  font-size: 16px;
  margin: 0px 0px 0px 0px;
  text-align: center;
}

.circle {
  background: #bfdbf7;
  color: black !important;
}

.user {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  padding-left: 10px;
}

.viewAll {
  margin-top: 20px;
}
</style>
