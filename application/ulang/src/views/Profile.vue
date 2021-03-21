<template>
  <div class="profile">
    <div class="profile-content">
      <div class="user-banner">
        <div class="user-header">
          <NameCircle :initials="initials" />
          <h1 id="username-header" class="username-header">
            {{ username }}
          </h1>
        </div>
        <button class="btn followBtn" @click="followUser" v-if="id !== getUserId() && !following">
          Follow
        </button>
        <button class="btn unfollowBtn" @click="unfollowUser" v-else-if="id !== getUserId() && following">
          Unfollow
        </button>
      </div>
      <div class="set-list-and-header">
        <div class="set-list-header">
          <input
            class="filter"
            type="text"
            name="filter"
            id="filter"
            placeholder="Filter"
          />
          <div class="sort-drop-down">
            <label class="sort-label" for="sort">Sort</label>
            <select class="sort" name="sort" id="sort" @change="sortSets($event)" >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
          </div>
        </div>
        <div class="set-list">
          <ul id="list" class="list">
            <li v-for="set in sets" :key="set.name">
              <ProfileSetCard
                :setId="set._id"
                :ownerId="set.ownerId"
                :owner="set.ownerName"
                :setname="set.name"
                :numterms="set.words.length"
                :favorite="set.favorite"
                :quickAccess="set.quickAccess"
                @quickAccessToggle="quickAccessToggle"
                @favoriteToggle="favoriteToggle"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getSets } from '@/services/setService'
import { getUserInfo, followUser, unfollowUser, getFollowing, addQuickSet, removeQuickSet } from '@/services/userService'
import { getInitials, getName } from '@/utils/utils'
import Sidebar from '../components/Sidebar.vue'
import NameCircle from '@/components/NameCircle.vue'
import ProfileSetCard from '../components/ProfileSetCard.vue'
import { getQuickSets, addSet, removeSet } from '@/services/userService'

export default {
  name: 'Profile',
  components: {
    Sidebar,
    NameCircle,
    ProfileSetCard,
  },
  props: {
    id: String,
  },
  data() {
    return {
      sets: [],
      userId: '',
      username: '',
      userInfo: { username: '' },
      following: false,
      quickAccessList: [],
      userSets: []
    }
  },
  computed: {
    initials() {
      return getInitials(this.userInfo)
    },
  },
  methods: {
    ...mapGetters('auth', ['getUserInfo', 'getUserId']),
    ...mapGetters('settings', ['getLanguage']),
    followUser() {
      followUser(this.id, this.getUserId())
        .then(() => {
          this.following = true
        })
        .catch(err => {
          console.error(err.response.data.error)
        })
    },
    unfollowUser() {
      unfollowUser(this.id, this.getUserId())
        .then(() => {
          this.following = false
        })
        .catch(err => console.error(err.response.data.error))
    },
    quickAccessToggle(currId) {
      var index = this.sets.findIndex(x => x._id === currId)
      this.sets[index].quickAccess = !this.sets[index].quickAccess
      if (this.sets[index].quickAccess) {
        addQuickSet(this.getUserId(), currId)
      } else {
        removeQuickSet(this.getUserId(), currId)
      }
    },
    favoriteToggle(setId){
      console.log(setId)
      console.log(this.sets)
      var index = this.sets.findIndex(x => x._id === setId)
      if(this.sets[index].favorite){
        removeSet(this.getUserId(), setId)
        this.sets[index].favorite = false
      }else{
        addSet(this.getUserId(), setId)
        this.sets[index].favorite = true
      }
    },
    sortSets(event){
      console.log(event)
      var order = event.target.value
      switch(order){
        case "recent":
          this.sets.sort(function(a,b){
            if(a.updatedAt > b.updatedAt)
              return -1
            if(a.updatedAt < b.updatedAt)
              return 1
            return 0
          })
          break;
        case "oldest":
          this.sets.sort(function(a,b){
            if(a.updatedAt > b.updatedAt)
              return 1
            if(a.updatedAt < b.updatedAt)
              return -1
            return 0
          })
          break;
        case "az":
          this.sets.sort(function(a,b){
            if(a.name > b.name)
              return 1
            if(a.name < b.name)
              return -1
            return 0
          })
          break;
        case "za":this.sets.sort(function(a,b){
            if(a.name > b.name)
              return -1
            if(a.name < b.name)
              return 1
            return 0
          })
          break;
      }
    },
    filter(event){
      
    }
  },
  async mounted() {
    try {
      const { sets } = await getSets(this.id, this.getLanguage())
      if (this.id !== this.getUserId()) {
        try {
          this.userInfo = await getUserInfo(this.id)
          this.username = getName(this.userInfo)
          const { following } = await getFollowing(this.getUserId())
          if (following.length) {
            const match = following.filter(id => id === this.id)
            if (match.length) {
              this.following = true
            }
          }
        } catch (err) {
          console.error(err.response.data.error)
        }
      } else {
        this.userInfo = this.getUserInfo()
        this.username = getName(this.userInfo)
      }
      for (let set of sets) {
        if (set.ownerId === this.getUserId()) {
          set['ownerName'] = ''
          this.sets.push(set)
        } else {
          try {
            const res = await getUserInfo(set.ownerId)
            set['ownerName'] = getName(res)
            this.sets.push(set)
          } catch (err) {
            console.error(err.response.data.error)
          }
        }
      }
      if(this.getUserId() != this.id)
      {
      getSets(this.getUserId(), this.getLanguage())
          .then(({sets}) => {
            this.userSets = sets.map((set) => set._id)
            this.sets = this.sets.map((set) => {
              if(this.userSets.includes(set._id)) {
                return { ...set, favorite: true}
              } else {
                return { ...set, favorite: false}
              }
            })
          })
      }
      else{
        this.sets = this.sets.map((set) => {return {...set, favorite: true}})
      }
      getQuickSets(this.getUserId(), this.getLanguage())
          .then(({ sets }) => {
            this.quickAccessList = sets.map((set) => set._id)
            this.sets = this.sets.map((set) => {
              if(this.quickAccessList.includes(set._id)) {
                return { ...set, quickAccess: true}
              } else {
                return { ...set, quickAccess: false}
              }
            })
          })
          .catch((err) => {
            console.error(err.response.data.error)
          })
      this.sets.sort(function(a,b){
            if(a.updatedAt > b.updatedAt)
              return -1
            if(a.updatedAt < b.updatedAt)
              return 1
            return 0
          })
    } catch (err) {
      console.error(err)
    }
  },
}
</script>

