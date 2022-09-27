<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Server Status</div>
      <p class="text-h4 text--primary">
        {{status}}
      </p>
    </v-card-text>
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
      status: "todo"
    }),

    methods: {
      getStatus () {
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
          })
          .catch(error => {
            console.log(error)
            vm.status = error.message
          })
      },
    },

    mounted: function () {
      this.getStatus()
    },
  }
  </script>
