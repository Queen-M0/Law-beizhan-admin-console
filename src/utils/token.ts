export function resolveToken(data: unknown): string {
  if (!data || typeof data !== 'object') {
    return ''
  }

  const source = data as Record<string, unknown>
  const candidates = [
    source.token,
    source.accessToken,
    source.access_token,
    source.jwt,
    source.data && typeof source.data === 'object'
      ? (source.data as Record<string, unknown>).token
      : undefined,
    source.data && typeof source.data === 'object'
      ? (source.data as Record<string, unknown>).accessToken
      : undefined,
    source.result && typeof source.result === 'object'
      ? (source.result as Record<string, unknown>).token
      : undefined,
  ]

  const token = candidates.find((item) => typeof item === 'string' && item.trim())
  return typeof token === 'string' ? token : ''
}
