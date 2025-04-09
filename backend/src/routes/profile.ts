import express from "express"
import { verifyFirebaseToken } from "../middleware/auth"

const router = express.Router()

// In-memory store (TEMP until real DB)
const profileStore: Record<string, any> = {}

router.get("/", verifyFirebaseToken, (req, res) => {
  const uid = (req as any).user.uid
  const profile = profileStore[uid] || {}
  res.json(profile)
})

router.post("/", verifyFirebaseToken, (req, res) => {
  const uid = (req as any).user.uid
  const profile = req.body

  // 👇 Save whatever came in — including "name"
  profileStore[uid] = profile

  console.log(`Saved profile for ${uid}:`, profile)

  res.json({ message: "Profile saved" })
})

export default router
