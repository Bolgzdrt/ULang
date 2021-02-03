<template>
  <div class="accentButtons">
    <div v-for="(char, index) in accents" :key="index" @click="$emit('buttonClicked', char)">
      <p>{{ char }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccentButtons",
  props: ['language'],
  data() {
    return {
      // accents: [{lower:'á', upper:'Á'}, 'é', 'í', 'ñ', 'ó', 'ú', 'ü', 'ù', 'û', 'ÿ', 'à', 'â', 'æ', 'ç', 'è', 'ê', 'ë', 'ï', 'î', 'ô', 'œ', 'ä', 'ö', 'ß', 'ì', 'ò', 'ã', 'õ', '¿', '¡']
      accents: ['á', 'é', 'í', 'ñ', 'ó', 'ú', 'ü', 'ù', 'û', 'ÿ', 'à', 'â', 'æ', 'ç', 'è', 'ê', 'ë', 'ï', 'î', 'ô', 'œ', 'ä', 'ö', 'ß', 'ì', 'ò', 'ã', 'õ', '¿', '¡']
    }
  }
}
</script>

<style scoped>
.accentButtons {
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 30%;
}

p {
  background: var(--gray);
  border-radius: 5px;
  height: 30px;
  width: 30px;
  line-height: 30px;
}


</style>
