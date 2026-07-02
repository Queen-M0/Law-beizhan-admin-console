import type { AxiosResponse } from 'axios'
import { adminHttp } from './http'
import type { PageResult } from '@/types/admin'
import { cleanParams, normalizePageResult } from './page'

type ApiResponse<T> = {
  code: number | string
  message: string
  data: T
}

type AboutResource = 'pages' | 'history' | 'honors' | 'media-reports'

function unwrap<T>(response: AxiosResponse<ApiResponse<T>>) {
  return response.data.data
}

function listAboutResource(resource: AboutResource, params: Record<string, unknown>) {
  return adminHttp
    .get<ApiResponse<PageResult<Record<string, unknown>>>>(`/admin/about/${resource}`, {
      params: cleanParams(params),
    })
    .then(unwrap)
    .then(normalizePageResult)
}

function getAboutResource(resource: AboutResource, id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/about/${resource}/${id}`).then(unwrap)
}

function createAboutResource(resource: AboutResource, data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>(`/admin/about/${resource}`, data).then(unwrap)
}

function updateAboutResource(resource: AboutResource, id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/about/${resource}/${id}`, data).then(unwrap)
}

function deleteAboutResource(resource: AboutResource, id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/about/${resource}/${id}`).then(unwrap)
}

function updateAboutResourceStatus(resource: AboutResource, id: number, status: number) {
  return adminHttp.patch<ApiResponse<void>>(`/admin/about/${resource}/${id}/status`, { status }).then(unwrap)
}

export function listAboutPages(params: Record<string, unknown>) {
  return listAboutResource('pages', params)
}

export function getAboutPageItem(id: number) {
  return getAboutResource('pages', id)
}

export function createAboutPage(data: Record<string, unknown>) {
  return createAboutResource('pages', data)
}

export function updateAboutPageItem(id: number, data: Record<string, unknown>) {
  return updateAboutResource('pages', id, data)
}

export function deleteAboutPageItem(id: number) {
  return deleteAboutResource('pages', id)
}

export function updateAboutPageStatus(id: number, status: number) {
  return updateAboutResourceStatus('pages', id, status)
}

export function listAboutHistory(params: Record<string, unknown>) {
  return listAboutResource('history', params)
}

export function getAboutHistory(id: number) {
  return getAboutResource('history', id)
}

export function createAboutHistory(data: Record<string, unknown>) {
  return createAboutResource('history', data)
}

export function updateAboutHistory(id: number, data: Record<string, unknown>) {
  return updateAboutResource('history', id, data)
}

export function deleteAboutHistory(id: number) {
  return deleteAboutResource('history', id)
}

export function updateAboutHistoryStatus(id: number, status: number) {
  return updateAboutResourceStatus('history', id, status)
}

export function listAboutHonors(params: Record<string, unknown>) {
  return listAboutResource('honors', params)
}

export function getAboutHonor(id: number) {
  return getAboutResource('honors', id)
}

export function createAboutHonor(data: Record<string, unknown>) {
  return createAboutResource('honors', data)
}

export function updateAboutHonor(id: number, data: Record<string, unknown>) {
  return updateAboutResource('honors', id, data)
}

export function deleteAboutHonor(id: number) {
  return deleteAboutResource('honors', id)
}

export function updateAboutHonorStatus(id: number, status: number) {
  return updateAboutResourceStatus('honors', id, status)
}

export function listAboutMediaReports(params: Record<string, unknown>) {
  return listAboutResource('media-reports', params)
}

export function getAboutMediaReport(id: number) {
  return getAboutResource('media-reports', id)
}

export function createAboutMediaReport(data: Record<string, unknown>) {
  return createAboutResource('media-reports', data)
}

export function updateAboutMediaReport(id: number, data: Record<string, unknown>) {
  return updateAboutResource('media-reports', id, data)
}

export function deleteAboutMediaReport(id: number) {
  return deleteAboutResource('media-reports', id)
}

export function updateAboutMediaReportStatus(id: number, status: number) {
  return updateAboutResourceStatus('media-reports', id, status)
}
