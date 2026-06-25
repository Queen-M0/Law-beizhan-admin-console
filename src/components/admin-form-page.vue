<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <div>
        <p class="admin-page__tag">{{ tag }}</p>
        <h2>{{ title }}</h2>
        <p class="admin-page__desc">{{ description }}</p>
      </div>
      <div class="admin-page__actions">
        <el-button @click="loadData">刷新</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </div>
    </header>

    <el-card shadow="never" class="admin-card">
      <el-form ref="formRef" :model="formModel" :rules="rules" label-position="top">
        <el-row :gutter="18">
          <el-col
            v-for="field in formFields"
            :key="field.prop"
            :span="field.span || 12"
          >
            <el-form-item :label="field.label" :prop="field.prop">
              <template v-if="field.type === 'select'">
                <el-select v-model="formModel[field.prop]" filterable clearable :placeholder="field.placeholder || `请选择${field.label}`">
                  <el-option
                    v-for="option in field.options || []"
                    :key="String(option.value)"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <template v-else-if="field.type === 'switch'">
                <el-switch v-model="formModel[field.prop]" :active-value="1" :inactive-value="0" />
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
                  :placeholder="field.placeholder || `请输入${field.label}`"
                />
              </template>
              <template v-else>
                <el-input
                  v-model="formModel[field.prop]"
                  :type="field.type === 'number' ? 'number' : 'text'"
                  :min="field.min"
                  :max="field.max"
                  :placeholder="field.placeholder || `请输入${field.label}`"
                />
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { AdminFormField } from '@/types/admin'

type RecordData = Record<string, any>

const props = defineProps<{
  tag: string
  title: string
  description: string
  formFields: AdminFormField[]
  defaultForm: () => RecordData
  loadApi: () => Promise<RecordData>
  saveApi: (payload: RecordData) => Promise<unknown>
}>()

const formRef = ref<FormInstance>()
const saving = ref(false)
const formModel = reactive<RecordData>(props.defaultForm())

const rules = computed<FormRules<RecordData>>(() => {
  const ruleMap: Record<string, Array<{ required?: boolean; message: string; trigger: string }>> = {}

  props.formFields.forEach((field) => {
    if (field.required) {
      ruleMap[field.prop] = [{ required: true, message: `${field.label}不能为空`, trigger: 'blur' }]
    }
  })

  return ruleMap
})

async function loadData() {
  const data = await props.loadApi()
  Object.assign(formModel, props.defaultForm(), data || {})
}

async function handleSave() {
  await formRef.value?.validate()
  saving.value = true
  try {
    await props.saveApi(JSON.parse(JSON.stringify(formModel)))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadData()
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

.admin-page__actions {
  display: flex;
  gap: 12px;
}

.admin-card {
  border: 1px solid rgba(15, 28, 44, 0.08);
  border-radius: 22px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
}

@media (max-width: 900px) {
  .admin-page__header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>


