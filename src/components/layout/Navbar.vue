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

    <router-link :to="{ path: '/send-challenge'}" class="nav-link">
      Send Challenge
    </router-link>

    <v-spacer></v-spacer>

    <v-btn
      v-if="!loading && !walletAddress"
      color="green"
      @click="loginWithArcana()"
    >
      Login With Arcana
    </v-btn>

    <v-btn
      v-if="!loading"
      color="green"
      @click="connectToBlockchain()"
    >
      {{ formatWalletAddress(walletAddress) }}
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
import { mapGetters, mapActions } from 'vuex'
import { getAuthInstance } from '@/lib/auth'

export default {
  name: "Navbar",
  data: () => ({
    loading: false
  }),
  computed: mapGetters(['walletAddress']),
  methods: {
    ...mapActions(['connectToBlockchain', 'updateWalletAddress']),
    formatWalletAddress(address) {
      if(address) return address.slice(0, 5) + "..." + address.slice(37, 42)
      else return "Connect Wallet"
    },
    async loginWithArcana() {
      try {
        this.loading = true

        // eslint-disable-next-line no-unused-vars
        const a = await getAuthInstance()
        // Provider available at a.provider
        console.log(a)

        const accounts = await a.provider.request({ method: 'eth_accounts' })
        console.log(accounts)
        this.updateWalletAddress(accounts[0])

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