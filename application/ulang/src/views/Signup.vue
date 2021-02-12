<template>
  <div class="signup">
    <form @submit="onSubmit" class="signup-content">
      <header class="signup-header">
        <h1>Sign Up</h1>
      </header>
      <section class="input-container">
        <div class="inputbox">
          <div class="inputbox-content">
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              required
            />
            <label for="email" :class="shouldStay('email')">Email</label>
            <p class="error">{{ emailError }}</p>
          </div>
        </div>
        <div class="inputbox">
          <div class="inputbox-content">
            <input
              type="text"
              name="username"
              id="username"
              v-model="username"
              pattern="^(?=.{4,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$"
              required
            />
            <label for="username" :class="shouldStay('username')">Username</label>
            <p class="error">{{ usernameError }}</p>
          </div>
        </div>
        <div class="inputbox">
          <div class="inputbox-content">
            <input
              type="password"
              name="password"
              id="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              v-model="password"
              required
            />
            <label for="password" :class="shouldStay('password')">Password</label>
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
    ...mapMutations('auth', [
      'setEmail',
      'setUsername',
      'setUserId',
      'setToken',
      'logout'
    ]),
    onSubmit(e) {
      e.preventDefault()
      this.resetErrors()
      // this.loading = true // start some loading spinner thing
      this.signUp(this.password)
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch((err) => {
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
    },
    shouldStay(label) {
      return this[label] ? 'label-up' : null
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

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

.signup {
  display: flex;
  justify-content: center;
}

.signup-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--purple);
  border-radius: 3%;
  top: 10%;
  width: 45%;
  height: 55%;
  max-width: 600px;
  max-height: 700px;
  min-height: 250px;
  min-width: 180px;
  position: relative;
  padding: 1.5rem 2rem;
  background: var(--white);
}

.signup-header{
  padding-top: 0.5rem;
  font-size: 1.75rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 55%;
  margin-bottom: 5%;
  width: 100%;
}

.signup-content .inputbox {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 1rem 0;
}

.signup-content .inputbox-content {
  position: relative;
  width: 100%;
}

.signup-content .inputbox-content input {
  width: 100%;
  box-sizing: border-box;
  line-height: 2rem;
  font-size: 1rem;
  border: 0;
  background: none;
  border-bottom: 1px solid var(--gray);
  outline: none;
  border-radius: 0;
  -webkit-appearance: none;
}

.inputbox-content input:focus ~ label,
.inputbox-content input:valid ~ label,
.label-up {
  color: var(--purple);
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
  color: var(--gray);
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
  background: var(--purple);
  transition: all 200ms ease-out;
}

.submit-button {
  display: inline-block;
  padding: 10px 50px ;
  background: var(--purple);
  border: none;
  border-radius: 10px;
  color: var(--white);
  font-size: 1.25em;
  transition: all 100ms ease-out;
  cursor: pointer;
}

.signup-content button:hover,
.signup-content button:focus {
  transform: translateY(-1px);
}

.signup-content button:active{
  background-color: var(--accent-red);
}

.signup form button {
  width: 30%;
}

.error {
  color: red;
  font-size: 0.75rem;
  text-align: left;
}
</style>
