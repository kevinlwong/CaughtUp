import { Request, Response, NextFunction } from 'express'
import { auth } from '../lib/firebase' // ✅ adjust path if needed

export async function verifyFirebaseToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization
  
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing auth token' })
      return
    }
  
    const idToken = authHeader.split('Bearer ')[1]
  
    try {
      const decoded = await auth.verifyIdToken(idToken)
      ;(req as any).user = decoded
      next()
    } catch (err) {
      console.error('Token verification failed:', err)
      res.status(401).json({ error: 'Invalid token' })
    }
  }
  