<template>
  <div class="actionCard">
    <div class="name">
     "set name"
   </div>
   <hr>
   <div class="desc">
     "set description"
   </div>
  </div>
</template>

<script>
export default {
  name: "SetCard"
}
</script>

<style scoped>
.actionCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  width: 400px;
  height: 200px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  border: 2px solid #CCCCCC;
  background: white;
  text-align: center;
  margin: 20px 5px 20px 5px;
}

hr {
  width: 80%;
  margin: 20px 0px 20px 0px;
}

div {
  font-size: 26px;
}

.desc {
  font-size: 18px;
}

.name {
  padding-top: 20px;
}
</style>
