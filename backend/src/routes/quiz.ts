import express from 'express'
import { verifyFirebaseToken } from '../middleware/auth'

const router = express.Router()

router.get('/daily', verifyFirebaseToken, async (req, res) => {
  // For now: return hardcoded dummy questions
  res.json({
    questions: [
        
            {
              id: "q1",
              question: "Which company currently produces the iPhone?",
              options: ["Samsung", "Google", "Apple"],
              correctAnswer: "Apple",
            },
            {
              id: "q2",
              question: "What currency is used in the European Union?",
          options: ["Euro", "Pound", "Franc"],
              correctAnswer: "Euro",
            },
            {
              id: "q3",
              question: "Which streaming service released the series 'Fallout' in 2024?",
              options: ["Netflix", "Prime Video", "HBO Max"],
              correctAnswer: "Prime Video",
            },
            {
              id: "q4",
              question: "What does 'AI' stand for in tech?",
              options: ["Automated Interface", "Artificial Intelligence", "Active Integration"],
              correctAnswer: "Artificial Intelligence",
            },
            {
              id: "q5",
              question: "Which planet in our solar system is known for its rings?",
              options: ["Saturn", "Mars", "Venus"],
              correctAnswer: "Saturn",
            },
            {
              id: "q6",
              question: "Which sporting event is scheduled to take place in Paris in 2024?",
              options: ["Winter Olympics", "Summer Olympics", "World Cup"],
              correctAnswer: "Summer Olympics",
            }
          
          
    ],
  })
})

export default router
