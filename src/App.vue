<template>
  <div id="app">
    <cp-header :links="links" />
    <main>
      <router-view class="container px-5 sm:px-20 py-20 flex justify-center"/>
    </main>
  </div>
</template>

<script>
import CpHeader from '@/components/CpHeader'

export default {
  components: {
    CpHeader
  },
  data: () => ({
    links: [
      { title: 'BTC', to: { name: 'CoinDetail', params: { id: 'bitcoin' } } },
      { title: 'ETH', to: { name: 'CoinDetail', params: { id: 'ethereum' } } },
      { title: 'XRP', to: { name: 'CoinDetail', params: { id: 'xrp' } } }
    ]
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
