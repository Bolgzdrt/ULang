<template>
  <div class="flashSetting">
    <div class="box">
      <p class="titleP">Learn Vocabulary</p>
      <div class="field">
        <p>Select Set:</p>
        <FilterSelect :options="sets" @selected="setSelect" />
      </div>
      <div class="buttonBox">
        <router-link :to="{ name: 'Learn', params: { id: this.setSelection } }"><button class="submitButton">Start</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FilterSelect from '@/components/FilterSelect'
import { mapGetters } from 'vuex'
import { getSets } from '@/services/setService'

export default {
  name: 'LearnSettings',
  components: { FilterSelect },
  data() {
    return {
      setSelection: '',
      sets: [],
      fromRoute: ''
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
    setSelect(value) {
      this.setSelection = value
    }
  },
  created() {
    getSets(this.getUserId(), "fr").then(({sets}) => {
      this.sets = sets
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from
    })
  }
}
</script>

<style scoped>
.flashSetting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  height: 35em;
  width: 50em;
}

.titleP {
  font-size: 3em;
}

.field {
  font-size: 2em;
}

.selectDrop {
  height: 100px;
}

.field > select {
  width: 60%;
  border: 2px solid #000000;
  background-color: transparent;
  font-size: 1em;
  outline: none;
  border-radius: 5px;
}

.field > select:hover {
  cursor: pointer;
}

.buttonBox {
  margin-top: 20px;
}

button {
  height: 43px;
  width: 145px;
  border-radius: 5px;
  font-size: 120%;
  transition: 0.1s;
  outline: none;
  border: none;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.3));
}
button:hover {
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
  cursor: pointer;
}

.submitButton {
  background: var(--purple);
  color: white;
}

.submitButton:hover {
  background: #5b49d0;
}
</style>