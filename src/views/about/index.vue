<template>
  <el-tabs v-model="activeTab" class="about-tabs">
    <el-tab-pane label="栏目内容" name="pages">
      <admin-crud-page
        tag="ABOUT PAGE"
        title="关于北展 - 栏目内容"
        description="维护关于北展各栏目横幅、正文内容和 SEO 信息。"
        :search-fields="pageSearchFields"
        :columns="pageColumns"
        :form-fields="pageFields"
        :default-form="pageDefaultForm"
        :load-api="loadPages"
        :get-api="getPage"
        :create-api="createPage"
        :update-api="updatePage"
        :delete-api="deletePage"
        :status-api="updatePageStatusApi"
        :can-create="true"
        :can-delete="true"
      />
    </el-tab-pane>

    <el-tab-pane label="发展历程" name="history">
      <admin-crud-page
        tag="HISTORY"
        title="关于北展 - 发展历程"
        description="维护集团发展时间线。"
        :search-fields="commonSearchFields"
        :columns="historyColumns"
        :form-fields="historyFields"
        :default-form="historyDefaultForm"
        :load-api="loadHistory"
        :get-api="getHistory"
        :create-api="createHistory"
        :update-api="updateHistory"
        :delete-api="deleteHistory"
        :status-api="updateHistoryStatusApi"
        :can-create="true"
        :can-delete="true"
      />
    </el-tab-pane>

    <el-tab-pane label="荣誉资质" name="honors">
      <admin-crud-page
        tag="HONOR"
        title="关于北展 - 荣誉资质"
        description="维护荣誉证书、资质图片和颁发机构。"
        :search-fields="commonSearchFields"
        :columns="honorColumns"
        :form-fields="honorFields"
        :default-form="honorDefaultForm"
        :load-api="loadHonors"
        :get-api="getHonor"
        :create-api="createHonor"
        :update-api="updateHonor"
        :delete-api="deleteHonor"
        :status-api="updateHonorStatusApi"
        :can-create="true"
        :can-delete="true"
      />
    </el-tab-pane>

    <el-tab-pane label="媒体报道" name="media">
      <admin-crud-page
        tag="MEDIA"
        title="关于北展 - 媒体报道"
        description="维护媒体来源、报道链接、正文内容和 SEO 信息。"
        :search-fields="commonSearchFields"
        :columns="mediaColumns"
        :form-fields="mediaFields"
        :default-form="mediaDefaultForm"
        :load-api="loadMediaReports"
        :get-api="getMediaReport"
        :create-api="createMediaReport"
        :update-api="updateMediaReport"
        :delete-api="deleteMediaReport"
        :status-api="updateMediaReportStatusApi"
        :can-create="true"
        :can-delete="true"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminCrudPage from '@/components/admin-crud-page.vue'
import {
  createAboutHistory as createHistory,
  createAboutHonor as createHonor,
  createAboutMediaReport as createMediaReport,
  createAboutPage,
  deleteAboutHistory as deleteHistory,
  deleteAboutHonor as deleteHonor,
  deleteAboutMediaReport as deleteMediaReport,
  deleteAboutPageItem,
  getAboutHistory as getHistory,
  getAboutHonor as getHonor,
  getAboutMediaReport as getMediaReport,
  getAboutPageItem,
  listAboutHistory,
  listAboutHonors,
  listAboutMediaReports,
  listAboutPages,
  updateAboutHistory as updateHistory,
  updateAboutHistoryStatus,
  updateAboutHonor as updateHonor,
  updateAboutHonorStatus,
  updateAboutMediaReport as updateMediaReport,
  updateAboutMediaReportStatus,
  updateAboutPageItem,
  updateAboutPageStatus,
} from '@/api/about'
import type { AdminFieldOption, AdminFormField, AdminSearchField, AdminTableColumn, PageResult } from '@/types/admin'

const activeTab = ref('pages')

const statusOptions: AdminFieldOption[] = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]

const sectionOptions: AdminFieldOption[] = [
  { label: '集团介绍', value: 'group-profile' },
  { label: '发展历程', value: 'development-history' },
  { label: '组织架构', value: 'organization-structure' },
  { label: '荣誉资质', value: 'honors' },
  { label: '媒体报道', value: 'media-reports' },
  { label: '团队文化', value: 'team-culture' },
  { label: '联系我们', value: 'contact-us' },
]

const slugPatternMessage = 'slug 只能使用英文小写、数字和中划线'

const commonSearchFields: AdminSearchField[] = [
  { prop: 'keyword', label: '标题关键词', placeholder: '请输入标题关键词' },
  { prop: 'status', label: '状态', type: 'select', options: statusOptions },
]

const pageSearchFields: AdminSearchField[] = [
  { prop: 'sectionCode', label: '栏目', type: 'select', options: sectionOptions },
  { prop: 'keyword', label: '栏目名称', placeholder: '请输入栏目名称' },
  { prop: 'status', label: '状态', type: 'select', options: statusOptions },
]

