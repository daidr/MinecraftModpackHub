import * as VueRouter from 'vue-router'
import { usePageStore } from '../store/page'
import pinia from '@/store/index'

const pageStore = usePageStore(pinia)

const routeModules = import.meta.globEager('../app/**/routes/index.js')

const routes = [
  {
    path: '/',
    redirect: '/home'
  }
]

for (const element in routeModules) {
  let routeModule = routeModules[element]
  if (routeModule['routes']) {
    routes.push(...routeModule['routes'])
  }
}

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

const togglePageLoadingState = (() => {
  let TIMER = null
  return (state) => {
    if (state == 1) {
      TIMER = setTimeout(() => {
        pageStore.setPageLoadingState(true)
      }, 100)
    } else if (state == 0) {
      clearTimeout(TIMER)
      pageStore.setPageLoadingState(false)
    } else {
      clearTimeout(TIMER)
    }
  }
})()


router.afterEach((to, from, failure) => {
  if (!to.meta.asyncLoading) {
    togglePageLoadingState(0)
  } else {
    togglePageLoadingState(2)
  }
})

router.beforeEach((to, from, next) => {
  togglePageLoadingState(1)

  // 这里可以处理用户信息获取的相关逻辑
  // if (!userStore.userInfo || !userStore.userInfo.name) {

  //   userStore.fetchUserInfo()
  //     .then(() => { next() })
  //     .catch(() => { next(false) })
  // } else {
  //   next()
  // }
  next()
})


export default router
