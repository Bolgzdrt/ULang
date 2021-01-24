<template>
  <img :src="image" :alt="country">
</template>

<script>
export default {
  name: "FlagIcon",
  props: ['image', 'country']
}
</script>

<style scoped>
img {
  width: 75px;
  height: 75px;
}
</style>
