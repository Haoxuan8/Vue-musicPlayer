<template>
  <div class="song-list">
    <li v-for="(item,index) in songs" :key="index" class="song-item">
      <div class="img-wrap">
        <img v-lazy="item.al.picUrl" alt="">
      </div>
      <div class="song-title">
        <div class="song-name">{{item.name}}</div>
        <div class="song-meta">{{item.ar[0].name}} / {{item.al.name}}</div>
      </div>
      <div class="song-time">
        {{formatDTime(item.dt)}}
      </div>
    </li>
  </div>
</template>

<script>
import { formatDTime } from '@/utlis/common'

export default{
  name: 'SongTable',
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{}
  },
  methods:{
    formatDTime(time) {
      return formatDTime(time)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
