<template>
  <svg 
  @click='toggle' 
  :fill="[isFilled ? 'var(--yellow)' : 'var(--white)']" 
  stroke="var(--yellow)" 
  viewBox="0 0 64 64" 
  xmlns="http://www.w3.org/2000/svg"
  >
  <polygon 
  points="22.88 9 18.27 35.45 27.48 35.45 22.88 55 44.73 27.4 34.38 27.4 43.58 9 22.88 9"
  />
  </svg>
</template>

<script>
export default {
  name: 'lightningbolt',
  props: {
    fill: Boolean,
  },
  data() {
    return {
      isFilled: false,
    };
  },
  methods: {
    toggle() {
      this.isFilled = !this.isFilled;
      /* TODO: Add call to like/dislike set */
    }
  }
}