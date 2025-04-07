import { pingBackend } from '@/lib/api'

export default async function Home() {
  const data = await pingBackend()

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <h1 className="text-2xl font-bold">Web: {data.message}</h1>
    </main>
  )
}