const pageColumns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'sectionName', label: '栏目名称', width: 140 },
  { prop: 'sectionCode', label: '栏目编码', minWidth: 180 },
  { prop: 'path', label: '前端路径', minWidth: 180 },
  { prop: 'bannerTitle', label: '横幅标题', minWidth: 180 },
  { prop: 'status', label: '状态', type: 'status', width: 100 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'updatedAt', label: '更新时间', minWidth: 170 },
  { label: '操作', type: 'actions', width: 180 },
]

const historyColumns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'year', label: '年份', width: 100 },
  { prop: 'eventDate', label: '事件日期', width: 130 },
  { prop: 'title', label: '标题', minWidth: 200 },
  { prop: 'imageUrl', label: '图片', type: 'image', width: 100 },
  { prop: 'status', label: '状态', type: 'status', width: 100 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'updatedAt', label: '更新时间', minWidth: 170 },
  { label: '操作', type: 'actions', width: 180 },
]

const honorColumns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: '标题', minWidth: 200 },
  { prop: 'imageUrl', label: '图片', type: 'image', width: 100 },
  { prop: 'awardTime', label: '获奖时间', width: 130 },
  { prop: 'issuingOrg', label: '颁发机构', minWidth: 160 },
  { prop: 'status', label: '状态', type: 'status', width: 100 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'updatedAt', label: '更新时间', minWidth: 170 },
  { label: '操作', type: 'actions', width: 180 },
]

const mediaColumns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'title', label: '标题', minWidth: 220 },
  { prop: 'coverImage', label: '封面', type: 'image', width: 100 },
  { prop: 'sourceName', label: '来源', width: 140 },
  { prop: 'publishTime', label: '发布时间', width: 170 },
  { prop: 'status', label: '状态', type: 'status', width: 100 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'updatedAt', label: '更新时间', minWidth: 170 },
  { label: '操作', type: 'actions', width: 180 },
]

const pageFields: AdminFormField[] = [
  { prop: 'sectionCode', label: '栏目编码', type: 'select', required: true, span: 12, options: sectionOptions },
  { prop: 'sectionName', label: '栏目名称', required: true, span: 12 },
  { prop: 'path', label: '前端路径', span: 12 },
  { prop: 'bannerTitle', label: '横幅标题', span: 12 },
  { prop: 'bannerSubtitle', label: '横幅副标题', span: 24 },
  { prop: 'bannerImage', label: '横幅图片', type: 'imageUpload', uploadBizType: 'about', span: 12, placeholder: '/uploads/about/xxx.jpg' },
  { prop: 'bannerAlt', label: '横幅图片 alt', span: 12 },
  { prop: 'articleTitle', label: '正文标题', required: true, span: 24 },
  { prop: 'coverImage', label: '正文封面图', type: 'imageUpload', uploadBizType: 'about', span: 12, placeholder: '/uploads/about/xxx.jpg' },
  { prop: 'coverAlt', label: '正文封面图 alt', span: 12 },
  { prop: 'summary', label: '摘要', type: 'textarea', rows: 3, span: 24 },
  { prop: 'contentHtml', label: '正文内容', type: 'textarea', rows: 8, span: 24 },
  { prop: 'extraJson', label: '扩展 JSON', type: 'json', rows: 4, span: 24 },
  { prop: 'sortNum', label: '排序', type: 'number', min: 0, step: 1, precision: 0, span: 12 },
  { prop: 'status', label: '状态', type: 'select', required: true, span: 12, options: statusOptions },
  { prop: 'seoTitle', label: 'SEO 标题', group: 'seo', span: 24 },
  { prop: 'seoKeywords', label: 'SEO 关键词', group: 'seo', span: 24 },
  { prop: 'seoDescription', label: 'SEO 描述', type: 'textarea', rows: 3, group: 'seo', span: 24 },
]

const historyFields: AdminFormField[] = [
  { prop: 'year', label: '年份', required: true, span: 12 },
  { prop: 'eventDate', label: '事件日期', type: 'date', span: 12 },
  { prop: 'title', label: '标题', required: true, span: 12 },
  { prop: 'imageUrl', label: '图片', type: 'imageUpload', uploadBizType: 'about', span: 12, placeholder: '/uploads/about/xxx.jpg' },
  { prop: 'imageAlt', label: '图片 alt', span: 12 },
  { prop: 'description', label: '描述', type: 'textarea', rows: 4, span: 24 },
  { prop: 'sortNum', label: '排序', type: 'number', min: 0, step: 1, precision: 0, span: 12 },
  { prop: 'status', label: '状态', type: 'select', required: true, span: 12, options: statusOptions },
]

