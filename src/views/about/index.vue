<template>
  <div class="about-stack">
    <admin-form-page
      tag="ABOUT PAGE"
      title="关于北展 - 页面配置"
      description="管理关于页主视觉、文案、矩阵和联系方式。"
      :form-fields="pageFields"
      :default-form="pageDefaultForm"
      :load-api="loadAboutPage"
      :save-api="saveAboutPage"
    />

    <admin-crud-page
      tag="HISTORY"
      title="发展历程"
      description="维护关于页时间线。"
      :search-fields="itemSearchFields"
      :columns="itemColumns"
      :form-fields="historyFields"
      :default-form="historyDefaultForm"
      :load-api="loadHistoryItems"
      :get-api="getHistoryItem"
      :create-api="createHistoryItem"
      :update-api="updateHistoryItem"
      :delete-api="deleteHistoryItem"
    />

    <admin-crud-page
      tag="HONOR"
      title="荣誉奖项"
      description="维护奖项和荣誉信息。"
      :search-fields="itemSearchFields"
      :columns="honorColumns"
      :form-fields="honorFields"
      :default-form="honorDefaultForm"
      :load-api="loadHonorItems"
      :get-api="getHonorItem"
      :create-api="createHonorItem"
      :update-api="updateHonorItem"
      :delete-api="deleteHonorItem"
    />

    <admin-crud-page
      tag="MEDIA"
      title="媒体报道"
      description="维护外部报道与媒体文章。"
      :search-fields="itemSearchFields"
      :columns="mediaColumns"
      :form-fields="mediaFields"
      :default-form="mediaDefaultForm"
      :load-api="loadMediaReports"
      :get-api="getMediaReport"
      :create-api="createMediaReport"
      :update-api="updateMediaReport"
      :delete-api="deleteMediaReport"
    />
  </div>
</template>

<script setup lang="ts">
import AdminCrudPage from '@/components/admin-crud-page.vue'
import AdminFormPage from '@/components/admin-form-page.vue'
import {
  createAboutHistoryItem,
  createAboutHonorItem,
  createAboutMediaReport,
  deleteAboutHistoryItem,
  deleteAboutHonorItem,
  deleteAboutMediaReport,
  getAboutHistoryItem,
  getAboutHonorItem,
  getAboutMediaReport,
  getAboutPage,
  listAboutHistoryItems,
  listAboutHonorItems,
  listAboutMediaReports,
  updateAboutPage,
  updateAboutHistoryItem,
  updateAboutHonorItem,
  updateAboutMediaReport,
} from '@/api/admin'
import type { AdminFormField, AdminSearchField, AdminTableColumn, PageResult } from '@/types/admin'

const pageFields: AdminFormField[] = [
  { prop: 'pageTitle', label: '页面标题', required: true, span: 12 },
  { prop: 'pageSubtitle', label: '页面副标题', span: 12 },
  { prop: 'bannerImage', label: 'Banner 图片', span: 12 },
  { prop: 'groupTitle', label: '集团标题', span: 12 },
  { prop: 'groupCoverImage', label: '集团封面', span: 12 },
  { prop: 'groupParagraphsJson', label: '集团段落 JSON', type: 'textarea', rows: 4, span: 24 },
  { prop: 'groupValuesJson', label: '价值观 JSON', type: 'textarea', rows: 4, span: 24 },
  { prop: 'practiceAreasLeftJson', label: '左侧业务 JSON', type: 'textarea', rows: 4, span: 24 },
  { prop: 'practiceAreasRightJson', label: '右侧业务 JSON', type: 'textarea', rows: 4, span: 24 },
  { prop: 'matrixTitle', label: '矩阵标题', span: 12 },
  { prop: 'matrixItemsJson', label: '矩阵项 JSON', type: 'textarea', rows: 4, span: 24 },
  { prop: 'contactTitle', label: '联系标题', span: 12 },
  { prop: 'contactIntro', label: '联系介绍', type: 'textarea', rows: 4, span: 24 },
  { prop: 'contactPhone', label: '联系电话', span: 12 },
  { prop: 'contactEmail', label: '联系邮箱', span: 12 },
  { prop: 'contactAddress', label: '联系地址', span: 12 },
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

const itemSearchFields: AdminSearchField[] = [
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

const itemColumns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 90 },
  { prop: 'yearLabel', label: '年份', width: 120 },
  { prop: 'title', label: '标题', minWidth: 180 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'status', label: '状态', type: 'status', width: 110 },
  { label: '操作', type: 'actions', width: 160 },
]

const honorColumns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 90 },
  { prop: 'title', label: '标题', minWidth: 180 },
  { prop: 'issuer', label: '颁发机构', width: 160 },
  { prop: 'awardDate', label: '获奖日期', width: 130 },
  { prop: 'status', label: '状态', type: 'status', width: 110 },
  { label: '操作', type: 'actions', width: 160 },
]

