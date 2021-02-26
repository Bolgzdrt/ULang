<template>
  <div class="profile">
    <Sidebar v-if="userId" :friends="friends" />
    <div class="profile-content">
      <div class="user-banner">
        <span class="banner-spacing"/>
        <NameCirclePurple class= "name-circle" :userId="userId" :initials="initials" />
        <header class="username-header" id="username-header" >cmessmer135</header>
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
          <ProfileSetCard :owner="chris" :setname="Chapter10" :numterms="10"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import NameCirclePurple from '@/components/NameCirclePurple.vue'
import getUserInfo from '../services/userService.js'
import ProfileSetCard from '../components/ProfileSetCard.vue'
export default {
  name: 'Profile',
  components: { 
    Sidebar,
    NameCirclePurple,
    ProfileSetCard
  
  },
  data() {
    return {
      initials: 'CM',
      friends: [
        { name: 'Joe Schmo', pic: 'JS' },
        { name: 'Name Name', pic: 'NN' },
        { name: 'Place Holder', pic: 'PH' }
      ],
      userId: 'cmessmer135',
    }
  },
  methods: {
    getId() {
      return document.URL.substring(url.lastIndexOf(':') + 1)
    }
  }
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

.set-list{
  display: flex;
  width:100%;
  height: 100%;
}

</style>