<style scoped>
@import '../assets/styles/utils.css';

.profile {
  display: flex;
}

.profile-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.user-banner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: var(--white);
  padding: 3rem 0 3rem 5rem;
}

.user-header {
  display: flex;
  align-items: center;
}

.btn {
  padding: 0.5rem 2rem;
  outline: none;
  border: none;
  border-radius: 4px;
  margin-top: 0.5rem;
  margin-left: 7rem;
  font-size: 1.25rem;
  cursor: pointer;
}

.followBtn {
  background-color: var(--purple);
  color: var(--white);
}

.unfollowBtn {
  background-color: #e0e0e0;
  color: var(--black);
}

.circle {
  vertical-align: middle;
  font-size: 2.5rem;
  padding: 1.2em;
  width: 3rem;
  height: 3rem;
  background-color: var(--purple);
  color: #fff;
}

.username-header {
  font-size: 3em;
  padding: 0.25em;
  font-weight: normal;
}

.set-list-and-header {
  padding: 1em 5em;
}

.set-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5em;
  font-size: 25px;
  padding: 1rem 0;
}

.filter {
  /* make class for label as well? */
  justify-self: left;
  font-size: inherit;
  font-family: inherit;
  border: none;
  background: none;
  border-bottom: 1px solid var(--black);
  outline: none;
  -webkit-appearance: none;
}

.filter::placeholder {
  font-weight: 300;
}

.sort-drop-down {
  display: flex;
  align-items: center;
}

.sort {
  font-family: inherit;
  font-size: inherit;
  color: var(--grey);
  border: none;
  font-size: 1.2rem;
  padding: 0.25rem 2rem 0.25rem 0.25rem;
  font-weight: 300;
}

.sort-label {
  padding-right: 1em;
  font-size: 1.5rem;
  color: var(--black);
}

.list {
  list-style-type: none;
  width: 100%;
  padding: 0 0rem;
}

li {
  margin: 15px 0;
}
</style>
