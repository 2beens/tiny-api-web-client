<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>
      <v-row>
        <v-col cols="4">          
          <h2>Server Actions</h2>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="apiEndpoint"
            label="API Endpoint"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            tile
            color="success"
            @click="onSetEndpoint"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            Set
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <p class="text-h4 text--primary">
        Resp: <span style="font-weight: 300; color: cornflowerblue;">{{responseTime}}</span> <span style="font-weight: 300; background-color: aqua;">{{response}}</span>
      </p>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        text
        color="red accent-4"
        @click="makeRequest('/harakiri')"
      >
        Harakiri!
      </v-btn>
      <v-btn
        text
        color="teal accent-4"
        @click="makeRequest('/health')"
      >
        Health
      </v-btn>
      <v-btn
        text
        color="teal accent-4"
        @click="makeRequest('/')"
      >
        Root Call
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ServerActions',

  data: () => ({
    responseTime: '',
    response: '...',
    apiEndpoint: '',
  }),

  methods: {
    onSetEndpoint () {
      if (!this.apiEndpoint || this.apiEndpoint === '') {
        return
      }
      console.log('setting api endpoint to: ', this.apiEndpoint)
      this.setAPIEndpoint(this.apiEndpoint)
    },
    makeRequest (actionPath) {
      console.warn('calling:', actionPath)
      const vm = this
      axios
        .get(vm.getAPIEndpoint() + actionPath)
        .then(response => {
          if (response === null || response.data === null) {
            console.error('calling:', actionPath, 'received null response / data')
            return
          }          
          console.log(actionPath, 'response: ', response.data)

          vm.responseTime = vm.getTimestampString(new Date(), true)

          vm.response = response.data.message
          if (!vm.response || vm.response === '') {
            vm.response = response.data
          }
        })
        .catch(error => {
          console.log(error)
          vm.response = error.message
        })
    },
  },

  mounted: function () {
    this.apiEndpoint = this.getAPIEndpoint()
  }
}
</script>
  