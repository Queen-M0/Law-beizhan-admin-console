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

export function listNews(params: Record<string, unknown>) {
  return adminHttp
    .get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/news', { params: cleanParams(params) })
    .then(unwrap)
    .then(normalizePageResult)
}

export function getNews(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/news/${id}`).then(unwrap)
}

export function createNews(data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>('/admin/news', data).then(unwrap)
}

export function updateNews(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/news/${id}`, data).then(unwrap)
}

export function deleteNews(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/news/${id}`).then(unwrap)
}

export function updateNewsStatus(id: number, status: number) {
  return adminHttp.patch<ApiResponse<void>>(`/admin/news/${id}/status`, { status }).then(unwrap)
}
