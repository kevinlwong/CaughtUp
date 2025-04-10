'use client'
import { useEffect, useState } from 'react'
import { authFetch } from '@/lib/api'

export default function Profile() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    authFetch('/api/profile')
      .then(setProfile)
      .catch((err) => console.error('Failed to fetch profile:', err))

      authFetch('/api/profile')
  .then((data) => console.log("✅ Profile:", data))
  .catch((err) => console.error("❌ Profile fetch failed:", err));

  }, [])

  if (!profile) return <p>Loading...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome {profile.user.email}</h1>
      <pre>{JSON.stringify(profile.user, null, 2)}</pre>
    </div>
  )
}
