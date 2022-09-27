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

    <!-- server status -->
    <v-row>
      <v-col>
        <ServerStatus/>
      </v-col>
    </v-row>

    <!-- actions -->

  </v-container>
</template>

<script>
import ServerStatus from './ServerStatus.vue';

export default {
  name: 'MainPlane',

  components: {
    ServerStatus,
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
