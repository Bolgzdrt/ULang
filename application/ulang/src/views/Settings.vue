<template>
  <div id="settings">
    <div class="container">
      <div class="settings-content">
        <section class="profile">
          <p class="setting-title title">My Profile</p>
          <div class="profile-content content">
            <NameCircle :initials="initials" background="#7666D8" :radius="4" />
            <!-- TODO: Do the moving label thing -->
            <div class="name-input input-group">
              <input type="text" name="first" id="first" class="setting-input">
              <label for="first">First Name</label>
            </div>
            <div class="name-input input-group">
              <input type="text" name="last" id="last" class="setting-input">
              <label for="last">Last Name</label>
            </div>
          </div>
        </section>
        <section class="account">
          <p class="setting-title title">My Account</p>
          <div id="membership">
            <p class="subsetting-title title">Membership</p>
            <div class="membership-group content">
              <p>Member Since:</p>
              <p>TODO: Date</p>
            </div>
          </div>
          <div id="login-details">
            <p class="subsetting-title title">Login Details</p>
            <div class="login-details-content content">
              <p id="updateEmailHeader">Update Your Email Address</p>
              <p id="currentEmail">Your email is currently TODO@email</p>
              <div class="email-input input-group">
                <input type="text" name="newemail" id="newemail" class="setting-input">
                <label for="newemail">New Email</label>
              </div>
              <div class="email-input input-group">
                <input type="text" name="changeEmailPassword" id="changeEmailPassword" class="setting-input">
                <label for="changeEmailPassword">Your Password</label>
              </div>
              <button id="emailButton" class="btn submit-btn">Submit</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import NameCircle from '@/components/NameCircle.vue'
import { getInitials } from '@/utils/utils'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Settings',
  components: { NameCircle },
  data() {
    return {
      initials: ''
    }
  },
  methods: {
    ...mapActions('auth', ['getUserInfo']),
    ...mapGetters('auth', ['getUserId'])
  },
  created() {
    this.getUserInfo(this.getUserId())
      .then((res) => {
        this.initials = getInitials(res)
      })
      .catch((err) => console.error(err.response.data.error))
  }
}
</script>

<style scoped>
@import '../assets/styles/utils.css';

#settings {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  background-color: var(--white);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center
}
.settings-content {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 2rem;
}
.content {
  padding: 1rem 2rem 1rem;
}
.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 0;
}
.circle {
  width: 4rem;
  height: 4rem;
  background-color: var(--purple);
  color: #fff;
  font-size: 2.5rem;
  margin: 0 0 1rem;
}
.title {
  text-align: left;
}
.setting-title {
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
}
.subsetting-title {
  font-size: 1.5rem;
}
.input-group {
  width: 100%;
  text-align: left;
  margin: 0.5rem 0;
}
.profile .name-input label {
}
.setting-input {
  width: 100%;
  padding: 0.25rem 0.5rem;
  border: none;
  border-bottom: 1px solid var(--gray);
}
.account {
 width: 100%;
}
#membership {
  width: 100%;
}
.membership-group {
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
}
.membership-group p {
  padding: 0 0.5rem;
  font-size: 1.1rem;
}
.login-details-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.login-details-content #updateEmailHeader {
  font-size: 1.5rem;
  text-align: left;
}
.btn {
  padding: 0.5rem 2rem;
  color: #fff;
  border: none;
  border-radius: 6px;
  justify-self: flex-start;
  font-size: 1.1rem;
}
.submit-btn {
  background: var(--purple);
}
#emailButton {
  margin-top: 0.5rem;
}
</style>
