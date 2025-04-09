import { getIdToken } from './auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function authFetch(path: string, options: RequestInit = {}) {
  const token = await getIdToken()
  
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function pingBackend() {
  const res = await fetch(`${API_URL}/api/ping`)
  const data = await res.json()
  return data
}
