import { getAuth } from 'firebase/auth'

const API_URL = process.env.EXPO_PUBLIC_API_URL 

export async function authFetch(path: string, options: RequestInit = {}) {
  const user = getAuth().currentUser
  const token = user ? await user.getIdToken() : null

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
  try {
    const res = await fetch(`${API_URL}/api/ping`)
    return await res.json()
  } catch (err) {
    return { message: 'Failed to connect to backend' }
  }
}