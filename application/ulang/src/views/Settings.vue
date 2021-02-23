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
              <input
                type="text"
                name="first"
                id="first"
                class="setting-input"
                v-model="firstName"
              />
              <label class="settings-input-label" for="first">First Name</label>
            </div>
            <div class="name-input input-group">
              <input
                type="text"
                name="last"
                id="last"
                class="setting-input"
                v-model="lastName"
              />
              <label class="settings-input-label" for="last">Last Name</label>
            </div>
            <button id="nameButton" class="btn submit-btn" @click="changeName">
              Submit
            </button>
          </div>
        </section>
        <section class="account">
          <p class="setting-title title">My Account</p>
          <div id="membership">
            <p class="subsetting-title title">Membership</p>
            <div class="membership-group content" v-if="createdDate">
              <p>Member Since:</p>
              <p>{{ createdDate }}</p>
            </div>
          </div>
          <div id="login-details">
            <p class="subsetting-title title">Login Details</p>
            <div class="update-email-content content">
              <p id="updateEmailHeader" class="login-details-headers">
                Update Your Email Address
              </p>
              <p id="currentEmail" v-if="email">
                Your email is currently <strong>{{ email }}</strong>
              </p>
              <div class="email-input input-group">
                <input
                  type="email"
                  name="newemail"
                  id="newemail"
                  class="setting-input"
                  v-model="newEmail"
                />
                <p class="error" id="newEmailError" v-if="errors.newEmailErrorMessage">{{ errors.newEmailErrorMessage }}</p>
                <label class="settings-input-label" for="newemail"
                  >New Email</label
                >
              </div>
              <div class="email-input input-group">
                <input
                  type="password"
                  name="changeEmailPassword"
                  id="changeEmailPassword"
                  class="setting-input"
                  v-model="newEmailPassword"
                />
                <p class="error" id="newEmailPasswordError" v-if="errors.newEmailPasswordErrorMessage">{{ errors.newEmailPasswordErrorMessage }}</p>
                <label class="settings-input-label" for="changeEmailPassword"
                  >Your Password</label
                >
              </div>
              <button
                id="emailButton"
                class="btn submit-btn"
                @click="changeEmail"
              >
                Submit
              </button>
            </div>
            <div class="change-password-content content">
              <p id="changePasswordHeader" class="login-details-headers">
                Change Your Password
              </p>
              <div class="password-input input-group">
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  class="setting-input"
                  v-model="currentPassword"
                />
                <p class="error" id="currentPasswordError" v-if="errors.currentPasswordErrorMessage">{{ errors.currentPasswordErrorMessage }}</p>
                <label class="settings-input-label" for="currentPassword"
                  >CurrentPassword</label
                >
              </div>
              <div class="password-input input-group">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  class="setting-input"
                  v-model="newPassword"
                />
                <p class="error" id="newPasswordError" v-if="errors.newPasswordErrorMessage">{{ errors.newPasswordErrorMessage }}</p>
                <label
                  class="settings-input-label"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  for="newPassword"
                  >New Password</label
                >
              </div>
              <div class="password-input input-group">
                <input
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  class="setting-input"
                  v-model="confirmNewPassword"
                />
                <p class="error" id="confirmNewPasswordError" v-if="errors.confirmNewPasswordErrorMessage">{{ errors.confirmNewPasswordErrorMessage }}</p>
                <label
                  class="settings-input-label"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  for="confirmNewPassword"
                  >Confirm New Password</label
                >
              </div>
              <button
                id="passwordButton"
                class="btn submit-btn"
                @click="changePassword"
              >
                Submit
              </button>
            </div>
          </div>
        </section>
        <section class="delete-account">
          <p class="setting-title title">Delete Account</p>
          <div class="delete-account-content content">
            <p>Permanently Delete {Username}</p>
            <div class="delete-account-input input-group">
              <input
                type="password"
                name="deletePassword"
                id="deletePassword"
                class="setting-input"
                v-model="confirmDeletePassword"
              />
              <p class="error" id="deleteAccountPasswordError" v-if="errors.deleteAccountPasswordErrorMessage">{{ errors.deleteAccountPasswordErrorMessage }}</p>
              <label class="settings-input-label" for="deletePassword"
                >Confirm with Password</label
              >
            </div>
            <button
              id="deleteAccountButton"
              class="btn delete-btn"
              @click="deleteAccount"
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import NameCircle from '@/components/NameCircle.vue'
import { getInitials } from '@/utils/utils'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { deleteAccount } from '@/services/userService'

