import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '天机 - 首页' }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/views/Calendar.vue'),
    meta: { title: '黄历查询' }
  },
  {
    path: '/bazi',
    name: 'Bazi',
    component: () => import('@/views/Bazi.vue'),
    meta: { title: '八字排盘' }
  },
  {
    path: '/divination',
    name: 'Divination',
    component: () => import('@/views/Divination.vue'),
    meta: { title: '抽签占卜' }
  },
  {
    path: '/fortune',
    name: 'Fortune',
    component: () => import('@/views/Fortune.vue'),
    meta: { title: '运势测算' }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('@/views/Analysis.vue'),
    meta: { title: '命理分析' }
  },
  {
    path: '/dream',
    name: 'Dream',
    component: () => import('@/views/Dream.vue'),
    meta: { title: '周公解梦' }
  },
  {
    path: '/name',
    name: 'Name',
    component: () => import('@/views/Name.vue'),
    meta: { title: '姓名测试' }
  },
  {
    path: '/match',
    name: 'Match',
    component: () => import('@/views/Match.vue'),
    meta: { title: '生肖星座配对' }
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () => import('@/views/Knowledge.vue'),
    meta: { title: '玄学知识库' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '天机'
  next()
})

export default router
