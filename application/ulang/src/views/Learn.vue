<template>
  <div class="learn">
    <BackButton />
    <SetProg v-bind:curr="index + 1" v-bind:total="total" v-bind:setName="setName" />
    <InputCard />
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import SetProg from '@/components/SetProg.vue'
import InputCard from '@/components/InputCard.vue'

export default {
  name: 'Learn',
  components: { BackButton, SetProg, InputCard },
  data() {
    return {
      words: [
        { english: 'helmet', translation: 'casque' },
        { english: 'egg', translation: 'oeuf' },
        { english: 'diamond', translation: 'diamant' },
        { english: 'dog', translation: 'chienne/chien' }
      ],
      setName: 'Random Set',
      index: 0,
      total: 0
    }
  },
  methods: {
    
  },
  created: function(){
    this.total = this.words.length;
  }
}
</script>

<style scoped>
.learn {
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
