<template>
  <div class="playlist-container" v-if="playlistDetail" ref="playlistContainer">
    <PlayListHeader ref="header"
      :imgUrl="playlistDetail.coverImgUrl"
      :title="playlistDetail.name"
      :avatarUrl="playlistDetail.creator.avatarUrl"
      :creatorName="playlistDetail.creator.nickname"
      :createTime="playlistDetail.createTime"
      @playallClick="playallClick"></PlayListHeader>

    <div class="playlist-table">
      <Tabs :names="tabNames" @activeIdxChange="activeIdxChange"/>
      <SongTable :songs="songs" v-show="activeIdx == 0"/>
      <Comment :comments="comments" v-show="activeIdx == 1"
        :totalPage="totalPage" :currPage="currPage"
        @pagePrev="pagePrev" @pageNext="pageNext" />
    </div>
  </div>
</template>

<script>
import PlayListHeader from './PlayListHeader'
import Tabs from 'common/Tabs'
import SongTable from 'components/SongTable'
import Comment from 'components/Comment'

import { getPlayList, getMusicDetail, getPlaylistComment } from 'network'

export default{
  name: 'PlayListView',
  props: ['id'],
  created() {
    this.getMusicbyPlayList(this.id)
  },
  components: {
    PlayListHeader,
    Tabs,
    SongTable,
    Comment
  },
  data(){
    return{
      songs: [],
      comments: [],
      playlistDetail: null,
      tabNames: ['歌曲列表'],
      activeIdx: 0,
      commentNum: 0,
      totalPage: 0,
      currPage: 0,
    }
  },
  watch: {
    id(newVal) {
      this.getMusicbyPlayList(newVal)
    }
  },
  methods:{
    getMusicbyPlayList(id) {
      this.$store.commit('setLoading', true)
      getPlayList(id).then(res => {
        this.playlistDetail = res.data.playlist
        let tracksIds = res.data.playlist.trackIds.map(i => i.id)
        tracksIds = tracksIds.slice(0,this.$config.maxSong).toString()
        return getMusicDetail(tracksIds)
      }).then(res => {
        this.songs = res.data.songs
        return getPlaylistComment(id, 0)
      }).then(res => {
        this.commentNum = res.data.total
        this.totalPage = Math.ceil(this.commentNum / this.$config.commentLimit)
        this.currPage = 1
        this.comments = res.data.comments
        this.tabNames.push('评论' + `(${this.commentNum})`)
      }).finally(() => {
        this.$store.commit('setLoading', false)
        this.$store.commit('setMenuShowSp', false)
        this.$store.commit('setLyricShowSp', false)
        })
    },
    activeIdxChange(index) {
      this.activeIdx = index
    },
    playallClick() {
      this.$store.commit('setPlayList', this.songs)
      this.$store.commit('setCurrMusicIndex', 0)
    },
    pagePrev() {
      this.$store.commit('setLoading', true)
      getPlaylistComment(this.id,this.currPage-2).then(res => {
        this.comments = res.data.comments
        this.currPage -= 1
      }).finally(() => {
        this.$store.commit('setLoading', false)
        this.$nextTick(() => {
          this.$refs.playlistContainer.scrollTop = this.$refs.header.$el.offsetHeight
        })
      })
    },
    pageNext() {
      this.$store.commit('setLoading', true)
      getPlaylistComment(this.id,this.currPage).then(res => {
        this.comments = res.data.comments
        this.currPage += 1
      }).finally(() => {
        this.$store.commit('setLoading', false)
        this.$nextTick(() => {
          this.$refs.playlistContainer.scrollTop = this.$refs.header.$el.offsetHeight
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
