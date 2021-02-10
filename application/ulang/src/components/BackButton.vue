<template>
  <div class="backButton">
    <Back />
    <div>Back to sets</div>
  </div>
</template>

<script>
import Back from '@/assets/svgs/back.vue'

export default {
  name: 'BackButton',
  components: { Back }
}
</script>

<style scoped>
.backButton {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 70px;
  left: 260px;
  font-size: 28px;
  cursor: pointer;
}

.backButton div {
  padding-left: 6px;
}
</style>
