<template>
  <div class="flashSetting">
    <div class="box">
      <p class="titleP">Practice Conjugations</p>
      <div class="field">
        <p>Select Set:</p>
        <FilterSelect :options="sets" @selected="setSelect" />
        <p class="error" v-if="selectErr">Please select a set</p>
      </div>
      <div class="buttonBox">
        <button class="submitButton" @click="startClick">Start</button>
      </div>
    </div>
  </div>
</template>

<script>
import FilterSelect from '@/components/FilterSelect'
import { mapGetters } from 'vuex'
import { getSetsWithVerbs } from '@/services/setService'
import { updateRecentList } from "@/utils/utils"

export default {
  name: 'ConjugationSettings',
  components: { FilterSelect },
  data() {
    return {
      setSelection: '',
      selectErr: false,
      sets: [],
      fromRoute: ''
    }
  },
  methods: {
    ...mapGetters('settings', ['getLanguage']),
    ...mapGetters('auth', ['getUserId']),
    setSelect(value) {
      this.setSelection = value
    },
    startClick() {
      if (!this.setSelection) {
        this.selectErr = true
      } else {
        updateRecentList("Conjugations", this.setSelection)
        this.$router.push({ name: 'Conjugation', params: { id: this.setSelection } })
      }
    }
  },
  created() {
    getSetsWithVerbs(this.getUserId(), this.getLanguage()).then(({sets}) => {
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

.error {
  color: red;
}

.selectDrop {
  height: 100px;
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