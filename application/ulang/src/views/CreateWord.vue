<template>
  <div class="createWord">
    <div class="box">
      <AddWord />
    </div>
  </div>
</template>

<script>
import AddWord from '@/components/AddWord.vue'

export default {
  name: 'CreateWord',
  components: { AddWord }
}
</script>

<style scoped>
.createWord {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.box {
  margin: 2%;
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
}
</style>
