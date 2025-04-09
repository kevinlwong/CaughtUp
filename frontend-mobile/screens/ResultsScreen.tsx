// screens/ResultsScreen.tsx
import React from 'react'
import { View, Text, Button } from 'react-native'
import tw from 'twrnc'
import { QuizResult } from '../types/quiz'

type Props = {
  result: QuizResult
  onRestart: () => void
}

export default function ResultsScreen({ result, onRestart }: Props) {
  return (
    <View style={tw`flex-1 justify-center items-center p-4 bg-blue-300`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Results 🎉</Text>
      <Text style={tw`text-lg mb-2`}>
        Score: {result.score} / {result.total}
      </Text>
      <Button title="Try Again" onPress={onRestart} />
    </View>
  )
}
