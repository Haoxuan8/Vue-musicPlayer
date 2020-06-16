<template>
  <div class="tabs">
    <div class="tab" v-for="(item,index) in names" :key="index"
      :class="{'tab-active': index === activeIdx}"
      @click="tabClick(index)">
      {{item}}
    </div>
  </div>
</template>

<script>
export default{
  name: 'Tabs',
  props: {
    names: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      activeIdx: 0
    }
  },
  methods:{
    tabClick(index) {
      this.activeIdx = index
      this.$emit('activeIdxChange', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
