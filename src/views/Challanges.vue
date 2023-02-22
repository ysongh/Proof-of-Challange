<template>
  <v-container>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">Current</v-tab>
      <v-tab :value="2">Accepted</v-tab>
      <v-tab :value="3">Sent</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="1">
        <h1 class="mb-3">Current</h1>
        <v-row v-if="!loading">
          <v-col
            v-bind:key="challange.dateNow"
            v-for="challange of currentChallanges"
            cols="12"
            sm="6"
          >
            <v-sheet class="ma-2 pa-2">
              <v-card>
                <v-card-title>
                  {{ challange.id }} - {{ challange.title }}
                </v-card-title>
                <v-card-subtitle>
                  From {{ formatWalletAddress(challange.from) }}
                </v-card-subtitle>
                <v-card-subtitle>
                  {{ challange.dateNow }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="#876a96" @click="goToDetailpage(challange.id)">View</v-btn>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
        <Spinner v-else />
      </v-tab-item>

      <v-tab-item key="2">
        <h1 class="mb-3">Accepted</h1>
        <v-row>
          <v-col
            v-bind:key="challange.dateNow"
            v-for="challange of acceptedChallanges"
            cols="12"
            sm="6"
          >
            <v-sheet class="ma-2 pa-2">
              <v-card>
                <v-card-title>
                  {{ challange.id }} - {{ challange.title }}
                </v-card-title>
                <v-card-subtitle>
                  From {{ formatWalletAddress(challange.from) }}
                </v-card-subtitle>
                <v-card-subtitle>
                  {{ challange.dateNow }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="#876a96" @click="goToDetailpage(challange.id)">View</v-btn>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item key="3">
        <h1 class="mb-3">Sent</h1>
        <v-row>
          <v-col
            v-bind:key="challange.dateNow"
            v-for="challange of myChallanges"
            cols="12"
            sm="6"
          >
            <v-sheet class="ma-2 pa-2">
              <v-card>
                <v-card-title>
                  {{ challange.id }} - {{ challange.title }}
                </v-card-title>
                <v-card-subtitle>
                  To {{ formatWalletAddress(challange.to) }}
                </v-card-subtitle>
                <v-card-subtitle>
                  {{ challange.dateNow }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="#876a96" @click="goToDetailpage(challange.id)">View</v-btn>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Spinner from '../components/common/Spinner.vue'

export default {
  name: 'Challanges',
  components: {
    Spinner
  },
  data: () => ({
    loading: false,
    tab: null,
    currentChallanges: [],
    acceptedChallanges: [],
    myChallanges: []
  }),
  computed: mapGetters(['contractPOC', 'walletAddress']),
  methods: {
    goToDetailpage(id) {
      this.$router.push('/challange-detail/' + id);
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
      let newCurrentChallanges = [];
      let newAcceptedChallanges = [];
      let newMyChallanges = [];
      for(let i = 0; i < contractData.length; i++){
        let newData = {};
        let data = await fetch(contractData[i].cid)
        data = await data.json();
        const toObject = await JSON.parse(data.challengeData)
        newData.id = contractData[i].id.toString()
        newData.isChallengeAccept = contractData[i].isChallengeAccept
        newData.dateNow = toObject.dateNow
        newData.title = toObject.title
        newData.description = toObject.description
        newData.to = toObject.to
        newData.from = contractData[i].from
        if(newData.to === this.walletAddress){
          if(newData.isChallengeAccept) newAcceptedChallanges.push(newData)
          else newCurrentChallanges.push(newData)
        }
        else if(newData.from === this.walletAddress) newMyChallanges.push(newData)
        
        this.loading = false
      }
      this.acceptedChallanges = newAcceptedChallanges
      this.currentChallanges = newCurrentChallanges
      this.myChallanges = newMyChallanges
    } catch(error) {
      console.log(error)
      this.loading = false
    }
  }
}
</script>
