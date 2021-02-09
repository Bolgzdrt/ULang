<template>
  <div class="signup">
    <section class="signup-content">
        <header class="signup-header">
        <h1>Sign Up</h1>
      </header>

        <dl class="inputbox">
          <dd class="inputbox-content">
            <input type="email" name="email" id="email" v-model="email" required />
            <label for="email">Email</label>
            <span class="underline"></span>
          </dd>
        </dl>

        <dl class="inputbox">
          <dd class="inputbox-content">
            <input type="text" name="username" id="username" 
            v-model="username"
            required/>
            <label for="username">Username</label>
            <span class="underline"></span>
          </dd>
        </dl>

        <dl class="inputbox">
          <dd class="inputbox-content">
            <input type="password" name="password" id="password" 
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            v-model="password"
            required/>
            <label for="password">Password</label>
            <span class="underline"></span>
          </dd>
        </dl>

        <button @submit="onSubmit" class="submit-button">Submit</button>      
    </section>
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
html, body {
  height: 100%;
  background: #e0e0e0;
  font-family: sans-serif;
  font-size: 14px;
}

#wrap {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 60px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
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
.signup-content {
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
.signup-header{
  padding: 5%;
}
.signup-content .inputbox {
  overflow: hidden;
  position: relative;
  padding: 5%;
}
.signup-content .inputbox-content {
  position: relative;
  width: 100%;
}
.signup-content .inputbox-content input {
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
.signup-content .inputbox-content input:focus ~ label, .signup-content .inputbox-content input:valid ~ label {
  color: #7666D8;
  transform: translateY(-20px);
  font-size: 0.825em;
  cursor: default;
}
.signup-content .inputbox-content input:focus ~ .underline {
  width: 100%;
}
.signup-content .inputbox-content label {
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
.signup-content .inputbox-content .underline {
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

.signup-content .submit-button {
  display: inline-block;
  margin-right: 2px;
  padding: 10px 40px;
  background:#7666D8;
  border: 1px solid #c0c0c0;
  border-radius: 20%/50%;
  color:#fff;
  font-size: 1.125em;
  outline: none;
  transition: all 100ms ease-out;
  }

</style>
