<template>
  <div class="sidebar">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <hr>
    <div class="pageLinks">
      <router-link :to="{ name: 'FlashCardsSettings' }">Flash Cards</router-link>
      <router-link :to="{ name: 'LearnSettings' }">Vocabulary</router-link>
      <router-link :to="{ name: 'ConjugationSettings' }">Conjugations</router-link>
      <router-link :to="{ name: 'PronunciationsSettings' }">Pronunciations</router-link>
    </div>
    <hr>
    <div class="pageLinks">
      <router-link :to="{ name: 'Profile', params: { id: userId } }">Profile</router-link>
      <router-link :to="{ name: 'CreateSet' }">New Set</router-link>
      <router-link :to="{ name: 'CreateWord' }">New Word</router-link>
    </div>
    <hr>
    <p id="friends">Friends</p>
    <div class="friendLink"> 
        <router-link :to="{ name: 'Profile', params: { id: following._id } }" v-for="following in followedUsers" :key="following.id">
          <div class="user">
            <NameCircle :initials="following.pic" />
            <div class="name">{{ following.name }}</div>
          </div>
        </router-link>
        <!-- Commenting out for now and just making the list scroll but can make a friends list page later -->
        <!-- <a href="#" class="viewAll">View All Friends</a> -->
    </div>
    <div id="ppLink">
      <router-link :to="{ name: 'PrivacyPolicy' }">Privacy Policy</router-link>
    </div>
  </div>
</template>

<script>
import NameCircle from '@/components/NameCircle.vue'
import { mapGetters } from 'vuex'
import { getFollowingInfo } from '@/services/userService'
import { getInitials, getName } from '@/utils/utils'

export default {
  name: "Sidebar",
  components: {
    NameCircle
  },
  data() {
    return {
      followedUsers: [
        { name: '', pic: '', _id: `1` },
      ]
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
  },
  computed: {
    userId() {
      return this.getUserId()
    }
  },
  mounted() {
    getFollowingInfo(this.getUserId())
      .then(({ following }) => {
        this.followedUsers = following.map(user => {
          return {
            pic: getInitials(user),
            name: getName(user),
            _id: user._id
          }
        })
      })
      .catch(err => {
        console.error(err.response.data.error)
      })
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  text-align: left;
  height: 100%;
  width: 240px;
  min-width: 240px;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  box-shadow: 4px 0px 8px rgb(0, 0, 0, 0.5);
  font-size: 22px;
  padding-top: 40px;
}

#friends {
  margin: 6px 8px 6px 48px;
}

a {
  margin: 10px 8px 10px 48px;
  text-decoration: none;
  color: black;
  display: block;
}

a:hover {
  color: #9e9e9e;
}

.friendLink{
  font-size: 18px;
  overflow-y: auto;
  margin-bottom: 3rem;
}

hr {
  width: 80%;
  align-self: center;
  margin: 20px 0px;
}

#ppLink {
  position: absolute;
  bottom: 18px;
  color: #999999;
  text-decoration: underline;
  font-size: 16px;
  margin: 0px;
  text-align: center;
  width: 100%;
}

#ppLink a{
  color: #999999;
  text-decoration: underline;
  font-size: 16px;
  margin: 0px;
  text-align: center;
}

.circle {
  background: #bfdbf7;
  color: black !important;
}

.user {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  padding-left: 10px;
}

.viewAll {
  margin-top: 20px;
}
</style>