export default {
  name: 'Settings',
  components: { NameCircle },
  data() {
    return {
      email: '',
      initials: '',
      createdDate: '',
      firstName: '',
      lastName: '',
      newEmail: '',
      newEmailPassword: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      confirmDeletePassword: '',
      errors: {
        newEmailErrorMessage: '',
        newEmailPasswordErrorMessage: '',
        currentPasswordErrorMessage: '',
        newPasswordErrorMessage: '',
        confirmNewPasswordErrorMessage: '',
        deleteAccountPasswordErrorMessage: '',
      }
    }
  },
  methods: {
    ...mapActions('auth', ['getUserInfo', 'updateUserInfo', 'changeUserEmail', 'changeUserPassword']),
    ...mapGetters('auth', ['getUserId']),
    ...mapMutations('auth', ['setName', 'logout']),
    changeName() {
      const userId = this.getUserId()
      const info = {
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.updateUserInfo({ userId, info })
        .then(({ firstName, lastName }) => {
          this.setName({ firstName, lastName })
          this.initials = getInitials({ firstName, lastName })
          this.resetData(['firstName', 'lastName'])
        })
        .catch((err) => console.error(err.message))
    },
    changeEmail() {
      this.resetErrorMessages(['newEmailErrorMessage', 'newEmailPasswordErrorMessage'])
      let error = false
      if (!this.newEmail) {
        this.errors.newEmailErrorMessage = 'Must provide a new email'
        error = true
      }
      if (!this.newEmailPassword) {
        this.errors.newEmailPasswordErrorMessage = 'Must enter account password to change email'
        error = true
      }
      if (this.newEmail === this.email) {
        this.errors.newEmailErrorMessage = 'New email cannot be the same'
        error = true
      }
      if (error) return
      const userId = this.getUserId()
      const info = { email: this.newEmail, password: this.newEmailPassword }
      this.changeUserEmail({ userId, info })
        .then(({ email }) => {
          this.email = email
          this.resetData(['email'])
        })
        .catch((err) => {
          console.error(err.message)
          // TODO: check if password invalid error to set error message
        })
    },
    changePassword() {
      if (
        !this.currentPassword ||
        !this.newPassword ||
        this.currentPassword === this.newPassword
      ) {
        // TODO: make error messages below the inputs
        return
      }
      const userId = this.getUserId()
      const info = {
        oldPassword: this.currentPassword,
        newPassword: this.newPassword
      }
      this.changeUserPassword({ userId, info }).then(() => {
        this.resetData(['currentPassword', 'newPassword', 'confirmNewPassword'])
      })
    },
    deleteAccount() {
      if (!this.confirmDeletePassword) {
        // TODO: make error message below input
        return
      }
      const userId = this.getUserId()
      deleteAccount(userId, this.confirmDeletePassword)
        .then(() => {
          this.logout()
          this.$router.push({ name: 'Welcome' })
        })
        .catch(err => console.error(err.message))
    },
    resetData(data) {
      data.forEach((d) => (this[d] = ''))
    },
    resetErrorMessages(errors) {
      errors.forEach((e) => this.errors[e] = '')
    }
  },
  created() {
    this.getUserInfo(this.getUserId())
      .then((res) => {
        this.initials = getInitials(res)
        this.email = res.email
        this.createdDate = res.createdDate.split('T')[0]
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
  align-items: center;
  overflow-y: auto;
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
.profile-content #nameButton {
  align-self: flex-start;
  margin-top: 0.5rem;
}
.circle {
  width: 5rem;
  height: 5rem;
  background-color: var(--purple);
  color: #fff;
  font-size: 2.75rem;
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
.account .setting-title {
  padding-top: 0.5rem;
}
.subsetting-title {
  font-size: 1.5rem;
}
.input-group {
  width: 100%;
  text-align: left;
  margin: 0.5rem 0;
}
.setting-input {
  width: 100%;
  padding: 0.25rem;
  border: none;
  border-bottom: 1px solid var(--gray);
  margin-bottom: 0.3rem;
  font-size: 1.15rem;
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
.update-email-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.login-details-headers {
  font-size: 1.5rem;
  text-align: left;
  padding-bottom: 1rem;
}
.btn {
  padding: 0.5rem 2rem;
  color: #fff;
  border: none;
  border-radius: 6px;
  justify-self: flex-start;
  font-size: 1.1rem;
  cursor: pointer;
}
.submit-btn {
  background: var(--purple);
}
#emailButton {
  margin-top: 0.5rem;
}
.delete-account {
  width: 100%;
}
.delete-account-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.delete-account-content p {
  font-size: 1.1rem;
}
.delete-account-input {
  padding-bottom: 1rem;
}
.delete-btn {
  background-color: var(--accent-red);
}
.error {
  font-size: 0.75rem;
  color: red;
}
</style>
