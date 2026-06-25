import type { AdminFieldOption, AdminFormField, AdminSearchField, AdminTableColumn } from '@/types/admin'

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

export const practiceAreaOptions: AdminFieldOption[] = [
  { label: '民商事诉讼', value: 'civil-litigation' },
  { label: '企业合规', value: 'corporate-compliance' },
  { label: '知识产权', value: 'intellectual-property' },
  { label: '刑事辩护', value: 'criminal-defense' },
  { label: '劳动争议', value: 'labor-dispute' },
  { label: '婚姻家事', value: 'family-wealth' },
  { label: '商事仲裁', value: 'arbitration' },
  { label: '涉外法律', value: 'foreign-affairs' },
  { label: '投融资并购', value: 'investment-financing' },
]

function buildCommonSearchFields(): AdminSearchField[] {
  return [
    { prop: 'name', label: '姓名', placeholder: '请输入姓名' },
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: statusOptions,
    },
  ]
}

function buildCommonColumns(): AdminTableColumn[] {
  return [
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
    searchFields: buildCommonSearchFields(),
    columns: buildCommonColumns(),
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
      { prop: 'name', label: '姓名', required: true, span: 12 },
      { prop: 'title', label: '头衔', required: true, span: 12 },
      { prop: 'avatarUrl', label: '头像地址', span: 12 },
      { prop: 'coverImageUrl', label: '头图地址', span: 12 },
      { prop: 'summary', label: '简介', type: 'textarea', rows: 4, span: 24 },
      { prop: 'biography', label: '详情介绍', type: 'textarea', rows: 7, span: 24 },
      {
        prop: 'practiceAreaIds',
        label: '擅长领域',
        type: 'multiselect',
        allowCreate: true,
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
