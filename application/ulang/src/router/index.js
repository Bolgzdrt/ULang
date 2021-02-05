import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import FlashCards from '../views/FlashCards.vue'
import Learn from '../views/Learn.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ulang',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/flashCards',
    name: 'FlashCards',
    component: FlashCards
  },
  {
    path: '/learn',
    name: 'Learn',
    component: Learn
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * This block will proctect any route other than Welcome, Login, and Signup
 * from being accessed without a token.
 *
 * Commenting out for now for development testing purposes
 */
// router.beforeEach((to, from, next) => {
//   if (!['Welcome', 'Login', 'Signup'].includes(to.name)) {
//     if (!Vue.$cookies.get('token')) {
//       console.log('No Token Found')
//       router.replace('/ulang')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
