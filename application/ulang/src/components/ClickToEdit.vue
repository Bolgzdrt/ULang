<template>
  <div>
    <input type="text"
           v-if="edit"
           :value="valueLocal"
           v-on:blur="onBlurOrEnter"
           v-on:keyup="onKeyup"
           v-on:keyup.enter="onBlurOrEnter"
             />
        <p v-else @click="edit = true;">
          {{valueLocal}}
        </p>
    </div>
</template>

<script>
  export default {
  name: "ClickToEdit",
  props: ['value'],

  data () {
  return {
      edit: false,
      valueLocal: this.value
    }
  },

  watch: {
    value: function() {
      console.log
      this.valueLocal = this.value;
    }
  },

  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },

  methods: {
    onBlurOrEnter(event){
      this.valueLocal = event.target.value;
      this.edit = false; 
      this.$emit('input', this.valueLocal);
    },
    onKeyup(event){
      this.valueLocal = event.target.value; 
    }
  }

}
</script>

<style scoped>
input{
  border: none;
  font-size: inherit;
  color: inherit;
}
</style>