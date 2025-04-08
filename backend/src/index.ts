import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { verifyFirebaseToken } from './middleware/auth'
import quizRoutes from './routes/quiz'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/quiz', quizRoutes)

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
