<template>
  <div>
    <div ref="Progress" class="progress" @mousedown="progressClick" @touchstart="progressClick">
      <div ref="ProgressBar" class="progress-bar"></div>
      <div ref="ProgressInner" class="progress-inner">
        <div ref="ProgressDot" class="progress-dot" :class="{'progress-dot-active': isDragging}"
          @mousedown="barDown"
          @touchstart.prevent="barDown">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "Progress",
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data(){
    return{
      startX: -1,
      isDragging: false
    }
  },
  watch: {
    percent(newValue) {
      if(!this.isDragging) {
        const offsetWidth = newValue * this.$refs.ProgressBar.clientWidth
        this.moveDot(offsetWidth)
      }
    }
  },
  methods:{
    bindEvents() {
      document.addEventListener('mousemove', this.barMove)
      document.addEventListener('mouseup', this.barUp)
      document.addEventListener('touchmove', this.barMove)
      document.addEventListener('touchend', this.barUp)
    },
    unbindEvents() {
      document.removeEventListener('mousemove', this.barMove)
      document.removeEventListener('mouseup', this.barUp)
      document.removeEventListener('touchmove', this.barMove)
      document.removeEventListener('touchend', this.barUp)
    },
    progressClick(e) {
      const endX = e.clientX || e.touches[0].pageX
      const offsetWidth = Math.min(this.$refs.ProgressBar.clientWidth, 
                              Math.max(0, endX - this.startX))
      this.moveDot(offsetWidth)
      this.barDown()
    },
    barDown() {
      this.isDragging = true
    },
    barMove(e) {
      if(this.isDragging){
        e.preventDefault()
        const endX = e.clientX || e.touches[0].pageX
        const offsetWidth = Math.min(this.$refs.ProgressBar.clientWidth, 
                              Math.max(0, endX - this.startX))
        this.moveDot(offsetWidth)
        this.emitPercent()
      }
    },
    barUp() {
      if(this.isDragging) {
        this.isDragging = false
        this.emitPercent(true)
      }
    },
    moveDot(offsetWidth) {
      this.$refs.ProgressInner.style.width = `${offsetWidth}px`
    },
    emitPercent(isEnd = false) {
      const barWidth = this.$refs.ProgressBar.clientWidth
      const percent = this.$refs.ProgressInner.clientWidth / barWidth
      this.$emit(isEnd ? 'percentChangeEnd' : 'percentChange', percent)
    }
  },
  mounted() {
    this.bindEvents()
    setTimeout(() => {
      const rect = this.$refs.ProgressBar.getBoundingClientRect()
      this.startX = rect.left
    },100)

    if(!this.isDragging) {
        const offsetWidth = this.percent * this.$refs.ProgressBar.clientWidth
        this.moveDot(offsetWidth)
    }
  },
  beforeDestroy() {
    this.unbindEvents()
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
