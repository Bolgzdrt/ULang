<template>
  <div class="signup">
    <form @submit="onSubmit">
    </form>
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
  height: 100%;
  width: 100%;
}
</style>
