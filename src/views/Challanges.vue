<template>
  <v-container>
    <HelloWorld msg="Proof Of Challange"/>

    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">Challanges</v-tab>
      <v-tab :value="2">Completed</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="1">
        <h1>Challanges</h1>

        <v-row>
          <v-col
            v-bind:key="challange.dateNow"
            v-for="challange of challanges"
            cols="12"
            sm="6"
          >
            <v-sheet class="ma-2 pa-2">
              <v-card>
                <v-card-title>
                  {{ challange.id }} - {{ challange.title }}
                </v-card-title>
                <v-card-subtitle>
                  {{ challange.description }}
                </v-card-subtitle>
                <v-card-subtitle>
                  {{ challange.dateNow }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn>Click me</v-btn>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item key="2">
        <h1>Completed</h1>
      </v-tab-item>
    </v-tabs-items>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Challanges',
  components: {
    HelloWorld,
  },
  data: () => ({
    tab: null,
    challanges: []
  }),
  computed: mapGetters(['contractPOC']),
  async created() {
    try{
      let contractData = await this.contractPOC.getChallenges()
      let newChallanges = [];
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
        newChallanges.push(newData)
      }
      this.challanges = newChallanges
    } catch(error) {
      console.log(error)
      this.loading = false
    }
  }
}
</script>
