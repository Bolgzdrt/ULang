<template>
  <div class="home">
    <div class="quickStart" v-if="hasRecentList">  
      <h1>Recent Activity</h1>
      <div class="recentActRow">
        <div class="recentCard" v-for="act in recentActivity" :key="act._id">
          <QuickStartCard
            :setId="act.setId"
            :event="act.event"
            :eventSetting="act.setting"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h1>Quick Access</h1>
        <div class="quickCard" v-for="set in quickAccessList" :key="set._id">
          <SetCard :set="set" />
        </div>
        <div class="infoCard" v-if="!hasQuickAccess">
          Sets selected for quick access will appear here. From the user profile pages, click the lightning bolt icon to add the set to your quick access list.
        </div>
      </div>
      <div class="column">
        <h1>Recently Created Sets</h1>
        <div class="quickCard" v-for="set in recentSetList" :key="set._id">
          <SetCard :set="set" />
        </div>
        <div class="infoCard" v-if="!hasSetList">
          <p>You do not have any created sets.</p>
          <div class="buttonBox">
            <button class="submitButton" @click="createSet">Create a Set</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuickStartCard from '@/components/QuickStartCard.vue'
import SetCard from '@/components/SetCard.vue'
import { getQuickSets } from '@/services/userService'
import { getMostRecentSets } from '@/services/setService'
import { mapGetters } from 'vuex'
import { getRecentList } from '@/utils/utils'

export default {
  name: 'Home',
  components: {
    QuickStartCard,
    SetCard,
  },
  data() {
    return {
      quickAccessList: [],
      recentSetList: [],
      recentActivity: [],
      hasRecentList: false,
      hasQuickAccess: false,
      hasSetList: false
    }
  },
  methods: {
    ...mapGetters('settings', ['getLanguage']),
    ...mapGetters('auth', ['getUserId']),
    retrieveInfo(tryNumber) {
      const userId = this.getUserId()
      const language = this.getLanguage()
      if (tryNumber > 3) {
        console.log('took too long')
        return
      }
      if (userId && language) {
        getQuickSets(userId, language)
          .then(({ sets }) => {
            this.quickAccessList = sets
            if(this.quickAccessList.length > 0) {
              this.hasQuickAccess = true
            }
          })
          .catch((err) => {
            console.error(err.response.data.error)
          })
        getMostRecentSets(userId, this.getLanguage())
          .then(({ sets }) => {
            this.recentSetList = sets
            if(this.recentSetList.length > 0) {
              this.hasSetList = true
            }
          })
          .catch((err) => {
            console.error(err.response.data.error)
          })
      } else {
        setTimeout(() => this.retrieveInfo(++tryNumber), 1000)
      }
    },
    createSet() {
      this.$router.push({ name: 'CreateSet' })
    }
  },
  mounted() {
    this.retrieveInfo(1)
    this.recentActivity = getRecentList()
    if(this.recentActivity.length > 0) {
      this.hasRecentList = true
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

.quickStart {
  text-align: left;
}

.row {
  display: flex;
  text-align: left;
}

.recentActRow {
  display: flex;
  flex-wrap: wrap;
  flex-basis: 50%;
  justify-content: center;
}

.recentCard {
  display: flex;
  justify-content: center;
  width: 50%;
}

.cardColumn {
  flex: 50%;
  display: flex;
  flex-direction: column;
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

.infoCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  width: 16em;
  height: 10em;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  background: white;
  text-align: center;
  margin: 20px 5px 20px 5px;
  padding: 15px;
  font-size: 1.5em;
}

button {
  height: 43px;
  width: 145px;
  border-radius: 5px;
  font-size: 0.8em;
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
