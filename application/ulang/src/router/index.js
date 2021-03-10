import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import FlashCardsSettings from '../views/FlashCardsSettings.vue'
import FlashCards from '../views/FlashCards.vue'
import LearnSettings from '../views/LearnSettings.vue'
import Learn from '../views/Learn.vue'
import CreateWord from '../views/CreateWord.vue'
import AddLanguage from '../views/AddLanguage.vue'
import CreateSet from '../views/CreateSet.vue'
import Vocabulary from '../views/Vocabulary.vue'
import Conjugation from '../views/Conjugation.vue'
import ConjugationSettings from '../views/ConjugationSettings.vue'
import Pronunciations from '../views/Pronunciations.vue'
import Word from '../views/Word.vue'

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
    path: '/flashCardsSettings',
    name: 'FlashCardsSettings',
    component: FlashCardsSettings
  },
  {
    path: '/flashCards/:id/:setting',
    name: 'FlashCards',
    component: FlashCards,
    props: true
  },
  {
    path: '/learnSettings',
    name: 'LearnSettings',
    component: LearnSettings
  },
  {
    path: '/learn/:id',
    name: 'Learn',
    component: Learn,
    props: true
  },
  {
    path: '/createWord',
    name: 'CreateWord',
    component: CreateWord
  },
  {
    path: '/addLanguage',
    name: 'AddLanguage',
    component: AddLanguage
  },
  {
    path: '/createSet',
    name: 'CreateSet',
    component: CreateSet
  },
  {
    path: '/vocabulary',
    name: 'Vocabulary',
    component: Vocabulary
  },
  {
    path: '/conjugation/:id',
    name: 'Conjugation',
    component: Conjugation,
    props: true
  },
  {
    path: '/conjugationSettings',
    name: 'ConjugationSettings',
    component: ConjugationSettings
  },
  {
    path: '/pronunciations',
    name: 'Pronunciations',
    component: Pronunciations
  },
  {
    path: '/word/:id',
    name: 'Word',
    component: Word,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * This block will proctect any route other than Welcome, Login, and Signup
 * from being accessed without a token.
 */
router.beforeEach((to, from, next) => {
  if (!['Welcome', 'Login', 'Signup'].includes(to.name)) {
    if (!Vue.$cookies.get('jwt')) {
      console.log('No Token Found')
      router.replace('/ulang')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
