import type { AdminFieldOption, AdminFormField, AdminSearchField, AdminTableColumn } from '@/types/admin'
import { reactive } from 'vue'
import { listPracticeAreas } from '@/api/admin'

export type PersonType = 'lawyer' | 'expert'

export interface PersonPageConfig {
  tag: string
  title: string
  description: string
  personType: PersonType
  defaultForm: () => Record<string, unknown>
  searchFields: AdminSearchField[]
  columns: AdminTableColumn[]
  formFields: AdminFormField[]
}

export interface PracticeAreaPageConfig {
  tag: string
  title: string
  description: string
  defaultForm: () => Record<string, unknown>
  searchFields: AdminSearchField[]
  columns: AdminTableColumn[]
  formFields: AdminFormField[]
}

export const statusOptions: AdminFieldOption[] = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]

// 擅长领域选项：从后端 /admin/practice-areas 动态加载，value 必须是真实数字 ID
// （后端 AdminPersonSaveDTO.practiceAreaIds 是 List<Long>，传字符串 slug 会反序列化失败 → “系统繁忙”）
export const practiceAreaOptions = reactive<AdminFieldOption[]>([])

let practiceAreaLoaded = false

export async function loadPracticeAreaOptions(force = false): Promise<void> {
  if (practiceAreaLoaded && !force) {
    return
  }
  try {
    const result = await listPracticeAreas({ pageNum: 1, pageSize: 200, status: 1 })
    const records = (result?.records ?? []) as Array<Record<string, unknown>>
    practiceAreaOptions.splice(
      0,
      practiceAreaOptions.length,
      ...records.map((item) => ({
        label: String(item.name ?? ''),
        value: Number(item.id),
      })),
    )
    practiceAreaLoaded = true
  } catch {
    // 加载失败不阻塞页面，下次进入再试
    practiceAreaLoaded = false
  }
}

export const expertTeamOptions: AdminFieldOption[] = [
  { label: '鉴定团队', value: '鉴定团队' },
  { label: '心理咨询团队', value: '心理咨询团队' },
  { label: '知识产权团队', value: '知识产权团队' },
]

function buildCommonSearchFields(personType: PersonType): AdminSearchField[] {
  const fields: AdminSearchField[] = [
    { prop: 'name', label: '姓名', placeholder: '请输入姓名' },
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: statusOptions,
    },
  ]

  if (personType === 'expert') {
    fields.splice(1, 0, {
      prop: 'teamName',
      label: '专家团队',
      type: 'select',
      placeholder: '请选择团队',
      options: expertTeamOptions,
    })
  }

  return fields
}

function buildCommonColumns(personType: PersonType): AdminTableColumn[] {
  const columns: AdminTableColumn[] = [
    { prop: 'id', label: 'ID', width: 90 },
    { prop: 'name', label: '姓名', width: 140 },
    { prop: 'avatarUrl', label: '头像', type: 'image', width: 100 },
    { prop: 'title', label: '头衔', minWidth: 180 },
    { prop: 'caseCount', label: '案例数', width: 100 },
    { prop: 'rating', label: '评分', width: 100, formatter: (row) => `${Number(row.rating ?? 0).toFixed(1)}` },
    { prop: 'status', label: '状态', type: 'status', width: 110 },
    {
      prop: 'featured',
      label: '是否推荐',
      width: 110,
      formatter: (row) => (Number(row.featured) === 1 || row.featured === true ? '推荐' : '普通'),
    },
    { prop: 'sortOrder', label: '排序', width: 90 },
    { prop: 'updatedAt', label: '更新时间', minWidth: 180 },
    { label: '操作', type: 'actions', width: 180 },
  ]

  if (personType === 'expert') {
    columns.splice(3, 0, { prop: 'teamName', label: '专家团队', minWidth: 150 })
  }

  return columns
}

