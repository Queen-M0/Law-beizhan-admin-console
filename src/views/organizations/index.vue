<template>
  <admin-crud-page
    tag="ORGANIZATION"
    title="机构管理"
    description="维护机构基础信息、展示图片、联系方式和启停状态。"
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
  createOrganization,
  deleteOrganization,
  getOrganization,
  listOrganizations,
  updateOrganization,
  updateOrganizationStatus,
} from '@/api/organization'
import type { AdminFieldOption, AdminFormField, AdminSearchField, AdminTableColumn, PageResult } from '@/types/admin'

const statusOptions: AdminFieldOption[] = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]

const slugPatternMessage = 'slug 只能使用英文小写、数字和中划线'

const searchFields: AdminSearchField[] = [
  { prop: 'keyword', label: '机构名称', placeholder: '请输入机构名称' },
  { prop: 'type', label: '机构类型', placeholder: '请输入机构类型' },
  { prop: 'status', label: '状态', type: 'select', options: statusOptions },
]

const columns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '机构名称', minWidth: 180 },
  { prop: 'type', label: '机构类型', width: 130 },
  { prop: 'coverImage', label: '封面', type: 'image', width: 110 },
  { prop: 'principal', label: '负责人', width: 120 },
  { prop: 'phone', label: '电话', width: 140 },
  { prop: 'status', label: '状态', type: 'status', width: 100 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'updatedAt', label: '更新时间', minWidth: 170 },
  { label: '操作', type: 'actions', width: 180 },
]

const formFields: AdminFormField[] = [
  { prop: 'name', label: '机构名称', required: true, span: 12 },
  { prop: 'shortName', label: '机构简称', span: 12 },
  { prop: 'slug', label: 'slug', required: true, span: 12, patternMessage: slugPatternMessage },
  { prop: 'type', label: '机构类型', required: true, span: 12 },
  { prop: 'coverImage', label: '封面图', type: 'imageUpload', uploadBizType: 'organization', span: 12, placeholder: '/uploads/organizations/xxx.jpg' },
  { prop: 'coverAlt', label: '封面图 alt', span: 12 },
  { prop: 'logoUrl', label: 'Logo', type: 'imageUpload', uploadBizType: 'organization', span: 12, placeholder: '/uploads/organizations/xxx.jpg' },
  { prop: 'logoAlt', label: 'Logo alt', span: 12 },
  { prop: 'principal', label: '负责人', span: 12 },
  { prop: 'phone', label: '电话', span: 12 },
  { prop: 'email', label: '邮箱', span: 12 },
  { prop: 'websiteUrl', label: '官网地址', span: 12 },
  { prop: 'address', label: '地址', span: 24 },
  { prop: 'intro', label: '简介', type: 'textarea', rows: 3, span: 24 },
  { prop: 'scope', label: '业务范围', type: 'textarea', rows: 3, span: 24 },
  { prop: 'contentHtml', label: '正文内容', type: 'textarea', rows: 7, span: 24 },
  { prop: 'sortNum', label: '排序', type: 'number', min: 0, step: 1, precision: 0, span: 12 },
  { prop: 'status', label: '状态', type: 'select', required: true, span: 12, options: statusOptions },
  { prop: 'seoTitle', label: 'SEO 标题', group: 'seo', span: 24 },
  { prop: 'seoKeywords', label: 'SEO 关键词', group: 'seo', span: 24 },
  { prop: 'seoDescription', label: 'SEO 描述', type: 'textarea', rows: 3, group: 'seo', span: 24 },
]

function defaultForm() {
  return {
    name: '',
    shortName: '',
    slug: '',
    type: '',
    coverImage: '',
    coverAlt: '',
    logoUrl: '',
    logoAlt: '',
    principal: '',
    phone: '',
    email: '',
    address: '',
    websiteUrl: '',
    intro: '',
    scope: '',
    contentHtml: '',
    sortNum: 0,
    status: 1,
    seoTitle: '',
    seoKeywords: '',
    seoDescription: '',
  }
}

function loadApi(params: Record<string, unknown>) {
  return listOrganizations(params) as Promise<PageResult<Record<string, unknown>>>
}

function getApi(id: number) {
  return getOrganization(id)
}

function createApi(payload: Record<string, unknown>) {
  return createOrganization(payload)
}

function updateApi(id: number, payload: Record<string, unknown>) {
  return updateOrganization(id, payload)
}

function deleteApi(id: number) {
  return deleteOrganization(id)
}

function statusApi(id: number, status: number) {
  return updateOrganizationStatus(id, status)
}
</script>

