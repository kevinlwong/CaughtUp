// screens/HomeScreen.tsx
import React from 'react'
import { View, Text, Button } from 'react-native'
import tw from 'twrnc'

type Props = {
  onStart: () => void
}

export default function HomeScreen({ onStart }: Props) {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl mb-4`}>Welcome to CaughtUp 🎯</Text>
      <Button title="Start Daily Quiz" onPress={onStart} />
    </View>
  )
}
