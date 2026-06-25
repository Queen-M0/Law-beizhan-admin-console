<template>
  <admin-crud-page
    ref="pageRef"
    tag="BANNER"
    title="Banner 管理"
    description="管理首页轮播图、移动端图片、按钮文案和启停状态。"
    :search-fields="searchFields"
    :columns="columns"
    :form-fields="formFields"
    :default-form="defaultForm"
    :load-api="loadApi"
    :get-api="getApi"
    :create-api="createApi"
    :update-api="updateApi"
    :delete-api="deleteApi"
    :status-api="updateStatusApi"
  />
</template>

<script setup lang="ts">
import AdminCrudPage from '@/components/admin-crud-page.vue'
import {
  createBanner,
  deleteBanner,
  getBanner,
  listBanners,
  updateBanner,
  updateBannerStatus,
} from '@/api/admin'
import type { AdminFormField, AdminSearchField, AdminTableColumn, PageResult } from '@/types/admin'

const searchFields: AdminSearchField[] = [
  { prop: 'title', label: '标题', placeholder: '请输入标题' },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '停用', value: 0 },
    ],
  },
]

const columns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 90 },
  { prop: 'title', label: '标题', minWidth: 160 },
  { prop: 'subtitle', label: '副标题', minWidth: 160 },
  { prop: 'imageUrl', label: 'PC 图片', type: 'image', width: 110 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'status', label: '状态', type: 'status', width: 110 },
  { label: '操作', type: 'actions', width: 180 },
]

const formFields: AdminFormField[] = [
  { prop: 'title', label: '标题', required: true, span: 12 },
  { prop: 'subtitle', label: '副标题', span: 12 },
  { prop: 'description', label: '描述', type: 'textarea', span: 24 },
  { prop: 'imageUrl', label: 'PC 图片', required: true, span: 12 },
  { prop: 'mobileImageUrl', label: '移动端图片', span: 12 },
  { prop: 'primaryButtonText', label: '主按钮文案', span: 12 },
  { prop: 'primaryButtonLink', label: '主按钮链接', span: 12 },
  { prop: 'secondaryButtonText', label: '次按钮文案', span: 12 },
  { prop: 'secondaryButtonLink', label: '次按钮链接', span: 12 },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    required: true,
    span: 12,
    options: [
      { label: '启用', value: 1 },
      { label: '停用', value: 0 },
    ],
  },
  { prop: 'sortNum', label: '排序', type: 'number', span: 12 },
]

function defaultForm() {
  return {
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    mobileImageUrl: '',
    primaryButtonText: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    status: 1,
    sortNum: 0,
  }
}

function loadApi(params: Record<string, unknown>) {
  return listBanners(params) as Promise<PageResult<Record<string, unknown>>>
}

function getApi(id: number) {
  return getBanner(id)
}

function createApi(payload: Record<string, unknown>) {
  return createBanner(payload)
}

function updateApi(id: number, payload: Record<string, unknown>) {
  return updateBanner(id, payload)
}

function deleteApi(id: number) {
  return deleteBanner(id)
}

function updateStatusApi(id: number, status: number) {
  return updateBannerStatus(id, status)
}
</script>

