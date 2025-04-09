import React from "react"
import { View, Text, Button, Image } from "react-native"
import tw from "twrnc"
import { MotiView } from "moti"
import ScreenWrapper from "../../components/ScreenWrapper"

type Props = {
  onNext: () => void
}

export default function WelcomeScreen({ onNext }: Props) {
  return (
    <ScreenWrapper bg="blue-300">
      <Image
        source={require("../../assets/CaughtUp.png")}
        style={tw`w-32 h-32 mb-6`}
        resizeMode="contain"
      />
      <Text style={tw`text-4xl text-white mb-2`}>👋</Text>
      <Text style={tw`text-white text-xl font-bold mb-4`}>
        Welcome to CaughtUp!
      </Text>
      <Text style={tw`text-white text-center mb-8`}>
        Your daily news quiz to stay sharp & informed.
      </Text>
      <Button title="Get Started" onPress={onNext} />
      </ScreenWrapper>
  )
}
