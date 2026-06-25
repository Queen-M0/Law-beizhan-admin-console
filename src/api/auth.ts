import { adminHttp, authHttp } from './http'
import type { AdminLoginVO } from './admin'
import type { AdminLoginPayload, LoginPayload } from '@/types/auth'

export function loginByPhone(data: LoginPayload) {
  return authHttp.post('/api/user/login/phone', data)
}

export function loginAdmin(data: AdminLoginPayload) {
  return adminHttp.post<{ code: number; message: string; data: AdminLoginVO }>('/admin/auth/login', data)
}
