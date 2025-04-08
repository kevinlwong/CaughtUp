export type QuizQuestionType = 'multiple_choice' | 'multi_select' | 'fill_in_blank'

export type QuizOption = {
  id: string
  text: string
}

export type QuizQuestion = {
  id: string
  type: QuizQuestionType
  prompt: string
  options?: QuizOption[]
  correctAnswers?: string[] // optional for frontend
}

export type Quiz = {
  id: string
  title: string
  date: string // e.g. '2025-04-08'
  questions: QuizQuestion[]
}
