<template>
  <nav>
    <!-- temp -->
    <h1>Ulang</h1>
    <div class="nav-items">
      <!-- add plus png -->
      <Plus />
      <!-- add down arrow. Probably also a component using state -->
      <div>🇫🇷</div>
      <!-- temp add generated innitials component -->
      <div>CJ</div>
    </div>
  </nav>
</template>

<script>
import Plus from '@/assets/svgs/plus.vue'
export default {
  name: "Navbar",
  components: {
    Plus
  }
}
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  background: #7666D8;
  padding: 0 2vw;
}

nav h1 {
  color: #fff;
}

nav .nav-items {
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
