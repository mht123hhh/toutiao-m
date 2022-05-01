import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    // component: () => import('@/views/login/index.vue') // 配置路由懒加载
    component: () => import('@/views/login')
  }, {
    path: '/',
    // name: 'layout', // 控制台警告: 如果父路由有默认子路由，它的name将无意义
    // component: () => import('@/views/layout/index.vue') // 配置路由懒加载
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home', // 默认子路由 只能有一个
        name: 'home',
        component: () => import('@/views/home')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
