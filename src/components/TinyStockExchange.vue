<template>
  <v-container>
    <TinyStocksList
      @update:selected="showChart"
    />
    <br/>
    <TinyStockChart
      :stock="selectedStock"
    />
    <br/>
  </v-container>
</template>

<script>
import axios from 'axios'
import TinyStocksList from './TinyStocksList.vue'
import TinyStockChart from './TinyStockChart.vue'

export default {
  components: {
    TinyStocksList,
    TinyStockChart
  },

  data: () => ({
    selectedStock: null
  }),

  methods: {
    showChart(stock) {
      this.selectedStock = stock

      console.warn('getting value deltas for', stock.ticker)
      const vm = this
      axios
        .get(vm.getAPIEndpoint() + '/tse/deltas')
        .then(response => {
          if (response === null || response.data === null) {
            console.error('get stock value deltas: received null response / data')
            return
          }

          console.log('get stock value deltas', response.data)
          if (response.data.result !== 'ok') {
            console.error('received non ok response', response.data.message)
            return
          }

          const deltas = JSON.parse(response.data.message)
          console.log(deltas)

          vm.selectedStock.deltas = deltas
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
