import React, { useEffect, useState } from "react"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { View, Text } from "react-native"
import tw from "twrnc"
import "./lib/firebase"

import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import QuizScreen from "./screens/QuizScreen"
import ResultsScreen from "./screens/ResultsScreen"
import { QuizResult } from "./types/quiz"

export default function App() {
  const [authStatus, setAuthStatus] = useState<"checking" | "loggedIn" | "loggedOut">("checking")
  const [screen, setScreen] = useState<"home" | "quiz" | "results">("home")
  const [result, setResult] = useState<QuizResult | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setAuthStatus(user ? "loggedIn" : "loggedOut")
    })

    return () => unsubscribe()
  }, [])

  if (authStatus === "checking") {
    return (
      <View style={tw`flex-1 items-center justify-center bg-blue-500`}>
        <Text style={tw`text-white text-xl`}>Checking session...</Text>
      </View>
    )
  }

  if (authStatus === "loggedOut") {
    return <LoginScreen />
  }

  // Authenticated user
  if (screen === "home") return <HomeScreen onStart={() => setScreen("quiz")} />
  if (screen === "quiz")
    return (
      <QuizScreen
        onComplete={(res) => {
          setResult(res)
          setScreen("results")
        }}
      />
    )
  if (screen === "results" && result) return <ResultsScreen result={result} onRestart={() => setScreen("home")} />

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-red-500 text-lg`}>Something went wrong!</Text>
    </View>
  )
}
