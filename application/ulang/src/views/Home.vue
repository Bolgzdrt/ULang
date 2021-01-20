<template>
  <div class="home">
    <div class="quickStart">  
      <h1>Quick Start</h1>
      
    </div>
    <div class="row">
      <div class="column">
        <h1>Recent Activity</h1>
      </div>
      <div class="column">
        <h1>Recent Sets</h1>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>
.row {
  display: flex;
}

.column {
  flex: 50%;
}
</style>