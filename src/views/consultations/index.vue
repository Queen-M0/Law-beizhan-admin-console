<template>
  <admin-crud-page
    tag="CONSULTATION"
    title="咨询管理"
    description="处理用户提交的咨询记录、状态和备注。"
    :search-fields="searchFields"
    :columns="columns"
    :form-fields="formFields"
    :default-form="defaultForm"
    :load-api="loadApi"
    :get-api="getApi"
    :create-api="createApi"
    :update-api="updateApi"
    :delete-api="deleteApi"
  />
</template>

<script setup lang="ts">
import AdminCrudPage from '@/components/admin-crud-page.vue'
import {
  deleteConsultation,
  getConsultation,
  listConsultations,
  updateConsultation,
} from '@/api/admin'
import type { AdminFormField, AdminSearchField, AdminTableColumn, PageResult } from '@/types/admin'

const searchFields: AdminSearchField[] = [
  { prop: 'name', label: '姓名', placeholder: '请输入姓名' },
  { prop: 'phone', label: '手机号', placeholder: '请输入手机号' },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '待处理', value: 0 },
      { label: '已处理', value: 1 },
      { label: '已关闭', value: 2 },
    ],
  },
]

const columns: AdminTableColumn[] = [
  { prop: 'id', label: 'ID', width: 90 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'phone', label: '手机号', width: 140 },
  { prop: 'consultationType', label: '咨询类型', minWidth: 160 },
  { prop: 'status', label: '状态', type: 'status', width: 110 },
  { label: '操作', type: 'actions', width: 160 },
]

const formFields: AdminFormField[] = [
  { prop: 'name', label: '姓名', required: true, span: 12 },
  { prop: 'phone', label: '手机号', required: true, span: 12 },
  { prop: 'company', label: '公司名称', span: 12 },
  { prop: 'consultationType', label: '咨询类型', span: 12 },
  { prop: 'content', label: '咨询内容', type: 'textarea', rows: 6, span: 24 },
  { prop: 'remark', label: '备注', type: 'textarea', rows: 4, span: 24 },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    required: true,
    span: 12,
    options: [
      { label: '待处理', value: 0 },
      { label: '已处理', value: 1 },
      { label: '已关闭', value: 2 },
    ],
  },
]

function defaultForm() {
  return {
    name: '',
    phone: '',
    company: '',
    consultationType: '',
    content: '',
    remark: '',
    status: 0,
  }
}

function loadApi(params: Record<string, unknown>) {
  return listConsultations(params) as Promise<PageResult<Record<string, unknown>>>
}

function getApi(id: number) {
  return getConsultation(id)
}

function createApi() {
  return Promise.resolve()
}

function updateApi(id: number, payload: Record<string, unknown>) {
  return updateConsultation(id, payload)
}

function deleteApi(id: number) {
  return deleteConsultation(id)
}
</script>

