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
            <select class="sort" name="sort" id="sort">
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
                :favorite="true"
                :quickaccess="true"
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
import { getUserInfo, followUser, unfollowUser, getFollowing } from '@/services/userService'
import { getInitials } from '@/utils/utils'
import Sidebar from '../components/Sidebar.vue'
import NameCircle from '@/components/NameCircle.vue'
import ProfileSetCard from '../components/ProfileSetCard.vue'

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
      userInfo: { username: 'Loading...' },
      following: false,
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
    ...mapActions('auth', ['getUserInfo']),
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
    getName({ firstName, lastName, username }) {
      if (firstName) {
        if (lastName) return `${firstName} ${lastName}`
        return firstName
      }
      return username
    },
  },
  async mounted() {
    try {
      const { sets } = await getSets(this.id, this.getLanguage())
      const userId = this.id
      if (userId !== this.getUserId()) {
        try {
          this.userInfo = await this.getUserInfo(userId)
          this.username = this.getName(this.userInfo)
          const { following } = await getFollowing(this.getUserId())
          if (following) {
            const match = following.filter(id => id === userId)
            if (match.length) {
              this.following = true
            }
          }
        } catch (err) {
          console.error(err.response.data.error)
        }
      } else {
        this.userInfo = this.getUserInfo()
      }
      for (let set of sets) {
        if (set.ownerId === userId) {
          set['ownerName'] = ''
          this.sets.push(set)
        } else {
          try {
            const { firstName, lastName, username } = await getUserInfo(
              set.ownerId
            )
            let ownerName = ''
            if (firstName) {
              if (lastName) {
                ownerName = `${firstName} ${lastName}`
              } else {
                ownerName = firstName
              }
            } else {
              ownerName = username
            }
            set['ownerName'] = ownerName
            this.sets.push(set)
          } catch (err) {
            console.error(err.response.data.error)
          }
        }
      }
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
