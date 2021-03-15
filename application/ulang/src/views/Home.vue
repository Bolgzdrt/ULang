<template>
  <div class="home">
    <div class="quickStart">  
      <h1>Recent Activity</h1>
      <div class="recentActRow">
        <div class="recentCard" v-for="act in recentActivity" :key="act._id">
          <QuickStartCard :setId="act.setId" :event="act.event" :eventSetting="act.setting" />
        </div>
        <!-- <div class="cardColumn">
          <QuickStartCard :setId="recentActivity[3].setId" :event="recentActivity[3].event" :eventSetting="recentActivity[3].setting" />
          <QuickStartCard :setId="recentActivity[1].setId" :event="recentActivity[1].event" :eventSetting="recentActivity[1].setting" />
        </div>
        <div class="cardColumn">
          <QuickStartCard :setId="recentActivity[2].setId" :event="recentActivity[2].event" :eventSetting="recentActivity[2].setting" />
          <QuickStartCard :setId="recentActivity[0].setId" :event="recentActivity[0].event" :eventSetting="recentActivity[0].setting" />
        </div> -->
      </div>
    </div>
    <div class="row">
      <div class="column">
        <h1>Quick Access</h1>
        <div class="quickCard" v-for="set in quickAccessList" :key="set._id">
          <SetCard :set="set" />
        </div>
      </div>
      <div class="column">
        <h1>Recently Created Sets</h1>
        <div class="quickCard" v-for="set in recentSetList" :key="set._id">
          <SetCard :set="set" />
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
import { getRecentList } from "@/utils/utils"


export default {
  name: 'Home',
  components: {
    QuickStartCard,
    SetCard
  },
  data() {
    return {
      quickAccessList: [],
      recentSetList: [],
      recentActivity: []
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
          })
          .catch((err) => {
            console.error(err.response.data.error)
          })
        getMostRecentSets(userId, this.getLanguage())
          .then(({ sets }) => {
            this.recentSetList = sets
          })
          .catch((err) => {
            console.error(err.response.data.error)
          })
      } else {
        setTimeout(() => this.retrieveInfo(++tryNumber), 1000)
      }
    }
  },
  mounted() {
    this.retrieveInfo(1)
    this.recentActivity = getRecentList()
  }
}
</script>

<style scoped>
@import '../assets/styles/utils.css';

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
</style>
