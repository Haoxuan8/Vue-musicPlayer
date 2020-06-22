<template>
  <div class="comment-item">
    <div class="avatar">
      <img :src="comment.user.avatarUrl" alt="">
    </div>
    <div class="comment-content">
      <div class="comment-text">
        <span class="username">{{comment.user.nickname}}: </span>
        <span class="text">{{comment.content}}</span>
      </div>
      <div class="comment-text comment-reply" v-if="comment.beReplied.length">
        <span class="username">{{comment.beReplied[0].user.nickname}}: </span>
        <span class="text">{{comment.beReplied[0].content}}</span>
      </div>
      <div class="comment-time">
        {{getCreateDate}}
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'utlis/common'

export default{
  name: 'CommentItem',
  props: ['comment'],
  data(){
    return{
    }
  },
  methods:{
  },
  computed: {
    getCreateDate() {
      return formatDate(this.comment.time, 'Second')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
