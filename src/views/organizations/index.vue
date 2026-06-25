<template>
  <admin-crud-page
    tag="ORGANIZATION"
    title="机构管理"
    description="维护机构列表、简介、排序和启停状态。"
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
  createOrganization,
  deleteOrganization,
  getOrganization,
  listOrganizations,
  updateOrganization,
} from '@/api/admin'
import type { AdminFormField, AdminSearchField, AdminTableColumn, PageResult } from '@/types/admin'

const searchFields: AdminSearchField[] = [
  { prop: 'name', label: '机构名称', placeholder: '请输入机构名称' },
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
  { prop: 'name', label: '机构名称', minWidth: 180 },
  { prop: 'description', label: '简介', minWidth: 240 },
  { prop: 'sortNum', label: '排序', width: 90 },
  { prop: 'status', label: '状态', type: 'status', width: 110 },
  { label: '操作', type: 'actions', width: 160 },
]

const formFields: AdminFormField[] = [
  { prop: 'name', label: '机构名称', required: true, span: 12 },
  { prop: 'description', label: '简介', type: 'textarea', rows: 5, span: 24 },
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
    name: '',
    description: '',
    status: 1,
    sortNum: 0,
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
</script>

