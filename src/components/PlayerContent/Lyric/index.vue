<template>
  <div class="music-lyric" :class="{'lyric-active-sp': getLyricShowSp}">
    <div class="lyric-img">
      <img :src="getCurrMusicAlImg" :class="{'img-rotating': getPlaying}" alt="">
    </div>
    <div class="lyric-bg"></div>
    <div class="lyric-content" ref="lyricContent">
      <div class="lyric-block" ref="lyricBlock">
        <div v-if="!lyric.length" class="lyric-line">暂无歌词</div>
        <div class="lyric-line" v-for="(item,index) in lyric" :key="index"
          :class="{'lyric-line-active': index == lyricIdx}">
          {{item.text}}          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLyric } from 'network'
import { parseLyric } from 'utlis/common'

export default{
  name: 'Lyric',
  data(){
    return{
      lyric: [],
      lyricIdx: 0,
      lyricTop: []
    }
  },
  methods:{
    getCurrLyric(music) {
      getLyric(music.id).then(res => {
        if(res.data.lrc){
          this.lyric = parseLyric(res.data.lrc.lyric)
          this.$nextTick(() => {
            this.lyricTop = []
            let top = 0
            for(let i=0;i<this.lyric.length;i++){
              this.lyricTop.push(top)
              let line = document.querySelector(`.lyric-line:nth-of-type(${i+1})`)
              let height = line.offsetHeight
              top += height
            }
          })
        }
        else
          this.lyric = []
      })
    }
  },
  watch: {
    getCurrMusic(newMusic) {
      this.lyricIdx = 0
      this.getCurrLyric(newMusic)
    },
    getPercent(newVal) {
      if(this.lyric.length) {
        const time = newVal * this.getCurrMusic.dt / 1000
        let lyricIdx = 0
        for(let i=0; i<this.lyric.length; i++) {
          if(time > this.lyric[i].time)
            lyricIdx = i
        }
        this.lyricIdx = lyricIdx
      }
    },
    lyricIdx(newVal) {
      let height = this.lyricTop[newVal]
      this.$refs.lyricContent.scrollTop = height
    }
  },
  computed: {
    ...mapGetters(['getCurrMusic', 'getCurrMusicAlImg', 'getPlaying', 'getPercent', 'getLyricShowSp'])
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
