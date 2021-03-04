<template>
  <div class="createSet">
    <div class="box">
      <AddSet :fromRoute="fromRoute" />
    </div>
  </div>
</template>

<script>
import AddSet from '@/components/AddSet.vue'

export default {
  name: 'CreateSet',
  components: { AddSet },
  data() {
    return {
      fromRoute: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from
    })
  }
}
</script>

<style scoped>
.createSet {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2%;
}

.box {
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  height: 100%;
}
</style>
