<template>
  <v-container>
    <h1>
      Hold your friends accountable
    </h1>
    <p>
      Using Proof of Challenge NFT for proof so that your friends are committed to the challenge
    </p>
    <v-btn color="#d7c1e0" v-if="!walletAddress" @click="connectToBlockchain()">
      Connect Wallet
    </v-btn>
    <div v-else>
      <v-btn class="mb-2" color="#d7c1e0" as="router-link" to="/send-challenge">
        Send Challenge
      </v-btn>
      <br>
      <v-btn color="#876a96" as="router-link" to="/challenges">
        View Challenges
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
 
export default {
  name: 'Home',
  computed: mapGetters(['walletAddress']),
  methods: {
    ...mapActions(['connectToBlockchain'])
  }
}
</script>

<style scoped>
  .mb-2 { margin-bottom: .7rem !important ;}
</style>