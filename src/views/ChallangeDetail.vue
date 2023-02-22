<template>
  <v-container>
    <v-sheet>
      <v-card v-if="!loading" class="mx-auto my-5 pt-3" maxWidth="600px">
        <p class="mr-3 mb-0 text-right">{{ challange.dateNow }}</p>
        <v-card-title>
          {{ challange.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ challange.description }}
        </v-card-subtitle>
        <v-card-subtitle>
          <p class="mb-0">To {{ formatWalletAddress(challange.to) }}</p>
          <p>From {{ formatWalletAddress(challange.from) }}</p>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="#876a96" v-if="!challange.isChallengeAccept" @click="acceptChallenge()">
            Accept Challange
          </v-btn>
          <v-btn color="#876a96" v-else disabled>
            Accepted
          </v-btn>
        </v-card-actions>
      </v-card>
      <Spinner v-else />
    </v-sheet>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Spinner from '../components/common/Spinner.vue'

export default {
  name: 'ChallangeDetail',
  data: () => ({
    tab: null,
    challange: {},
    loading: false
  }),
  components: {
    Spinner
  },
  computed: mapGetters(['contractPOC', "walletAddress"]),
  methods: {
    async acceptChallenge() {
      try{
        console.log(this.$route.params.id.toString())
        const transaction = await this.contractPOC.acceptChallenge(+this.$route.params.id - 1)
        const tx = await transaction.wait()
        console.log(tx)
      } catch(error) {
        console.log(error)
      }
    },
    async signMessage() {
      try{
        const { sig } = await a.provider.request({
        method: 'eth_signTransaction',
        params: [
          {
            from: this.walletAddress, // sender account address
            gasPrice: 0,
            to: 'receiver', // receiver account address
            value: '0x0de0b6b3a7640000',
          },
        ],
      })
      console.log({ sig })
      } catch(error) {
        console.log(error)
      }
    },
    formatWalletAddress(address) {
      if(address) return address.slice(0, 5) + "..." + address.slice(37, 42)
      else return ""
    },
  },
  async created() {
    try{
      this.loading = true
      let contractData = await this.contractPOC.getChallenges()
      console.log(contractData, contractData[this.$route.params.id - 1])
      let newData = {};
      let data = await fetch(contractData[this.$route.params.id - 1].cid)
      data = await data.json();
      const toObject = await JSON.parse(data.challengeData)
      newData.isChallengeAccept = contractData[this.$route.params.id - 1].isChallengeAccept
      newData.dateNow = toObject.dateNow
      newData.title = toObject.title
      newData.description = toObject.description
      newData.to = toObject.to
      newData.from = contractData[this.$route.params.id - 1].from
      this.challange = newData
      this.loading = false
    } catch(error) {
      console.log(error)
      this.loading = false
    }
  }
}
</script>
