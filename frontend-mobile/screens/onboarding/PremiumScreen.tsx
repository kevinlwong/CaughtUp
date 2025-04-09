// screens/onboarding/PremiumScreen.tsx
import React from "react"
import { View, Text, Button } from "react-native"
import tw from "twrnc"
import { authFetch } from "../../lib/api"
import ScreenWrapper from "../../components/ScreenWrapper"

export default function PremiumScreen({
  profile,
  onComplete,
}: {
  profile: any
  onComplete: () => void
}) {
  const handleSubmit = async (isPremium: boolean) => {
    const fullProfile = {
      ...profile,
      isPremium,
      finishedOnboarding: true,
    }

    try {
      await authFetch("/api/profile", {
        method: "POST",
        body: JSON.stringify(fullProfile),
      })

      onComplete()
    } catch (err) {
      console.error("Failed to save profile", err)
    }
  }

  return (
    <ScreenWrapper bg="blue-300">
      <Text style={tw`text-xl font-bold mb-4`}>Free or Premium?</Text>
      <Text style={tw`text-center mb-6`}>
        Premium unlocks more quizzes and customization. Choose your path:
      </Text>
      <Button title="Stay Free" onPress={() => handleSubmit(false)} />
      <View style={tw`h-4`} />
      <Button title="Become Premium 💎" onPress={() => handleSubmit(true)} />
    </ScreenWrapper>
  )
}
