import { QuizQuestion } from './types'

export function shuffleOptions(q: QuizQuestion): QuizQuestion {
  const options = [...q.options]
  const shuffled = options.sort(() => Math.random() - 0.5)
  return { ...q, options: shuffled }
}
