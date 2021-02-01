<template>
  <div class="setProgress">
    <div class="name">{{ setName }}</div>
    <div class="progress">Progress: {{ curr }} / {{ total }}</div>
  </div>
</template>

<script>
export default {
  name: 'SetProgress',
  props: ['curr', 'total', 'setName']
}
</script>

<style scoped>
.setProgress {
  padding-top: 100px;
}

.name {
  font-size: 16px;
  font-size: 4vw;
}

.progress {
  font-size: 16px;
  font-size: 2vw;
}
</style>