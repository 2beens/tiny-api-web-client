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
  export default {
    name: 'ServerStatus',
  
    data: () => ({
      status: "todo"
    }),

    methods: {
      getStatus () {
        console.log('todo')
      },
    },
  }
  </script>
