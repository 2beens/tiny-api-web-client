<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-title>
      Server Status
      <v-icon v-if="errStatus" large color="red darken-2">mdi-circle</v-icon>
      <v-icon v-else           large color="green darken-2">mdi-circle</v-icon>
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
        Ping now!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ServerStatus',

  data: () => ({
    status: 'checking ...',
    errStatus: false
  }),

  methods: {
    getStatus () {
      this.status = 'checking ...'
      const vm = this
      axios
        .get(process.env.VUE_APP_TINY_API_ENDPOINT + '/ping')
        .then(response => {
          if (response === null || response.data === null) {
            console.error('ping server: received null response / data')
            return
          }
          console.log('ping response', response.data)
          vm.status = response.data.message
          vm.errStatus = false
        })
        .catch(error => {
          console.log(error)
          vm.status = error.message
          vm.errStatus = true
        })
    },
  },

  mounted: function () {
    this.getStatus()
    setInterval(() => {
      console.log('pinging server ...')
      this.getStatus()
    }, 5000)
  },
}
</script>
