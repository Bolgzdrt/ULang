<template>
  <div class="backButton" @click="back">
    <Back />
    <div>Back to settings</div>
  </div>
</template>

<script>
import Back from '@/assets/svgs/back.vue'

export default {
  name: 'BackButton',
  components: { Back },
  props: ['fromRoute'],
  methods: {
    back() {
      if (this.fromRoute) {
        this.$router.push(this.fromRoute)
      } else  {
        this.$router.push({name: "Home"})
      }
    }
  }
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
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.backButton div {
  padding-left: 6px;
}
</style>
