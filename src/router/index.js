import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Discovery = () => import('views/Discovery')
const PlayListView = () => import('views/PlayListView')

export const menuRoutes = [
  {
    path: '/discovery',
    component: Discovery,
    meta: {
      title: '发现音乐',
      icon: 'icon-music-discvr'
    }
  }
]

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    path: '/playlist/:id',
    component: PlayListView,
    props: true
  },
  ...menuRoutes
]

export default new Router({
  routes
})