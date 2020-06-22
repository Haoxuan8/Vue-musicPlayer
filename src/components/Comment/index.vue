<template>
  <div class="comment-list">
    <div class="info" v-if="!comments.length">暂时没有评论哦~</div>
    <CommentItem v-for="(item,index) in comments" :key="index"
      :comment="item"/>
    <Pagination :totalPage="totalPage" :currPage="currPage" 
      @pagePrev="pagePrev" @pageNext="pageNext" />
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import Pagination from 'common/Pagination'

export default{
  name: 'Comment',
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    totalPage: {
      type: Number,
      default: 0
    },
    currPage: {
      type: Number,
      default: 0
    }
  },
  components: {
    CommentItem,
    Pagination
  },
  data(){
    return{}
  },
  methods:{
    pagePrev() {
      this.$emit('pagePrev')
    },
    pageNext() {
      this.$emit('pageNext')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
