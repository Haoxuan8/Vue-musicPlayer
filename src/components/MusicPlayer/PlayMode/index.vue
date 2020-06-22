<template>
  <div>
    <div v-for="(item,index) in modeName" :key="index" v-show="index == mode">
      <i class="iconfont" :class="[item.icon]" @click="modeClick" :title="item.name"></i> 
    </div>
  </div>
</template>

<script>
export default{
  name: 'PlayMode',
  props: {
    modeName: {
      type: Array,
      default: () => []
    },
    mode: {
      type: Number,
      default: 0
    }
  },
  data(){
    return{
    }
  },
  methods:{
    modeClick() {
      let modeNum = (this.mode + 1) % this.modeName.length
      this.$emit('modeClick', modeNum)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
