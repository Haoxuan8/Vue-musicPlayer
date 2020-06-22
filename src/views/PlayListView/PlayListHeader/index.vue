<template>
  <div class="playlist-header">
    <div class="bg-img" :style="{'background-image': 'url('+imgUrl+')'}"></div>
    <div class="img-wrap">
      <img :src="imgUrl" alt="">
    </div>
    <div class="content">
      <div class="title-wrap">
        <div class="title">{{title}}</div>
      </div>
      <div class="creator-wrap">
        <img :src="avatarUrl" alt="">
        <div class="creator-name">{{creatorName}}</div>
        <div class="create-time">创建于 {{getCreateDate}}</div>
      </div>
      <div class="action-wrap">
        <button @click="playallClick">播放全部</button>
      </div>
      <div class="desc-wrap"></div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'utlis/common'

export default{
  name: 'PlayListHeader',
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    creatorName: {
      type: String,
      default: ''
    },
    createTime: {
      type: Number,
      default: 0
    }
  },
  data(){
    return{}
  },
  methods:{
    playallClick() {
      this.$emit('playallClick')
    }
  },
  computed: {
    getCreateDate() {
      return formatDate(this.createTime)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
