// screens/onboarding/GenerationScreen.tsx
import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import ScreenWrapper from '../../components/ScreenWrapper'

const options = ["Gen Z", "Millennial", "Generation X", "Boomer"]

export default function GenerationScreen({ onNext }: { onNext: (generation: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (

    <ScreenWrapper bg="blue-300">
      <Text style={tw`text-xl font-bold mb-4`}>Which generation are you in?</Text>
      {options.map((gen) => (
        <TouchableOpacity
          key={gen}
          onPress={() => setSelected(gen)}
          style={tw`w-full p-3 my-1 rounded ${selected === gen ? "bg-blue-500" : "bg-gray-200"}`}
        >
          <Text style={tw`${selected === gen ? "text-white" : "text-black"} text-center`}>{gen}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Next" onPress={() => selected && onNext(selected)} disabled={!selected} />
      </ScreenWrapper>
  )
}
