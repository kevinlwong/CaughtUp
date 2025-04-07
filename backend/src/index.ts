import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { verifyFirebaseToken } from './middleware/auth'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/ping', (req, res) => {
  res.json({ message: 'CaughtUp backend is alive 🚀' })
})

app.get('/api/profile', verifyFirebaseToken, (req, res) => {
  const user = (req as any).user
  res.json({ user })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})
