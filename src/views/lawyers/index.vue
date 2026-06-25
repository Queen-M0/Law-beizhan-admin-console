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
  createPerson,
  deletePerson,
  getPerson,
  listPersons,
  updatePerson,
  updatePersonStatus,
} from '@/api/admin'
import { createPersonPageConfig } from '@/person-config'
import type { PageResult } from '@/types/admin'

const config = createPersonPageConfig('lawyer')

function defaultForm() {
  return config.defaultForm()
}

function loadApi(params: Record<string, unknown>) {
  return listPersons({ ...params, personType: 'lawyer' }) as Promise<PageResult<Record<string, unknown>>>
}

function getApi(id: number) {
  return getPerson(id)
}

function createApi(payload: Record<string, unknown>) {
  return createPerson(payload)
}

function updateApi(id: number, payload: Record<string, unknown>) {
  return updatePerson(id, payload)
}

function deleteApi(id: number) {
  return deletePerson(id)
}

function statusApi(id: number, status: number) {
  return updatePersonStatus(id, status)
}
</script>
