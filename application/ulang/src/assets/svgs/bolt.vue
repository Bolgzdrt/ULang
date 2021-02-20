<template>
  <div class="quickAccessBolt">
    <svg id="hollow" v-if="!selected" width="42" height="57" viewBox="0 0 42 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 19.5L28.75 4.5H14.124L5.5 27H15.17L9.626 42.376L32.5 19.502L23 19.5ZM9.796 30.75H0.25L11.5 0.75H34L28.374 15.75H41.5L0.25 57L9.796 30.75Z" fill="#FAFF00"/>
    </svg>
    <svg id="filled" v-if="selected" width="42" height="57" viewBox="0 0 42 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.796 30.75H0.25L11.5 0.75H34L28.374 15.75H41.5L0.25 57L9.796 30.75Z" fill="#FAFF00"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'bolt',
  props: ['selected']
}
</script>

<style scoped>
.quickAccessBolt {
  display: flex;
  align-items: center;
}

#hollow, #filled {
  height: 2em;
  width: 2em;
}

path {
  stroke: #646464;
  stroke-width: 2px;
  stroke-linejoin: round;
}
</style>
