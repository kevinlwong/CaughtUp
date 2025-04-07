const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function pingBackend() {
  const res = await fetch(`${API_URL}/api/ping`)
  const data = await res.json()
  return data
}
