<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    {{u}}
  </div>
</template>

<script>
import Header from 'components/Header'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      u: this.$store.state
    }
  }
}
</script>

<style>

</style>