const mediaColumns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 90 },
  { prop: 'title', label: '标题', minWidth: 180 },
  { prop: 'mediaName', label: '媒体名称', width: 160 },
  { prop: 'publishDate', label: '发布日期', width: 130 },
  { prop: 'status', label: '状态', type: 'status', width: 110 },
  { label: '操作', type: 'actions', width: 160 },
]

const historyFields: AdminFormField[] = [
  { prop: 'yearLabel', label: '年份', required: true, span: 12 },
  { prop: 'title', label: '标题', required: true, span: 12 },
  { prop: 'description', label: '描述', type: 'textarea', rows: 4, span: 24 },
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

const honorFields: AdminFormField[] = [
  { prop: 'title', label: '标题', required: true, span: 12 },
  { prop: 'issuer', label: '颁发机构', span: 12 },
  { prop: 'awardDate', label: '获奖日期', type: 'date', span: 12 },
  { prop: 'imageUrl', label: '图片', span: 12 },
  { prop: 'description', label: '描述', type: 'textarea', rows: 4, span: 24 },
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

const mediaFields: AdminFormField[] = [
  { prop: 'title', label: '标题', required: true, span: 12 },
  { prop: 'mediaName', label: '媒体名称', span: 12 },
  { prop: 'summary', label: '摘要', type: 'textarea', rows: 4, span: 24 },
  { prop: 'coverImage', label: '封面图', span: 12 },
  { prop: 'reportLink', label: '报道链接', span: 12 },
  { prop: 'publishDate', label: '发布日期', type: 'date', span: 12 },
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

function pageDefaultForm() {
  return {
    pageTitle: '',
    pageSubtitle: '',
    bannerImage: '',
    groupTitle: '',
    groupCoverImage: '',
    groupParagraphsJson: '[]',
    groupValuesJson: '[]',
    practiceAreasLeftJson: '[]',
    practiceAreasRightJson: '[]',
    matrixTitle: '',
    matrixItemsJson: '[]',
    contactTitle: '',
    contactIntro: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: '',
    status: 1,
    sortNum: 0,
  }
}

function historyDefaultForm() {
  return {
    yearLabel: '',
    title: '',
    description: '',
    status: 1,
    sortNum: 0,
  }
}

function honorDefaultForm() {
  return {
    title: '',
    issuer: '',
    awardDate: '',
    imageUrl: '',
    description: '',
    status: 1,
    sortNum: 0,
  }
}

function mediaDefaultForm() {
  return {
    title: '',
    mediaName: '',
    summary: '',
    coverImage: '',
    reportLink: '',
    publishDate: '',
    status: 1,
    sortNum: 0,
  }
}

function loadAboutPage() {
  return getAboutPage()
}

function saveAboutPage(payload: Record<string, unknown>) {
  return updateAboutPage(payload)
}

function loadHistoryItems(params: Record<string, unknown>) {
  return listAboutHistoryItems(params) as Promise<PageResult<Record<string, unknown>>>
}

function getHistoryItem(id: number) {
  return getAboutHistoryItem(id)
}

function createHistoryItem(payload: Record<string, unknown>) {
  return createAboutHistoryItem(payload)
}

function updateHistoryItem(id: number, payload: Record<string, unknown>) {
  return updateAboutHistoryItem(id, payload)
}

function deleteHistoryItem(id: number) {
  return deleteAboutHistoryItem(id)
}

function loadHonorItems(params: Record<string, unknown>) {
  return listAboutHonorItems(params) as Promise<PageResult<Record<string, unknown>>>
}

function getHonorItem(id: number) {
  return getAboutHonorItem(id)
}

function createHonorItem(payload: Record<string, unknown>) {
  return createAboutHonorItem(payload)
}

function updateHonorItem(id: number, payload: Record<string, unknown>) {
  return updateAboutHonorItem(id, payload)
}

function deleteHonorItem(id: number) {
  return deleteAboutHonorItem(id)
}

function loadMediaReports(params: Record<string, unknown>) {
  return listAboutMediaReports(params) as Promise<PageResult<Record<string, unknown>>>
}

function getMediaReport(id: number) {
  return getAboutMediaReport(id)
}

function createMediaReport(payload: Record<string, unknown>) {
  return createAboutMediaReport(payload)
}

function updateMediaReport(id: number, payload: Record<string, unknown>) {
  return updateAboutMediaReport(id, payload)
}

function deleteMediaReport(id: number) {
  return deleteAboutMediaReport(id)
}
</script>

<style scoped lang="scss">
.about-stack {
  display: grid;
  gap: 20px;
}
</style>

