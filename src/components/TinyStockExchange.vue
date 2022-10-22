<template>
  <v-card
    max-width="550"
    class="mx-auto"
  >
    <v-toolbar
      color="cyan"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Tiny Stock Exchange</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'

const defaultAvatarUrl = 'https://cdn-icons-png.flaticon.com/512/3781/3781628.png'

export default {
  data: () => ({
    items: [
      { header: 'Received stocks' },
      // {
      //   avatar: defaultAvatarUrl,
      //   title: 'Some Title',
      //   subtitle: `<span class="text--primary">Test Name</span> doin it`,
      // },
      // { divider: true, inset: true },
    ],
  }),

  methods: {
    refreshStocksList () {
      const vm = this
      axios
        .get(vm.getAPIEndpoint() + '/tse/stocks')
        .then(response => {
          if (response === null || response.data === null) {
            console.error('ping server: received null response / data')
            return
          }

          console.log('all stocks response', response.data)
          if (response.data.result !== 'ok') {
            console.error('received non ok response', response.data.message)
            return
          }

          vm.items = [{ header: 'Received stocks' }]

          const stocks = JSON.parse(response.data.message)
          stocks.forEach(s => {
            vm.items.push({
              avatar: defaultAvatarUrl,
              title: s.ticker,
              subtitle: s.name,
            })
            vm.items.push({ divider: true, inset: true })
          })
          if (stocks.length > 0) {
            vm.items = vm.items.slice(0, -1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  },

  mounted: function () {
    this.refreshStocksList()
    setInterval(() => {
      console.log('refreshing stocks list ...')
      this.refreshStocksList()
    }, 2 * 60000)
  },
}
</script>
