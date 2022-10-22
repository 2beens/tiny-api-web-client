<template>
  <v-card
    v-if="stock" 
    class="mx-auto text-center"
    color="cyan"
    dark
  >
    <v-card-text>
      <v-sheet color="blue">
        <v-sparkline
          :labels="labels"
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
      >
        Go to Report
      </v-btn>
    </v-card-actions>
  </v-card>
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
    labels: [
    '12am',
    '3am',
    '6am',
    '9am',
    '12pm',
    '3pm',
    '6pm',
    '9pm',
    ],
    value: [
      800,
      200,
      200,
      200,
      200,
      460,
      250,
      240,
    ],
  }),
}
</script>
