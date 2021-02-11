<template>
  <div class="login">
    <form @submit="onSubmit" class="login-content">
      <header class="login-header">
        <h1>Log In</h1>
      </header>
      <section class="input-container">
        <div class="inputbox">
          <div class="inputbox-content">
            <input
              type="text"
              name="username"
              id="username"
              v-model="username"
              required
            />
            <label for="username">Username</label>
            <p class="error">{{ usernameError }}</p>
          </div>
        </div>
        <div class="inputbox">
          <div class="inputbox-content">
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              required
            />
            <label for="password">Password</label>
            <p class="error">{{ passwordError }}</p>
          </div>
        </div>
      </section>
      <button class="submit-button">Submit</button>
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
        })
        .catch((err) => {
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
@import "../assets/styles/utils.css";

/* Were these block meant for something that comes later? */
/* #wrap {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 60px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
} */

/* .input::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f1041;
} */

.login {
  display: flex;
  justify-content: center;
}

.login-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--purple);
  border-radius: 3%;
  top: 10%;
  width: 40%;
  height: 40%;
  min-height: 250px;
  min-width: 180px;
  max-width: 600px;
  max-height: 500px;
  position: relative;
  background: #fff;
  padding: 1.5rem 2rem;
}

.login-header{
  font-size: 1.75rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 45%;
  margin-bottom: 5%;
}

.login-content .inputbox {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 1rem 0;
}

.login-content .inputbox-content {
  position: relative;
  width: 100%;
}

.login-content .inputbox-content input {
  width: 100%;
  height: 30px;
  line-height: 2rem;
  font-size: 1rem;
  border: 0;
  background: none;
  border-bottom: 1px solid var(--gray);
  outline: none;
  -webkit-appearance: none;
}

.inputbox-content input:focus ~ label,
.login-content .inputbox-content input:valid ~ label {
  color: var(--purple);
  transform: translateY(-20px);
  font-size: 0.825em;
  cursor: default;
}

.login-content .inputbox-content label {
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

.login-content .inputbox-content .underline {
  content: "";
  display: block;
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--purple);
  transition: all 200ms ease-out;
}

.submit-button {
  display: inline-block;
  padding: 10px 50px;
  background:var(--purple);
  border: none;
  border-radius: 10px;
  color:var(--white);
  font-size: 1.25em;
  outline: none;
  transition: all 100ms ease-out;
  cursor: pointer;
}

.login-content button:hover,
.login-content button:focus {
  transform: translateY(-1px);
}

.login-content button:active{
  background-color: var(--accent-red);
}

.error {
  color: red;
  font-size: 0.75rem;
  text-align: left;
}
</style>
