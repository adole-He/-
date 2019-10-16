import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import startinterface from '@/components/startinterface'
import ranking from '@/components/ranking'
import play from '@/components/play'
import history from '@/components/history'


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/startinterface',
      name: 'startinterface',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: startinterface
    },
    {
      path: '/ranking',
      name: 'ranking',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: ranking
    },
    {
      path: '/play',
      name: 'play',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: play
    },
    {
      path: '/history',
      name: 'history',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: history
    }
  ]
})
