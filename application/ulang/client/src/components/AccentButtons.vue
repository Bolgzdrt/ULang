<template>
  <div class="accentButtons">
    <div @click="shiftButton"><p class="shift">{{ this.shiftCont[this.shiftToggle] }}</p></div>
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
      french: {
        lower: ['á', 'â', 'æ', 'ç', 'é', 'è', 'ê', 'ë', 'ï', 'î', 'ô', 'œ', 'ù', 'û', 'ü', 'ÿ'],
        upper: ['À', 'Â', 'Æ', 'Ç', 'É', 'È', 'Ê', 'Ë', 'Ï', 'Î', 'Ô', 'Œ', 'Ù', 'Û', 'Ü', 'Ÿ']
      },
      spanish: {
        lower: ['á', 'é', 'í', 'ñ', 'ó', 'ú', 'ü'],
        upper: ['Á', 'É', 'Í', 'Ñ', 'Ó', 'Ú', 'Ü']
      },
      portuguese: {
        lower: ['ã', 'á', 'à', 'â', 'ç', 'é', 'ê', 'í', 'õ', 'ó', 'ô', 'ú', 'ü'],
        upper: ['Ã', 'Á', 'À', 'Â', 'Ç', 'É', 'Ê', 'Í', 'Õ', 'Ó', 'Ô', 'Ú', 'Ü']
      },
      italian: {
        lower: ['à', 'è', 'é', 'ì', 'ò', 'ó', 'ù'],
        upper: ['À', 'È', 'É', 'Ì', 'Ò', 'Ó', 'Ù']
      },
      german: {
        lower: ['ä', 'ö', 'ü', 'ß'],
        upper: ['Ä', 'Ö', 'Ü', 'ẞ']
      },
      romanian: {
        lower: ['ă', 'â', 'î', 'ș', 'ş', 'ț', 'ţ'],
        upper: ['Ă', 'Â', 'Î', 'Ș', 'Ş', 'Ț', 'Ţ']
      },
      swedish: {
        lower: ['ä', 'å', 'é', 'ö'],
        upper: ['Ä', 'Å', 'É', 'Ö']
      },
      displayed: [],
      shiftToggle: "lower",
      shiftCont: {
        lower: '⇧',
        upper: '⇩'
      }
    }
  },
  methods: {
    shiftButton() {
      if (this.shiftToggle == "lower") {
        this.shiftToggle = "upper"
      } else {
        this.shiftToggle = "lower"
      }
      this.displayed = this["french"/* this.language */][this.shiftToggle]
    }
  },
  created() {
    // this.displayed = this[this.language].lower
    this.displayed = this['french'].lower
  }
}
</script>

<style scoped>
.accentButtons {
  display: flex;
  flex-direction: row;
}

.accentButtons > div {
  margin-right: 1%;
}

p {
  background: #e0e0e0;
  border-radius: 5px;
  height: 1.5em;
  width: 1.5em;
  line-height: 1.7em;
  cursor: pointer;
  -webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;
}

.shift {
  line-height: 1.5;
}
</style>
