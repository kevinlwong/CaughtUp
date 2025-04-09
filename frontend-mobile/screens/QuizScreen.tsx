// screens/QuizScreen.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { QuizQuestion, QuizResult } from '../types/quiz'
import { authFetch } from '../lib/api'

type Props = {
  onComplete: (result: QuizResult) => void
}

export default function QuizScreen({ onComplete }: Props) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [id: string]: string }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authFetch("/api/quiz/daily")
      .then((res) => {
        console.log("Quiz loaded:", res)
        setQuestions(res.questions)
      })
      .catch((err) => {
        console.error("Failed to load quiz:", err)
      })
      .finally(() => setLoading(false))
  }, [])

  const current = questions[currentIndex]

  if (!current) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-blue-300`}>
        <Text style={tw`text-red-500`}>Failed to load quiz question.</Text>
        <Button title="Back to Home" onPress={() => onComplete({ score: 0, total: 0, correctQuestions: [] })} />
      </View>
    )
  }

  const handleSelect = (option: string) => {
    console.log("Selected:", option)
    const currentQuestion = questions[currentIndex]
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: option,
    }
  
    const next = currentIndex + 1
  
    if (next < questions.length) {
      setAnswers(updatedAnswers)
      setCurrentIndex(next)
    } else {
      // Done! Evaluate with updatedAnswers
      const correct = questions.filter(
        (q) => updatedAnswers[q.id] === q.correctAnswer
      )
  
      const result: QuizResult = {
        score: correct.length,
        total: questions.length,
        correctQuestions: correct.map((q) => q.id),
      }
      console.log("Quiz finished, sending result:", result)

      onComplete(result)
    }
  }
  

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading quiz...</Text>
      </View>
    )
  }

  if (!questions.length) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>No quiz available today 💤</Text>
        <Button title="Back to Home" onPress={() => onComplete({ score: 0, total: 0, correctQuestions: [] })} />
      </View>
    )
  }

  return (
    <View style={tw`flex-1 p-4 justify-center bg-blue-300`}>
      <Text style={tw`text-xl font-bold mb-4`}>{current.question}</Text>
      {current.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={tw`bg-blue-500 p-3 rounded-xl mb-4`}
          onPress={() => handleSelect(option)}
        >
          <Text style={tw`text-white`}>{option}</Text>
        </TouchableOpacity>
      ))}
      <Text style={tw`text-xs text-gray-700 mt-4`}>
        Question {currentIndex + 1} of {questions.length}
      </Text>
    </View>
  )
}
