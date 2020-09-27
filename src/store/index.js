import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coincaps: []
  },
  mutations: {
    GET_COINCAPS (state, coincaps) {
      state.coincaps = coincaps
    }
  },
  actions: {
    getApi ({commit}) {
      Axios.get('https://api.coincap.io/v2/assets?limit=30')
        .then(response => {
          commit('GET_COINCAPS', response.data)
        })
    }
  },
  modules: {
  }
})
