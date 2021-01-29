<template>
  <div class="login">
    <form @submit="onSubmit">
    </form>
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
}
</style>
