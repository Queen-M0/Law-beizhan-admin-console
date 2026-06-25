import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/store/modules/auth'
import { getToken } from '@/utils/storage'
import { showErrorMessage } from '@/utils/message'

function createHttpClient(baseURL: string) {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
  })

  instance.interceptors.request.use((config) => {
    const token = getToken()

    // Keep the final request path under /api without producing /api/api/...
    if (baseURL === '/api' && typeof config.url === 'string' && config.url.startsWith('/api/')) {
      config.url = config.url.slice(4)
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => {
      const data = response.data

      if (data && typeof data === 'object' && 'code' in data) {
        const businessCode = String((data as Record<string, unknown>).code ?? '')
        const isSuccess = businessCode === '0' || businessCode === '200'

        if (!isSuccess) {
          const message = String((data as Record<string, unknown>).message || '请求失败')
          showErrorMessage(message)
          return Promise.reject(new Error(message))
        }
      }

      return response
    },
    async (error) => {
      const status = error?.response?.status
      const message = error?.response?.data?.message || error?.message || '请求失败'

      if (status === 401 || status === 403) {
        const authStore = useAuthStore()
        authStore.logout(false)

        if (router.currentRoute.value.path !== '/login') {
          await router.push({
            path: '/login',
            query: { redirect: router.currentRoute.value.fullPath },
          })
        }

        showErrorMessage('登录已失效，请重新登录')
        return Promise.reject(error)
      }

      showErrorMessage(message)
      return Promise.reject(error)
    },
  )

  return instance
}

export const authHttp = createHttpClient(import.meta.env.VITE_API_BASE_URL)
export const adminHttp = createHttpClient(import.meta.env.VITE_ADMIN_API_BASE_URL)
