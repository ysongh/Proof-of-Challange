<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    
    <router-link :to="{ path: '/'}" class="nav-link">
      Proof Of Challange
    </router-link>

    <router-link :to="{ path: '/'}" class="nav-link">
      Home
    </router-link>

    <router-link :to="{ path: '/about'}" class="nav-link">
      About
    </router-link>

    <v-spacer></v-spacer>

    <v-btn
      v-if="!loading"
      color="green"
      @click="loginWithArcana()"
    >
      Login With Arcana
    </v-btn>

    <v-btn
      v-else
      color="green"
      disabled
    >
      Loading...
    </v-btn>
  </v-app-bar>
</template>

<script>
import { getAuthInstance } from '@/lib/auth'

export default {
  name: "Navbar",
  data: () => ({
    loading: false
  }),
  methods: {
    async loginWithArcana() {
      try {
        this.loading = true

        // eslint-disable-next-line no-unused-vars
        const a = await getAuthInstance()
        // Provider available at a.provider

         this.loading = false
      } catch (error) {
        console.error(error)
         this.loading = false
      }
    }
  }
}
</script>

<style>
  .nav-link {
    text-decoration: none;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    color: #fff !important;
  }
  
  .nav-link:hover {
    color: rgb(184, 193, 203) !important;
  }
</style>