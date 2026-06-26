export interface PageResult<T> {
  records: T[]
  total: number
  pageNum: number
  pageSize: number
  totalPages: number
}

export interface AdminStatusOption {
  label: string
  value: number
}

export interface AdminFieldOption {
  label: string
  value: string | number
}

export type AdminFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'switch'
  | 'date'
  | 'datetime'
  | 'json'
  | 'imageUpload'

export interface AdminSearchField {
  prop: string
  label: string
  type?: AdminFieldType
  placeholder?: string
  options?: AdminFieldOption[]
  multiple?: boolean
  allowCreate?: boolean
  disabled?: boolean
}

export interface AdminFormField extends AdminSearchField {
  required?: boolean
  span?: number
  rows?: number
  min?: number
  max?: number
  step?: number
  precision?: number
  disabled?: boolean
  uploadBizType?: string
}

export interface AdminTableColumn {
  prop?: string
  label: string
  width?: string | number
  minWidth?: string | number
  type?: AdminFieldType | 'status' | 'image' | 'actions'
  formatter?: (row: Record<string, unknown>) => string
}
