<template>
  <div class="flashCards">
    <div class="set">
      <div class="name">Set Name</div>
      <div class="progress">Progress: # / ##</div>
    </div>
    <div class="card">
      <div>omlette</div>
    </div>
    <div class="nav">
      <div class="cardChange leftButton"><img src="@/assets/pngs/Vector.png" alt="previous"></div>
      Click to flip
      <div class="cardChange rightButton"><img src="@/assets/pngs/Vector.png" alt="next" style="transform: rotate(180deg);"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FlashCards'
}
</script>

<style scoped>
.flashCards {
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #FFFFFF;
  border-radius: 10px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  border: 2px solid #CCCCCC;
  font-size: 16px;
  font-size: 4vw;
  height: 50%;
  width: 50%;
}

.name {
  font-size: 16px;
  font-size: 4vw;
}

.progress {
  font-size: 16px;
  font-size: 2vw;
}

.nav {
  font-size: 16px;
  font-size: 2vw;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cardChange {
  width: 50px;
  height: 50px;
  background: #FFFFFF;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.cardChange:hover {
  transform: scale(1.1);
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
}

.leftButton {
  margin-right: 20px;
}

.rightButton {
  margin-left: 20px;
}
</style>
