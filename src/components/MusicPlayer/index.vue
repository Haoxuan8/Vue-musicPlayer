<template>
  <div class="music-player">
    <div class="music-player-btns" :class="{disable: !Boolean(getCurrMusic)}">
      <i class="iconfont icon-music-prev" title="上一首" @click="prevClick"></i>
      <div class="play-btn">
        <i v-if="!getPlaying" class="iconfont icon-play" title="播放" @click="togglePlaying"></i>
        <i v-else class="iconfont icon-pause" title="暂停" @click="togglePlaying"></i>
      </div>
      <i class="iconfont icon-music-next" title="下一首" @click="nextClick"></i>
    </div>
    <div class="player-coverimg">
      <img :src="getCurrMusicAlImg" alt="" @click="alImgClick">
      <div class="music-bar">
        <div class="music-bar-meta">
          <div class="music-bar-info">{{songName}}</div>
          <div class="music-bar-time">{{currTimeFormat}} / {{getCurrMusicDt()}}</div>
        </div>
        <Progress class="music-progress" :percent="getPercent"
          :class="{disable: !Boolean(getCurrMusic)}"
          @percentChangeEnd="percentChangeEndSong"/>
      </div>
    </div>
    <div class="mode-btns">
      <i v-if="!getPlaying" class="iconfont icon-play sp-icon"  @click="togglePlaying"></i>
      <i v-else class="iconfont icon-pause sp-icon" @click="togglePlaying"></i>
      <PlayMode :modeName="$config.playMode" :mode="mode" @modeClick="modeClick" class="playmode"></PlayMode>
      <div class="mini-playlist">
        <i class="iconfont icon-play-list" @click="miniPlylistClick"></i>
        <transition name="mini-playlist-transition">
          <miniPlayList class='mini-playlist-content' v-show="miniPlaylistShow"></miniPlayList>
        </transition>
      </div>
    </div>
    <div class="music-volume">
      <i class="iconfont icon-volume"></i>
      <Progress class="music-volume-progress" :percent="volume"
        @percentChange="percentChangeVolume">
      </Progress>
    </div>
    <audio :src="currMusicUrl" ref="audio"
    @timeupdate="timeUpdate"
    @ended="nextClick">
    </audio>
  </div>
</template>

<script>
import Progress from 'common/Progress'
import PlayMode from './PlayMode'
import miniPlayList from 'components/miniPlayList'
import { getMusicUrl } from 'network'
import {mapGetters} from 'vuex'
import { formatDTime } from 'utlis/common'
import { getVolumeVal, setVolumeVal, getMode, setMode } from '@/utlis/storage'

export default{
  name: 'MusicPlayer',
  components: {
    Progress,
    PlayMode,
    miniPlayList
  },
  data(){
    return{
      currMusicUrl: "",
      currTimeFormat: '0:00',
      songName: '',
      volume: getVolumeVal(this.$config.defaultVolume),
      mode: getMode(),
      miniPlaylistShow: false
    }
  },
  mounted() {
    this.$refs.audio.volume = this.volume
  },
  methods:{
    togglePlaying() {
      if(this.getCurrMusic)
        this.$store.commit('setPlaying', !this.getPlaying)
    },
    miniPlylistClick() {
      this.miniPlaylistShow = !this.miniPlaylistShow
    },
    getcurrMusicUrl(song) {
      this.$store.commit('setPlaying', false)
      this.songName = song.name
      getMusicUrl(song.id).then(res => {
        this.currMusicUrl = res.data.data[0].url
        if(!this.currMusicUrl) {
          //this.$store.commit('setAlertMessage', '找不到歌曲呀')
          console.log('找不到歌曲 - ' + song.name)
          this.nextClick()
          return
        }
        this.$store.commit('addHistoryList', song)
        setTimeout(() => {this.$store.commit('setPlaying', true)}, 200)
      }).catch(err => {
        this.$store.commit('setAlertMessage', err)
      })
    },
    getCurrMusicDt() {
      return formatDTime(this.getCurrMusic ? this.getCurrMusic.dt : 0)
    },
    formatTime(time) {
      return formatDTime(time)
    },
    play() {
      this.$refs.audio.play()
    },
    pause() {
      this.$refs.audio.pause()
    },
    timeUpdate(e) {
      this.$store.commit('setCurrTime', e.target.currentTime)
    },
    percentChangeEndSong(percent) {
      this.$refs.audio.currentTime = percent * (this.getCurrMusic ? this.getCurrMusic.dt : 0) / 1000
      this.$store.commit('setPlaying', true)
    },
    percentChangeVolume(percent) {
      this.volume = percent
      this.$refs.audio.volume = this.volume
      setVolumeVal(percent)
    },
    prevClick() {
      this.$store.commit('prevIndex', this.mode)
    },
    nextClick() {
      this.$store.commit('nextIndex', this.mode)
      this.$refs.audio.currentTime = 0
    },
    modeClick(modeNum){
      this.mode = modeNum
      setMode(modeNum)
    },
    alImgClick() {
      this.$store.commit('toggleLyricShowSp')
    }
  },
  watch: {
    getCurrMusic(newMusic) {
      if(!newMusic) {
        this.$store.commit('setPlaying', false)
        this.songName = ""
        return
      }
      this.getcurrMusicUrl(newMusic)
    },
    getPlaying(playing) {
      if(playing) {
        this.play()
      } else {
        this.pause()
      }
    },
    getPercent(newVal) {
      this.currTimeFormat = formatDTime(Math.floor(newVal * (this.getCurrMusic ? this.getCurrMusic.dt : 0)))
    }
  },
  computed: {
    ...mapGetters(['getPlaying', 'getCurrMusic', 'getPercent', 'getCurrMusicAlImg'])
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
