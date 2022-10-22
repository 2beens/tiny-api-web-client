<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>
      Tiny Stock Exchange Status
      <v-icon v-if="errStatus" large color="red darken-2">mdi-circle</v-icon>
      <v-icon v-else-if="checking" large color="yellow darken-2">mdi-circle</v-icon>
      <v-icon v-else-if="!isInReadyStatus" large color="yellow darken-2">mdi-circle</v-icon>
      <v-icon v-else-if="isInReadyStatus" large color="green darken-2">mdi-circle</v-icon>
    </v-card-title>

    <v-card-text>
      <p class="text-h4 text--primary">
        {{status}}
      </p>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="getStatus"
      >
        Check now!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script>
  import axios from 'axios'
  
  export default {
    name: 'TinyStockExchangeStatus',
  
    data: () => ({
      status: 'checking ...',
      errStatus: false,
      isInReadyStatus: false,
      checking: true
    }),
  
    methods: {
      getStatus () {
        this.status = 'checking ...'
        this.checking = true
        this.nonReadyStatus = false
        const vm = this
        axios
          .get(vm.getAPIEndpoint() + '/tse/status')
          .then(response => {
            if (response === null || response.data === null) {
              console.error('ping server: received null response / data')
              return
            }
            console.log('tse status response', response.data)
            vm.status = response.data.message
            vm.errStatus = false
            if (response.data.message.toLowerCase().includes("ready")) {
                vm.isInReadyStatus = true
            }
          })
          .catch(error => {
            console.log(error)
            vm.status = error.message
            vm.errStatus = true
          })
          .finally(() => { vm.checking = false })
      },
    },
  
    mounted: function () {
      this.getStatus()
      setInterval(() => {
        console.log('pinging server ...')
        this.getStatus()
      }, 60000)
    },
  }
  </script>
  