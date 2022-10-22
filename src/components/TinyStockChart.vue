<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          v-if="stock" 
          class="mx-auto text-center"
          color="cyan"
          dark
        >
          <v-card-text>
            <v-sheet color="blue">
              <v-sparkline
                :value="value"
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
              {{ stock.ticker }}
            </div>
            <div class="text-h4 font-weight-thin">
              {{ stock.name }}
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn
              block
              text
              @click="printRawData"
            >
              Print Raw Data
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-textarea
        clearable
        clear-icon="mdi-close-circle"
        label="Deltas Raw Data"
        :value="deltasRawData"
      ></v-textarea>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    stock: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    deltasRawData: ''
  }),
  computed: {
    value() {
      if (!this.stock || !this.stock.deltas) { return }

      const deltas = []
      // TODO: sort by timestamp if necessary
      // debugger; // eslint-disable-line no-debugger
      this.stock.deltas.forEach(d => {
        deltas.push(d.delta)
      })

      return deltas
    }
  },
  methods: {
    printRawData() {
      this.deltasRawData = JSON.stringify(this.stock.deltas) + JSON.stringify(this.stock.values)
    }
  }
}
</script>
