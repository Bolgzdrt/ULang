<template>
  <div class="actionCard" @click="selectCard">
   <div>
     {{ eventName }}
   </div>
   <hr>
   <div>
     {{ setName }}
   </div>
  </div>
</template>

<script>
import { getSetById } from '@/services/setService'
import { updateRecentList } from "@/utils/utils"

export default {
  name: "QuickStartCard",
  props: ['setId', 'event', 'eventSetting'],
  data() {
    return {
      eventName: 'event',
      setName: 'name',
      eventRoute: ''
    }
  },
  methods: {
    // redirects to the corresponding page listed on the card
    selectCard() {
      if (this.eventRoute === "FlashCards") {
        updateRecentList(this.event, this.setId, this.eventSetting)
        this.$router.push({ name: this.eventRoute, params: { id: this.setId, setting: this.eventSetting } })
      } else {
        updateRecentList(this.event, this.setId, this.eventSetting)
        this.$router.push({ name: this.eventRoute, params: { id: this.setId } })
      }
    }
  },
  created() {
    getSetById(this.setId).then(({set}) => {
      this.setName = set.name
    })
    if (this.event === "Flash Cards") {
      this.eventName = "Flash Cards"
      this.eventRoute = "FlashCards"
    } else if (this.event === "Conjugations") {
      this.eventName = "Conjugations"
      this.eventRoute = "Conjugation"
    } else if (this.event === "Vocabulary") {
      this.eventName = "Vocabulary"
      this.eventRoute = "Learn"
    } else {
      this.eventName = "Pronunciations"
      this.eventRoute = "Pronunciations"
    }
  }
}
</script>

<style scoped>
.actionCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 16em;
  height: 7em;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  background: white;
  text-align: center;
  margin: 20px 5px 20px 5px;
  cursor: pointer;
}

.actionCard:hover {
  background-color: #d8d8d8;
}

hr {
  width: 80%;
  margin: 20px 0px 20px 0px;
}

div {
  font-size: 26px;
}
</style>
