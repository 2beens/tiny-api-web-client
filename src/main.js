import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    date2string (aDate) {
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(aDate)
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(aDate)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(aDate)
      return `${da}-${mo}-${ye}`
    },
    getTimestampString (date) {
      const hourInfo = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)

      const y = date.getFullYear()
      const m = date.getMonth()
      const d = date.getDate()
      const dateInfo = ('0' + d).slice(-2) + '/' + ('0' + (m + 1)).slice(-2) + '/' + y

      return dateInfo + ' ' + hourInfo
    },
    setAPIEndpoint (endpoint) {
      console.log('setting api endpoing to:', endpoint)
      localStorage.setItem('tiny_api_endpoint', endpoint)
    },
    getAPIEndpoint () {
      const endpoint = localStorage.getItem('tiny_api_endpoint')
      if (!endpoint || endpoint === '') {
        return process.env.VUE_APP_DEFAULT_TINY_API_ENDPOINT
      }
      return endpoint
    }
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
