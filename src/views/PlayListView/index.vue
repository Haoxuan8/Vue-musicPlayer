<template>
  <div class="playlist-container" v-if="playlistDetail">
    <PlayListHeader
      :imgUrl="playlistDetail.coverImgUrl"
      :title="playlistDetail.name"
      :avatarUrl="playlistDetail.creator.avatarUrl"
      :creatorName="playlistDetail.creator.nickname"
      :createTime="playlistDetail.createTime"></PlayListHeader>

    <div class="playlist-table">
      <Tabs :names="tabNames" @activeIdxChange="activeIdxChange"/>
      <SongTable :songs="songs" v-show="activeIdx == 0"/>
    </div>
  </div>
</template>

<script>
import PlayListHeader from './PlayListHeader'
import Tabs from 'common/Tabs'
import SongTable from 'components/SongTable'

import { getPlayList, getMusicDetail } from 'network'
const MAX_SONGS = 500

export default{
  name: 'PlayListView',
  props: ['id'],
  created() {
    this.getMusicbyPlayList(this.id)
  },
  components: {
    PlayListHeader,
    Tabs,
    SongTable
  },
  data(){
    return{
      songs: [],
      playlistDetail: null,
      tabNames: ['歌曲列表', '评论'],
      activeIdx: 0
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
        tracksIds = tracksIds.slice(0,MAX_SONGS).toString()
        return getMusicDetail(tracksIds)
      }).then(res => {
        this.songs = res.data.songs
      }).catch(err => {
        this.$store.commit('setAlertMessage', err)
      }).finally(() => {
        this.$store.commit('setLoading', false)
        this.$store.commit('setMenuShowSp', false)
        })
    },
    activeIdxChange(index) {
      this.activeIdx = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
