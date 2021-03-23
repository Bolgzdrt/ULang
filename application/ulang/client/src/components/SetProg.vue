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
.name {
  font-size: 3em;
}

.progress {
  font-size: 2em;
}
</style>