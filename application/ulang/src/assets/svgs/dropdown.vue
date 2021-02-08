<template>
  <svg width="32" :height="height || 32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.782 11.8L15 17.582L9.21803 11.8C8.82803 11.41 8.19403 11.41 7.80403 11.8C7.41403 12.19 7.41403 12.824 7.80403 13.214L14.29 19.7C14.486 19.896 14.742 19.992 15 19.992C15.258 19.992 15.514 19.896 15.71 19.7L22.196 13.214C22.586 12.824 22.586 12.19 22.196 11.8C21.806 11.41 21.172 11.41 20.782 11.8Z" fill="white"/>
  </svg>
</template>

<script>
export default {
  name: 'dropdown',
  props: ['height']
}
</script>

<style scoped>

</style>
