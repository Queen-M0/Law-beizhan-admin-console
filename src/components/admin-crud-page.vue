<template>
  <section class="admin-page">
    <!-- <header class="admin-page__header">
      <div>
        <p class="admin-page__tag">{{ tag }}</p>
        <h2>{{ title }}</h2>
        <p class="admin-page__desc">{{ description }}</p>
      </div>
    </header> -->

    <el-card shadow="never" class="admin-card">
      <el-form v-if="searchFields.length" :model="searchModel" inline class="search-bar" @submit.prevent>
        <el-form-item v-for="field in searchFields" :key="field.prop" :label="field.label">
          <template v-if="field.type === 'select' || field.type === 'multiselect'">
            <el-select
              v-model="searchModel[field.prop]"
              :multiple="field.type === 'multiselect' || field.multiple"
              :allow-create="field.allowCreate"
              :disabled="field.disabled"
              clearable
              filterable
              default-first-option
              :placeholder="field.placeholder || `请选择${field.label}`"
            >
              <el-option
                v-for="option in field.options || []"
                :key="String(option.value)"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </template>
          <template v-else-if="field.type === 'daterange'">
            <el-date-picker
              v-model="searchModel[field.prop]"
              type="daterange"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
            />
          </template>
          <template v-else>
            <el-input
              v-model="searchModel[field.prop]"
              clearable
              :placeholder="field.placeholder || `请输入${field.label}`"
            />
          </template>
        </el-form-item>
        <el-form-item class="search-actions">
          <div class="search-actions__group">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
          <div class="search-actions__group search-actions__group--right">
            <el-button @click="handleRefresh">刷新</el-button>
            <el-button v-if="canCreate" type="primary" @click="openCreate">新增</el-button>
          </div>
        </el-form-item>
      </el-form>

      <el-table :data="records" v-loading="loading" class="admin-table" stripe>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
        <el-table-column
          v-for="column in columns"
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <template v-if="column.type === 'status'">
              <el-tag :type="Number(row.status) === 1 ? 'success' : 'info'">
                {{ Number(row.status) === 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>
            <template v-else-if="column.type === 'image'">
              <el-image
                v-if="String(row[column.prop || ''] || '')"
                :src="resolveImageUrl(row[column.prop || ''])"
                fit="cover"
                class="table-image"
                :preview-src-list="[resolveImageUrl(row[column.prop || ''])]"
              />
              <span v-else>-</span>
            </template>
            <template v-else-if="column.type === 'actions'">
              <div class="row-actions">
                <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
                <el-button
                  v-if="statusApi"
                  link
                  type="warning"
                  @click="toggleStatus(row)"
                >
                  {{ Number(row.status) === 1 ? '禁用' : '启用' }}
                </el-button>
                <el-button v-if="canDelete" link type="danger" @click="handleDelete(row)">删除</el-button>
              </div>
            </template>
            <template v-else>
              {{ column.formatter ? column.formatter(row) : String(row[column.prop || ''] ?? '-') }}
            </template>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-bar">
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          @size-change="handleSearch"
          @current-change="loadList"
        />
      </div>
    </el-card>

    <el-drawer v-model="drawerVisible" :title="drawerTitle" size="680px" destroy-on-close>
      <el-form ref="formRef" :model="formModel" :rules="rules" label-position="top" class="editor-form">
        <el-row :gutter="18">
          <el-col
            v-for="field in normalFormFields"
            :key="field.prop"
            :span="field.span || 12"
          >
            <el-form-item :label="field.label" :prop="field.prop">
              <template v-if="field.type === 'select' || field.type === 'multiselect'">
                <el-select
                  v-model="formModel[field.prop]"
                  :multiple="field.type === 'multiselect' || field.multiple"
                  :allow-create="field.allowCreate"
                  :disabled="field.disabled"
                  filterable
                  clearable
                  default-first-option
                  :placeholder="field.placeholder || `请选择${field.label}`"
                >
                  <el-option
                    v-for="option in field.options || []"
                    :key="String(option.value)"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <template v-else-if="field.type === 'switch'">
                <el-switch
                  v-model="formModel[field.prop]"
                  :active-value="1"
                  :inactive-value="0"
                  :disabled="field.disabled"
                />
              </template>
              <template v-else-if="field.type === 'date'">
                <el-date-picker
                  v-model="formModel[field.prop]"
                  type="date"
                  value-format="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  clearable
                  :placeholder="field.placeholder || `请选择${field.label}`"
                />
              </template>
              <template v-else-if="field.type === 'datetime'">
                <el-date-picker
                  v-model="formModel[field.prop]"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  format="YYYY-MM-DD HH:mm:ss"
                  clearable
                  :placeholder="field.placeholder || `请选择${field.label}`"
                />
              </template>
              <template v-else-if="field.type === 'textarea' || field.type === 'json'">
                <el-input
                  v-model="formModel[field.prop]"
                  type="textarea"
                  :rows="field.rows || 4"
                  :disabled="field.disabled"
                  :placeholder="field.placeholder || `请输入${field.label}`"
                />
              </template>
              <template v-else-if="field.type === 'imageUpload'">
                <div class="image-upload-field">
                  <el-upload
                    action="#"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    :show-file-list="false"
                    :disabled="field.disabled"
                    :http-request="createImageUploadHandler(field)"
                  >
                    <el-button type="primary" :disabled="field.disabled">上传图片</el-button>
                  </el-upload>
                  <el-input
                    v-model="formModel[field.prop]"
                    clearable
                    :disabled="field.disabled"
                    :placeholder="field.placeholder || '上传后自动生成图片地址'"
                  />
                  <div v-if="formModel[field.prop]" class="image-upload-preview">
                    <el-image
                      :src="resolveImageUrl(formModel[field.prop])"
                      fit="cover"
                      :preview-src-list="[resolveImageUrl(formModel[field.prop])]"
                    />
                    <el-button text type="danger" :disabled="field.disabled" @click="formModel[field.prop] = ''">
                      清空
                    </el-button>
                  </div>
                </div>
              </template>
              <template v-else-if="field.type === 'number'">
                <el-input-number
                  v-model="formModel[field.prop]"
                  :min="field.min"
                  :max="field.max"
                  :step="field.step || 1"
                  :precision="field.precision"
                  :disabled="field.disabled"
                />
              </template>
              <template v-else>
                <el-input
                  v-model="formModel[field.prop]"
                  type="text"
                  :disabled="field.disabled"
                  :placeholder="field.placeholder || `请输入${field.label}`"
                />
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <el-collapse v-if="seoFormFields.length" class="seo-collapse">
          <el-collapse-item title="SEO 设置" name="seo">
            <el-row :gutter="18">
              <el-col
                v-for="field in seoFormFields"
                :key="field.prop"
                :span="field.span || 12"
              >
                <el-form-item :label="field.label" :prop="field.prop">
                  <el-input
                    v-model="formModel[field.prop]"
                    :type="field.type === 'textarea' ? 'textarea' : 'text'"
                    :rows="field.rows || 3"
                    :disabled="field.disabled"
                    :placeholder="field.placeholder || `请输入${field.label}`"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>

        <div class="drawer-actions">
          <el-button @click="drawerVisible = false">取消</el-button>
          <el-button type="primary" :loading="saving" @click="handleSubmit">保存</el-button>
        </div>
      </el-form>
    </el-drawer>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules, UploadRequestOptions } from 'element-plus'
import { uploadAdminImage } from '@/api/admin'
import type {
  AdminFormField,
  AdminSearchField,
  AdminTableColumn,
  PageResult,
} from '@/types/admin'

type RecordData = Record<string, any>

const props = defineProps<{
  tag: string
  title: string
  description: string
  searchFields: AdminSearchField[]
  columns: AdminTableColumn[]
  formFields: AdminFormField[]
  defaultForm: () => RecordData
  loadApi: (params: RecordData) => Promise<PageResult<RecordData>>
  getApi?: (id: number) => Promise<RecordData>
  createApi: (payload: RecordData) => Promise<unknown>
  updateApi: (id: number, payload: RecordData) => Promise<unknown>
  deleteApi: (id: number) => Promise<unknown>
  statusApi?: (id: number, status: number, row?: RecordData) => Promise<unknown>
  canCreate?: boolean
  canDelete?: boolean
}>()

const loading = ref(false)
const saving = ref(false)
const drawerVisible = ref(false)
const drawerTitle = ref('新增')
const editingId = ref<number | null>(null)
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const records = ref<RecordData[]>([])
const formRef = ref<FormInstance>()

const searchModel = reactive<RecordData>({})
const formModel = reactive<RecordData>(props.defaultForm())

const normalFormFields = computed(() => props.formFields.filter((field) => field.group !== 'seo'))
const seoFormFields = computed(() => props.formFields.filter((field) => field.group === 'seo'))

const rules = computed<FormRules<RecordData>>(() => {
  const ruleMap: Record<string, Array<Record<string, unknown>>> = {}

  props.formFields.forEach((field) => {
    const fieldRules: Array<Record<string, unknown>> = []

    if (field.required) {
      fieldRules.push({ required: true, message: `${field.label}不能为空`, trigger: 'blur' })
    }

    if (field.pattern || field.prop === 'slug') {
      const pattern = field.pattern || /^[a-z0-9-]+$/
      fieldRules.push({
        validator: (_rule: unknown, value: unknown, callback: (error?: Error) => void) => {
          const text = String(value ?? '')

          if (!text) {
            callback()
            return
          }

          if (!pattern.test(text)) {
            callback(new Error(field.patternMessage || `${field.label}只能使用英文小写、数字和中划线`))
            return
          }

          callback()
        },
        trigger: 'blur',
      })
    }

    if (field.type === 'number') {
      fieldRules.push({
        validator: (_rule: unknown, value: unknown, callback: (error?: Error) => void) => {
          if (value === '' || value === null || value === undefined) {
            callback()
            return
          }

          const numberValue = Number(value)

          if (Number.isNaN(numberValue)) {
            callback(new Error(`${field.label}必须是数字`))
            return
          }

          if (field.precision === 0 && !Number.isInteger(numberValue)) {
            callback(new Error(`${field.label}必须是整数`))
            return
          }

          if (field.min !== undefined && numberValue < field.min) {
            callback(new Error(`${field.label}不能小于 ${field.min}`))
            return
          }

          if (field.max !== undefined && numberValue > field.max) {
            callback(new Error(`${field.label}不能大于 ${field.max}`))
            return
          }

          callback()
        },
        trigger: 'blur',
      })
    }

    if (fieldRules.length) {
      ruleMap[field.prop] = fieldRules
    }
  })

  return ruleMap
})

function resetFormModel() {
  Object.assign(formModel, props.defaultForm())
}

function resolveImageUrl(value: unknown) {
  const url = String(value || '')

  if (!url || /^(https?:)?\/\//.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    return url
  }

  const normalizedUrl = url.startsWith('/') ? url : `/${url}`
  const adminBaseUrl = String(import.meta.env.VITE_ADMIN_API_BASE_URL || '')

  if (/^https?:\/\//.test(adminBaseUrl)) {
    return new URL(normalizedUrl, adminBaseUrl).toString()
  }

  return normalizedUrl
}

async function loadList() {
  loading.value = true

  try {
    const params: RecordData = {
      ...searchModel,
      pageNum: pageNum.value,
      pageSize: pageSize.value,
    }

    props.searchFields.forEach((field) => {
      if (field.type !== 'daterange') {
        return
      }

      const rangeValue = searchModel[field.prop]
      if (Array.isArray(rangeValue)) {
        if (field.startProp) {
          params[field.startProp] = rangeValue[0]
        }

        if (field.endProp) {
          params[field.endProp] = rangeValue[1]
        }
      }

      delete params[field.prop]
    })

    const result = await props.loadApi({
      ...params,
    })

    records.value = Array.isArray(result.records) ? result.records : Array.isArray((result as RecordData).list) ? (result as RecordData).list : []
    total.value = Number(result.total ?? (result as RecordData).totalCount ?? records.value.length)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pageNum.value = 1
  loadList()
}

function handleRefresh() {
  loadList()
}

function handleReset() {
  Object.keys(searchModel).forEach((key) => delete searchModel[key])
  pageNum.value = 1
  loadList()
}

function openCreate() {
  editingId.value = null
  drawerTitle.value = `新增${props.title}`
  resetFormModel()
  drawerVisible.value = true
}

async function openEdit(row: RecordData) {
  editingId.value = Number(row.id)
  drawerTitle.value = `编辑${props.title}`
  resetFormModel()

  if (props.getApi && Number.isFinite(editingId.value)) {
    const detail = await props.getApi(editingId.value)
    Object.assign(formModel, detail)
  } else {
    Object.assign(formModel, row)
  }

  drawerVisible.value = true
}

async function handleSubmit() {
  await formRef.value?.validate()

  saving.value = true
  try {
    const payload = JSON.parse(JSON.stringify(formModel))

    if (editingId.value) {
      await props.updateApi(editingId.value, payload)
    } else {
      await props.createApi(payload)
    }

    drawerVisible.value = false
    await loadList()
  } finally {
    saving.value = false
  }
}

async function handleDelete(row: RecordData) {
  if (!props.canDelete) {
    return
  }

  const confirmed = await ElMessageBox.confirm(`确认删除这条${props.title}吗？`, '删除确认', {
    type: 'warning',
  })
    .then(() => true)
    .catch(() => false)

  if (!confirmed) {
    return
  }

  await props.deleteApi(Number(row.id))
  await loadList()
}

async function toggleStatus(row: RecordData) {
  if (!props.statusApi) {
    return
  }

  const nextStatus = Number(row.status) === 1 ? 0 : 1
  await props.statusApi(Number(row.id), nextStatus, row)
  await loadList()
}

async function handleImageUpload(field: AdminFormField, options: RecordData) {
  const file = options.file as File
  const bizType = field.uploadBizType || field.prop
  const result = await uploadAdminImage(file, bizType)
  formModel[field.prop] = result.url
  ElMessage.success('图片上传成功')
  options.onSuccess?.(result)
}

function createImageUploadHandler(field: AdminFormField) {
  return (options: UploadRequestOptions) => handleImageUpload(field, options as RecordData)
}

onMounted(() => {
  loadList()
})

defineExpose({
  reload: loadList,
})
</script>

<style scoped lang="scss">
.admin-page {
  display: grid;
  gap: 18px;
}

.admin-page__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  padding: 2px 2px 0;
}

.admin-page__tag {
  margin: 0 0 8px;
  color: #b26b00;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.admin-page__header h2 {
  margin: 0;
  color: #16263a;
  font-size: 28px;
}

.admin-page__desc {
  margin: 8px 0 0;
  max-width: 760px;
  color: #64748b;
  line-height: 1.7;
}

.admin-card {
  border: 1px solid rgba(15, 28, 44, 0.08);
  border-radius: 22px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
}

.search-bar {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0 12px;
  margin-bottom: 18px;
}

.search-actions {
  flex: 1 1 auto;
  margin-right: 0;
}

.search-actions :deep(.el-form-item__content) {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.search-actions__group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.search-actions__group--right {
  margin-left: auto;
}

.admin-table {
  border-radius: 16px;
  overflow: hidden;
}

.table-image {
  width: 60px;
  height: 36px;
  border-radius: 8px;
}

.row-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.pagination-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.editor-form {
  display: grid;
  gap: 8px;
}

.image-upload-field {
  display: grid;
  gap: 10px;
}

.image-upload-preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.image-upload-preview :deep(.el-image) {
  width: 120px;
  height: 76px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

.seo-collapse {
  margin-top: 4px;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.seo-collapse :deep(.el-collapse-item__header) {
  color: #334155;
  font-weight: 600;
}

.drawer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 900px) {
  .admin-page__header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
