const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001'

export async function pingBackend() {
  try {
    const res = await fetch(`${API_URL}/api/ping`)
    return await res.json()
  } catch (err) {
    return { message: 'Failed to connect to backend' }
  }
}
