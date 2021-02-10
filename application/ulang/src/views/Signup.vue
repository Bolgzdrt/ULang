<template>
  <div class="signup">
    <h1>Signup</h1>
    <form @submit="onSubmit">
      <div class="email-content">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email" required />
        <p class="error" v-if="emailError">{{ emailError }}</p>
      </div>
      <div class="username-content">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" pattern="^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" v-model="username" required />
        <p class="error" v-if="usernameError">{{ usernameError }}</p>
      </div>
      <div class="password-content">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          v-model="password"
          required
        />
        <p class="error" v-if="passwordError">{{ passwordError }}</p>
      </div>
      <button>Submit</button>
    </form>
    <!-- Testing element -->
    <button @click="logout" style="margin-top: 1rem;width:10%;">Reset</button>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      emailError: '',
      usernameError: '',
      passwordError: ''
    }
  },
  watch: {
    username(val) {
      this.setUsername(val)
    },
    email(val) {
      this.setEmail(val)
    }
  },
  methods: {
    ...mapActions('auth', ['signUp']),
    ...mapMutations('auth', ['setEmail', 'setUsername', 'setUserId', 'setToken', 'logout']),
    onSubmit(e) {
      e.preventDefault()
      this.resetErrors()
      // this.loading = true // start some loading spinner thing
      this.signUp(this.password)
        .then(() => {
          this.$router.push({ name: 'Home' })
        }).catch((err) => {
          const { email, password, username } = err.response?.data.errors
          console.log(err.response?.data.errors)
          this.emailError = email
          this.passwordError = password
          this.usernameError = username
        })
        /* .finally(() => this.loading = false) */ // turn off loading spinner thing
    },
    resetErrors() {
      this.emailError = ''
      this.passwordError = ''
      this.usernameError = ''
    }
  }
}
</script>

<style scoped>
.signup {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup h1 {
  margin: 0.5rem;
}

.signup form {
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 40%;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 1rem;
}

.signup form .email-content,
.signup form .username-content,
.signup form .password-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

input {
  width: 100%;
  padding: 3px;
}

.signup form button {
  width: 30%;
}

.error {
  color: red;
  font-size: 0.75rem;
}
</style>
