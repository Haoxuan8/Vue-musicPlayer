<template>
  <div class="player-content">
    <Menu class="menu-view"/>
      <div class="router-view-container">
        <transition name="router-view-fade" mode="out-in"> 
          <router-view
            class="router-view" ref="routerView" 
            :key="$route.path">
          </router-view>
        </transition>
      </div>
    <Lyric class="lyric-view"/>
  </div>
</template>

<script>
import Menu from './Menu'
import Lyric from './Lyric'

export default{
  name: 'PlayerContent',
  components: {
    Menu,
    Lyric
  },
  data(){
    return{}
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
