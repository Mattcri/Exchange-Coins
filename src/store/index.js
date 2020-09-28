// import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coins: [],
    coin: {},
    // route: 'bitcoin'
  },
  mutations: {
    GET_COINS (state, coins) {
      state.coins = coins
    },
    GET_COIN (state, coin) {
      state.coin = coin
    },
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
    }
  },
  modules: {
  }
})