export function createPersonPageConfig(personType: PersonType): PersonPageConfig {
  const isLawyer = personType === 'lawyer'
  const title = isLawyer ? '律师管理' : '专家管理'

  return {
    tag: isLawyer ? 'LAWYER' : 'EXPERT',
    title,
    description: isLawyer
      ? '维护律师基础信息、头像、详情介绍、擅长领域、案例数、评分与推荐位。'
      : '维护专家基础信息、头像、详情介绍、擅长领域、案例数、评分与推荐位。',
    personType,
    defaultForm: () => ({
      personType,
      teamName: '',
      name: '',
      title: '',
      avatarUrl: '',
      coverImageUrl: '',
      summary: '',
      biography: '',
      practiceAreaIds: [],
      caseCount: 0,
      rating: 0,
      featured: 0,
      sortOrder: 0,
      status: 1,
    }),
    searchFields: buildCommonSearchFields(personType),
    columns: buildCommonColumns(personType),
    formFields: [
      {
        prop: 'personType',
        label: '人物类型',
        type: 'select',
        required: true,
        span: 12,
        options: [{ label: title, value: personType }],
        disabled: true,
      },
      ...(isLawyer
        ? []
        : [
            {
              prop: 'teamName',
              label: '专家团队',
              type: 'select' as const,
              required: true,
              span: 12,
              options: expertTeamOptions,
            },
          ]),
      { prop: 'name', label: '姓名', required: true, span: 12 },
      { prop: 'title', label: '头衔', required: true, span: 12 },
      { prop: 'avatarUrl', label: '头像图片', type: 'imageUpload', uploadBizType: `${personType}-avatar`, span: 12 },
      { prop: 'coverImageUrl', label: '头图图片', type: 'imageUpload', uploadBizType: `${personType}-cover`, span: 12 },
      { prop: 'summary', label: '简介', type: 'textarea', rows: 4, span: 24 },
      { prop: 'biography', label: '详情介绍', type: 'textarea', rows: 7, span: 24 },
      {
        prop: 'practiceAreaIds',
        label: '擅长领域',
        type: 'multiselect',
        allowCreate: false,
        multiple: true,
        span: 24,
        options: practiceAreaOptions,
      },
      { prop: 'caseCount', label: '案例数', type: 'number', min: 0, step: 1, precision: 0, span: 12 },
      { prop: 'rating', label: '评分', type: 'number', min: 0, max: 5, step: 0.1, precision: 1, span: 12 },
      { prop: 'featured', label: '是否推荐', type: 'switch', span: 12 },
      { prop: 'sortOrder', label: '排序', type: 'number', step: 1, precision: 0, span: 12 },
      {
        prop: 'status',
        label: '状态',
        type: 'select',
        required: true,
        span: 12,
        options: statusOptions,
      },
    ],
  }
}

export function createPracticeAreaPageConfig(): PracticeAreaPageConfig {
  return {
    tag: 'PRACTICE AREA',
    title: '擅长领域管理',
    description: '维护人物关联的擅长领域基础字典，供律师和专家复用。',
    defaultForm: () => ({
      name: '',
      status: 1,
      sortOrder: 0,
    }),
    searchFields: [
      { prop: 'name', label: '名称', placeholder: '请输入领域名称' },
      {
        prop: 'status',
        label: '状态',
        type: 'select',
        placeholder: '请选择状态',
        options: statusOptions,
      },
    ],
    columns: [
      { prop: 'id', label: 'ID', width: 90 },
      { prop: 'name', label: '名称', minWidth: 200 },
      { prop: 'status', label: '状态', type: 'status', width: 110 },
      { prop: 'sortOrder', label: '排序', width: 100 },
      { prop: 'updatedAt', label: '更新时间', minWidth: 180 },
      { label: '操作', type: 'actions', width: 180 },
    ],
    formFields: [
      { prop: 'name', label: '名称', required: true, span: 12 },
      { prop: 'sortOrder', label: '排序', type: 'number', step: 1, precision: 0, span: 12 },
      { prop: 'status', label: '状态', type: 'select', required: true, span: 12, options: statusOptions },
    ],
  }
}