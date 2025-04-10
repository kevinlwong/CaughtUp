import { getAuth } from 'firebase/auth'

export async function getIdToken(): Promise<string | null> {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return null
  return await user.getIdToken()
}