const honorFields: AdminFormField[] = [
  { prop: 'title', label: '标题', required: true, span: 12 },
  { prop: 'awardTime', label: '获奖时间', type: 'date', span: 12 },
  { prop: 'imageUrl', label: '图片', type: 'imageUpload', uploadBizType: 'about', span: 12, placeholder: '/uploads/about/xxx.jpg' },
  { prop: 'imageAlt', label: '图片 alt', span: 12 },
  { prop: 'issuingOrg', label: '颁发机构', span: 12 },
  { prop: 'description', label: '描述', type: 'textarea', rows: 4, span: 24 },
  { prop: 'sortNum', label: '排序', type: 'number', min: 0, step: 1, precision: 0, span: 12 },
  { prop: 'status', label: '状态', type: 'select', required: true, span: 12, options: statusOptions },
]

const mediaFields: AdminFormField[] = [
  { prop: 'title', label: '标题', required: true, span: 12 },
  { prop: 'slug', label: 'slug', required: true, span: 12, patternMessage: slugPatternMessage },
  { prop: 'summary', label: '摘要', type: 'textarea', rows: 3, span: 24 },
  { prop: 'coverImage', label: '封面图', type: 'imageUpload', uploadBizType: 'about', span: 12, placeholder: '/uploads/about/xxx.jpg' },
  { prop: 'coverAlt', label: '封面图 alt', span: 12 },
  { prop: 'sourceName', label: '媒体来源', span: 12 },
  { prop: 'sourceUrl', label: '来源链接', span: 12 },
  { prop: 'publishTime', label: '发布时间', type: 'datetime', span: 12 },
  { prop: 'contentHtml', label: '正文内容', type: 'textarea', rows: 8, span: 24 },
  { prop: 'sortNum', label: '排序', type: 'number', min: 0, step: 1, precision: 0, span: 12 },
  { prop: 'status', label: '状态', type: 'select', required: true, span: 12, options: statusOptions },
  { prop: 'seoTitle', label: 'SEO 标题', group: 'seo', span: 24 },
  { prop: 'seoKeywords', label: 'SEO 关键词', group: 'seo', span: 24 },
  { prop: 'seoDescription', label: 'SEO 描述', type: 'textarea', rows: 3, group: 'seo', span: 24 },
]

function pageDefaultForm() {
  return {
    sectionCode: '',
    sectionName: '',
    path: '',
    bannerTitle: '',
    bannerSubtitle: '',
    bannerImage: '',
    bannerAlt: '',
    articleTitle: '',
    coverImage: '',
    coverAlt: '',
    summary: '',
    contentHtml: '',
    extraJson: '{}',
    status: 1,
    sortNum: 0,
    seoTitle: '',
    seoKeywords: '',
    seoDescription: '',
  }
}

function historyDefaultForm() {
  return {
    year: '',
    eventDate: '',
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    sortNum: 0,
    status: 1,
  }
}

function honorDefaultForm() {
  return {
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    awardTime: '',
    issuingOrg: '',
    sortNum: 0,
    status: 1,
  }
}

function mediaDefaultForm() {
  return {
    title: '',
    slug: '',
    summary: '',
    coverImage: '',
    coverAlt: '',
    sourceName: '',
    sourceUrl: '',
    publishTime: '',
    contentHtml: '',
    sortNum: 0,
    status: 1,
    seoTitle: '',
    seoKeywords: '',
    seoDescription: '',
  }
}

function withSectionName(payload: Record<string, unknown>) {
  const section = sectionOptions.find((option) => option.value === payload.sectionCode)
  return {
    ...payload,
    sectionName: payload.sectionName || section?.label || '',
  }
}

function loadPages(params: Record<string, unknown>) {
  return listAboutPages(params) as Promise<PageResult<Record<string, unknown>>>
}

function getPage(id: number) {
  return getAboutPageItem(id)
}

function createPage(payload: Record<string, unknown>) {
  return createAboutPage(withSectionName(payload))
}

function updatePage(id: number, payload: Record<string, unknown>) {
  return updateAboutPageItem(id, withSectionName(payload))
}

function deletePage(id: number) {
  return deleteAboutPageItem(id)
}

function updatePageStatusApi(id: number, status: number) {
  return updateAboutPageStatus(id, status)
}

function loadHistory(params: Record<string, unknown>) {
  return listAboutHistory(params) as Promise<PageResult<Record<string, unknown>>>
}

function updateHistoryStatusApi(id: number, status: number) {
  return updateAboutHistoryStatus(id, status)
}

function loadHonors(params: Record<string, unknown>) {
  return listAboutHonors(params) as Promise<PageResult<Record<string, unknown>>>
}

function updateHonorStatusApi(id: number, status: number) {
  return updateAboutHonorStatus(id, status)
}

function loadMediaReports(params: Record<string, unknown>) {
  return listAboutMediaReports(params) as Promise<PageResult<Record<string, unknown>>>
}

function updateMediaReportStatusApi(id: number, status: number) {
  return updateAboutMediaReportStatus(id, status)
}
</script>

<style scoped lang="scss">
.about-tabs {
  display: block;
}

.about-tabs :deep(.el-tabs__header) {
  margin-bottom: 16px;
}

.about-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: rgba(15, 28, 44, 0.08);
}
</style>

