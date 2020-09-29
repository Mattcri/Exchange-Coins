<template>
  <div class="home">
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <cp-table v-if="!isLoading" :coins="coins" />
    
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import CpTable from '@/components/CpTable'

export default {
  name: 'Home',
  components: {
    CpTable
  },
  data: () => ({
    isLoading: false
  }),
  computed: {
    ...mapState(['coins'])
  },
  methods: {
    ...mapActions(['getApi'])
  },
  created() {
    this.isLoading = true
    this.getApi().finally(() => this.isLoading = false)
  }
  
}
</script>
