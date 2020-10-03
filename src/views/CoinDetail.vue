<template >
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading" >
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img 
          :src="`https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`"
          :alt="coin.name"
          class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ coin.name }}
            <small class="sm:mr-2 text-gray-500">{{ coin.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span><b>#{{coin.rank}}</b></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span><b>{{ coin.priceUsd | dollar }}</b></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span><b>{{ minPrice | dollar }}</b></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span><b>{{ maxPrice | dollar }}</b></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span><b>{{ promPrice | dollar }}</b></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span><b>{{ coin.changePercent24Hr | percent }}</b></span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button @click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >{{ fromUsd ? `USD a ${coin.symbol}` : `${coin.symbol} a USD` }}</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                :placeholder="`Valor en ${fromUsd ? 'USD' : coin.symbol}`"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl">{{ convertResult }} {{ fromUsd ? `USD a ${coin.symbol}` : `${coin.symbol} a USD` }}</span>
        </div>
      </div>
      <line-chart 
        class="my-10"
        :colors="['orange']"
        :min="minPrice"
        :max="maxPrice"
        :data="chartData"
      />
      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="market in markets" :key="`${market.exchangeId}-${market.priceUsd}`" class="border-b">
          <td>
            <b>{{ market.exchangeId }}</b>
          </td>
          <td>{{ market.priceUsd | dollar}}</td>
          <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
          
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'


export default {
  name: 'CoinDetail',
  data: () => ({
    isLoading: false,
    fromUsd: true,
    convertValue: null,
    
  }),
  created() {
    this.getCoinId()
  },
  computed: {
    ...mapState(['coin', 'history', 'markets']),
    markets() {
      return this.$store.state.markets
    },
    convertResult() {
      if (!this.convertValue) {
        return 0
      }
      const result = this.fromUsd 
        ? this.convertValue / this.coin.priceUsd
        : this.convertValue * this.coin.priceUsd
      return result.toFixed(4)
    },
    minPrice() {
      return Math.min(
        ...this.history.map(obj => parseFloat(obj.priceUsd).toFixed(2))
      )
    },
    maxPrice() {
      return Math.max(
        ...this.history.map(obj => parseFloat(obj.priceUsd).toFixed(2))
      )
    },
    promPrice() {
      return this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length
    },
    chartData() {
      const data = []
      this.history.map(res => {
        data.push([res.date, parseFloat(res.priceUsd).toFixed(2)])
      })
      return data
    }
  },
  methods: {
    ...mapActions(['getCoin', 'getHistory', 'getMarkets']),
    getCoinId() {
      const id = this.$route.params.id
      this.isLoading = true
      Promise.all([this.getCoin(id), this.getHistory(id), this.getMarkets(id)])
        // .then(([resCoin, resHistory, resMarkets]) => {
        //   this.coin = resCoin
        //   this.history = resHistory
        //   this.markets = resMarkets
        // })
        .finally(() => this.isLoading = false)

      // this.getCoin(id).then(res => this.coin = res)
    },
    toggleConverter() {
      this.fromUsd = !this.fromUsd
    }
  },
  watch: {
    $route() {
      this.getCoinId()
    }
  }


}
</script>

<style scoped>
  td {
    padding: 10px;
    text-align: center;
  }


</style>