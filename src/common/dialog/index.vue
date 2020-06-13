<template>
  <div>
    <transition name="dialog-fade">
      <div v-show="dialogShow" class="dialog-box">
        <div class="dialog-wrapper">
          <div class="dialog-head">{{headText}}</div>
          <div class="dialog-content">
            <slot></slot>
          </div>
          <div class="dialog-btns">
            <slot name="btn"></slot>
            <button class="btn-confirm" @click="confirmClick">{{confirmBtnText}}</button>
            <button v-if="type=='confirm'" @click="cancelClick">{{cancelBtnText}}</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default{
  name: 'Dialog',
  props: {
    // type：confirm、alert
    type: {
      type: String,
      default: 'confirm'
    },
    // 标题文本
    headText: {
      type: String,
      default: '提示'
    },
    // 内容文本（可以是html）
    bodyText: {
      type: String,
      default: ''
    },
    // 取消按钮文本
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    // 确定按钮文本
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    // Dialog 是否插入至 body 元素下
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      dialogShow: false
    }
  },
  methods:{
    show() {
      this.dialogShow = true
    },
    hide() {
      this.dialogShow = false
    },
    confirmClick() {
      this.$emit('confirm')
    },
    cancelClick() {
      this.hide()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
