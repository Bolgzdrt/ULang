<template>
  <div class="inputCard">
     <div class="word">
      <p class="word">Word</p>
     </div>
    <hr>
    <div class="entry">
      <input type="text" placeholder="Translation">
      <button>Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputCard'
}
</script>

<style scoped>
.inputCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 70%;
  height: 70%;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  border: 2px solid #CCC;
  background: white;
  text-align: center;
  margin: 20px 5px 20px 5px;
  font-size: 20px;
}

hr {
  width: 80%;
  justify-self: center;
}

div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input {
  width: 50%;
  height: 15%;
  margin-bottom: 2%;
  text-align: center;
  font-size: 100%;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 25px;
}

button {
  height: 15%;
  width: 50%;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 25px;
  font-size: 100%;
  transition: 0.1s;
  box-shadow: 0 5px rgb(190, 190, 190);
}

button:hover {
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  background: var(--purple);
  cursor: pointer;
}

button:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.word {
  font-size: 200%;
}
</style>
