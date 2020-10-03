<template>
  <header class="shadow w-screen bg-teal-600">
    <div class="container">
      <nav class="flex items-center justify-between flex-wrap bg-teal-600 p-6">
        <div class=" flex items-center flex-shrink-0 text-white mr-6">
          <cp-icon class="mr-4"/>
          <router-link class="font-semibold text-xl tracking-tight" :to="{ name: 'Home' }">ExchangeCoins</router-link>
        </div>
        <div class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm navLinks">
            <router-link 
            v-for="link in links" :key="link.title" :to="link.to"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {{ link.title }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import CpIcon from '@/components/CpIcon'

export default {
  name: 'CpHeader',
  components: {
    CpIcon
  },
  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
  .navLinks {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>