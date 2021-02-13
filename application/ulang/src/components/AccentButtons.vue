<template>
  <div class="accentButtons">
    <div v-for="(char, index) in displayed" :key="index" @click="$emit('buttonClicked', char)">
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
      french: ['á', 'â', 'æ', 'ç', 'è', 'ê', 'ë', 'ï', 'î', 'ô', 'œ', 'ù', 'û', 'ü', 'ÿ'],
      spanish: ['á', 'é', 'í', 'ñ', 'ó', 'ú', 'ü'],
      portuguese: ['ã', 'á', 'à', 'â', 'ç', 'é', 'ê', 'í', 'õ', 'ó', 'ô', 'ú', 'ü'],
      italian: ['à', 'è', 'é', 'ì', 'ò', 'ó', 'ù'],
      german: ['ä', 'ö', 'ü', 'ß'],
      romanian: ['ă', 'â', 'î', 'ș', 'ş', 'ț', 'ţ'],
      swedish: ['ä', 'å', 'é', 'ö'],
      displayed: []
    }
  },
  created() {
    if (this.language === "FR") {
      this.displayed = this.french
    } else if (this.language === "ES") {
      this.displayed = this.spanish
    } else if (this.language === "PT") {
      this.displayed = this.portuguese
    } else if (this.language === "IT") {
      this.displayed = this.italian
    } else if (this.language === "DE") {
      this.displayed = this.german
    } else if (this.language === "RO") {
      this.displayed = this.romanian
    } else if (this.language === "SV") {
      this.displayed = this.swedish
    } else {
      this.displayed = []
    }
  }
}
</script>

<style scoped>
.accentButtons {
  display: flex;
  flex-direction: row;
}

div {
  margin-right: 1%;
}

p {
  background: var(--gray);
  border-radius: 5px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  cursor: pointer;
}
</style>
