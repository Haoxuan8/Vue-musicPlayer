<template>
  <div class="song-list" :class="{'song-list-mini': mini}">
    <li v-for="(item,index) in songs" :key="index" class="song-item" @click="musicClick(index)">
      <div class="img-wrap" v-if="imgShow">
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
import { formatDTime } from 'utlis/common'

export default{
  name: 'SongTable',
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    imgShow: {
      type: Boolean,
      default: true
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{}
  },
  methods:{
    formatDTime(time) {
      return formatDTime(time)
    },
    musicClick(index) {
      this.$store.commit('setPlayList', this.songs)
      this.$store.commit('setCurrMusicIndex', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
