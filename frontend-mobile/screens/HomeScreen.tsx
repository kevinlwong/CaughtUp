// screens/HomeScreen.tsx
import React from 'react'
import { View, Text, Button } from 'react-native'
import tw from 'twrnc'
import { UserProfile } from '../types/quiz'
import ScreenWrapper from '../components/ScreenWrapper'

type Props = {
    onStart: () => void
    profile: { name?: string }
  }
  
  export default function HomeScreen({ onStart, profile }: Props) {
    return (
        <ScreenWrapper bg="blue-300">
        <Text style={tw`text-2xl font-bold mb-2`}>
          Hey {profile.name || "there"}, Welcome to CaughtUp 🎯
        </Text>
        <Button title="Start Daily Quiz" onPress={onStart} />
      </ScreenWrapper>
    )
  }
  