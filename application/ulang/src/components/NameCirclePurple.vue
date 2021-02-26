<template>
  <div class="circle">
    <p>{{ this.initials }}</p>
  </div>
</template>

<script>
export default {
  name: 'NameCirclePurple',
  props: ['initials']
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

/* TODO: Maybe look into slots or some other conditional styling for if this needs to be bigger or smaller */
.circle {
  background: var(--purple);
  color: var(--white);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle p {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
