<template>
  <div id="confirmIcon">
    <svg xmlns="http://www.w3.org/2000/svg" :height="height" :width="width" viewBox="0 0 512 512">
      <path
        d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    height: {
      type: Number,
      required: false,
      default: 28,
    },
    width: {
      type: Number,
      required: false,
      default: 28,
    }
  }
}
</script>

<style scoped>
@import "../styles/utils.css";

#confirmIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

svg {
  fill: #55AE3A;
}
</style>
