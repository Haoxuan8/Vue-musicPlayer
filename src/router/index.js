import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('views/Home')
const PlayListView = () => import('views/PlayListView')

export const menuRoutes = [
  {
    path: '/discovery',
    component: Home,
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