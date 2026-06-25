<template>
  <admin-crud-page
    :tag="config.tag"
    :title="config.title"
    :description="config.description"
    :search-fields="config.searchFields"
    :columns="config.columns"
    :form-fields="config.formFields"
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
  createPracticeArea,
  deletePracticeArea,
  getPracticeArea,
  listPracticeAreas,
  updatePracticeArea,
} from '@/api/admin'
import { createPracticeAreaPageConfig } from '@/person-config'
import type { PageResult } from '@/types/admin'

const config = createPracticeAreaPageConfig()

function defaultForm() {
  return config.defaultForm()
}

function loadApi(params: Record<string, unknown>) {
  return listPracticeAreas(params) as Promise<PageResult<Record<string, unknown>>>
}

function getApi(id: number) {
  return getPracticeArea(id)
}

function createApi(payload: Record<string, unknown>) {
  return createPracticeArea(payload)
}

function updateApi(id: number, payload: Record<string, unknown>) {
  return updatePracticeArea(id, payload)
}

function deleteApi(id: number) {
  return deletePracticeArea(id)
}

function statusApi(id: number, status: number, row?: Record<string, unknown>) {
  return updatePracticeArea(id, { ...row, status })
}
</script>
