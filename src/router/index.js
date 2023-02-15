import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SendChallenge from '../views/SendChallenge.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/send-challenge',
    name: 'SendChallenge',
    component: SendChallenge
  }
]

const router = new VueRouter({
  routes
})

export default router
