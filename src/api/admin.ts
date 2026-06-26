import type { AxiosResponse } from 'axios'
import { adminHttp } from './http'
import type { PageResult } from '@/types/admin'

type ApiResponse<T> = {
  code: number
  message: string
  data: T
}

function unwrap<T>(response: AxiosResponse<ApiResponse<T>>) {
  return response.data.data
}

export interface AdminLoginVO {
  token: string
  tokenType: string
  username: string
  displayName: string
  roleCodes: string[]
}

export interface AdminMeVO {
  id: number
  username: string
  displayName: string
  status: number
  roleCodes: string[]
  lastLoginAt: string | null
}

export type PersonType = 'lawyer' | 'expert'

export interface PersonListParams {
  pageNum?: number
  pageSize?: number
  name?: string
  teamName?: string
  status?: number | string
  personType?: PersonType
}

export interface PracticeAreaParams {
  pageNum?: number
  pageSize?: number
  name?: string
  status?: number | string
}

function buildPersonParams(params: PersonListParams) {
  const nextParams: Record<string, unknown> = { ...params }

  if (nextParams.status === '' || nextParams.status === undefined || nextParams.status === null) {
    delete nextParams.status
  }

  return nextParams
}

export function listPersons(params: PersonListParams) {
  return adminHttp
    .get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/persons', {
      params: buildPersonParams(params),
    })
    .then(unwrap)
}

export function getPerson(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/persons/${id}`).then(unwrap)
}

export function createPerson(data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>('/admin/persons', data).then(unwrap)
}

export function updatePerson(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/persons/${id}`, data).then(unwrap)
}

export function deletePerson(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/persons/${id}`).then(unwrap)
}

export function updatePersonStatus(id: number, status: number) {
  return adminHttp.patch<ApiResponse<void>>(`/admin/persons/${id}/status`, { status }).then(unwrap)
}

export function uploadAdminImage(file: File, bizType = 'common') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('bizType', bizType)

  return adminHttp
    .post<ApiResponse<{ url: string }>>('/admin/uploads/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(unwrap)
}

export function listPracticeAreas(params: PracticeAreaParams) {
  const nextParams = { ...params }
  if (nextParams.status === '' || nextParams.status === undefined || nextParams.status === null) {
    delete nextParams.status
  }

  return adminHttp
    .get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/practice-areas', { params: nextParams })
    .then(unwrap)
}

export function getPracticeArea(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/practice-areas/${id}`).then(unwrap)
}

export function createPracticeArea(data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>('/admin/practice-areas', data).then(unwrap)
}

export function updatePracticeArea(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/practice-areas/${id}`, data).then(unwrap)
}

export function deletePracticeArea(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/practice-areas/${id}`).then(unwrap)
}

export function listBanners(params: Record<string, unknown>) {
  return adminHttp.get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/banners', { params }).then(unwrap)
}

export function getBanner(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/banners/${id}`).then(unwrap)
}

export function createBanner(data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>('/admin/banners', data).then(unwrap)
}

export function updateBanner(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/banners/${id}`, data).then(unwrap)
}

export function deleteBanner(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/banners/${id}`).then(unwrap)
}

export function updateBannerStatus(id: number, status: number) {
  return adminHttp.put<ApiResponse<void>>(`/admin/banners/${id}/status`, { status }).then(unwrap)
}

export function listNews(params: Record<string, unknown>) {
  return adminHttp.get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/news', { params }).then(unwrap)
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
  return adminHttp.put<ApiResponse<void>>(`/admin/news/${id}/status`, { status }).then(unwrap)
}

export function listOrganizations(params: Record<string, unknown>) {
  return adminHttp.get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/organizations', { params }).then(unwrap)
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

export function listConsultations(params: Record<string, unknown>) {
  return adminHttp.get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/consultations', { params }).then(unwrap)
}

export function getConsultation(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/consultations/${id}`).then(unwrap)
}

export function updateConsultation(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/consultations/${id}`, data).then(unwrap)
}

export function deleteConsultation(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/consultations/${id}`).then(unwrap)
}

export function getSiteConfig() {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>('/admin/site-config').then(unwrap)
}

export function updateSiteConfig(data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>('/admin/site-config', data).then(unwrap)
}

export function getAboutPage() {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>('/admin/about/page').then(unwrap)
}

export function updateAboutPage(data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>('/admin/about/page', data).then(unwrap)
}

export function listAboutHistoryItems(params: Record<string, unknown>) {
  return adminHttp.get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/about/history-items', { params }).then(unwrap)
}

export function getAboutHistoryItem(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/about/history-items/${id}`).then(unwrap)
}

export function createAboutHistoryItem(data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>('/admin/about/history-items', data).then(unwrap)
}

export function updateAboutHistoryItem(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/about/history-items/${id}`, data).then(unwrap)
}

export function deleteAboutHistoryItem(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/about/history-items/${id}`).then(unwrap)
}

export function listAboutHonorItems(params: Record<string, unknown>) {
  return adminHttp.get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/about/honor-items', { params }).then(unwrap)
}

export function getAboutHonorItem(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/about/honor-items/${id}`).then(unwrap)
}

export function createAboutHonorItem(data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>('/admin/about/honor-items', data).then(unwrap)
}

export function updateAboutHonorItem(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/about/honor-items/${id}`, data).then(unwrap)
}

export function deleteAboutHonorItem(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/about/honor-items/${id}`).then(unwrap)
}

export function listAboutMediaReports(params: Record<string, unknown>) {
  return adminHttp.get<ApiResponse<PageResult<Record<string, unknown>>>>('/admin/about/media-reports', { params }).then(unwrap)
}

export function getAboutMediaReport(id: number) {
  return adminHttp.get<ApiResponse<Record<string, unknown>>>(`/admin/about/media-reports/${id}`).then(unwrap)
}

export function createAboutMediaReport(data: Record<string, unknown>) {
  return adminHttp.post<ApiResponse<void>>('/admin/about/media-reports', data).then(unwrap)
}

export function updateAboutMediaReport(id: number, data: Record<string, unknown>) {
  return adminHttp.put<ApiResponse<void>>(`/admin/about/media-reports/${id}`, data).then(unwrap)
}

export function deleteAboutMediaReport(id: number) {
  return adminHttp.delete<ApiResponse<void>>(`/admin/about/media-reports/${id}`).then(unwrap)
}
