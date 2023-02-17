import Vue from 'vue'
import VueRouter from 'vue-router'
import Challanges from '../views/Challanges.vue'
import SendChallenge from '../views/SendChallenge.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Challanges',
    component: Challanges
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
