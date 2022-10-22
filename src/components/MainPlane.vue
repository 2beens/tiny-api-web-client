<template>
  <v-container>
    <v-row id="header-row" class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Tiny API Web Client
        </h1>

        <p class="subheading font-weight-regular">
          A small web project used to test interaction between different services/pods in a k8s cluster.
          <br/>
          Related projects:
          <br/>
          Go API: 
          <a
            href="https://github.com/2beens/tiny-api"
            target="_blank"
          >2beens/tiny-api</a>
          <br/>
          Go Tiny Service [tiny stock exchange]: 
          <a
            href="https://github.com/2beens/tiny-service"
            target="_blank"
          >2beens/tiny-service</a>
          <br/>
          k8s configs:
          <a
            href="https://github.com/2beens/tiny-api-k8s"
            target="_blank"
          >2beens/tiny-api-k8s</a>
          <br/>
          This project:
          <a
            href="https://github.com/2beens/tiny-api-web-client"
            target="_blank"
          >2beens/tiny-api-web-client</a>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <ServerStatus/>
      </v-col>
      <v-col cols="9">
        <ServerActions/>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <TinyStockExchangeStatus/>
      </v-col>
      <v-col cols="9">
        <TinyStockExchange/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import ServerStatus from './ServerStatus.vue'
import ServerActions from './ServerActions.vue'
import TinyStockExchangeStatus from './TinyStockExchangeStatus.vue'
import TinyStockExchange from './TinyStockExchange.vue'

export default {
  name: 'MainPlane',

  components: {
    ServerStatus,
    ServerActions,
    TinyStockExchangeStatus,
    TinyStockExchange
  },

  data: () => ({
    
  }),
}
</script>

<style>
#header-row {
  background-color: rgb(190, 218, 235);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
