import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { getToken } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  document.title = `${to.meta.title || '后台管理'} - ${import.meta.env.VITE_APP_TITLE}`

  if (to.meta.public) {
    return true
  }

  if (!getToken()) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }

  return true
})

export default router
