import React from "react"
import { View } from "react-native"
import tw from "twrnc"

type Props = {
  children: React.ReactNode
  bg?: string // optional background override
}

export default function ScreenWrapper({ children, bg = "blue" }: Props) {
  return (
    <View style={tw`flex-1 justify-center items-center px-6 bg-${bg}`}>
      {children}
    </View>
  )
}
