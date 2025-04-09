// screens/onboarding/InterestsScreen.tsx
import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import ScreenWrapper from '../../components/ScreenWrapper'

const topics = [
  "Technology",
  "Politics",
  "Sports",
  "Science",
  "Entertainment",
  "Business",
  "World News",
  "Health",
  "Environment",
  "Education",
  "Culture",
  "Travel",
  "Lifestyle",
  "Finance",
  "Social Justice",
];

export default function InterestsScreen({ onNext }: { onNext: (selected: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (topic: string) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    )
  }

  return (
    <ScreenWrapper bg="blue-300">
      <Text style={tw`text-xl font-bold mb-4`}>What are you interested in?</Text>
      {topics.map((topic) => (
        <TouchableOpacity
          key={topic}
          onPress={() => toggle(topic)}
          style={tw`w-full p-3 my-1 rounded ${selected.includes(topic) ? "bg-blue-500" : "bg-gray-200"}`}
        >
          <Text style={tw`${selected.includes(topic) ? "text-white" : "text-black"} text-center`}>
            {topic}
          </Text>
        </TouchableOpacity>
      ))}
      <Button title="Next" onPress={() => onNext(selected)} disabled={selected.length === 0} />
      </ScreenWrapper>
  )
}
