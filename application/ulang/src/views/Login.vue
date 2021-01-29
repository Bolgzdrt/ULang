<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit="onSubmit">
      <div class="username-content">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="username">
        <p class="error" v-if="usernameError">{{ usernameError }}</p>
      </div>
      <div class="password-content">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">
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
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapMutations('auth', ['setUsername', 'logout']),
    onSubmit(e) {
      e.preventDefault()
      this.resetErrors()
      this.login(this.password)
        .then(() => {
          this.$router.push({ name: 'Home' })
        }).catch(err => {
          console.log(err.response?.data.errors)
          const { password, username } = err.response?.data.errors
          this.usernameError = username
          this.passwordError = password
        })
    },
    resetErrors() {
      this.emailError = ''
      this.passwordError = ''
      this.usernameError = ''
    }
  },
  watch: {
    username(val) {
      this.setUsername(val)
    }
  }
}
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login h1 {
  margin: 0.5rem;
}

.login form {
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

.login form .username-content,
.login form .password-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

input {
  width: 100%;
  padding: 3px;
}

.login form button {
  width: 30%;
}

.error {
  color: red;
  font-size: 0.75rem;
}
</style>
