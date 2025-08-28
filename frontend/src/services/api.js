const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function request(path, opts = {}) {
  const res = await fetch(BASE + path, opts)
  if (!res.ok) {
    let err
    try { err = await res.json() } catch { err = { message: res.statusText } }
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

export function shortenUrl(originalUrl, expiryDays) {
  const body = { url: originalUrl }
  if (expiryDays) body.expiryDays = Number(expiryDays)
  return request('/api/v1/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
