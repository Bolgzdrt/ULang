<template>
  <div class="login">
            <dl class="inputbox">
          <dt class="inputbox-title">Username</dt>
          <dd class="inputbox-content">
            <input type="text" name="username" id="username" 
            v-model="username"
            required/>
            <label for="username">Username</label>
            <span class="underline"></span>
          </dd>
        </dl>

        <dl class="inputbox">
          <dt class="inputbox-title">Password</dt>
          <dd class="inputbox-content">
            <input type="password" name="password" id="password" 
            pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            v-model="password"
            required/>
            <label for="password">Password</label>
            <span class="underline"></span>
          </dd>
        </dl>


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
html, body {
  height: 100%;
  background: #e0e0e0;
  font-family: sans-serif;
  font-size: 14px;
}

.input::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background: #0f1041;
}
.login {
  margin: auto;
  border: solid;
  border-color: #7666D8;
  border-width: 1px;
  border-radius: 3%;
  top: 10%;
  height: 75%;
  width: 75vh;
  position: relative;
  padding: 0;
  background: #fff;
  z-index: 10;
  
}
.login .inputbox {
  overflow: hidden;
  position: relative;
  padding: 15px 0 28px 200px;
}
.login .inputbox-title {
  position: absolute;
  top: 15px;
  left: 0;
  width: 200px;
  height: 30px;
  color: #666;
  font-weight: bold;
  line-height: 30px;
}
.login .inputbox-content {
  position: relative;
  width: 100%;
}
.login .inputbox-content input {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  line-height: 30px;
  font-size: 14px;
  border: 0;
  background: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  border-radius: 0;
  -webkit-appearance: none;
}
.login .inputbox-content input:focus ~ label, .login .inputbox-content input:valid ~ label {
  color: #7666D8;
  transform: translateY(-20px);
  font-size: 0.825em;
  cursor: default;
}
.login .inputbox-content input:focus ~ .underline {
  width: 100%;
}
.login .inputbox-content label {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  line-height: 30px;
  color: #ccc;
  cursor: text;
  transition: all 200ms ease-out;
  z-index: 10;
}
.login .inputbox-content .underline {
  content: "";
  display: block;
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 2px;
  background: #7666D8;
  transition: all 200ms ease-out;
}
</style>
