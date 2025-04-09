import React from "react"
import { View, TouchableOpacity, Text, Alert } from "react-native"
import tw from "twrnc"

type Props = {
  currentScreen: string
  onNavigateHome: () => void
}

export default function HomeButton({ currentScreen, onNavigateHome }: Props) {
  const handlePress = () => {
    if (currentScreen === "quiz") {
      Alert.alert(
        "Exit Quiz?",
        "Your progress will not be saved. Are you sure you want to go home?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes, go home", style: "destructive", onPress: onNavigateHome },
        ]
      )
    } else {
      onNavigateHome()
    }
  }

  return (
    <View style={tw`absolute top-12 left-4 z-50`}>
      <TouchableOpacity
        onPress={handlePress}
        style={tw`bg-gray-500 px-4 py-2 rounded-full shadow-lg`}
      >
        <Text style={tw`text-white font-bold`}>Home</Text>
      </TouchableOpacity>
    </View>
  )
}
