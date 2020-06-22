<template>
  <div class="personalized-list">
    <div class="header">
      <span>推荐歌单</span>
      <span class="show-more" @click="showmoreClick">{{showAll ? 'Hide >' : 'Show More >'}} </span>
    </div>
      <transition-group name="card-fade-in" tag="div" class="personalized-content">
        <router-link class="personalized-item" v-for="(item,index) in list" :key="index" 
          v-show="showAll ? true : index < limit"
          :to="{path: '/playlist/' + item.id}">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="text">
            {{item.name}}
          </div>
        </router-link>
      </transition-group>
  </div>
</template>

<script>
export default{
  name: 'PersonalizedList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  data(){
    return{
      showAll: false
    }
  },
  methods:{
    showmoreClick() {
      this.showAll = !this.showAll
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
