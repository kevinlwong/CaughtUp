export type QuizQuestion = {
    id: string
    question: string
    options: string[]
    correctAnswers: number[] // indexes of correct options
    type: 'multiple-choice' | 'multi-select' | 'fill-in'
  }
  