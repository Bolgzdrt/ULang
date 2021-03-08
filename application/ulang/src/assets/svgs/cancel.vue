<template>
  <div id="cancelIcon">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 60 60"
    >
      <path
        d="M36.726 30.002l11.43 11.43c0.742 0.742 0.742 1.948 0 2.691l-4.033 4.033c-0.743 0.742-1.946 0.742-2.691 0l-11.432-11.43-11.432 11.43c-0.743 0.742-1.946 0.742-2.689 0l-4.035-4.033c-0.742-0.743-0.742-1.946 0-2.691l11.432-11.43-11.432-11.432c-0.742-0.743-0.742-1.948 0-2.691l4.037-4.033c0.743-0.742 1.946-0.742 2.689 0l11.43 11.432 11.432-11.432c0.742-0.742 1.946-0.742 2.691 0l4.033 4.035c0.742 0.743 0.742 1.946 0 2.691l-11.43 11.43z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'cancel',
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
  },
}
</script>

<style scoped>
@import "../styles/utils.css";

#cancelIcon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

svg {
  fill: var(--accent-red);
}
</style>
