import type { PageResult } from '@/types/admin'

type RawPageResult<T> = Partial<PageResult<T>> & {
  list?: T[]
  totalCount?: number
}

export function cleanParams(params: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '' && value !== undefined && value !== null),
  )
}

export function normalizePageResult<T>(data: unknown): PageResult<T> {
  if (Array.isArray(data)) {
    return {
      records: data as T[],
      total: data.length,
      pageNum: 1,
      pageSize: data.length || 10,
      totalPages: 1,
    }
  }

  const page = (data || {}) as RawPageResult<T>
  const records = Array.isArray(page.records) ? page.records : Array.isArray(page.list) ? page.list : []
  const total = Number(page.total ?? page.totalCount ?? records.length)
  const pageNum = Number(page.pageNum ?? 1)
  const pageSize = Number(page.pageSize ?? (records.length || 10))

  return {
    records,
    total,
    pageNum,
    pageSize,
    totalPages: Number(page.totalPages ?? Math.ceil(total / Math.max(pageSize, 1))),
  }
}
