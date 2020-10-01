// import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coins: [],
    coin: {},
    history: [],
    markets: []
  },
  mutations: {
    GET_COINS (state, coins) {
      state.coins = coins
    },
    GET_COIN (state, coin) {
      state.coin = coin
    },
    GET_HISTORY (state, history) {
      state.history = history
    },
    GET_MARKETS (state, markets) {
      state.markets = markets
    }
  },
  actions: {
    getApi ({commit}) {
      return fetch('https://api.coincap.io/v2/assets?limit=30')
        .then(response => response.json())
        .then(response => {
          commit('GET_COINS', response.data)
        })
        .catch(reject => console.error(reject))
    },
    getCoin ({commit}, id) {
      return fetch(`https://api.coincap.io/v2/assets/${id}`)
        .then(response => response.json())
        .then(response => {
          commit('GET_COIN', response.data)
        })
        .catch(reject => console.error(reject))
    },
    getHistory ({commit}, coin) {
      const now = new Date()
      const end = now.getTime()
      now.setDate(now.getDate() - 1)
      const start = now.getTime()
      
      return fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
        .then(response => response.json())
        .then(response => {
          commit('GET_HISTORY', response.data)
        })
        .catch(reject => console.error(reject))
    },
    async getMarkets ({commit}, coin) {
      let api = await fetch(`https://api.coincap.io/v2/assets/${coin}/markets?limit=5`)
      let response = await api.json()
      response = await commit('GET_MARKETS', response.data)
      return response
        // .then(response => {
        //   commit('GET_MARKETS', response.data)
        // })
        // .catch(reject => console.error(reject))
    },
    async getExChange(id) {
      let api = await fetch(`https://api.coincap.io/v2/exchanges/${id}`)
      let response = await api.json()
      return response
        // .then(response => response.json())
        // .then(response => response.data)

    }
  },
  getters: {
    coin: (state) => {
      return state.coin
    }
  },
  modules: {
  }
})
