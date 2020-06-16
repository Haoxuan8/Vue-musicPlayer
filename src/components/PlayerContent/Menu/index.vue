<template>
  <div class="menu" ref="menu" :class="{'menu-active-sp': getMenuShowSp}">
    <div v-for="(menu, mindex) in genMenus" :key="mindex">
      <div v-if="menu.title" class="menu-title">{{menu.title}}</div>
      <router-link v-for="(item,iindex) in menu.sublist" :key="iindex"
              :to="item.path"
              active-class="playlist-item-active"
              class="playlist-item"
              tag="li">
        <div>
          <i :class="['iconfont', item.meta.icon]"></i>
          <span>{{item.meta.title}}</span>
          </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {menuRoutes} from '@/router'
import {mapGetters} from 'vuex'

export default{
  name: 'Menu',
  data(){
    return{
      menus: [
        {
          sublist: menuRoutes
        }
      ],
      menuActive: false
    }
  },
  methods:{
  },
  computed: {
    genMenus() {
      return this.islogged ? 
        this.menus.concat(this.getUserList):
        this.menus
    },
    ...mapGetters(['getUserList', 'getMenuShowSp'])
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
