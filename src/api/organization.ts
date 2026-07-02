import type { AxiosResponse } from 'axios'
import { adminHttp } from './http'
import type { PageResult } from '@/types/admin'
import { cleanParams, normalizePageResult } from './page'

type ApiResponse<T> = {
  code: number | string
  message: string
  data: T
}

function unwrap<T>(response: AxiosResponse<ApiResponse<T>>) {
  return response.data.data
}

export function listOrganizations(params: Record<string, unknown>) {
  return adminHttp
    .get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/organizations', {
      params: cleanParams(params),
    })
    .then(unwrap)
    .then(normalizePageResult)
}

export function getOrganization(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/organizations/${id}`).then(unwrap)
}

export function createOrganization(data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>('/admin/organizations', data).then(unwrap)
}

export function updateOrganization(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/organizations/${id}`, data).then(unwrap)
}

export function deleteOrganization(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/organizations/${id}`).then(unwrap)
}

export function updateOrganizationStatus(id: number, status: number) {
  return adminHttp.patch<ApiResponse<void>>(`/admin/organizations/${id}/status`, { status }).then(unwrap)
}
