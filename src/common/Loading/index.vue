<template>
  <div class="loading">
    <img :src="$config.loadingImg" alt="">
  </div>
</template>

<script>
export default{
  name: 'Loading',
  data(){
    return{}
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
