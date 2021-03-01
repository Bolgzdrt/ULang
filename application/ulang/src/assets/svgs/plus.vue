<template>
  <div id="plus-container" @click="onAddClick">
    <div id="outside-click-element" v-click-outside="hideDropdown">
      <svg
        id="plus"
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.0703 18.75H21.25V12.9297C21.25 12.2422 20.6875 11.6797 20 11.6797C19.3125 11.6797 18.75 12.2422 18.75 12.9297V18.75H12.9297C12.2422 18.75 11.6797 19.2188 11.6797 20C11.6797 20.7812 12.2656 21.25 12.9297 21.25H18.75V27.0703C18.75 27.8125 19.2969 28.3203 20 28.3203C20.7031 28.3203 21.25 27.7578 21.25 27.0703V21.25H27.0703C27.7578 21.25 28.3203 20.6875 28.3203 20C28.3203 19.3125 27.7578 18.75 27.0703 18.75Z"
          fill="white"
        />
        <path
          d="M20 5.9375C23.7578 5.9375 27.2891 7.39844 29.9453 10.0547C32.6016 12.7109 34.0625 16.2422 34.0625 20C34.0625 23.7578 32.6016 27.2891 29.9453 29.9453C27.2891 32.6016 23.7578 34.0625 20 34.0625C16.2422 34.0625 12.7109 32.6016 10.0547 29.9453C7.39844 27.2891 5.9375 23.7578 5.9375 20C5.9375 16.2422 7.39844 12.7109 10.0547 10.0547C12.7109 7.39844 16.2422 5.9375 20 5.9375ZM20 3.75C11.0234 3.75 3.75 11.0234 3.75 20C3.75 28.9766 11.0234 36.25 20 36.25C28.9766 36.25 36.25 28.9766 36.25 20C36.25 11.0234 28.9766 3.75 20 3.75Z"
          fill="white"
        />
      </svg>
      <div class="nav-drop-down" v-if="clicked">
        <div @click="navigate('CreateWord')"><p>New Word</p></div>
        <div @click="navigate('CreateSet')"><p>New Set</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'plus',
  data() {
    return {
      clicked: false
    }
  },
  methods: {
    onAddClick() {
      this.clicked = !this.clicked
    },
    hideDropdown() {
      this.clicked = false
    },
    navigate(to) {
      this.$router.push({ name: to }, () => {})
    }
  }
}
</script>

<style scoped>
@import '../styles/utils.css';

#plus-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  height: 100%;
}

#outside-click-element {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-drop-down {
  position: absolute;
  bottom: -75px;
  right: 0;
  width: 150px; /* Possibly make this 200 when the SVGs are in */
  height: 75px;
  border: 1px solid black;
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}

.nav-drop-down div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5em;
}

.nav-drop-down div:hover {
  background: #ccc;
}

.nav-drop-down p {
  width: 100%;
  text-align: left;
  text-decoration: none;
  font-size: 1.15rem;
}

.nav-drop-down div:not(:last-of-type) {
  border-bottom: 1px solid var(--gray);
}
</style>
