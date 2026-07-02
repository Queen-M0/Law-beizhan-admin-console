<template>
  <admin-crud-page
    tag="NEWS"
    title="资讯管理"
    description="管理行业动态、政策解读、普法知识和集团新闻。"
    :search-fields="searchFields"
    :columns="columns"
    :form-fields="formFields"
    :default-form="defaultForm"
    :load-api="loadApi"
    :get-api="getApi"
    :create-api="createApi"
    :update-api="updateApi"
    :delete-api="deleteApi"
    :status-api="statusApi"
    :can-create="true"
    :can-delete="true"
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
} from '@/api/news'
import type { AdminFieldOption, AdminFormField, AdminSearchField, AdminTableColumn, PageResult } from '@/types/admin'

const statusOptions: AdminFieldOption[] = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]

const categoryOptions: AdminFieldOption[] = [
  { label: '行业动态', value: 'industry-dynamics' },
  { label: '政策解读', value: 'policy-interpretation' },
  { label: '普法知识', value: 'legal-knowledge' },
  { label: '集团新闻', value: 'group-news' },
]

const slugPatternMessage = 'slug 只能使用英文小写、数字和中划线'

const searchFields: AdminSearchField[] = [
  { prop: 'keyword', label: '标题关键词', placeholder: '请输入标题关键词' },
  { prop: 'categoryCode', label: '分类', type: 'select', options: categoryOptions },
  { prop: 'status', label: '状态', type: 'select', options: statusOptions },
  {
    prop: 'publishTimeRange',
    label: '发布时间范围',
    type: 'daterange',
    startProp: 'publishStartTime',
    endProp: 'publishEndTime',
  },
]

const columns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: '标题', minWidth: 220 },
  { prop: 'categoryName', label: '分类', width: 120 },
  { prop: 'source', label: '来源', width: 140 },
  { prop: 'publishTime', label: '发布时间', width: 170 },
  { prop: 'isTop', label: '置顶', width: 90, formatter: (row) => (Number(row.isTop) === 1 ? '是' : '否') },
  { prop: 'isFeatured', label: '首页推荐', width: 100, formatter: (row) => (Number(row.isFeatured) === 1 ? '是' : '否') },
  { prop: 'status', label: '状态', type: 'status', width: 100 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'updatedAt', label: '更新时间', minWidth: 170 },
  { label: '操作', type: 'actions', width: 180 },
]

const formFields: AdminFormField[] = [
  { prop: 'categoryCode', label: '资讯分类', type: 'select', required: true, span: 12, options: categoryOptions },
  { prop: 'title', label: '标题', required: true, span: 12 },
  { prop: 'slug', label: 'slug', required: true, span: 12, patternMessage: slugPatternMessage },
  { prop: 'publishTime', label: '发布时间', type: 'datetime', span: 12 },
  { prop: 'summary', label: '摘要', type: 'textarea', rows: 3, span: 24 },
  { prop: 'coverImage', label: '封面图', type: 'imageUpload', uploadBizType: 'news', span: 12, placeholder: '/uploads/news/xxx.jpg' },
  { prop: 'coverAlt', label: '封面图 alt', span: 12 },
  { prop: 'source', label: '来源', span: 12 },
  { prop: 'author', label: '作者', span: 12 },
  { prop: 'contentHtml', label: '正文内容', type: 'textarea', rows: 8, span: 24 },
  { prop: 'isTop', label: '置顶', type: 'switch', span: 12 },
  { prop: 'isFeatured', label: '首页推荐', type: 'switch', span: 12 },
  { prop: 'sortNum', label: '排序', type: 'number', min: 0, step: 1, precision: 0, span: 12 },
  { prop: 'status', label: '状态', type: 'select', required: true, span: 12, options: statusOptions },
  { prop: 'seoTitle', label: 'SEO 标题', group: 'seo', span: 24 },
  { prop: 'seoKeywords', label: 'SEO 关键词', group: 'seo', span: 24 },
  { prop: 'seoDescription', label: 'SEO 描述', type: 'textarea', rows: 3, group: 'seo', span: 24 },
]

function defaultForm() {
  return {
    categoryCode: '',
    categoryName: '',
    title: '',
    slug: '',
    summary: '',
    contentHtml: '',
    coverImage: '',
    coverAlt: '',
    source: '',
    author: '',
    publishTime: '',
    isTop: 0,
    isFeatured: 0,
    status: 1,
    sortNum: 0,
    seoTitle: '',
    seoKeywords: '',
    seoDescription: '',
  }
}

function withCategoryName(payload: Record<string, unknown>) {
  const category = categoryOptions.find((option) => option.value === payload.categoryCode)
  return {
    ...payload,
    categoryName: category?.label || payload.categoryName || '',
  }
}

function loadApi(params: Record<string, unknown>) {
  return listNews(params) as Promise<PageResult<Record<string, unknown>>>
}

function getApi(id: number) {
  return getNews(id)
}

function createApi(payload: Record<string, unknown>) {
  return createNews(withCategoryName(payload))
}

function updateApi(id: number, payload: Record<string, unknown>) {
  return updateNews(id, withCategoryName(payload))
}

function deleteApi(id: number) {
  return deleteNews(id)
}

function statusApi(id: number, status: number) {
  return updateNewsStatus(id, status)
}
</script>

