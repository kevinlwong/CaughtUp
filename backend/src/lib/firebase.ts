import admin from 'firebase-admin'
import path from 'path'
import fs from 'fs'

// Resolve relative to the current file
const serviceAccountPath = path.resolve(__dirname, '../../firebase/serviceAccountKey.json')

// Optional: log for debugging
console.log('[FIREBASE] Loading service account from:', serviceAccountPath)

// Validate file exists
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error('Service account file not found: ' + serviceAccountPath)
}

const serviceAccount = require(serviceAccountPath)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const auth = admin.auth()
