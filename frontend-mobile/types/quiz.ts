// types/quiz.ts
export type QuizQuestion = {
    id: string
    question: string
    options: string[]
    correctAnswer: string // backend uses this, you don’t show it
  }
  
  export type QuizResult = {
    score: number
    total: number
    correctQuestions: string[]
  }
  
  export type UserProfile = {
    name?: string
    generation?: string
    interests?: string[]
    isPremium?: boolean
    finishedOnboarding?: boolean
  }
  