<template>
  <div v-if="totalPage" class="pagination">
    <i class="iconfont icon-page-prev" @click="pagePrev"></i>
    <span> {{currPage}} / {{totalPage}} </span>
    <i class="iconfont icon-page-next" @click="pageNext"></i>
  </div>
</template>

<script>
export default{
  name: 'Pagination',
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    currPage: {
      type:Number,
      default: 0
    }
  },
  data(){
    return{}
  },
  methods:{
    pagePrev() {
      if(this.currPage > 1)
        this.$emit('pagePrev')
    },
    pageNext() {
      if(this.currPage < this.totalPage)
        this.$emit('pageNext')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
