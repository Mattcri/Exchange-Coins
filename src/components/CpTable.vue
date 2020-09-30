<template>
  <table>
    <thead>
      <tr class="bg-gray-200 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span @click="changeSortOrder" class="underline cursor-pointer">Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr 
      v-for="coin in filteredCoins" :key="coin.id"
      class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
          :src="`https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`"
          :alt="coin.name"
          class="w-15 h-12"
          >
        </td>
        <td><b>#{{ coin.rank }}</b></td>
        <td>
          <router-link class="hover:underline text-green-600" :to="{ name: 'CoinDetail', params: { id: coin.id } }">
          <b>{{ coin.name }}</b>
          </router-link>
          <small class="ml-1 text-gray-700">
            {{ coin.symbol }}
          </small>
        </td>
        <td>{{ coin.priceUsd | dollar }}</td>
        <td>{{ coin.marketCapUsd | dollar }}</td>
        <td :class="coin.changePercent24Hr >= parseInt(0) ? 'text-green-600' : 'text-red-600'">
           <b>{{ coin.changePercent24Hr | percent }}</b>
        </td>
        <td class="hidden sm:block">
          <cp-button @button-click="goToCoin(coin.id)">
            <span>Detalle</span>
          </cp-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import CpButton from '@/components/CpButton.vue'

export default {
  name: 'CpTable',
  components: {
    CpButton
  },
  data: () => ({
    filter: '',
    sortOrder: 1
  }),
  props: {
    coins: Array
  },
  computed: {
    filteredCoins() {
      
      return this.coins.filter(coin => //filtra los elem. del array coins
      coin.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
      coin.name.toLowerCase().includes(this.filter.toLowerCase())
      )
      .sort((current, compare) => { //cambia el orden del array coins según el rank
        if (parseInt(current.rank) > parseInt(compare.rank)) {
          return this.sortOrder
        }
        return this.sortOrder * -1
      })
    }
  },
  methods: {
    goToCoin(id) { // trae el id del objeto coin y lo pasa como ruta
      this.$router.push({ name: 'CoinDetail', params: {id} })
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    }
  },
  created() {
    // this.getApi()
  }

}
</script>

<style scoped>

  /* td > img {
    height: 67px;
  } */

  .up::before {
    content: "👆";
  }

  .down::before {
    content: "👇";
  }

  td {
    padding: 20px 0px;
    font-size: 0.6rem;
    text-align: center;
  }

  th {
    padding: 5px;
    font-size: 0.6rem;
  }

  @media (min-width: 640px) {
    td,
    th {
      padding: 20px;
      font-size: 1rem;
    }

    th {
      padding: 12px;
    }
  }

</style>