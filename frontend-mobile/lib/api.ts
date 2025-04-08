// frontend-mobile/lib/api.ts
import { getIdToken, getAuth } from "firebase/auth"

export async function authFetch(path: string, options: RequestInit = {}) {
  const auth = getAuth()
  const user = auth.currentUser

  if (!user) throw new Error("Not authenticated")

  const token = await getIdToken(user)

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Request failed")
  }

  return res.json()
}


const API_URL = process.env.EXPO_PUBLIC_API_URL 
export async function pingBackend() {
  try {
    const res = await fetch(`${API_URL}/api/ping`)
    return await res.json()
  } catch (err) {
    return { message: 'Failed to connect to backend' }
  }
}