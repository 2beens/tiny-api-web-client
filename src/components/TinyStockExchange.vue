<template>
  <v-container>
    <TinyStocksList
      @update:selected="showChart"
    />

    <br/>

    <v-row>
      <v-col>
        <v-card
          v-if="selectedStock" 
          class="mx-auto text-center"
          color="cyan"
          dark
        >
          <v-card-text>
            <v-sheet color="blue">
              <v-sparkline
                :value="deltas"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item">
                  {{ item.value }} $
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h3">
              {{ selectedStock.ticker }}
            </div>
            <div class="text-h4 font-weight-thin">
              {{ selectedStock.name }}
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn block text>
              Add Delta
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br/>
  </v-container>
</template>

<script>
import axios from 'axios'
import TinyStocksList from './TinyStocksList.vue'

export default {
  components: {
    TinyStocksList,
  },

  data: () => ({
    selectedStock: null,
    deltas: []
  }),

  methods: {
    showChart(stock) {
      this.selectedStock = stock
      this.deltas = []

      const vm = this
      axios
        .get(vm.getAPIEndpoint() + '/tse/deltas')
        .then(response => {
          if (response === null || response.data === null) {
            console.error('get stock value deltas: received null response / data')
            return
          }

          if (response.data.result !== 'ok') {
            console.error('received non ok response', response.data.message)
            return
          }

          // debugger; // eslint-disable-line no-debugger
          JSON.parse(response.data.message).forEach(d => {
            vm.deltas.push(d.delta)
          })

          console.log('gotten', vm.deltas.length, 'deltas for stock', vm.selectedStock.ticker)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
