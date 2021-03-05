<template>
  <div class="profile">
    <div class="profile-content">
      <div class="user-banner">
        <span class="banner-spacing"/>
        <NameCirclePurple class= "name-circle" :userId="userId" :initials="initials" />
        <header class="username-header" id="username-header" v-text="username"></header>
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
          <div class="sort-drop-down" >
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
          <ul id=list class=list>
            <li v-for="set in sets" :key="set.name">
              <ProfileSetCard 
              :owner="set.ownerId"
              :setname="set.name"
              :numterms="set.words.length"
              :favorite="true"
              :quickaccess="true" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import NameCirclePurple from '@/components/NameCirclePurple.vue'
import ProfileSetCard from '../components/ProfileSetCard.vue'
import {getSets}  from '@/services/setService'
import {mapGetters} from 'vuex'
import { getInitials } from '@/utils/utils'

export default {
  name: 'Profile',
  components: { 
    Sidebar,
    NameCirclePurple,
    ProfileSetCard
  
  },
  data() {
    return {
    }
  },
  computed: {
    username(){
      var data = this.getUserInfo();
      if(data.firstName)
      {
        if(data.lastName)
          return data.firstName.concat(" ").concat(data.lastName);
        return data.firstName;
      }
      return data.username;
    },
    sets(){
      //return getSets(this.getUserId(), this.getLanguage());  
      return  [{ _id : "604260a90753053f91fabf32", name : "Test Set", language : "french", words : [ ], favorite : false, description : "My third test set of Spanish words", ownerId : "60418460e3aee293b8f74a42" }]
    },
    initials() {
      return getInitials(this.getUserInfo())
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserInfo']),
    ...mapGetters('settings', ['getLanguage']),
    ...mapGetters('auth', ['getUserId'])
  },
  
}

</script>
 
<style scoped>

.profile{
  display: flex;
}

.profile-content{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.user-banner{
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--white);
}

.banner-spacing{
  padding: 3em;
  padding-top: 9em;
}

.name-circle{
  vertical-align: middle;
  font-size: 3.5em;
  padding: 1.2em;
}

.username-header{
  font-size: 4em;
  padding: .25em;
}

.set-list-and-header{
  padding: 1em;
}

.set-list-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: .5em;
  font-size: 25px;
}

.filter{ /* make class for label as well? */
  justify-self: left;
  font-size: inherit;
  font-family: inherit;
  border: none;
  background: none;
  border-bottom: 1px solid var(--black);
  outline: none;
  border-radius: 0;
  -webkit-appearance: none;
}

.sort{
  font-family: inherit;
  font-size: inherit;
  color: var(--grey);
  border: none;
}

.sort-label{
  padding-right: 1em;
  color: var(--black)
}

.list{
  list-style-type: none;
  width:100%;
  padding: 4em;
}

li{
  margin: 15px 0;
}

</style>