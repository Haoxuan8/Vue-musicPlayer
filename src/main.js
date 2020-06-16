import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import '@/styles/index.scss'
import 'assets/font/iconfont.css'

import config from './config'

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    islogged() {
      return Boolean(this.$store.state.uid)
    }
  } 
})

Vue.use(VueLazyload)

Vue.prototype.$config = config

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
