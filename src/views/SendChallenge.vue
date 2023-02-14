<template>
  <v-container>
    <v-card
      class="mx-auto my-5 pt-3"
      elevation="2"
      max-width="600"
    >
      <v-card-text>
        <h1>Send Challenge</h1>
        
        <form class="mt-4">
          <v-text-field
            v-model="to"
            label="To"
            outlined
            dense
            clearable
          ></v-text-field>

          <v-text-field
            v-model="title"
            label="Title"
            outlined
            dense
            clearable
          ></v-text-field>

          <v-textarea
            solo
            class="mb-0"
            rows="3"
            label="Description"
            v-model="description"
          ></v-textarea>

          <v-btn
            v-if="!loading"
            class="mb-4"
            @click="sendChallenge()"
            block
            color="primary"
            :disabled=isDisabled
          >
            Create
          </v-btn>

          <div class="text-center" v-else>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </form>
        <p>{{ url }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios"

import { PINATA_APIKEY, PINATA_SECRETAPIKEY } from '../keys'

export default {
  name: "SendChallenge",
  data: () => ({
    loading: false,
    title: "",
    description: "",
    to: "",
    url: ""
  }),
  computed: {
    isDisabled() {
      return !this.title || !this.description || !this.to;
    },
  },
  methods: {
    async sendChallenge() {
      try{
        console.log(this.title, this.description, this.to)

        const dateNow = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        const challengeData = JSON.stringify({ 
          to: this.to,
          title: this.title,
          description: this.description,
          dateNow
        })
        const prepareToUpload = new File(
          [JSON.stringify(
            {
              challengeData
            },
            null,
            1
          )], 'metadata.json');
        let data = new FormData()
        data.append('file', prepareToUpload)
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
          maxContentLength: "Infinity",
          headers: {
            "Content-Type": 'multipart/form-data',
            pinata_api_key: PINATA_APIKEY, 
            pinata_secret_api_key: PINATA_SECRETAPIKEY,
          }
        })
        let url = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
        console.log(url)
        this.url = url
      } catch(error) {
        console.log(error)
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .flexRow {
    display: flex !important;
  }

  .v-input--selection-controls {
    margin-top: 5px;
    margin-left: 7px;
  }
</style>