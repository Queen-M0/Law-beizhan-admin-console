<template>
  <admin-crud-page
    tag="NEWS"
    title="资讯管理"
    description="管理新闻资讯、分类、来源、封面图、发布时间和发布状态。"
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
  createNews,
  deleteNews,
  getNews,
  listNews,
  updateNews,
  updateNewsStatus,
} from '@/api/admin'
import type { AdminFormField, AdminSearchField, AdminTableColumn, PageResult } from '@/types/admin'

const searchFields: AdminSearchField[] = [
  { prop: 'title', label: '标题', placeholder: '请输入标题' },
  { prop: 'categoryName', label: '分类', placeholder: '请输入分类' },
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
  { prop: 'title', label: '标题', minWidth: 180 },
  { prop: 'categoryName', label: '分类', width: 120 },
  { prop: 'source', label: '来源', width: 140 },
  { prop: 'publishTime', label: '发布时间', width: 170 },
  { prop: 'status', label: '状态', type: 'status', width: 110 },
  { label: '操作', type: 'actions', width: 180 },
]

const formFields: AdminFormField[] = [
  { prop: 'title', label: '标题', required: true, span: 24 },
  { prop: 'summary', label: '摘要', type: 'textarea', rows: 3, span: 24 },
  { prop: 'content', label: '正文', type: 'textarea', rows: 8, required: true, span: 24 },
  { prop: 'coverImage', label: '封面图', span: 12 },
  { prop: 'publishTime', label: '发布时间', type: 'datetime', required: true, span: 12 },
  { prop: 'author', label: '作者', span: 12 },
  { prop: 'source', label: '来源', span: 12 },
  { prop: 'categoryName', label: '分类名称', span: 12 },
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
    summary: '',
    content: '',
    coverImage: '',
    publishTime: '',
    author: '',
    source: '',
    categoryName: '',
    status: 1,
    sortNum: 0,
  }
}

function loadApi(params: Record<string, unknown>) {
  return listNews(params) as Promise<PageResult<Record<string, unknown>>>
}

function getApi(id: number) {
  return getNews(id)
}

function createApi(payload: Record<string, unknown>) {
  return createNews(payload)
}

function updateApi(id: number, payload: Record<string, unknown>) {
  return updateNews(id, payload)
}

function deleteApi(id: number) {
  return deleteNews(id)
}

function updateStatusApi(id: number, status: number) {
  return updateNewsStatus(id, status)
}
</script>

