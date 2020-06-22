<template>
  <div class="discovery">
    <PersonalizedList :list="personalizedList"/>
  </div>
</template>

<script>
import PersonalizedList from './PersonalizedList'
import { getPersonalizedList } from 'network'

export default{
  name: 'Discovery',
  components: {
    PersonalizedList
  },
  data(){
    return{
      personalizedList: [],
    }
  },
  created() {
    this.requestData()
  },
  methods:{
    requestData() {
      this.$store.commit('setLoading', true)
      getPersonalizedList().then(res => {
        this.personalizedList = res.data.result
      }).finally(() => {
        this.$store.commit('setLoading', false)
        this.$store.commit('setMenuShowSp', false)
        this.$store.commit('setLyricShowSp', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
