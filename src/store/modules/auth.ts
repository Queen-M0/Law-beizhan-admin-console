import { defineStore } from 'pinia'
import { loginAdmin, loginByPhone } from '@/api/auth'
import type { LoginForm, UserProfile } from '@/types/auth'
import {
  clearToken,
  clearUserStorage,
  getToken,
  getUserStorage,
  setToken,
  setUserStorage,
} from '@/utils/storage'

function buildFallbackUser(phone: string): Record<string, unknown> {
  return {
    name: '管理员',
    phone,
  }
}

function extractExternalUser(data: unknown, phone: string): Record<string, unknown> {
  if (!data || typeof data !== 'object') {
    return buildFallbackUser(phone)
  }

  const payload = data as Record<string, unknown>
  const nestedData =
    payload.data && typeof payload.data === 'object'
      ? (payload.data as Record<string, unknown>)
      : null

  if (nestedData?.user && typeof nestedData.user === 'object') {
    return nestedData.user as Record<string, unknown>
  }

  if (payload.user && typeof payload.user === 'object') {
    return payload.user as Record<string, unknown>
  }

  return buildFallbackUser(phone)
}

function getLoginCandidates(externalUser: Record<string, unknown>, phone: string) {
  return [
    externalUser.username,
    externalUser.userName,
    externalUser.account,
    externalUser.loginName,
    externalUser.phoneNumber,
    externalUser.phone,
    phone,
  ].filter((item, index, list) => typeof item === 'string' && item.trim() && list.indexOf(item) === index) as string[]
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getToken() || '',
    user: (() => {
      const savedUser = getUserStorage()
      return savedUser ? (JSON.parse(savedUser) as UserProfile) : null
    })(),
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token),
  },
  actions: {
    async login(form: LoginForm) {
      const payload = {
        phoneNumber: form.phone,
        password: form.password,
      }

      const externalResponse = await loginByPhone(payload)
      const externalUser = extractExternalUser(externalResponse.data, form.phone)
      const candidates = getLoginCandidates(externalUser, form.phone)
      let adminData: { token: string; username: string; displayName: string } | null = null
      let lastError: unknown = null

      for (const username of candidates) {
        try {
          const adminResponse = await loginAdmin({
            username,
            password: form.password,
          })
          adminData = adminResponse.data?.data || null
          break
        } catch (error) {
          lastError = error
        }
      }

      if (!adminData?.token) {
        throw lastError || new Error('后台登录失败，请确认北展后台管理员账号已配置')
      }

      this.token = adminData.token
      this.user = {
        name: adminData.displayName || String(externalUser.name || externalUser.nickname || '管理员'),
        phone: String(adminData.username || externalUser.phone || form.phone),
      }

      setToken(adminData.token)
      setUserStorage(JSON.stringify(this.user))
    },
    logout(redirect = true) {
      this.token = ''
      this.user = null
      clearToken()
      clearUserStorage()

      if (redirect) {
        window.location.href = import.meta.env.BASE_URL + 'login'
      }
    },
  },
})

