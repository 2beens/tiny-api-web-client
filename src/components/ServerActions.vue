<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>Server Actions</v-card-title>

    <v-card-text>
      <p class="text-h4 text--primary">
        {{response}}
      </p>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="harakiri"
      >
        Harakiri!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ServerActions',

  data: () => ({
    response: 'still empty...'
  }),

  methods: {
    harakiri () {
      console.warn('harakiri called')
      const vm = this
      axios
        .get(process.env.VUE_APP_TINY_API_ENDPOINT + '/harakiri')
        .then(response => {
          if (response === null || response.data === null) {
            console.error('harakiri call: received null response / data')
            return
          }
          console.log('harakiri response: ', response.data)
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
}
</script>
  