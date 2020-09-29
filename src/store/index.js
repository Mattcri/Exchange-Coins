// import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coins: [],
    coin: {},
    history: []
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
    }
  },
  modules: {
  }
})
