<template>
  <header id="header">
    <div class="header-title">
      播放器
    </div>  
    <Search class="search"></Search>
    <div @click="showDialog(0)" class="usericon" v-if="!islogged">
      <i class="iconfont icon-username"></i>
      <span>登录</span>
    </div>
    <div class="usericon" v-if="islogged && user" @click="showDialog(1)">
      <img :src="user.profile.avatarUrl" alt="" class="avatar">
      <span>{{user.profile.nickname}}</span>
    </div>
    <Dialog ref="loginDialog"
      head-text="登录"
      confirm-btn-text="登录"
      @confirm="loginConfirm">
      <input type="number" placeholder="输入网易云UID"
       v-model.trim="uidVal"
       @keyup.enter="loginConfirm">
    </Dialog>

    <Dialog ref="logoutDialog"
      @confirm="logoutConfirm"
    >
    <p>确定退出当前用户吗</p>
    </Dialog>
  </header>
</template>

<script>
import Search from 'components/Search'
import Dialog from 'common/dialog'

import { getUserDetail } from 'network'

export default{
  name: 'Header',
  components: {
    Search,
    Dialog
  },
  data(){
    return{
      user: null,
      uidVal: '',
    }
  },
  created() {
    this.$store.state.uid && this.__getUserDetail(this.$store.state.uid)
  },
  methods:{
    showDialog(val) {
      switch (val) {
        case 0:
          this.$refs.loginDialog.show()
          break
        case 1:
          this.$refs.logoutDialog.show()
          break
      }
    },
    loginConfirm() {
      this.__getUserDetail(this.uidVal)
    },
    logoutConfirm() {
      this.$store.commit('setUid', null)
      this.$refs.logoutDialog.hide()
    },
    __getUserDetail(uid) {
      getUserDetail(uid).then(res => {
        this.user = res.data
        this.$refs.loginDialog.hide()
        this.$store.commit('setUid', uid)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    islogged() {
      return Boolean(this.$store.state.uid)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
