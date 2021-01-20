<template>
  <div class="sidebar">
    <a href="#">Home</a>
    <hr>
    <div class="pageLinks">
      <a href="#">Flash Cards</a>
      <a href="#">Learn</a>
      <a href="#">Game</a>
      <a href="#">Pronunciation</a>
    </div>
    <hr>
    <a href="#">Friends</a>
    <div class="friendLink"> 
      <span>
        <a href="#" v-for="friend in friends" :key="friend.id">
          {{ friend.pic }}
          {{ friend.name }}
        </a>
        <a href="#">View All Friends</a>
      </span>
    </div>
    <div id="ppLink">
      <a href="#">Privacy Policy</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['friends'],
  name: "Sidebar"
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  text-align: left;
  height: calc(100% - 50px);
  width: 240px;
  position: fixed;
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
</style>
