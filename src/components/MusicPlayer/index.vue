<template>
  <div class="music-player">
    <div class="music-player-btns">
      <i class="iconfont icon-music-prev" title="上一首"></i>
      <div class="play-btn">
        <i v-if="!getPlaying" class="iconfont icon-play" title="播放" @click="togglePlaying"></i>
        <i v-else class="iconfont icon-pause" title="暂停" @click="togglePlaying"></i>
      </div>
      <i class="iconfont icon-music-next" title="下一首"></i>
    </div>
    <div class="music-bar">
      <div class="music-bar-info"></div>
      <div class="music-bar-time"></div>
      <Progress class="music-progress"/>
    </div>
  </div>
</template>

<script>
import Progress from 'common/Progress'
import {mapGetters} from 'vuex'

export default{
  name: 'MusicPlayer',
  components: {
    Progress
  },
  data(){
    return{}
  },
  methods:{
    togglePlaying() {
      this.$store.commit('togglePlaying')
    }
  },
  computed: {
    ...mapGetters(['getPlaying', 'getCurrMusic'])
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
