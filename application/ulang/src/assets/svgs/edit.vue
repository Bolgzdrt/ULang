<template>
  <div id="editIcon">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">
      <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z"/>
      <path d="M0 0h18v18H0z" fill="none"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'edit'
}
</script>

<style scoped>
#editIcon {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
