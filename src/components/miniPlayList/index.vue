<template>
  <div class="mini-playlist">
    <Tabs :names="tabsName"  @activeIdxChange="activeIdxChange"></Tabs>
    <div class="btns" v-show="getHistoryList.length > 0 && activeIdx == 1">
      <button class="delete" @click="deleteClick">
        <i class="iconfont icon-delete"></i>
        <span>清除</span>
      </button>
    </div>
    <SongTable :imgShow="false" :songs="getCurrPlayList" :mini="true"
      v-show="activeIdx == 0"></SongTable>
    <SongTable :imgShow="false" :songs="getHistoryList" :mini="true"
      v-show="activeIdx == 1"></SongTable> 
  </div>
</template>

<script>
import SongTable from 'components/SongTable'
import Tabs from 'common/Tabs'
import {mapGetters} from 'vuex'

export default{
  name: 'miniPlayList',
  components: {
    SongTable,
    Tabs
  },
  data(){
    return{
      tabsName: ['播放列表', '播放历史'],
      activeIdx: 0
    }
  },
  methods:{
    activeIdxChange(index) {
      this.activeIdx = index
    },
    deleteClick() {
      this.$store.commit('clearHistoryList')
    }
  },
  computed: {
    ...mapGetters(['getCurrPlayList', 'getHistoryList'])
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
