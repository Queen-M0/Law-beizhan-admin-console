import type { AxiosResponse } from 'axios'
import { adminHttp } from './http'

type ApiResponse<T> = {
  code: number | string
  message: string
  data: T
}

function unwrap<T>(response: AxiosResponse<ApiResponse<T>>) {
  return response.data.data
}

export function uploadAdminFile(file: File, bizType = 'common') {
  const formData = new FormData()
  formData.append('file', file)

  return adminHttp
    .post<ApiResponse<{ url: string; fileName?: string }>>('/admin/files/upload', formData, {
      params: { bizType },
    })
    .then(unwrap)
}
