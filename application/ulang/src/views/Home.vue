<template>
  <div class="home">
    <div class="quickStart">  
      <h1>Quick Start</h1>
      <div class="row">
        <div class="cardColumn">
          <SetCard />
        </div>
        <div class="cardColumn">
          <QuickStartCard />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h1>Recent Activity</h1>
        <QuickStartCard />
        <QuickStartCard />
        <QuickStartCard />
      </div>
      <div class="column">
        <h1>Recent Sets</h1>
        <SetCard />
        <SetCard />
        <SetCard />
      </div>
    </div>
  </div>
</template>

<script>
import QuickStartCard from '@/components/QuickStartCard.vue'
import SetCard from '@/components/SetCard.vue'

export default {
  name: 'Home',
  components: {
    QuickStartCard,
    SetCard
  }
}
</script>

<style scoped>
.quickStart {
  text-align: left;
}

.row {
  display: flex;
  text-align: left;
}

.cardColumn {
  flex: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.column {
  flex: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.home {
  width: 100%;
  overflow-y: auto;
}

h1 {
  text-decoration: underline;
  padding: 20px 0px 20px 50px;
  align-self: start;
}
</style>
