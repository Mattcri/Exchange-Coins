<template>
  <div class="home">
    <cp-table/>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import { mapState, mapActions } from 'vuex'
import CpTable from '@/components/CpTable'

export default {
  name: 'Home',
  components: {
    CpTable
  },
  data: () => ({
    // coins: []
  }),
  computed: {
    // ...mapState(["coincaps"])
  },
  methods: {
    // ...mapActions(["getApi"])
  },
  
}
</script>
