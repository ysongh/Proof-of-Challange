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
            v-for="n in 3"
            :key="n"
            cols="12"
            sm="6"
          >
            <v-sheet class="ma-2 pa-2">
              <v-card>
                <v-card-title>
                  Test
                </v-card-title>
                <v-card-subtitle>
                  Testing
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
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Challanges',
  components: {
    HelloWorld
  },
  data: () => ({
    tab: null,
  }),
}
</script>
